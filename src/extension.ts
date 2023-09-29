import * as vscode from 'vscode';
import * as cp from 'child_process';

export function activate(context: vscode.ExtensionContext) {
	console.log('VSYS active.');

	let reboot = vscode.commands.registerCommand('vsys.reboot', () => {
		cp.exec('reboot', (stderr) => {
			if (stderr) {
				vscode.window.showErrorMessage(`VSYS: error while attempting to reboot: ${stderr}`);
			}
		});
	});

	let shutDown = vscode.commands.registerCommand('vsys.shutDown', () => {
		cp.exec('shutdown now', (stderr) => {
			if (stderr) {
				vscode.window.showErrorMessage(`VSYS: error while attempting to shut down: ${stderr}`);
			}
		});
	});

	context.subscriptions.push(reboot);
	context.subscriptions.push(shutDown);
}

export function deactivate() {console.log('VSYS is disabled.');}