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

	static Deserialize(data: any): Body {
		return new Body({ position: data.body.position })
	}

	get Body(): CANNON.Body {
		return this.body;
	}
}

export module Body {
	Component.register(Body);
}
