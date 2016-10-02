import * as socket from "socket.io";
import * as express from "express";
import * as http from "http";
import  {Game} from "../game/game";

class Server {

	private io: SocketIO.Server;
	private game: Game;

	constructor() {
		let expressApp = express();
		let server = http.createServer(expressApp);
		let router = express.Router();
		this.io = socket(server);

		router.use("/", express.static("./bin/client"));
		router.use("/assets", express.static("./assets"));

		expressApp.use("", router);
		server.listen("8080");

		this.game = new Game(true);
		this.game.CreateWorld();

		this.setupSockets();

		setInterval(() => {
			this.game.Update();
			this.io.emit("client:update", this.game.ToNet());
		}, 1000 / 10);
	}

	setupSockets() {
		this.io.on("connection", (socket) => {
			console.log(socket.id);
			this.game.ClientConnected(socket.id);

			this.io.emit("client:connection", socket.id);

			socket.emit("client:load", this.game.Serialize());

			socket.on("join", () => {
				this.game.ClientJoin(socket.id);
				this.io.emit("client:join", socket.id);
			});

			socket.on("disconnect", () => {
				// this.game.ClientDisconnected(socket.id);
				// this.io.emit("client:disconnect", socket.id);
			});

			socket.on("update", (data: any) => {
				this.game.ClientUpdate(data, socket.id);
			});
		});
	}
}

new Server();
