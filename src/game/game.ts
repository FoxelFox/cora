import {Scene} from "../core/Scene";
import {Client} from "../core/component/Client";
import {GameObject} from "../core/GameObject";
import {Model} from "../core/component/Model";
import {Body} from "../core/component/Body";
import {Cannon, PhysicService} from "../core/PhysicService";
import {Player} from "./Player";

export class Game {

	public static isHost: boolean;

	private clients: { [key: string]: GameObject; };
	private scene: Scene;
	private physic: PhysicService;

	constructor (isHost: boolean) {
		Game.isHost = isHost;
		this.clients = {};
		this.scene = new Scene();
		this.physic = new PhysicService(this.scene);
	}

	CreateWorld() {
		let world = new GameObject();
		world.Add(new Body({mass: 0, shape: new Cannon.Plane()}));
		this.scene.Add(world);
	}

	ClientDisconnected(socket: string) {
		let client = this.clients[socket];
		this.scene.Remove(client);
		delete this.clients[socket];
	}

	ClientJoin(socket: string) {
		const client = new GameObject();
		client.Add(new Client());
		client.Add(new Model("test"));
		client.Add(new Body({mass: 1, shape: new Cannon.Box(new Cannon.Vec3(1, 1, 1))}));
		client.Add(new Player());

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

	Serialize() {
		let clients: any = {};
		for (const id in this.clients) {
			clients[id] = this.clients[id].ID;
		}
		return {
			models: ["test"],
			clients: clients,
			scene: this.scene.Serialize()
		};
	}

	Deserialize(data: any) {
		this.scene.Deserialize(data.scene);
		for (let client of data.clients) {
			this.clients[client.ID] = this.scene.getObjectByID(client.ID);
		}
	}

	FromNet(data: any) {
		this.scene.FromNet(data);
	}

	ToNet() {
		return this.scene.ToNet();
	}

	get Scene() {
		return this.scene;
	}

}
