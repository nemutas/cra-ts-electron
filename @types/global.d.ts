declare global {
	interface Window {
		ElectronAPI: Sandbox;
	}
}

export interface Sandbox {
	readDir: () => Promise<string[]>;
	save: (str: string) => Promise<any>;
	currentDir: () => Promise<string>;
	showFileSelector: () => Promise<string[]>;
	windowMaximize: () => Promise<any>;
	windowMinimize: () => Promise<any>;
	windowRestore: () => Promise<any>;
	windowClose: () => Promise<any>;
	isFullScreen: () => Promise<boolean>;
}
