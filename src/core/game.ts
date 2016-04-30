import {Scene} from "./Scene";

interface Player {
	id: string;
	name: string;
}

export class Game {

	private players: Player[];
	private scene: Scene;

	constructor () {
		this.players = [];
		this.scene = new Scene();
	}

	ClientConnected(socket: string) {
		
	}

	ClientDisconnected(socket: string) {

	}


}
