import {Component} from "./Component";
import {Cannon} from "../PhysicService";


export class Body extends Component {

	private body: CANNON.Body;

	constructor(options?: any) {
		super("Body");
		this.body = new Cannon.Body(options);
	}

	get Body(): CANNON.Body {
		return this.body;
	}
}
