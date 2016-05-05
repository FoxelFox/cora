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

		this.game = new Game();

		this.setupSockets();

		setInterval(() => {
			this.io.emit("update", this.game.Update());
		}, 10);
	}

	setupSockets() {
		this.io.on("connection", (socket) => {
			console.log(socket.id);
			this.game.ClientConnected(socket.id);
			this.io.emit("client:connection", socket.id);

			socket.on("disconnect", () => {
				this.game.ClientDisconnected(socket.id);
				this.io.emit("client:disconnect", socket.id);
			});
		});
	}
}

new Server();
