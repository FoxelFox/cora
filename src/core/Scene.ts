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
			this.objects[id].Update();
		}
	}

	Serialize() {
		let data: any = {};
		for (const id in this.objects) {
			data[id] = this.objects[id].Serialize();
		}

		return data;
	}

	Deserialize(data: any) {

		for (const id in data) {
			this.Add(GameObject.Deserialize(data[id]));

		}
	}

	FromNet(data: any) {
		for (const id in data) {
			// if (this.objects[id])
				this.objects[id].FromNet(data[id]);
		}
	}

	ToNet(): any {
		let net: any = {};
		for (const id of Object.keys(this.objects)) {
			let onet = this.objects[id].ToNet();
			if (onet) {
				net[id] = onet;
			}
		}
		return net;
	}

	getObjectByID(id: string): GameObject {
		return this.objects[id];
	}

	getObjectMap() {
		return this.objects;
	}

}
