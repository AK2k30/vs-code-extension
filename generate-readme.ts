import { GoogleGenerativeAI } from "@google/generative-ai";
import { isText } from 'istextorbinary';
import * as path from 'path';
import * as vscode from 'vscode';
import { GEMINI_API_KEY } from './config';
import { GENERATE_README_PROMPT, SUMMARIZE_FILE_PROMPT } from './prompts';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const MAX_TEXT_FILES = 30;

/**
 * A simple agent that generates a README.md for the given folder, using AI. This is a trivial agent
 * that's invoked by a user on a given folder, and calls the Gemini API to summarize the files in
 * the folder and then the summaries of all the files. It then puts this in a README.md in that
 * folder.
 */
export async function createFolderReadme(folder: vscode.Uri) {
  let readmeUri = vscode.Uri.joinPath(folder, 'README.md');

  // Collect files
  let allFiles = await collectTargetFiles(folder);

  // See if there's already a README, if so, abort and open the file for editing.
  if (allFiles.find(f => f.path === readmeUri.path)) {
    vscode.commands.executeCommand('vscode.open', readmeUri);
    vscode.window.showInformationMessage('This directory already has a README.md file');
    return;
  }

  // Start a long-running operation, shown and updated via a notification.
  await vscode.window.withProgress({
    location: vscode.ProgressLocation.Notification,
    cancellable: true,
    title: `Creating README for "${path.basename(folder.path)}" folder`,
  }, async (progress, token) => {
    // Filter binary files
    let textFiles = await filterOnlyTextFiles(allFiles);

    // Abort if there are more than a reasonable maximum
    if (textFiles.length > MAX_TEXT_FILES) {
      throw new Error(`For this demo, a maximum of ${MAX_TEXT_FILES} files per folder is supported`);
    }

    let errors: string[] = [];
    let fileSummaries: { filename: string, summary: string }[] = [];

    // Iteratively summarize each file
    for (let [index, file] of textFiles.entries()) {
      if (token.isCancellationRequested) throw new Error('Cancelled');
      let relativePath = path.relative(folder.path, file.path);
      let bytes = await vscode.workspace.fs.readFile(file);
      let textContent = new TextDecoder().decode(bytes);
      progress.report({ message: `Summarizing text file ${index + 1} of ${textFiles.length}: ${relativePath}` });
      try {
        let summary = await generateText(SUMMARIZE_FILE_PROMPT({
          filename: relativePath,
          content: textContent
        }));
        fileSummaries.push({ filename: relativePath, summary });
      } catch {
        errors.push(`File ${relativePath} couldn't be summarized`);
      }
    }

    if (token.isCancellationRequested) throw new Error('Cancelled');
    progress.report({ message: 'Summarizing' });

    // Generate a README of the summaries
    let readmeContent = '';
    try {
      readmeContent = await generateText(GENERATE_README_PROMPT({
        folderName: path.basename(folder.path),
        fileSummaries,
      }));
      readmeContent = readmeContent.trim();
    } catch (e) {
      vscode.window.showInformationMessage(`Error generating a README: ${e}`);
      return;
    }

    if (token.isCancellationRequested) throw new Error('Cancelled');
    await vscode.workspace.fs.writeFile(readmeUri, new TextEncoder().encode(readmeContent));

    await vscode.commands.executeCommand('vscode.open', readmeUri);
    // await vscode.commands.executeCommand("markdown.showPreview", readmeUri);
    vscode.window.showInformationMessage(`Generated README for folder: ${path.basename(folder.path)}`);
  });
}

/**
 * Recursively lists out all files in the given folder.
 */
async function collectTargetFiles(folder: vscode.Uri): Promise<vscode.Uri[]> {
  let files: vscode.Uri[] = [];
  for (let [name, type] of await vscode.workspace.fs.readDirectory(folder)) {
    let itemUri = vscode.Uri.joinPath(folder, name);
    if (type === vscode.FileType.Directory) {
      files = [...files, ...await collectTargetFiles(itemUri)];
    } else if (type === vscode.FileType.SymbolicLink) {
      // skip symbolic links for now
    } else if (type === vscode.FileType.File) {
      files.push(itemUri);
    }
  }

  return files;
}

/**
 * Filters out non-text (binary) files.
 */
async function filterOnlyTextFiles(files: vscode.Uri[]): Promise<vscode.Uri[]> {
  let textFiles: vscode.Uri[] = [];
  for (let file of files) {
    let bytes = await vscode.workspace.fs.readFile(file);
    if (isText(file.path, Buffer.from(bytes))) {
      textFiles.push(file);
    }
  }
  return textFiles;
}

async function generateText(prompt: string): Promise<string> {
  console.log(prompt);
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}
