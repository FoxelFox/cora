import {GameObject} from "./GameObject";

export class Scene {
    private objects: { [key: number]: GameObject; };

    constructor() {
        this.objects = [];
    }
 
    Add(object: GameObject) {
        this.objects[object.ID] = object;
    }

    Remove(object: GameObject) {
        object.delete();
        delete this.objects[object.ID];
    }
}
