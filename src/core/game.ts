import {Scene} from "./Scene";
import {Client} from "./component/Client";
import {GameObject} from "./GameObject";
import {Model} from "./component/Model";
import {Body} from "./component/Body";

export class Game {

	private players: { [key: string]: GameObject; };
	private scene: Scene;

	constructor () {
		this.players = {};
		this.scene = new Scene();
	}

	ClientConnected(socket: string) {
		const player = new GameObject();
		player.Add(new Client());
		player.Add(new Model("test"));
		player.Add(new Body());

		this.players[socket] = player;
		this.scene.Add(player);
	}

	ClientDisconnected(socket: string) {
		delete this.players[socket];
	}

	Update() {
		this.scene.Update();
	}

	get Scene() {
		return this.scene;
	}

}
