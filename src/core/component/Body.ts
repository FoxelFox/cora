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
				position: this.body.position,
				velocity: this.body.velocity
			}
		};
	}

	static Deserialize(data: any): Body {
		return new Body({
			position: data.body.position,
			velocity: data.body.velocity
		});
	}

	ToNet() {
		return {
			body: {
				position: this.body.position,
				velocity: this.body.velocity
			}
		};
	}

	FromNet(data: any) {
		this.body.position.x = data.body.position.x;
		this.body.position.y = data.body.position.y;
		this.body.position.z = data.body.position.z;
		this.body.velocity.x = data.body.velocity.x;
		this.body.velocity.y = data.body.velocity.y;
		this.body.velocity.z = data.body.velocity.z;
	}

	get Body(): CANNON.Body {
		return this.body;
	}
}

export module Body {
	Component.register(Body);
}
