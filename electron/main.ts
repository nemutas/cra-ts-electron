import { app, BrowserWindow } from 'electron';
import * as isDev from 'electron-is-dev';
import * as path from 'path';
import { initIpcMain } from './ipc-main-handler';

function createWindow() {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		frame: false, // windows
		titleBarStyle: 'hidden', // mac
		useContentSize: true,
		transparent: true,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			preload: path.join(__dirname, 'preload.js'),
			webSecurity: !isDev
		}
	});

	if (isDev) {
		mainWindow.loadURL('http://localhost:3000/index.html');
	} else {
		// 'build/index.html'
		mainWindow.loadURL(`file://${__dirname}/../index.html`);
	}

	// Hot Reloading
	if (isDev) {
		// 'node_modules/.bin/electronPath'
		require('electron-reload')(__dirname, {
			electron: path.join(__dirname, '..', '..', 'node_modules', '.bin', 'electron'),
			forceHardReset: true,
			hardResetMethod: 'exit'
		});
	}

	// Open the DevTools.
	if (isDev) {
		mainWindow.webContents.openDevTools();
	}

	return mainWindow;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

// app.whenReady().then(createWindow);
app.whenReady().then(() => {
	const mainWindow = createWindow();
	initIpcMain(mainWindow);
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		const mainWindow = createWindow();
		initIpcMain(mainWindow);
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
