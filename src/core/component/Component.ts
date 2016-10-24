import {GameObject} from "../GameObject";

export abstract class Component {
	private static classes: {[key: string]: any} = {};
	private gameObject: GameObject;

	constructor(private type: string) {}

	ToNet(): any {};
	Serialize() {};
	FromNet(data: any): void {};
	Update(): void {};
	Start(): void {};
	Type(): string {
		return this.type;
	};

	set GameObject(gameObject: GameObject) {
		this.gameObject = gameObject;
	}

	get GameObject(): GameObject {
		return this.gameObject;
	}

	static register(comp: any) {
		this.classes[comp.name] = comp;
	}

	static Deserialize(id: string, data: any): Component {
		return new this.classes[id].Deserialize(data);
	}
}
