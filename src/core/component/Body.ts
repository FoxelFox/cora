import {Component} from "./Component";
import {Cannon} from "../PhysicService";


export class Body extends Component {

	private body: CANNON.Body;

	constructor(options?: any) {
		super("Body");
		this.body = new Cannon.Body(options);
	}


	Serialize() {
		return {
			body: {
				position: this.body.position
			}
		};
	}

	Deserialize(data: any) {
		this.body.position = data.body.position;
	}

	get Body(): CANNON.Body {
		return this.body;
	}
}
