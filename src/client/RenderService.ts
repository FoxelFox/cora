import {SceneEvent, Scene} from "../core/Scene";
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
		var scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

		var renderer = new THREE.WebGLRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( renderer.domElement );

		var geometry = new THREE.BoxGeometry( 1, 1, 1 );
		var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
		var cube = new THREE.Mesh( geometry, material );
		scene.add( cube );

		camera.position.z = 5;

		var render = function () {
			requestAnimationFrame( render );

			cube.rotation.x += 0.1;
			cube.rotation.y += 0.1;

			renderer.render(scene, camera);
		};

		render();
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
