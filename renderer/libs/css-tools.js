import {log} from "./log.js";

const injectCSS = (CSS) => {
	try {
		document.body.insertAdjacentHTML('afterend', `<style id="${CSS.CSSid}">${CSS.rules}</style>`);
		log(`Injected CSS rules: ${CSS.CSSid}`);
	} catch(e) {log(`Injecting CSS rules ${CSS.CSSid} failed:`, e);}
}

const checkCSS = (CSSid) => {
	try {
		if(!!document.body.querySelector(`#${CSSid}`)) {
			log(`The CSS rule ${CSSid} exists`);
			return true;
		} else {
			log(`The CSS rule ${CSSid} does not exist`);
			return false;
		}
	} catch(e) {
		log(`Checking CSS rule ${CSSid} failed:`, e);
		return null;
	}
}

export default {injectCSS, checkCSS};