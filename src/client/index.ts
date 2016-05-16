import {Render} from "./RenderService";
import {Input} from "./InputService";
import {Game} from "../core/game";
import {Socket, connect } from "socket.io-client";

window.addEventListener("DOMContentLoaded", () => {
	const game = new Game();
	new Render(game.Scene);
	new Input();

	let socket = connect();

	socket.on("client:connection", (socketId: string) => {
		const localID = "/#" + socket.id;
		game.ClientConnected(socketId);
	});

	socket.on("update", (data: any) => {
		console.log("update");
	});

});
