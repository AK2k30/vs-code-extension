import * as vscode from 'vscode';
import { createFolderReadme } from './generate-readme';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'readmeagent.createFolderReadme',
      async (folder?: vscode.Uri) => {
        if (!folder) {
          // This command was called directly via the command palette (not by right-clicking a folder)
          const options: vscode.OpenDialogOptions = {
            openLabel: 'Select a folder',
            canSelectMany: false,
            canSelectFiles: false,
            canSelectFolders: true
          };

          let folders = await vscode.window.showOpenDialog(options);
          if (!folders?.length) {
            vscode.window.showInformationMessage('Select a folder to generate a README.md');
            return;
          }

          folder = folders[0];
        }

        await createFolderReadme(folder);
      }));
}

export function deactivate() { }
