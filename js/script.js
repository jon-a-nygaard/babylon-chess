/*
* Next tutorial nr: 7.
* TODO: Clean up and section the code.
*/


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
	var posCameraTarget = new B.Vector3(0, 20, 0),
		posSphere = posCameraTarget,
		posLight = new B.Vector3(0, 100, 100),
		scene = new B.Scene(engine),
		textureBill = new B.Texture("http://upload.wikimedia.org/wikipedia/commons/b/bd/Dts_news_bill_gates_wikipedia.JPG", scene),
		cameraRotate = new B.ArcRotateCamera("Camera", 0, 0.8, 100, posCameraTarget, scene),
		cameraFree = new B.FreeCamera("FreeCamera", posLight, scene),
		//lightPoint = new B.PointLight("Omni", posLight, scene),
		lightSpot = new B.SpotLight("SpotLight", new B.Vector3(0, 30, 0), new B.Vector3(0, -1, 0), 0.8, 2, scene);

	//Set light settings
	lightSpot.diffuse = new B.Color3(1, 0, 0);
	lightSpot.specular = new B.Color3(1, 1, 1);

	// Set scene camera
	scene.activeCamera = cameraFree;
	cameraFree.speed = 20;
	cameraFree.lockedTarget = posCameraTarget;

	var standMat = new B.StandardMaterial("texture1", scene),
		matEmissive = new B.StandardMaterial("texture2", scene),
		matEmissiveOrange =  new B.StandardMaterial("solid1", scene);

	// Set textures
	standMat.diffuseTexture = textureBill;
	standMat.backFaceCulling = false;
	matEmissive.emissiveTexture = textureBill;
	matEmissiveOrange.emissiveColor = new B.Color3(1, .2, .7);

	var box = B.Mesh.CreateBox("Box", 6.0, scene),
		sphere = B.Mesh.CreateSphere("Sphere", 10.0, 3.0, scene),
		plane = B.Mesh.CreatePlane("Plane", 50.0, scene),
		cylinder = B.Mesh.CreateCylinder("Cylinder", 3, 3, 3, 6, scene, false),
		torus = B.Mesh.CreateTorus("Torus", 5,1, 10, scene, false);

	// Set positions
	box.position = new B.Vector3(-10, 10, 0);	
	sphere.position = posLight;
	plane.position = new B.Vector3.Zero(); 
	torus.position = new B.Vector3(10, 0, 10);
	cylinder.position = new B.Vector3(5, 0, 2);

	// Set scaling and rotation
	sphere.scaling.y = 0.4;
	sphere.rotation.x = -Math.PI/4;
	plane.rotation.x = Math.PI/2;
	box.rotation.x = Math.PI/4;
	box.rotation.y = Math.PI/4;
	torus.rotation.x = Math.PI/2;
	cylinder.rotation.x = Math.PI/2;
	
	// Set material
	plane.material = cylinder.material = standMat;
	box.material = matEmissive;
	sphere.material = matEmissiveOrange;

	return scene;
}