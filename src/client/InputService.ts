import * as keyboardJS from "keyboardjs";

import {AService} from "../core/AService";

interface Button {
	isPressed: boolean;
	isNew: boolean;
}

export const Key = <any> {
	W: "w",
	A: "a",
	S: "s",
	D: "d"
};

export class Input implements AService {

	private keyMap: {[key: string]: Button};

	constructor() {
		this.keyMap = {};

		for (let k of Object.keys(Key)) {
			this.initKey(Key[k]);
		}
	}

	isKeyDown(key: string): boolean {
		return this.keyMap[key].isPressed;
	}

	update() {

	}

	private initKey(key: string) {
		this.keyMap[key] = { isPressed: false, isNew: false };
		keyboardJS.bind(key.toString(), () => {
			this.keyMap[key].isNew = !this.keyMap[Key.W].isPressed;
			this.keyMap[key].isPressed = true;
		}, () => {
			this.keyMap[key].isNew = this.keyMap[Key.W].isPressed;
			this.keyMap[key].isPressed = false;
		});
	}

}
