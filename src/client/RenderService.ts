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


		let renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.cullFace = THREE.CullFaceFrontBack;
		renderer.gammaInput = true;
		renderer.gammaOutput = true;

		document.body.appendChild( renderer.domElement );

		/// Light
		let hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
		hemiLight.color.setHSL( 0.6, 1, 0.6 );
		hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
		hemiLight.position.set( 0, 500, 0 );
		this.rScene.add( hemiLight );

		//

		let dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
		dirLight.color.setHSL( 0.1, 1, 0.95 );
		dirLight.position.set( -1, 1.75, 1 );
		dirLight.position.multiplyScalar( 50 );
		this.rScene.add( dirLight );

		dirLight.castShadow = true;

		dirLight.shadowMapWidth = 2048;
		dirLight.shadowMapHeight = 2048;

		var d = 50;

		dirLight.shadowCameraLeft = -d;
		dirLight.shadowCameraRight = d;
		dirLight.shadowCameraTop = d;
		dirLight.shadowCameraBottom = -d;

		dirLight.shadowCameraFar = 3500;
		dirLight.shadowBias = -0.0001;


		//////////////

		// fog
		this.rScene.fog = new THREE.Fog( 0xffffff, 1, 5000 );
		this.rScene.fog.color.setHSL( 0.6, 0, 1 );
		renderer.setClearColor( this.rScene.fog.color );
		//


		// ground
		var groundGeo = new THREE.PlaneBufferGeometry( 10000, 10000 );
		var groundMat = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x050505 } );
		groundMat.color.setHSL( 0.095, 1, 0.75 );

		var ground = new THREE.Mesh( groundGeo, groundMat );
		ground.receiveShadow = true;
		ground.position.y = -33;
		this.rScene.add( ground );
		//////////

		camera.position.z = 10;
		camera.position.y = -20;

		camera.rotateX(1);


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
			mesh.castShadow = true;
			this.rScene.add(mesh);
			this.objectDB[object.ID] = {body: body.Body, mesh: mesh};
		}
	}

	onSceneRemove(object: GameObject) {

	}


}
