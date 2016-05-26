import {Component} from "./component/Component";

let idCounter: number = -1;

export class GameObject {

	private components: { [key: string]: Component; };
	private id: number;

	constructor() {
		this.components = {};
		this.id = ++idCounter;
	}

	Start() {
		for (let id in this.components) {
			this.components[id].Start();
		}
	}

	Update() {
		for (let id in this.components) {
			this.components[id].Update();
		}
	}

	Add(component: Component) {
		component.GameObject = this;
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

	FromNet(data: any) {
		for (const id in data) {
			this.components[id].FromNet(data[id]);
		}
	}

	ToNet(): any {
		let net: any = {};
		for (let id in this.components) {
			let cnet = this.components[id].ToNet();
			if (cnet) {
				net[id] = cnet;
			}
		}
		return net;
	}

	get ID (): number {
		return this.id;
	}

	delete() {
        // ok =(
	}
}
