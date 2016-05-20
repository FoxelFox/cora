import {Scene, SceneEvent, ISceneEventListener} from "./Scene";

export const Cannon = require("../../node_modules/cannon/src/Cannon");

export class PhysicService implements ISceneEventListener {
	constructor(private gScene: Scene) {

	}

	onSceneAdd(event: SceneEvent) {

	}

	onSceneRemove(event: SceneEvent) {

	}

	update() {

	}
}
