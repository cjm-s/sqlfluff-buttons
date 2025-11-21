const vscode = require("vscode");

function runSqlfluff(command) {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showErrorMessage("No active file to process.");
    return;
  }

  const fullPath = editor.document.uri.fsPath;

  // Use the currently active terminal
  let terminal = vscode.window.activeTerminal;

  if (!terminal) {
    vscode.window.showErrorMessage("No active terminal found.");
    return;
  }

  terminal.sendText(`sqlfluff ${command} ${fullPath}`);
}

function activate(context) {
  const lintCmd = vscode.commands.registerCommand("sqlfluff.lintFile", () => {
    runSqlfluff("lint");
  });

  const fixCmd = vscode.commands.registerCommand("sqlfluff.fixFile", () => {
    runSqlfluff("fix");
  });

  context.subscriptions.push(lintCmd, fixCmd);
}

function deactivate() {}

module.exports = { activate, deactivate };
