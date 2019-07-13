window.addEventListener("DOMContentLoaded", function() {
  // get canvas element
  const canvas = document.getElementById("renderCanvas");
  // load Babylon 3D engine
  const engine = new BABYLON.Engine(canvas, true);

  const createScene = () => {
    // Create a basic BJS Scene object.
    let scene = new BABYLON.Scene(engine);

    // Add a camera to the scene and attach it to the canvas
    let camera = new BABYLON.ArcRotateCamera(
      "Camera",
      Math.PI / 2,
      Math.PI / 2,
      2,
      new BABYLON.Vector3(0, 1, 5),
      scene
    );
    camera.attachControl(canvas, true);

    // Add lights to the scene
    let light1 = new BABYLON.HemisphericLight(
      "light1",
      new BABYLON.Vector3(1, 1, 0),
      scene
    );
    let light2 = new BABYLON.PointLight(
      "light2",
      new BABYLON.Vector3(0, 1, -1),
      scene
    );

    let ground = BABYLON.MeshBuilder.CreateGround(
      "ground",
      { width: 2, height: 3 },
      scene
    );

    let myBox = BABYLON.MeshBuilder.CreateBox(
      "myBox",
      { height: 1, width: 2, depth: 0.5 },
      scene
    );
    myBox.position = new BABYLON.Vector3(1, 1, -2);
    myBox.rotation = new BABYLON.Vector3(0, 45, 90);

    // Add and manipulate meshes in the scene
    let sphere = BABYLON.MeshBuilder.CreateSphere(
      "sphere",
      { diameter: 2 },
      scene
    );
    sphere.position = new BABYLON.Vector3(2, 1, 1);

    // Add line
    let myPoints = [
      new BABYLON.Vector3(0, 0, 0),
      new BABYLON.Vector3(0, 1, 1),
      new BABYLON.Vector3(0, 1, 0)
    ];

    BABYLON.MeshBuilder.CreateLines("lines", { points: myPoints }, scene);

    let myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);
    myMaterial.emissiveColor = new BABYLON.Color3(0, 0, 1);

    myBox.material = myMaterial;

    // Return the created scene.
    return scene;
  };

  const scene = createScene();

  engine.runRenderLoop(() => {
    scene.render();
  });

  window.addEventListener("resize", () => {
    engine.resize();
  });
});
