import * as keyboardJS from "keyboardjs";

import {AService} from "../core/AService";

const config = <any> {
	W: "w",
	A: "a",
	S: "s",
	D: "d",
};

export class Input implements AService {

	private keyMap: any;

	constructor() {
		this.keyMap = {};

		for (let k of Object.keys(config)) {
			this.initKey(k);
		}
	}

	isKeyDown(key: string): boolean {
		return this.keyMap[key].isPressed;
	}

	update() {

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
