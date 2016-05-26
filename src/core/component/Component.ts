import {GameObject} from "../GameObject";

export abstract class Component {

	private gameObject: GameObject;

	constructor(private type: string) {}

	ToNet(): any {};
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
}
