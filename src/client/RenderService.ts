import {SceneEvent, Scene} from "../core/Scene";
import {GameObject} from "../core/GameObject";
import {Body} from "../core/component/Body";

export class Render {

	private canvas: HTMLCanvasElement;
	private engine: BABYLON.Engine;
	private rScene: BABYLON.Scene;

	constructor(private gScene: Scene) {
		this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
		this.engine = new BABYLON.Engine(this.canvas, true);
		this.rScene = this.createScene();
		// run the render loop
		this.engine.runRenderLoop(() => {
			this.rScene.render();
		});

		// the canvas/window resize event handler
		window.addEventListener("resize", () => {
			this.engine.resize();
		});

		gScene.AddListener((event: SceneEvent) => {
			this.sceneChanged(event);
		});
	}

	private createScene (): BABYLON.Scene {
		// create a basic BJS Scene object
		let rScene = new BABYLON.Scene(this.engine);

		// create a FreeCamera, and set its position to (x:0, y:5, z:-10)
		let camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), rScene);

		// target the camera to rScene origin
		camera.setTarget(BABYLON.Vector3.Zero());

		// attach the camera to the canvas
		camera.attachControl(this.canvas, false);

		// create a basic light, aiming 0,1,0 - meaning, to the sky
		let light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), rScene);

		// create a built-in "sphere" shape; its constructor takes 5 params: name, width, depth, subdivisions, rScene
		let sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, rScene);
		sphere.material = new BABYLON.StandardMaterial("t1", rScene);
		sphere.material.alpha = 0.5;
		sphere.position.y = 5;

		// create a built-in "ground" shape; its constructor takes the same 5 params as the sphere's one
		let ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, rScene);

		// return the created rScene
		return rScene;
	}

	sceneChanged (event: SceneEvent) {
		switch (event.case) {
			case "add": this.add(event.object); break;
			case "remove": this.remove(event.object); break;
			default: break;
		}
	}

	private add(object: GameObject) {
		if (object.Has("Body")) {
			const body = <Body>object.Get("Body");
		}
	}

	private remove(object: GameObject) {

	}
}
