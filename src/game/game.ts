import {Scene} from "../core/Scene";
import {Client} from "../core/component/Client";
import {GameObject} from "../core/GameObject";
import {Model} from "../core/component/Model";
import {Body} from "../core/component/Body";
import {Cannon, PhysicService} from "../core/PhysicService";

export class Game {

	private clients: { [key: string]: GameObject; };
	private scene: Scene;
	private physic: PhysicService;

	constructor () {
		this.clients = {};
		this.scene = new Scene();
		this.physic = new PhysicService(this.scene);

		let world = new GameObject();
		world.Add(new Body({mass: 0, shape: new Cannon.Plane()}));


		this.scene.Add(world);
	}

	ClientConnected(socket: string) {

	}

	ClientDisconnected(socket: string) {
		delete this.clients[socket];
	}

	ClientJoin(socket: string) {
		const client = new GameObject();
		client.Add(new Client());
		client.Add(new Model("test"));
		client.Add(new Body({mass: 1, shape: new Cannon.Sphere(1)}));

		this.clients[socket] = client;
		this.scene.Add(client);
	}

	Update() {
		this.scene.Update();
		this.physic.update();
	}

	ClientUpdate(data: any, socket: string) {
		if (this.clients[socket]) {
			this.clients[socket].Get("Client").FromNet(data.Client);
		}
	}

	get Scene() {
		return this.scene;
	}

}