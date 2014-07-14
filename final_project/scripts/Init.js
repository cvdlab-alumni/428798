var controls;
var FPenabled = false;

var modelsPath = "assets/models/"
var imagesPath = "assets/textures/";
var videosPath = "assets/media/videos/";
var soundsPath = "assets/media/sounds/"

function init() {
	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
	camera.up = new THREE.Vector3(0, 1, 0);
	camera.position.set(-60, 67, 0);
	scene.add(camera);
	camera.lookAt(new THREE.Vector3(0, 1000, 0))

	camera_mirror = new THREE.CubeCamera(0.1, 100, 512);
	camera_mirror.position.set(14, 12, -33); 
	scene.add(camera_mirror);

	trackballControls = new THREE.TrackballControls(camera);


	loadOBJModel('walls.obj');
	loadOBJModel('floor.obj');

	dwelling = new THREE.Object3D();

	var windows = mkAllWindows();
	var doors = mkAllDoors();
	var innerWalls = mkInnerTexturedWalls();
	var outerWalls = mkOuterTexturedWalls();
	var floorings = mkAllFloorings();
	var balconies = mkBalconies();
	var entrance_landing = mkEntranceLanding(3, 12.4, 'mattonelle_balcone.jpg', 1, 1); 
	var furniture = mkFurniture();
	var ceiling = mkCeiling(6.2, 12.4, 2.6+0.05/16);

	dwelling.add(windows);
	dwelling.add(doors);
	dwelling.add(innerWalls);
	dwelling.add(outerWalls);
	dwelling.add(floorings);
	dwelling.add(balconies);
	dwelling.add(entrance_landing);
	dwelling.add(furniture);
	dwelling.add(ceiling);
	dwelling.rotation.x = -Math.PI/2;
	dwelling.position.set(-31, 0, 62);
	dwelling.scale.set(10, 10, 10);
	scene.add(dwelling);

	var daySkybox = mkSkybox("dawnmountain-", ".png");
	var nightSkybox = mkSkybox("night-", ".jpg");
	scene.add(daySkybox);

	var ambientLight = new THREE.AmbientLight(0x404040);
	scene.add(ambientLight);

	var soundtrack = new Sound(['TheSims3_MainTheme.mp3'], 0, 0.05, false, Infinity);
	scene.add(soundtrack);
	soundtrack.play();

      
	rayCaster = new THREE.Raycaster();
	rayCaster.ray.direction.set(0, -1, 0);
	projector = new THREE.Projector();
	function onDocumentMouseDown(event) {
		event.preventDefault();
		if (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) {
			var vector = new THREE.Vector3(0, 0, 2);
			projector.unprojectVector(vector, camera);
			var raycaster = new THREE.Raycaster(vector, controls.getDirection(new THREE.Vector3(0, 0, 0)).clone());
		} else {
			var vector = new THREE.Vector3(( event.clientX / window.innerWidth ) * 2 - 1, -( event.clientY / window.innerHeight ) * 2 + 1, 0.5);
			projector.unprojectVector(vector, camera);

			var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
			var intersects = raycaster.intersectObjects(toIntersect);
		}
		var intersects = raycaster.intersectObjects(toIntersect);
		if (intersects.length > 0) {
			intersects[0].object.interact && intersects[0].object.interact();
		}
	}
	document.addEventListener('mousedown', onDocumentMouseDown, false);


	var controlGUI = new function() {
		this.FPS = startFPS;
		this.enableTrackball = true;
		this.showMirror = false;
		this.switchLights = true;
		this.night = false;
		this.soundtrack = true;
	};

	var gui = new dat.GUI();
	gui.add(controlGUI, "FPS");
	gui.add(controlGUI, "enableTrackball");
	gui.add(controlGUI, "showMirror").onChange( function (e) {
		furniture.mirror.visible = e;
	});
	gui.add(controlGUI, "switchLights").onChange( function (e) {
		if (e) {
			furniture.lamps.switchLightsOn();
		} else {
			furniture.lamps.switchLightsOff();
		}
	});
	gui.add(controlGUI, "night").onChange( function (e) {
		if (e) {
			scene.remove(daySkybox);
			scene.remove(ambientLight);
			scene.add(nightSkybox);
		} else {
			scene.remove(nightSkybox);
			scene.add(daySkybox);
			scene.add(ambientLight);
		}
	});
	gui.add(controlGUI, "soundtrack").onChange( function (e) {
		if (e) {
			soundtrack.play();
		} else {
			soundtrack.pause();
		}	
	});

	
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(0xffffff);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	render();
	function render() {
		// trackball controll
		if (controlGUI.enableTrackball) {
			trackballControls.update();
		}

		// first person controls
		if (FPenabled === true) {
			computeFPControls();
		}

		// video
		if (video.readyState === video.HAVE_ENOUGH_DATA) {
			video_imageContext.drawImage(video, 0, 0);
			if (video_texture) 
				video_texture.needsUpdate = true;
			video.updateVolume();
		}

		// sounds volume
		for (var i = 0; i < soundsToUpdate.length; i++) {
			soundsToUpdate[i].updateVolume();
		}

		// webcam
		if (webcam_video.readyState === webcam_video.HAVE_ENOUGH_DATA) {
			webcam_videoImageContext.drawImage(webcam_video, 0, 0, webcam_videoImage.width, webcam_videoImage.height);
			if (webcam_videoTexture) 
				webcam_videoTexture.needsUpdate = true;
		}
		if (webcam_logo.readyState === webcam_logo.HAVE_ENOUGH_DATA) {
			webcam_logo_imageContext.drawImage(webcam_logo, 0, 0, webcam_logo_image.width, webcam_logo_image.height);
			if (webcam_logo_texture) 
				webcam_logo_texture.needsUpdate = true;
		}

		// mirror
		if (controlGUI.showMirror) {
			camera_mirror.visible = false;
			camera_mirror.updateCubeMap(renderer, scene);
			camera_mirror.visible = true;
		}

		// tweens
		TWEEN.update();
		
		requestAnimationFrame(render);
  		renderer.render(scene, camera);
	}

	window.addEventListener('resize', onWindowResize, false);
}


function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}


function computeFPControls() {
	controls.isOnObject(false);
	rayCaster.ray.origin.copy(controls.getObject().position);
	rayCaster.near = 0.01;
	rayCaster.far = 10;
	rayCaster.precision = 1;
	var intersections = rayCaster.intersectObjects(toIntersect);
	if (intersections.length > 0) {
		var distance = intersections[0].distance;
		if (distance > 0 && distance < 100) {
			controls.isOnObject(true);
		}
	}
	controls.update();
}

