import {Component} from "./Component";

export class Model implements Component {

	constructor (private file: string) {

	}

	ToNet() {
		
	}

	FromNet() {

	}

	Update() {

	}

	Type() {
		return "Model";
	}

	get File(): string {
		return this.file;
	}
}
