var B = BABYLON;
$(document).ready(function () {

	// Get the canvas element from our HTML below
	var canvas = document.getElementById("renderCanvas");

	if (!B.Engine.isSupported()) {
		window.alert('Browser not supported');
		return;
	}

	// Load B 3D engine
	var engine = new B.Engine(canvas, true);
	var scene = createScene(engine);

	// Attach the camera to the scene
	scene.activeCamera.attachControl(canvas);

	// Once the scene is loaded, just register a render loop to render it
	engine.runRenderLoop(function () {
		scene.render();
	});
});

function createScene(engine) {
	var scene = new B.Scene(engine);
	var camera = new B.ArcRotateCamera("Camera", 0, 0.8, 100, new B.Vector3.Zero(), scene);
	var light = new B.PointLight("Omni", new B.Vector3(0, 100, 100), scene);

	var box = B.Mesh.CreateBox("Box", 6.0, scene);
	var sphere = B.Mesh.CreateSphere("Sphere", 10.0, 3.0, scene);
	var plane = B.Mesh.CreatePlane("Plane", 50.0, scene);
	var cylinder = B.Mesh.CreateCylinder("Cylinder", 3, 3, 3, 6, scene, false);
	var torus = B.Mesh.CreateTorus("Torus", 5,1, 10, scene, false);

	box.position = new B.Vector3(-10, 0, 0);
	plane.position = new B.Vector3(25, 20, 20); 

	return scene;
}