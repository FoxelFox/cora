import {Scene, ISceneEventListener} from "../core/Scene";
import {GameObject} from "../core/GameObject";
import {Body} from "../core/component/Body";
import {Cannon} from "../core/PhysicService";
import {Model} from "../core/component/Model";
import * as THREE from "three";


interface ModelResource {
		geo: THREE.Geometry;
		mat: THREE.Material[];
}



export class Render implements ISceneEventListener {

	private rScene: THREE.Scene;
	private resDB: {[key: string]: ModelResource} = {};
	private objectDB: {[key: number]: {body: CANNON.Body, mesh: THREE.Mesh}} = {};

	constructor(private gScene: Scene) {

		this.createScene();

		// the canvas/window resize event handler
		window.addEventListener("resize", () => {
			// this.engine.resize();
		});

		gScene.AddListener(this);
	}

	private createScene () {
		this.rScene = new THREE.Scene();
		let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

		let renderer = new THREE.WebGLRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( renderer.domElement );

		// let geometry = new THREE.BoxGeometry( 1, 1, 1 );
		// let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
		// let cube = new THREE.Mesh( geometry, material );
		// scene.add( cube );

		this.rScene.add(new THREE.AmbientLight( 0x404040 ));


		camera.position.z = 5;

		let render = () => {
			requestAnimationFrame( render );

			for ( let id in this.objectDB) {
				const body = this.objectDB[id].body;
				let mesh = this.objectDB[id].mesh;

				mesh.position.x = body.position.x;
				mesh.position.y = body.position.y;
				mesh.position.z = body.position.z;
			}

			renderer.render(this.rScene, camera);
		};

		render();
	}

	load(data: string[]) {
		return new Promise((resolve, reject) => {
			let c = 0;
			for (let json of data) {
				const loader = new THREE.JSONLoader();
				loader.load(
					"/assets/" + json + ".json",
					(geo, mat) => {
						this.resDB[json] = {geo, mat};
						if (++c === data.length) {
							resolve();
						}
					}
				);
			}
		});
	}

	onSceneAdd(object: GameObject) {
		if (object.Has("Body") && object.Has("Model")) {
			const body = <Body>object.Get("Body");
			const model = <Model>object.Get("Model");
			const res = this.resDB[model.File];

			let mesh = new THREE.Mesh(res.geo, new THREE.MultiMaterial(res.mat));

			this.rScene.add(mesh);
			this.objectDB[object.ID] = {body: body.Body, mesh: mesh};
		}
	}

	onSceneRemove(object: GameObject) {

	}


}
