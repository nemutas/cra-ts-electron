import { BrowserWindow, dialog, ipcMain } from 'electron';
import * as Store from 'electron-store';
import * as fs from 'fs';

export const initIpcMain = (mainWindow: BrowserWindow): void => {
	const store = new Store();
	// ディレクトリ取得？
	ipcMain.handle('read-dir', async () => fs.promises.readdir('./'));
	// テキストの保存
	ipcMain.handle('save', (event, str: string) => {
		store.set('unicorn', str);
		console.log(`save: ${str}`);
	});
	// カレントディレクトリ（ビルドするとうまく取れない）
	ipcMain.handle('current-dir', () => __dirname);
	// ファイルピッカー
	ipcMain.handle('file-selector', async () => {
		const filenames = await dialog.showOpenDialog({
			properties: ['openFile', 'multiSelections'],
			title: 'Select a image file',
			defaultPath: '.',
			filters: [{ name: 'image file', extensions: ['png', 'jpg', 'jpeg'] }]
		});
		return filenames.filePaths;
	});
	// windowの操作
	ipcMain.handle('window-maximize', () => mainWindow.maximize());
	ipcMain.handle('window-minimize', () => mainWindow.minimize());
	ipcMain.handle('window-restore', () => mainWindow.restore());
	ipcMain.handle('window-close', () => mainWindow.close());
	// windowの状態
	ipcMain.handle('window-isfullscreen', () => mainWindow.isMaximized());

	mainWindow.on('resized', (event: Event, command: string) => {});
};
