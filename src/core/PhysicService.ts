import {Scene, ISceneEventListener} from "./Scene";
import {GameObject} from "./GameObject";

export const Cannon = require("../../node_modules/cannon/src/Cannon");

export class PhysicService implements ISceneEventListener {
	constructor(private gScene: Scene) {
		gScene.AddListener(this);
	}

	onSceneAdd(object: GameObject) {

	}

	onSceneRemove(object: GameObject) {

	}

	update() {

	}
}
