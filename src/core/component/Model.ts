import {Component} from "./Component";

export class Model extends Component {

	constructor (private file: string) {
		super("Model");
	}

	get File(): string {
		return this.file;
	}
}
