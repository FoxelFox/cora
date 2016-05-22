import {Component} from "./Component";
import {Cannon} from "../PhysicService";


export class Body implements Component {

	private body: CANNON.Body;

	constructor(options?: any) {
		this.body = new Cannon.Body(options);
	}

	ToNet(): any {
		return {};
	}

	FromNet(data: any): void {

	}

	Update(): void {

	}

	Type() {
		return "Body";
	}

	get Body(): CANNON.Body {
		return this.body;
	}
}
