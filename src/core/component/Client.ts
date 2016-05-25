import {Component} from "./Component";

export interface Button {
	isPressed: boolean;
	isNew: boolean;
}

export interface KeyMap {
	W: Button;
	A: Button;
	S: Button;
	D: Button;
};

export class Client extends Component {
	keyMap: KeyMap;

	constructor() {
		super("Client");
	}

	FromNet(keyMap: KeyMap) {
		this.keyMap = keyMap;
	}

	ToNet() {
		return this.keyMap;
	}

}
