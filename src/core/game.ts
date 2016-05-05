import {Scene} from "./Scene";

interface Player {
	id: string;
	name: string;
}

export class Game {

	private players: { [key: string]: Player; };
	private scene: Scene;

	constructor () {
		this.players = {};
		this.scene = new Scene();
	}

	ClientConnected(socket: string) {
		this.players[socket] = {
			id: socket,
			name: "player" + (Object.keys(this.players).length + 1)
		};
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
