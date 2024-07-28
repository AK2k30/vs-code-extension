const { exec } = require('child_process');
const { promisify } = require('util');
const execPromise = promisify(exec);
const packageJson = require('./package.json');

exports.pushExtensionToIdx = async () => {
  try {
    const fqExtensionId = `${packageJson.publisher || 'undefined_publisher'}.${packageJson.name}`;
    await execPromise(`npx @vscode/vsce package --allow-missing-repository --skip-license 0.0.0`);
    await execPromise(`code --uninstall-extension ${fqExtensionId}`);
    await execPromise(`code --install-extension ${packageJson.name}-0.0.0.vsix --force`);
    console.log('Reinstalled extension (refresh the browser to try it)');
  } catch (e) {
    console.error(e);
  }
};