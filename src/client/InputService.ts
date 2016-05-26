import * as keyboardJS from "keyboardjs";

import {Service} from "../core/Service";

const config = <any> {
	W: "w",
	A: "a",
	S: "s",
	D: "d",
};

export class Input implements Service {

	private keyMap: any;

	constructor() {
		this.keyMap = {};

		for (let k of Object.keys(config)) {
			this.initKey(k);
		}
	}

	Update() {

	}

	private initKey(key: string) {
		this.keyMap[key] = { isPressed: false, isNew: false };
		keyboardJS.bind(config[key], () => {
			this.keyMap[key].isNew = !this.keyMap[key].isPressed;
			this.keyMap[key].isPressed = true;
		}, () => {
			this.keyMap[key].isNew = this.keyMap[key].isPressed;
			this.keyMap[key].isPressed = false;
		});
	}

	ToNet() {
		return this.keyMap;
	}

	FromNet(keyMap: any) {
		this.keyMap = keyMap;
	}

}
