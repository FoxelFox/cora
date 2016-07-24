import {Render} from "./RenderService";
import {Input} from "./InputService";
import {Game} from "../game/game";
import {Socket, connect } from "socket.io-client";

window.addEventListener("DOMContentLoaded", () => {
	const game = new Game(false);
	const render = new Render(game.Scene);
	const input = new Input();

	let socket = connect();

	socket.on("client:connection", (socketId: string) => {
		const localID = "/#" + socket.id;
		game.ClientConnected(socketId);

	});

	socket.on("client:load", (data: any) => {
		render.load(data).then(() => {
			socket.emit("join");
		});
	});

	socket.on("client:join", (socketId: string) => {
		game.ClientJoin(socketId);
	});

	socket.on("client:update", (data: any) => {
		game.FromNet(data);
		socket.emit("update", {
			Client: input.ToNet()
		});
	});

	setInterval(() => {
		game.Update();
	}, 10);

});
