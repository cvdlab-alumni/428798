
function mkPictureCanvas(width, height, picture) {
	var texture = THREE.ImageUtils.loadTexture(imagesPath + picture);

	var planeGeometry = new THREE.PlaneGeometry(width, height);
    var planeMaterial = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide });
    planeMaterial.map = texture;

    var planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    return planeMesh;
}

function mkPictureFrame(width, height, frmWidth, frmDepth, picture) {
	var framehook = new THREE.Object3D();
	var picFrame = new THREE.Object3D();

	var vertCompGeom = new THREE.BoxGeometry(frmDepth, frmWidth, height);
	var orizCompGeom = new THREE.BoxGeometry(frmDepth, width+frmWidth*2, frmWidth);
	var rightHandFrame = mkTexturedMesh(vertCompGeom, 'wood.jpg');
	var lefthandFrame = mkTexturedMesh(vertCompGeom, 'wood.jpg');
	var topFrame = mkTexturedMesh(orizCompGeom, 'wood.jpg');
	var bottomFrame = mkTexturedMesh(orizCompGeom, 'wood.jpg');
	var canvas = mkPictureCanvas(width, height, picture);

	rightHandFrame.position.set(0, (width+frmWidth)/2, 0);
	lefthandFrame.position.set(0, -(width+frmWidth)/2, 0);
	topFrame.position.set(0, 0, (height+frmWidth)/2);
	bottomFrame.position.set(0, 0, -(height+frmWidth)/2);
	canvas.position.set(frmDepth/2, 0, 0);
	canvas.rotation.y = -Math.PI/2;
	canvas.rotation.z = -Math.PI/2;
	picFrame.position.set(0, 0, -(height+frmWidth)/2);

	picFrame.add(rightHandFrame);
	picFrame.add(lefthandFrame);
	picFrame.add(topFrame);
	picFrame.add(bottomFrame);
	picFrame.add(canvas);
	framehook.add(picFrame);

	framehook.canvas = canvas;
	canvas.framehook = framehook;
	animatePicture(canvas);

	return framehook;
}

function mkPictureFrames() {
	var picFrames = new THREE.Object3D();

	var livingroomPicFrame = mkPictureFrame(1.7, 1, 0.05, 0.03, "kandinsky.jpg");

	picFrames.add(livingroomPicFrame);

	livingroomPicFrame.position.set(4, 0.33, 2.2);
	livingroomPicFrame.rotation.z = -Math.PI/2;

	return picFrames;
}


function mkTV_videoScreen() {
    loadVideo(video, "Big_Buck_Bunny_small.ogv");
    var videoGeometry = new THREE.PlaneGeometry(1, 0.5, 4, 4);
	var videoMaterial = new THREE.MeshBasicMaterial({map: video_texture, overdraw: true});
	var videoScreen = new THREE.Mesh(videoGeometry, videoMaterial);	
	videoScreen.visible = false;

    videoScreen.video = video;
    animateTV_videoScreen(videoScreen);

    return videoScreen;
}


function mkTV_remoteControl(controlledScreen) {
	var rcAvatarBox = new THREE.Mesh(
			new THREE.BoxGeometry(0.1, 0.3, 0.1),
			new THREE.MeshBasicMaterial());
	rcAvatarBox.visible = false;

	loadOBJMTLModels(rcAvatarBox, [ 
		['livingroom/remote_control/remote', [
			scale(0.03, 0.03, 0.03),  
			rotate(1,Math.PI/2), rotate(2,-Math.PI/2)]]
	]);

	animateTV_remoteControl(rcAvatarBox, controlledScreen);
	return rcAvatarBox;
}


function mkClock() {
	function animationProcessing(object) {
		var hourHand = object.children[0];
		var minuteHand = object.children[1];
		var hourHand_hook = new THREE.Object3D();
		var minuteHand_hook = new THREE.Object3D();

		hourHand_hook.position.set(3, 189.5, 0);
		hourHand.rotation.z = -Math.PI/2-11*Math.PI/60;
		hourHand.position.set(-157.5, 105.8, 0);
		minuteHand_hook.position.set(3, 189.5, 0);
		minuteHand.rotation.z = -10*Math.PI/60;
		minuteHand.position.set(-97.5,-162, 0);

		object.remove(object.children[0]);
		object.remove(object.children[0]);

		hourHand_hook.add(hourHand);
		minuteHand_hook.add(minuteHand);
		object.add(hourHand_hook);
		object.add(minuteHand_hook);

		object.hourHand_hook = hourHand_hook;
		object.minuteHand_hook = minuteHand_hook;

		animateClock(object);
	}

	loadOBJMTLModels(dwelling, [ 
		['kitchen/clock/clock', [
			scale(0.01, 0.01, 0.01), 
			move(4, 4.35, -0.3), 
			rotate(1, Math.PI/2), 
			rotate(2, Math.PI),
			animationProcessing]]
	]);
}


function mkCooker() {
	var cooker_avatarBox = new THREE.Mesh(
			new THREE.BoxGeometry(0.6, 0.5, 0.05),
			new THREE.MeshBasicMaterial());
	cooker_avatarBox.visible = false;

	var fire1 = mkFire(50, 0.06, 0.5);
	var fire2 = mkFire(50, 0.06, 0.5);
	var fire3 = mkFire(50, 0.06, 0.5);
	var fire4 = mkFire(50, 0.06, 0.5);

	fire1.position.set(0.14, 0.12, -1.54);
	fire2.position.set(0.14, -0.12, -1.54);
	fire3.position.set(-0.2, 0.12, -1.54);
	fire4.position.set(-0.2, -0.12, -1.54);
	
	cooker_avatarBox.add(fire1);
	cooker_avatarBox.add(fire2);
	cooker_avatarBox.add(fire3);
	cooker_avatarBox.add(fire4);

	cooker_avatarBox.fire1 = fire1;
	cooker_avatarBox.fire2 = fire2;
	cooker_avatarBox.fire3 = fire3;
	cooker_avatarBox.fire4 = fire4;

	animateCooker(cooker_avatarBox);
	return cooker_avatarBox;
}


function mkMirror(width, height) {
	var mirrorGeometry = new THREE.PlaneGeometry(width, height, 10, 10);
	var mirrorMaterial = new THREE.MeshPhongMaterial({
		envMap: camera_mirror.renderTarget,
		emissive: '#FFFFFF',
		shininess: 100,
	});
	var mirror = new THREE.Mesh(mirrorGeometry, mirrorMaterial);
	mirror.visible = false;

	return mirror;
}


function mkToilet() {
	function animationProcessing(object) {
		var cover = object.children[0];
		var hook = new THREE.Object3D();

		hook.position.set(5, 40, -20);
		cover.position.set(-5, -40, 18);

		object.remove(cover);
		object.add(hook);
		hook.add(cover);

		animateToiletCover(cover);
	}

	loadOBJMTLModels(dwelling, [ 
		['bathroom/toilet/toilet', [
			scale(0.01, 0.01, 0.01), 
			move(5.2, 7.85, 0.1), 
			rotate(1, Math.PI/2), 
			rotate(2, Math.PI),
			animationProcessing]]
	]);
}


function mkToiletFlushButton() {
	var toiletFlush = new THREE.Object3D();
	var toiletFlush_avatarBox = new THREE.Mesh(
		new THREE.BoxGeometry(0.07, 0.05, 0.07),
		new THREE.MeshPhongMaterial()
	);
	toiletFlush_avatarBox.visible = false;

	var cylinder1_geometry = new THREE.CylinderGeometry(0.03, 0.03, 0.01, 36);
	var cylinder2_geometry = new THREE.CylinderGeometry(0.01, 0.01, 0.015, 36);
	var metalMaterial = new THREE.MeshPhongMaterial({
		color: '#808080',
		shininess: 200,
		specular: '#FFFFFF',
		metal: true
	});

	var cylinder1 = new THREE.Mesh(cylinder1_geometry, metalMaterial);
	var cylinder2 = new THREE.Mesh(cylinder2_geometry, metalMaterial);
	cylinder2.position.set(0, 0.01, 0);

	toiletFlush.add(toiletFlush_avatarBox)
	toiletFlush.add(cylinder1);
	toiletFlush.add(cylinder2);

	toiletFlush_avatarBox.button = cylinder2;

	animateToiletFlushButton(toiletFlush_avatarBox);
	return toiletFlush;
}


function mkComputer_videoScreen() {
	var computer_videoGeometry = new THREE.PlaneGeometry(0.48, 0.31, 4, 4);
	var computer_videoMaterial = new THREE.MeshBasicMaterial({map: webcam_videoTexture, overdraw: true});
	var computer_videoScreen = new THREE.Mesh(computer_videoGeometry, computer_videoMaterial);	
	computer_videoScreen.visible = false;

    animateComputer_videoScreen(computer_videoScreen);
    return computer_videoScreen;
}


function mkLightSwitch(targetLamps, switchProcessing) {
	function animationProcessing(object) {
		var oLetter = object.children[0];
		var nLetter = object.children[1];
		var switchButton = object.children[2];
		var mask = object.children[3];
		var switchButton_hook = new THREE.Object3D();

		object.remove(oLetter);
		object.remove(nLetter);
		object.remove(switchButton);

		switchButton.add(oLetter);
		switchButton.add(nLetter);
		switchButton_hook.add(switchButton);
		object.add(switchButton_hook);

		switchButton.material.color = "#000000"
		switchButton.position.set(0, -1.6, 0);
		switchButton_hook.position.set(0, 1.6, 0);

		object.switchButton_hook = switchButton_hook;

		animateLightSwitch(mask, targetLamps);
	}

	switchProcessing.push(animationProcessing);
	loadOBJMTLModels(dwelling, [ 
		['dwelling/lightswitch2/lightswitch2', switchProcessing]
	]);
}


function mkLightSwitches(lamps) {
	var livingroomLightSwitch = mkLightSwitch(
		[lamps.lampLivingroom1, lamps.lampLivingroom2], 
		[scale(0.05, 0.05, 0.05), move(1.6, 0.31, 1.1), rotate(1, Math.PI/2), rotate(2, Math.PI/2)]
	);

	var hallwayLightSwitch = mkLightSwitch(
		[lamps.lampHallway],
		[scale(0.05, 0.05, 0.05), move(1.78, 5, 1.1), rotate(1, Math.PI/2), rotate(3, Math.PI)]
	);

	var kitchenLightSwitch = mkLightSwitch(
		[lamps.lampKitchen],
		[scale(0.05, 0.05, 0.05), move(1.92, 6.5, 1.1), rotate(1, Math.PI/2)]
	);

	var bathroomLightSwitch = mkLightSwitch(
		[lamps.lampBathroom],
		[scale(0.05, 0.05, 0.05), move(1.92, 8, 1.1), rotate(1, Math.PI/2)]
	);

	var bedroomLightSwitch = mkLightSwitch(
		[lamps.lampBedroom1, lamps.lampBedroom2],
		[scale(0.05, 0.05, 0.05), move(1.6, 9.8, 1.1), rotate(1, Math.PI/2), rotate(2, Math.PI/2)]
	);
}


function loadAllStaticFurniture() {
	loadOBJMTLModels(dwelling, [ 
		['livingroom/Pillar/Pillar-B', [scale(0.1, 0.27, 0.1), move(1.88, 0.35, 1.35), rotate(1, Math.PI/2)]],
		['livingroom/Pillar/Pillar-B', [scale(0.1, 0.27, 0.1), move(1.91, 4.18, 1.35), rotate(1, Math.PI/2)]],
		['livingroom/contemp_living_room/contemp_living_room', [scale(0.0113, 0.01, 0.01), move(4, 4.2, 0.1), rotate(1, Math.PI/2)]],
		['livingroom/burlap_sofa/burlap_sofa', [scale(0.017, 0.012, 0.01), move(3.8, 0.75, 0.5), rotate(1,Math.PI/2), rotate(2, Math.PI)]],
		['livingroom/salontafel/salontafel', [scale(0.02, 0.01, 0.007), move(3, 2.3, 0.1), rotate(1, Math.PI/2)]],

		['kitchen/fridge/fridge', [scale(0.01, 0.01, 0.012), move(-2.77, 8.42, 0.1), rotate(1, Math.PI/2)]],
		['kitchen/sink/sink', [scale(0.01, 0.01, 0.012), move(2.53, 5.05, 0.1), rotate(1, Math.PI/2)]],
		['kitchen/cooker/cooker', [scale(0.01, 0.01, 0.012), move(4.1, 6.73, 0.1), rotate(1, Math.PI/2)]],
		['kitchen/drawers/drawers', [scale(0.013, 0.01, 0.012), move(4.36, 9.01, 0.1), rotate(1, Math.PI/2)]],
		['kitchen/drawers/drawers', [scale(0.013, 0.01, 0.012), move(4.88, 9.01, 0.1), rotate(1, Math.PI/2)]],
		['kitchen/dishwasher/dishwasher', [scale(0.012, 0.01, 0.012), move(2.26, 8.65, 0.1), rotate(1, Math.PI/2)]],
		['kitchen/table/table', [scale(0.0012, 0.001, 0.0008), move(4, 5, 0.1)]],
		['kitchen/chair/chair', [scale(0.01, 0.01, 0.01), move(4, 5.3, 0.1), rotate(1, Math.PI/2)]],
		['kitchen/chair/chair', [scale(0.01, 0.01, 0.01), move(4.7, 5, 0.1), rotate(1, Math.PI/2), rotate(2, -Math.PI/2)]],
		['kitchen/chair/chair', [scale(0.01, 0.01, 0.01), move(3.3, 5, 0.1), rotate(1, Math.PI/2), rotate(2, Math.PI/2)]],
		['kitchen/apples/apples', [scale(0.01, 0.01, 0.01), move(4, 5, 0.7), rotate(1, Math.PI/2)]],

		['bathroom/sink/sink', [scale(0.01, 0.01, 0.01), move(2.5, 9.23, 0.1), rotate(1, Math.PI/2)]],
		['bathroom/mirror_cabinet/mirror_cabinet', [scale(0.01, 0.01, 0.01), move(2.5, 9.23, -0.14), rotate(1, Math.PI/2)]],
		['bathroom/towel/towel', [scale(0.01, 0.01, 0.01), move(3.7, 9.66, 0.15), rotate(1, Math.PI/2)]],
		['bathroom/bidet/bidet', [scale(0.01, 0.01, 0.01), move(3.7, 7.85, 0.1), rotate(1, Math.PI/2), rotate(2, Math.PI)]],
		['bathroom/shower/shower', [scale(0.008, 0.008, 0.008), move(5.12, 9.63, 0.1), rotate(1, Math.PI/2), rotate(2, Math.PI)]],
		['bathroom/radiator/radiator', [scale(0.01, 0.01, 0.01), move(2.12, 7.8, -1), rotate(1, Math.PI/2), rotate(2, Math.PI)]],

		['bedroom/bed/bed', [scale(0.007, 0.01, 0.007), move(4.35, 11.1, 0.4), rotate(1, Math.PI/2), rotate(2, -Math.PI/2)]],
		['bedroom/monitorLCD/monitorLCD', [scale(0.8, 0.8, 0.8), move(1.12, 11.1, 1.33), rotate(1, Math.PI/2)]],
		['bedroom/desk/desk', [scale(0.01, 0.01, 0.01), move(0.5, 12.09, 0.1), rotate(1, Math.PI/2)]],
		['bedroom/carpet/carpet', [scale(0.006, 0.01, 0.008), move(3, 11.1, 0.1), rotate(1, Math.PI/2), rotate(2, Math.PI/2)]],
		['bedroom/officeChair/officeChair', [scale(0.008, 0.008, 0.008), move(4, 9.7, 1.1), rotate(1, Math.PI/2), rotate(2, Math.PI)]],
		['bedroom/wardrobe/wardrobe', [scale(0.008, 0.008, 0.008), move(2.5, 10.3, 1), rotate(1, Math.PI/2), rotate(2, Math.PI)]]
	]);
}


function mkFurniture() {
	var furniture = new THREE.Object3D();

	var lamps = mkLamps();
	var picFrames = mkPictureFrames();

	var tvVideoScreen = mkTV_videoScreen();
    tvVideoScreen.rotation.x = Math.PI/2;
    tvVideoScreen.position.set(4, 3.95, 0.96);

	var tvRemoteControl = mkTV_remoteControl(tvVideoScreen);
	tvRemoteControl.position.set(3.3, 2, 0.41);

	var cooker = mkCooker();
	cooker.position.set(3.7, 7.1, 0.87);

	var mirror = mkMirror(0.6, 0.7);
	mirror.position.set(4.5, 9.625, 1.33);
	mirror.rotation.x = Math.PI/2;

	var toiletFlushButton = mkToiletFlushButton();
	toiletFlushButton.position.set(5, 7.585, 1.1);

	var computerVideoScreen = mkComputer_videoScreen();
	computerVideoScreen.rotation.x = Math.PI/2;
	computerVideoScreen.position.set(1.12, 11.805, 1.14);

	mkClock();
	mkToilet();
	mkLightSwitches(lamps);
	loadAllStaticFurniture();

	furniture.add(lamps);
	furniture.add(picFrames);
	furniture.add(tvVideoScreen);
	furniture.add(tvRemoteControl);
	furniture.add(cooker);
	furniture.add(mirror);
	furniture.add(toiletFlushButton);
	furniture.add(computerVideoScreen);

	furniture.lamps = lamps;
	furniture.mirror = mirror;

	return furniture;
}




/* PARTIAL APPLICATION OF AFFINE STRANSFORMATIONS */

function move(x, y, z) {
  function partMove(object) {
    object.position.set(x,y,z);
  }
  return partMove;
}

function scale(x, y, z) {
  function partScale(object) {
    object.scale.set(x,y,z);
  }
  return partScale;
}

function rotate(axis, angle) {
  function partRotate(object) {
    switch(axis) {
      case 1:
        object.rotation.x = angle;
        break;
      case 2:
        object.rotation.y = angle;
        break;
      case 3:
        object.rotation.z = angle;
        break;
    }
  }
  return partRotate;
}
