import {GameObject} from "./GameObject";
import {Service} from "./Service";

export enum SceneEventType {
	Add, Remove
}

export interface ISceneEventListener {
	onSceneAdd(object: GameObject): void;
	onSceneRemove(object: GameObject): void;
}

export interface SceneEvent {
	case: SceneEventType;
	object: GameObject;
}

export class Scene implements Service {
	private objects: { [key: string]: GameObject; };
	private listeners: ISceneEventListener[];

	constructor() {
		this.objects = {};
		this.listeners = [];
	}

	Add(object: GameObject) {
		object.Start();
		this.objects[object.ID] = object;

		for (const listener of this.listeners) {
			listener.onSceneAdd(object);
		}
	}

	Remove(object: GameObject) {

		for (const listener of this.listeners) {
			listener.onSceneRemove(object);
		}
		object.delete();
		delete this.objects[object.ID];
	}

	AddListener(callback: ISceneEventListener) {
		this.listeners.push(callback);
	}

	Update() {
		for (const id of Object.keys(this.objects)) {

		}
	}

}
