import {Scene} from "./Scene";
import {Client} from "./component/Client";
import {GameObject} from "./GameObject";

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
		this.players[socket] = player;
	}

	ClientDisconnected(socket: string) {
		delete this.players[socket];
	}

	Update() {

	}

	get Scene() {
		return this.scene;
	}

}
