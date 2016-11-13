import {Body} from "../core/component/Body";

export class Camera {

	private cam: THREE.Camera;
	private origin: Body;

	constructor() {
		this.cam = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
		this.cam.position.z = 10;
		this.cam.position.y = -20;
		this.cam.rotateX(1);
	}

	public setOrigin(origin: Body) {
		this.origin = origin;
	}

	get Camera () {
		return this.cam;
	}

}
