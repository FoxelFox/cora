import {GameObject} from "./GameObject";
import {Service} from "./Service";

export enum SceneEventType {
	Add, Remove
}

export interface ISceneEventListener {
	onSceneAdd(object: GameObject): void;
	onSceneRemove(id: string): void;
}

export interface SceneEvent {
	case: SceneEventType;
	object: GameObject;
}

export class Scene implements Service {
	private objects: { [key: string]: GameObject; };
	private listeners: ISceneEventListener[];
	private events: any[] = [];

	constructor() {
		this.objects = {};
		this.listeners = [];
	}

	Add(object: GameObject) {
		this.events.push({
			type: "add",
			object: object.Serialize()
		});

		object.Start();
		this.objects[object.ID] = object;

		for (const listener of this.listeners) {
			listener.onSceneAdd(object);
		}
	}

	Remove(id: string) {
		this.events.push({
			type: "add",
			id: id
		});

		for (const listener of this.listeners) {
			listener.onSceneRemove(id);
		}
		this.objects[id].delete();
		delete this.objects[id];
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
		for (let event of data.events) {
			switch (event.type) {

				case "add":
					this.Add(GameObject.Deserialize(event.object));
					break;
				case "remove":
					this.Remove(event.id);
					break;
			}

		}
		for (const id in data.objects) {
			this.objects[id].FromNet(data[id]);
		}
	}

	ToNet(): any {
		let net: any = {
			events: this.events,
			objects: {}
		};
		for (const id of Object.keys(this.objects)) {
			let onet = this.objects[id].ToNet();
			if (onet) {
				net.objects[id] = onet;
			}
		}

		this.events = [];

		return net;
	}

	getObjectByID(id: string): GameObject {
		return this.objects[id];
	}

	getObjectMap() {
		return this.objects;
	}

}
