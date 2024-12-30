declare const webContents: any;

function sendInjectCmd(webContent: Electron.WebContents) {
	webContent.send('LiteLoader.custom_msgbub.inject');
}

function injectCss(webContent: Electron.WebContents) {
	if(webContent) {
		sendInjectCmd(webContent);
	} else {
		webContents.getAllWebContents().forEach(
			(webContent: Electron.WebContents) => sendInjectCmd(webContent)
		);
	}
}

export = injectCss;