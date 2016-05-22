import {Scene} from "./Scene";
import {Client} from "./component/Client";
import {GameObject} from "./GameObject";
import {Model} from "./component/Model";
import {Body} from "./component/Body";
import {Cannon, PhysicService} from "./PhysicService";

export class Game {

	private players: { [key: string]: GameObject; };
	private scene: Scene;
	private physic: PhysicService;

	constructor () {
		this.players = {};
		this.scene = new Scene();
		this.physic = new PhysicService(this.scene);

		let world = new GameObject();
		world.Add(new Body({mass: 0, shape: new Cannon.Plane()}));
		

		this.scene.Add(world);
	}

	ClientConnected(socket: string) {

	}

	ClientDisconnected(socket: string) {
		delete this.players[socket];
	}

	ClientJoin(socket: string) {
		const player = new GameObject();
		player.Add(new Client());
		player.Add(new Model("test"));
		player.Add(new Body({mass: 1, shape: new Cannon.Sphere(1)}));

		this.players[socket] = player;
		this.scene.Add(player);
	}

	Update() {
		this.scene.Update();
		this.physic.update();
	}

	get Scene() {
		return this.scene;
	}

}
