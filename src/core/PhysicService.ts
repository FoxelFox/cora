import {Scene, ISceneEventListener} from "./Scene";
import {GameObject} from "./GameObject";
import {Body} from "./component/Body";

export const Cannon = require("../../node_modules/cannon/src/Cannon");

export class PhysicService implements ISceneEventListener {

	private world: CANNON.World;

	constructor(private gScene: Scene) {
		gScene.AddListener(this);
		this.world = new Cannon.World();
		this.world.gravity.set(0.0, 0.0, -9.82);
		this.world.broadphase = new Cannon.NaiveBroadphase();
	}

	onSceneAdd(object: GameObject) {
		if (object.Has("Body")) {
			const body = <Body>object.Get("Body");
			this.world.addBody(body.Body);
		}
	}

	onSceneRemove(object: GameObject) {

	}

	update() {
		this.world.step(0.1);
	}
}
