import {Render} from "./RenderService";
import {Game} from "../core/game";

window.addEventListener("DOMContentLoaded", () => {
	const game = new Game();
	new Render(game.Scene);
});
