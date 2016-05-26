import {Component} from "../core/component/Component";
import {Client, Control} from "../core/component/Client";
import {Body} from "../core/component/Body";

export class Player extends Component {

	private client: Client;
	private body: Body;

	constructor() {
		super("Player");
	}

	Start() {
		this.client = <Client>this.GameObject.Get("Client");
		this.body = <Body>this.GameObject.Get("Body");
	}

	ToNet() {

	};

	FromNet(data: any) {

	};

	Update() {
		if (this.client.isControl(Control.W)) {
			this.body.Body.force.x = 10;
		}
	};
}
