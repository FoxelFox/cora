import {Component} from "./Component";

export interface Button {
	isPressed: boolean;
	isNew: boolean;
}

export enum Control {
	W = <any>"W",
	A = <any>"A",
	S = <any>"S",
	D = <any>"D"
}

export interface KeyMap {
	[key: string]: Button;
};

export class Client extends Component {
	keyMap: { [key: string]: Button; };

	constructor() {
		super("Client");
		this.keyMap = {};
	}

	isControl(control: Control): boolean {
		return this.keyMap[control] ? this.keyMap[control].isPressed : false;
	}

	FromNet(keyMap: KeyMap) {
		this.keyMap = keyMap;
	}

	ToNet() {
		return this.keyMap;
	}

	Serialize() {
		return {
			keyMap: this.keyMap
		}
	}

	static Deserialize(data: any): Client {
		let client = new Client();
		client.keyMap = data.keyMap;
		return client;
	}

}
