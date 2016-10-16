import {Render} from "./RenderService";
import {Input} from "./InputService";
import {Game} from "../game/game";
import {Socket, connect } from "socket.io-client";

window.addEventListener("DOMContentLoaded", () => {
	const game = new Game(false);
	const render = new Render(game.Scene);
	const input = new Input();
	let isJoined: boolean = false;
	let updates: any[] = [];

	// update game before draw
	render.registerListener(() => {
		game.Update();
	});

	let socket = connect();

	socket.on("client:load", (data: any) => {
		const localID = data.socket;
		updates = [];
		render.load(data.game).then(() => {

			game.Deserialize(data.game);

			socket.emit("join");
			isJoined = true;
		});
	});

	socket.on("client:update", (data: any) => {
		if (isJoined) {
			if (updates) {
				// first handle updates that was recieved in loading time
				for (let update of updates) {
					game.FromNet(update);
				}
				updates = undefined;
			} else {
				game.FromNet(data);
				socket.emit("update", {
					Client: input.ToNet()
				});
			}
		} else {
			updates.push(data);
		}
	});



});
