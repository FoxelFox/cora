import {Render} from "./RenderService";
import {Input} from "./InputService";
import {Game} from "../core/game";
import {Socket, connect } from "socket.io-client";

window.addEventListener("DOMContentLoaded", () => {
	const game = new Game();
	const render = new Render(game.Scene);
	const input = new Input();

	let socket = connect();

	socket.on("client:connection", (socketId: string) => {
		const localID = "/#" + socket.id;
		game.ClientConnected(socketId);

	});

	socket.on("client:load", (data: string[]) => {
		render.load(data).then(() => {
			socket.emit("join");
		});
	});

	socket.on("client:join", (socketId: string) => {
		game.ClientJoin(socketId);
	});

	socket.on("client:update", (data: any) => {
		socket.emit("update", {
			Client: input.ToNet()
		});
		console.log("update");
	});

	setInterval(() => {
		game.Update();
	}, 10);

});
