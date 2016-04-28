import * as socket from "socket.io";
import * as express from "express";
import * as http from "http";
import  {Game} from "../core/game";

class Server {

	private io: SocketIO.Server;
	private game: Game;

	constructor() {
	 	let expressApp = express();
		let server = http.createServer(expressApp);
		let router = express.Router();
		this.io = socket(server);

		router.use(express.static("./bin/client"));
		expressApp.use("", router);
		server.listen("8080");

		let game = new Game();

		this.setupSockets();
	}

	setupSockets() {
		this.io.on("connection", (socket) => {

			this.game.ClientConnected(socket.id);

			socket.on("disconnect", () => {
				this.game.ClientDisconnected(socket.id);
			});
		});
	}
}

new Server();
