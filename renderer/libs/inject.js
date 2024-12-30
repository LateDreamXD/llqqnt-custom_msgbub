import cssTools from "./css-tools.js";

function injectCSS() {
	const sharedBubbleStyle = customMsgBubCfg.sharedBubbleStyle;
	const selfBubbleStyle = customMsgBubCfg.selfBubbleStyle;
	const othersBubbleStyle = customMsgBubCfg.othersBubbleStyle;

	if(!cssTools.checkCSS('cmm-shared-bubble-style')) {
		cssTools.injectCSS({
			CSSid: 'cmm-shared-bubble-style',
			rules: `.msg-content-container {${sharedBubbleStyle}}`
		})
	}
	if(!cssTools.checkCSS('cmm-self-bubble-style')) {
		cssTools.injectCSS({
			CSSid: 'cmm-self-bubble-style',
			rules: `.msg-content-container.container--self {${selfBubbleStyle}}`
		})
	}
	if(!cssTools.checkCSS('cmm-others-bubble-style')) {
		cssTools.injectCSS({
			CSSid: 'cmm-others-bubble-style',
			rules: `.msg-content-container.container--others {${othersBubbleStyle}}`
		})
	}
}

export default injectCSS;