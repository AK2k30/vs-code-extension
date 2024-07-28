# README Generator for VS Code Extension

![image](https://github.com/user-attachments/assets/ad187987-0eac-429c-94aa-a2a452489356)

## Overview

Welcome to the **README Generator for VS Code Extension**! This tool helps you automatically generate detailed `README.md` files for your projects using AI. It aims to save you time and effort, ensuring your project documentation is comprehensive, well-structured, and professional.

## Features

- **Automated README Generation**: Generate a `README.md` file with a single command.
- **Customizable Sections**: Include specific sections such as Installation, Usage, Contributing, and more.
- **AI-Powered Content**: Utilizes AI to create detailed and relevant content based on your project.
- **User-Friendly Interface**: Simple and intuitive commands to generate and customize your README.

## Installation

1. **Install VS Code**: Ensure you have [Visual Studio Code](https://code.visualstudio.com/) installed on your computer.
2. **Install the Extension**: Search for `README Generator` in the VS Code Extensions Marketplace and install it.
3. **Clone the Repository (for development)**:
    ```bash
    git clone https://github.com/yourusername/readme-generator-vscode.git
    cd readme-generator-vscode
    ```
4. **Install Dependencies (for development)**:
    ```bash
    npm install
    ```
5. **Build the Extension (for development)**:
    ```bash
    npm run build
    ```

## Usage

1. **Enter API Key**: On first use, you will be prompted to enter your Gemini or OpenAI API key. This key will be stored securely.
2. **Right-Click on a Folder**: Navigate to the folder for which you want to generate a README. Right-click on the folder in the Explorer pane.
3. **Select Generate README**: From the context menu, select the `Generate README` option.
4. **Automatic Generation**: The extension will automatically generate a `README.md` file based on the content and structure of your project.

## Sections

The generated `README.md` includes the following sections:

- **Project Title**: The name of your project.
- **Description**: A brief description of what your project does.
- **Installation**: Instructions on how to install and set up your project.
- **Usage**: How to use your project.
- **Contributing**: Guidelines for contributing to your project.
- **License**: Information about the project's license.

## Error Handling

### Common Issues

- **Missing Dependencies**: Ensure all dependencies are installed using `npm install`.
- **Build Errors**: If you encounter build errors, run `npm run build` again and check for any missing or incompatible packages.
- **Permission Issues**: Ensure you have the necessary permissions to write files in your project directory.

### Troubleshooting

- **Command Not Found**: If the `Generate README` command is not found, make sure the extension is properly installed and enabled in VS Code.
- **AI Content Issues**: If the generated content is not accurate or relevant, you can manually edit the sections to better fit your project.

## Contributing

We welcome contributions from the community! To contribute:

1. **Fork the Repository**: Click the "Fork" button at the top right of the repository page.
2. **Clone Your Fork**:
    ```bash
    git clone https://github.com/yourusername/readme-generator-vscode.git
    cd readme-generator-vscode
    ```
3. **Create a Branch**:
    ```bash
    git checkout -b feature/your-feature-name
    ```
4. **Make Your Changes**: Implement your feature or bugfix.
5. **Commit and Push**:
    ```bash
    git add .
    git commit -m "Add your commit message here"
    git push origin feature/your-feature-name
    ```
6. **Create a Pull Request**: Go to the repository on GitHub and create a pull request from your branch.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For any questions or feedback, feel free to open an issue on GitHub or contact the project maintainer at [Akash Singh](https://akashsingh.vercel.app/).

Thank you for using the README Generator for VS Code Extension! We hope it helps you create great documentation for your projects.
