'use strict';

const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const sysinfo = require('systeminformation');

let appWindow = null;

function createAppWindow() {
	appWindow = new BrowserWindow({
		show: false,
		width: 480,
		height: 480,
		minWidth: 480,
		minHeight: 480,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
	});

	appWindow.loadFile(path.join(__dirname, 'index.html'));
	appWindow.webContents.openDevTools({mode: 'detach'});

	appWindow.once('ready-to-show', () => {
		appWindow.show();
	});

	appWindow.on('closed', () => {
		appWindow = null;
	});
}

function createAppMenu() {
	let menu = null;
	let menuTemplate = [];

	menu = Menu.buildFromTemplate(menuTemplate);

	Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
	ipcMain.on('window-title', (event, title) => {
		const webContents = event.sender;
		const win = BrowserWindow.fromWebContents(webContents);

		win.setTitle(title);
	});

	ipcMain.on('resize-window', (event, width, height) => {
		appWindow.setSize(width, height);
	});

	ipcMain.on('centre-window', (event) => {
		appWindow.center();
	});

	ipcMain.on('set-full-screen', (event, fs) => {
		const webContents = event.sender;
		const win = BrowserWindow.fromWebContents(webContents);

		win.setFullScreen(fs);
	});

	ipcMain.on('exit-app', () => {
		appWindow.close();
	});

	/*
	 * systeminformation functions
	 */

	ipcMain.handle('siVersion', async () => {
		return await sysinfo.version();
	});

	ipcMain.handle('cpuInfo', async () => {
		return await sysinfo.cpu();
	});

	ipcMain.handle('cpuClock', async () => {
		return await sysinfo.cpuCurrentSpeed();
	});

	ipcMain.handle('cpuTemps', async () => {
		return await sysinfo.cpuTemperature();
	});

	ipcMain.handle('cpuLoad', async () => {
		return await sysinfo.currentLoad();
	});

	ipcMain.handle('cpuCache', async () => {
		return await sysinfo.cpuCache();
	});

	ipcMain.handle('cpuFlags', async () => {
		return await sysinfo.cpuFlags();
	});

	ipcMain.handle('memInfo', async () => {
		return await sysinfo.mem();
	});

	ipcMain.handle('memLayout', async () => {
		return await sysinfo.memLayout();
	});

	ipcMain.handle('gpuInfo', async () => {
		return await sysinfo.graphics();
	});

	ipcMain.handle('audioInfo', async () => {
		return await sysinfo.audio();
	});

	ipcMain.handle('systemInfo', async () => {
		return await sysinfo.system();
	});

	ipcMain.handle('moboInfo', async () => {
		return await sysinfo.baseboard();
	});

	ipcMain.handle('biosInfo', async () => {
		return await sysinfo.bios();
	});

	ipcMain.handle('diskLayout', async () => {
		return await sysinfo.diskLayout();
	});

	ipcMain.handle('blockDevices', async () => {
		return await sysinfo.blockDevices();
	});

	ipcMain.handle('osInfo', async () => {
		return await sysinfo.osInfo();
	});

	ipcMain.handle('procsInfo', async () => {
		return await sysinfo.processes();
	});

	ipcMain.handle('batteryInfo', async () => {
		return await sysinfo.battery();
	});

	createAppWindow();
	createAppMenu();
});

app.on('window-all-closed', () => {
	app.quit();
});
