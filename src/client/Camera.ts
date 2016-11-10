export class Camera {

	private cam: THREE.Camera;

	constructor() {
		this.cam = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	}

	public setOrigin(origin: any) {

	}

}
