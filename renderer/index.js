import {log} from "./libs/log.js";
import injectCSS from "./libs/inject.js";

var customMsgBubCfg;
(async() => {
	customMsgBubCfg = await customMsgBub.getConfig();
	log("CustomMsgBub config:", JSON.stringify(customMsgBubCfg));
	window.customMsgBubCfg = customMsgBubCfg;
})();

// listen inject CSS event
customMsgBub.inject(() => {
	try {
		if(customMsgBubCfg.enableCMM) {
			log("Injecting CSS");
			injectCSS();
		} else log("CustomMsgBub is disabled");
	} catch(e) {
		log("Error while injecting CSS:", e);
	}
});

// make as ready to inject CSS
log("Ready to inject CSS");
customMsgBub.ready();

export const onSettingWindowCreated = async(view) => {
	try {
		log("Trying to create setting page");
		const config = await customMsgBub.getConfig();
		const uid = await customMsgBub.getUid();
		view.insertAdjacentHTML('beforeend', `
<custom-msgbub-setting>
	<setting-section data-title="主要配置">
		<setting-panel>
			<setting-list data-direction="column">
				<setting-item data-direction="column">
					<div>
						<setting-text>修改配置后需要重启生效</setting-text>
						<setting-text data-type="secondary"><s>我还没写热重载功能awa</s></setting-text>
					</div>
				</setting-item>
				<setting-item data-direction="column">
					<div>
						<setting-text>启用自定义气泡</setting-text>
						<setting-text data-type="secondary">开启后将会使用配置的样式渲染聊天气泡</setting-text>
					</div>
					<setting-switch id="cmm-enable-main-feature" ${config.enableCMM? 'is-active': ''}></setting-switch>
				</setting-item>

				<setting-item data-direction="column">
					<div>
						<setting-text>共享样式</setting-text>
						<setting-text data-type="secondary">全部气泡共用的样式</setting-text>
					</div>
					<input class="custom-input" id="cmm-shared-bubble-style" type="text" value="${config.sharedBubbleStyle}" placeholder="请输入css规则" />
				</setting-item>

				<setting-item data-direction="column">
					<div>
						<setting-text>自己的样式</setting-text>
						<setting-text data-type="secondary">自己的气泡样式</setting-text>
					</div>
					<input class="custom-input" id="cmm-self-bubble-style" type="text" value="${config.selfBubbleStyle}" placeholder="请输入css规则" />
				</setting-item>

				<setting-item data-direction="column">
					<div>
						<setting-text>别人的样式</setting-text>
						<setting-text data-type="secondary">别人的气泡样式</setting-text>
					</div>
					<input class="custom-input" id="cmm-others-bubble-style" type="text" value="${config.othersBubbleStyle}" placeholder="请输入css规则" />
				</setting-item>
			</setting-list>
		</setting-panel>
	</setting-section>
	<span class="about">
		${LiteLoader.plugins.custom_msgbub.manifest.name} v${LiteLoader.plugins.custom_msgbub.manifest.version} <br />
		Made by <a href="javascript:LiteLoader.api.openExternal('${LiteLoader.plugins.custom_msgbub.manifest.authors[0].link}')">
		${LiteLoader.plugins.custom_msgbub.manifest.authors[0].name}</a> with ❤️ <br />
		当前配置文件: ${uid}.json <s>还没写完看看就行了awa</s> <br />
	</span>
</custom-msgbub-setting>
<style>
	a {
		color: rgba(172, 172, 255, 1);
	}

	a:hover {
		text-decoration: underline;
	}

	.about {
		display: block;
		text-align: center;
		margin-bottom: 8px;
	}

	.custom-textarea {
		width: 100%;
		resize: none;
	}

	.custom-textarea:empty:before {
		content: attr(placeholder);
		color: #999;
	}

	.custom-input {
		background-color: #cccc;
		border-radius: 4px;
		padding: 4px;
		font-size: 14px;
	}

	.custom-input:hover,
	.custom-input:focus {
		outline: 1px solid #222; /* 用outline不会造成元素抖动 */
	}

	@media (prefers-color-scheme: dark) {
		.custom-input {
			color: #ccc;
			background-color: #424242aa;
			outline-color: #222;
		}
		.custom-input:hover,
		.custom-input:focus {
			outline-color: #ccc;
		}
	}

	.custom-input[disabled] {
		color: #757575;
		outline: none;
	}
</style>
			`);
			const options = view.querySelector('custom-msgbub-setting');
			function getNewConfig() {
				return {
					enableCMM: options.querySelector('#cmm-enable-main-feature').hasAttribute('is-active'),
					sharedBubbleStyle: options.querySelector('#cmm-shared-bubble-style').value,
					selfBubbleStyle: options.querySelector('#cmm-self-bubble-style').value,
					othersBubbleStyle: options.querySelector('#cmm-others-bubble-style').value
				}
			}
			// 绑定事件监听器
			options.querySelector('#cmm-enable-main-feature').addEventListener('click', () => customMsgBub.setConfig(getNewConfig()));
			options.querySelector('#cmm-shared-bubble-style').addEventListener('change', () => customMsgBub.setConfig(getNewConfig()));
			options.querySelector('#cmm-self-bubble-style').addEventListener('change', () => customMsgBub.setConfig(getNewConfig()));
			options.querySelector('#cmm-others-bubble-style').addEventListener('change', () => customMsgBub.setConfig(getNewConfig()));
	} catch(e) {
		log("Error while creating setting page:", e);
	}
}
