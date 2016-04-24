window.addEventListener('DOMContentLoaded', () => {
    let canvas = <HTMLCanvasElement>document.getElementById('canvas');
    let engine = new BABYLON.Engine(canvas, true);

    // createScene function that creates and return the scene
    var createScene = function() {
        // create a basic BJS Scene object
        var scene = new BABYLON.Scene(engine);
        scene.enablePhysics(new BABYLON.Vector3(0,-10,0), new BABYLON.OimoJSPlugin());

        // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
        var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5,-10), scene);

        // target the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());

        // attach the camera to the canvas
        camera.attachControl(canvas, false);

        // create a basic light, aiming 0,1,0 - meaning, to the sky
        var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);

        // create a built-in "sphere" shape; its constructor takes 5 params: name, width, depth, subdivisions, scene
        var sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, scene);
        sphere.material = new BABYLON.StandardMaterial("t1", scene);
        sphere.material.alpha = 0.5;
        sphere.position.y = 5;
        sphere.setPhysicsState({impostor:BABYLON.PhysicsEngine.SphereImpostor, move:true, mass:1, friction:0.5, restitution:0.5});

        // create a built-in "ground" shape; its constructor takes the same 5 params as the sphere's one
        var ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene);
        ground.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, move:false});


        // return the created scene
        return scene;
    }

    // call the createScene function
    var scene = createScene();

    // run the render loop
    engine.runRenderLoop(() => {
        scene.render();

    });

    // the canvas/window resize event handler
    window.addEventListener('resize', () => {
        engine.resize();
    });
});
