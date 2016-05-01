import {GameObject} from "./GameObject";

export interface SceneEvent {
	case: string;
	object: GameObject;
}

export class Scene {
	private objects: { [key: number]: GameObject; };
	private listeners: Array<(event: SceneEvent) => void>;

	constructor() {
		this.objects = [];
		this.listeners = [];
	}

	Add(object: GameObject) {
		this.objects[object.ID] = object;

		const e = { case: "add", object: object };
		for (const listener of this.listeners) {
			listener(e);
		}
	}

	Remove(object: GameObject) {
		const e = { case: "remove", object: object };
		for (const listener of this.listeners) {
			listener(e);
		}
		object.delete();
		delete this.objects[object.ID];
	}

	AddListener(callback: (event: SceneEvent) => void) {
		this.listeners.push(callback);
	}

}
