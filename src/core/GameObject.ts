import {Component} from "./component/Component";

let idCounter: number = -1;

export class GameObject {

	private components: { [key: string]: Component; };
	private id: number;

	constructor() {
		this.components = {};
		this.id = idCounter++;
	}

	Add(component: Component) {
		this.components[(<any>component.constructor).name] = component;
	}

	Remove(component: Component) {
		delete this.components[(<any>component.constructor).name];
	}

	Get(type: string) {
		return this.components[type];
	}

	Has(type: string): boolean {
		if (this.components[type]) {
			return true;
		} else {
			return false;
		}
	}

	get ID (): number {
		return this.id;
	}

	delete() {
        // ok =(
	}
}