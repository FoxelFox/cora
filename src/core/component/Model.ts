import {Component} from "./Component";

export class Model extends Component {

	constructor (private file: string) {
		super("Model");
	}

	get File(): string {
		return this.file;
	}

	Serialize() {
		return {
			file: this.file
		}
	}

	static Deserialize(data: any): Model {
		return new Model(data.file);
	}
}
