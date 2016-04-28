import {Component} from "./Component";
import {CANNON} from "cannon";

export class Body extends CANNON.Body implements Component {

	constructor(options: any) {
		super(options);
	}

	ToNet(): any {
		return {};
	}

	FromNet(): void {

	}

	Update(): void {

	}
}
