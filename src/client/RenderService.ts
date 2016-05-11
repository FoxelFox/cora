import {SceneEvent, Scene, SceneEventType} from "../core/Scene";
import {GameObject} from "../core/GameObject";
import {Body} from "../core/component/Body";
import * as THREE from "three";

export class Render {

	private rScene: THREE.Scene;

	constructor(private gScene: Scene) {

		this.createScene();

		// the canvas/window resize event handler
		window.addEventListener("resize", () => {
			// this.engine.resize();
		});

		gScene.AddListener((event: SceneEvent) => {
			this.sceneChanged(event);
		});
	}

	private createScene () {
		let scene = new THREE.Scene();
		let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

		let renderer = new THREE.WebGLRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( renderer.domElement );

		let geometry = new THREE.BoxGeometry( 1, 1, 1 );
		let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
		let cube = new THREE.Mesh( geometry, material );
		scene.add( cube );

		camera.position.z = 5;

		let render = function () {
			requestAnimationFrame( render );

			cube.rotation.x += 0.1;
			cube.rotation.y += 0.1;

			renderer.render(scene, camera);
		};

		render();
	}

	sceneChanged (event: SceneEvent) {
		switch (event.case) {
			case SceneEventType.Add: this.add(event.object); break;
			case SceneEventType.Remove: this.remove(event.object); break;
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
