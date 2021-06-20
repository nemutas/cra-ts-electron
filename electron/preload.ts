import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('ElectronAPI', {
	readDir: () => ipcRenderer.invoke('read-dir'),
	save: (str: string) => ipcRenderer.invoke('save', str),
	currentDir: () => ipcRenderer.invoke('current-dir'),
	showFileSelector: () => ipcRenderer.invoke('file-selector'),
	windowMaximize: () => ipcRenderer.invoke('window-maximize'),
	windowMinimize: () => ipcRenderer.invoke('window-minimize'),
	windowRestore: () => ipcRenderer.invoke('window-restore'),
	windowClose: () => ipcRenderer.invoke('window-close'),
	isFullScreen: () => ipcRenderer.invoke('window-isfullscreen')
});
