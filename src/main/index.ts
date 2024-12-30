import { ipcMain } from "electron";
import injectCss = require("./libs/injectCss");
import log = require("./libs/log");
import path = require("path");
import fs = require("fs");

declare const LiteLoader: any;

var _curtUid: string;
const pluginPath = path.join(LiteLoader.plugins['custom_msgbub'].path.plugin);
const dataPath = path.join(LiteLoader.plugins['custom_msgbub'].path.data);
fs.existsSync(dataPath) || fs.mkdirSync(dataPath, {recursive: true});

const onLogin = (uid: string) => {
	_curtUid = uid;
}

ipcMain.on('LiteLoader.custom_msgbub.ready', (event: Electron.IpcMainEvent) => {
	injectCss(event.sender);
});

ipcMain.on('LiteLoader.custom_msgbub.setConfig', (event: Electron.IpcMainInvokeEvent, config: object) => {
	fs.writeFileSync(path.join(dataPath, `${_curtUid}.json`), JSON.stringify(config));
});

ipcMain.on('LiteLoader.custom_msgbub.getUid', (event: Electron.IpcMainInvokeEvent) => {
	return _curtUid;
});

ipcMain.handle('LiteLoader.custom_msgbub.getConfig', (event: Electron.IpcMainInvokeEvent) => {
	try {
		const config = JSON.parse(fs.readFileSync(path.join(dataPath, `${_curtUid}.json`), 'utf-8'));
		return config;
	} catch(e: any) {
		log(`获取当前账号配置失败, 将使用默认配置, 原因: ${e.message}`);
		return require(path.join(pluginPath, 'config', 'default.json'));
	}
});

log('插件加载成功');

export = {onLogin};