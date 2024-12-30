import { contextBridge, ipcRenderer } from 'electron';

// 在window对象下导出只读对象
contextBridge.exposeInMainWorld('customMsgBub', {
	ready: () => ipcRenderer.send('LiteLoader.custom_msgbub.ready'),
	inject: (callback: Function) => ipcRenderer.on('LiteLoader.custom_msgbub.inject', (callback as any)),
	getConfig: () => ipcRenderer.invoke('LiteLoader.custom_msgbub.getConfig'),
	setConfig: (config: object) => ipcRenderer.send('LiteLoader.custom_msgbub.setConfig', config),
	getUid: () => ipcRenderer.send('LiteLoader.custom_msgbub.getUid')
})
