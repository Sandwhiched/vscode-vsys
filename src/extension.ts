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

	let restartDaemon = vscode.commands.registerCommand('vsys.restartDaemon', async () => {
		let daemon = '';
		const input = await vscode.window.showInputBox({
			placeHolder: 'daemon to restart',
			prompt: 'Enter system daemon to restart.',
			value: daemon
		});
		if (input === '') {
			vscode.window.showErrorMessage('A service/daemon name is required.');
		} else if (input !== undefined) {
			cp.exec(`pkexec systemctl restart ${input}`, (stderr, stdout) => {
				if (stderr) {
					vscode.window.showErrorMessage(`${stderr}`);
				} else if (stdout) {
					vscode.window.showInformationMessage(stdout);
				}
			});
		}
	});

	let stopDaemon = vscode.commands.registerCommand('vsys.stopDaemon', async () => {
		let daemon = '';
		const input = await vscode.window.showInputBox({
			placeHolder: 'daemon to stop',
			prompt: 'Enter system daemon to stop.',
			value: daemon
		});
		if (input === '') {
			vscode.window.showErrorMessage('A service/daemon name is required.');
		} else if (input !== undefined) {
			cp.exec(`pkexec systemctl stop ${input}`, (stderr, stdout) => {
				if (stderr) {
					vscode.window.showErrorMessage(`${stderr}`);
				} else if (stdout) {
					vscode.window.showInformationMessage(stdout);
				}
			});
		}
	});

	let quickExecute = vscode.commands.registerCommand('vsys.quickExecute', async () => {
		let command = '';
		const input = await vscode.window.showInputBox({
			placeHolder: 'command',
			prompt: 'Enter command to run.',
			value: command
		});
		if (input === '') {
			vscode.window.showErrorMessage('A command is required.');
		} else if (input !== undefined) {
			cp.exec(input, (stderr, stdout) => {
				if (stderr) {
					vscode.window.showErrorMessage(`${stderr}`);
				} else if (stdout) {
					vscode.window.showInformationMessage(stdout);
				}
			});
		}
	});

	let rootExecute = vscode.commands.registerCommand('vsys.rootExecute', async () => {
		let command = '';
		const input = await vscode.window.showInputBox({
			placeHolder: 'command',
			prompt: 'Enter command to run.',
			value: command
		});
		if (input === '') {
			vscode.window.showErrorMessage('A command is required.');
		} else if (input !== undefined) {
			cp.exec('pkexec ' + input, (stderr, stdout) => {
				if (stderr) {
					vscode.window.showErrorMessage(`${stderr}`);
				} else if (stdout) {
					vscode.window.showInformationMessage(stdout);
				}
			});
		}
	});	

	context.subscriptions.push(reboot);
	context.subscriptions.push(shutDown);
	context.subscriptions.push(restartDaemon);
	context.subscriptions.push(stopDaemon);
	context.subscriptions.push(quickExecute);
}

export function deactivate() {console.log('VSYS is disabled.');}