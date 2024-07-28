interface SimpleFile {
  filename: string;
  content: string;
}

interface FileSummary {
  filename: string;
  summary: string;
}

/**
 * A simple text->text prompt to summarize a file and its contents.
 */
export const SUMMARIZE_FILE_PROMPT = ({ filename, content }: SimpleFile) => `
Provide a summary of no more than 2 sentences of the following code file:

Filename: ${filename}
File contents:
${content}
`.trim();

/**
 * A simple text->text prompt to generate a README.md file for a given folder with the given
 * file summaries.
 */
export const GENERATE_README_PROMPT = ({ folderName, fileSummaries }: { folderName: string; fileSummaries: FileSummary[] }) => `
Generate a README.md markdown file that summarizes the following folder containing code:

Folder name: ${folderName}

${fileSummaries.map(({ filename, summary }) => `File ${filename}: ${summary}`.trim()).join('\n\n')}

Contents of README.md:
`.trim();