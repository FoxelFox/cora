import {Render} from "./RenderService";
import {Game} from "../core/game";
import {Socket, connect } from "socket.io-client";

window.addEventListener("DOMContentLoaded", () => {
	const game = new Game();
	new Render(game.Scene);

	let socket = connect();

	socket.on("client:connection", (socketId: string) => {
		const localID = "/#" + socket.id;
		console.log(localID);
	});

});
