
var soundsToUpdate = []
var Sound = function(src, radius, volume, toUpdate, loop) {
	var audio = document.createElement('audio');
	var source = document.createElement('source');
	source.src = soundsPath + src;
	audio.appendChild(source);
	this.position = new THREE.Vector3();
	audio.volume = volume;
	audio.loop = loop;

	this.play = function() {
		audio.play();
	}

	this.pause = function() {
		audio.pause();
	}

	this.stop = function() {
		audio.pause();
		audio.currentTime = 0;
	}

	this.updateVolume = function() {
		var distance = this.position.distanceTo((!FPenabled) ? camera.position : controls.getObject().position);
		if (distance <= radius) {
			audio.volume = volume * (1 - distance / radius);
		} else {
			audio.volume = 0;
		}
	}

	if (toUpdate) {
		soundsToUpdate.push(this);
	}
}


function animateDoor(door) {
	var open = false;

	var openDoorTween1 = new TWEEN.Tween(door.parent.rotation);
	var openDoorTween2 = new TWEEN.Tween(door.parent.rotation);
	var closeDoorTween = new TWEEN.Tween(door.parent.rotation);
	var handlesTween = new TWEEN.Tween(door.handleHooks.rotation);
	var handlesTweenBack = new TWEEN.Tween(door.handleHooks.rotation);

	var door_open_sound = new Sound(['door_open.mp3'], 0, 0.3, false);
	var door_close_sound = new Sound(['door_close.mp3'], 0, 0.3, false);

	door.interact = function() {
		if (open) {
			closeDoorTween.to({z: 0}, 800).start();

			door_close_sound.play();

			open = false;
		} else {
			handlesTween.to({x: Math.PI/4}, 100).start();
			handlesTweenBack.to({x: 0}, 250);
			openDoorTween1.to({z: 0}, 100).start();
			openDoorTween2.to({z: -Math.PI/2}, 800);

			handlesTween.chain(handlesTweenBack);
			openDoorTween1.chain(openDoorTween2);

			door_open_sound.play();

			open = true;
		}
	}

	toIntersect.push(door);
}


function animateWindowShutter(glass) {
	var open = false;

	glass.interact = function() {
		if (open) {
			var mainShutterTween = new TWEEN.Tween(glass.owningShutter.parent.rotation);
			var secondShutterTween = new TWEEN.Tween(glass.owningShutter.sibling.parent.rotation);
			var handleTween = new TWEEN.Tween(glass.owningShutter.handleHook.rotation);

			mainShutterTween.to({z: 0}, 800).start();
			secondShutterTween.to({z: 0}, 800).start();
			handleTween.to({y: -Math.PI/2}, 350);

			mainShutterTween.chain(handleTween);

			open = false;
		} else {
			var mainShutterTween = new TWEEN.Tween(glass.owningShutter.parent.rotation);
			var secondShutterTween1 = new TWEEN.Tween(glass.owningShutter.sibling.parent.rotation);
			var secondShutterTween2 = new TWEEN.Tween(glass.owningShutter.sibling.parent.rotation);
			var handleTween = new TWEEN.Tween(glass.owningShutter.handleHook.rotation);

			handleTween.to({y: 0}, 350).start();
			mainShutterTween.to({z: Math.PI/2}, 800);
			secondShutterTween2.to({z: -Math.PI/2}, 800).delay(350).start();

			handleTween.chain(mainShutterTween);

			open = true;
		}
	}

	toIntersect.push(glass);
}


function animatePicture(canvas) {
	var firstHangTween = new TWEEN.Tween(canvas.framehook.rotation);
	var hangTween1 = new TWEEN.Tween(canvas.framehook.rotation);
	var hangTween2 = new TWEEN.Tween(canvas.framehook.rotation);
	var hangTween3 = new TWEEN.Tween(canvas.framehook.rotation);
	var hangTween4 = new TWEEN.Tween(canvas.framehook.rotation);
	var hangTween5 = new TWEEN.Tween(canvas.framehook.rotation);
	var lastHangTween = new TWEEN.Tween(canvas.framehook.rotation);

	canvas.interact = function() {
		firstHangTween.to({y: Math.PI/8}, 500).easing(TWEEN.Easing.Exponential.Out).start();
		hangTween1.to({y: -Math.PI/8}, 500).easing(TWEEN.Easing.Sinusoidal.Out);
		hangTween2.to({y: Math.PI/16}, 500).easing(TWEEN.Easing.Sinusoidal.Out);
		hangTween3.to({y: -Math.PI/16}, 500).easing(TWEEN.Easing.Sinusoidal.Out);
		hangTween4.to({y: Math.PI/32}, 500).easing(TWEEN.Easing.Sinusoidal.Out);
		hangTween5.to({y: -Math.PI/32}, 500).easing(TWEEN.Easing.Sinusoidal.Out);
		lastHangTween.to({y: 0}, 500).easing(TWEEN.Easing.Sinusoidal.Out);

		firstHangTween.chain(hangTween1);
		hangTween1.chain(hangTween2);
		hangTween2.chain(hangTween3);
		hangTween3.chain(hangTween4);
		hangTween4.chain(hangTween5);
		hangTween5.chain(lastHangTween);		
	}
	
	toIntersect.push(canvas);
}


function animateTV_videoScreen(videoScreen) {
	var channel = 0;
	var videos = [
		"Big_Buck_Bunny_small.ogv",
		"video_corso.mp4"];

	videoScreen.isOn = false;

	videoScreen.turnOn = function() {
		this.visible = true;
		video.play();
		this.isOn = true;
	}

	videoScreen.turnOff = function() {
		this.visible = false;
		video.pause();
		this.isOn = false;
	}

	videoScreen.nextChannel = function() {
		channel++;
		loadVideo(video, videos[channel%videos.length]);
		video.play();
	}

	videoScreen.interact = function() {
		if (this.isOn) {
			this.turnOff();
		} else {
			this.turnOn();
		}
	}

	toIntersect.push(videoScreen);
}


function animateTV_remoteControl(remoteControl, videoScreen) {
	remoteControl.interact = function() {
		if(videoScreen.isOn) {
			videoScreen.nextChannel();
		} else {
			videoScreen.turnOn();
		}
	}

	toIntersect.push(remoteControl);
}


function animateClock(clock) {	
	var clockPanel = clock.children[2];

	clockPanel.interact = function() {
		var currentDate = new Date();
		var hours = currentDate.getHours()%12;
		var minutes = currentDate.getMinutes();

		var hoursAngle = -((2*Math.PI)/12*hours + (2*Math.PI)/12/60*minutes);
		var minutesAngle = -(2*Math.PI)/60*minutes;

		var hoursTween = new TWEEN.Tween(clock.hourHand_hook.rotation);
		var minutesTween = new TWEEN.Tween(clock.minuteHand_hook.rotation);

		hoursTween.to({z: hoursAngle}, hours*(1000/12)).start();
		minutesTween.to({z: minutesAngle}, minutes*(1000/60)).start();
	}

	toIntersect.push(clockPanel)
}


function animateToiletCover(cover) {
	var isOpen = false;

	cover.interact = function() {
		if (isOpen) {
			close();
			isOpen = false;
		} else {
			open();
			isOpen = true;
		}

		function close() {
			var tweenClose = new TWEEN.Tween(cover.parent.rotation);
			tweenClose.to({x: 0}, 700).easing(TWEEN.Easing.Bounce.Out).start();
		}

		function open() {
			var tweenOpen = new TWEEN.Tween(cover.parent.rotation);
			tweenOpen.to({x: -Math.PI/2}, 700).easing(TWEEN.Easing.Quadratic.Out).start();
		}
	}

	toIntersect.push(cover);
}


function animateToiletFlushButton(toiletFlush) {
	var toilet_flush_sound = new Sound(['toilet_flush.mp3'], 0, 1, false);

	var waterTexture = THREE.ImageUtils.loadTexture(imagesPath + "water_norm.jpg");
	var waterGeometry = new THREE.CylinderGeometry(0, 0.152, 0.01, 36);
	var waterMaterial = new THREE.MeshPhongMaterial({
		color: '#658C98',
		specular: '#FFFFFF',
		transparent: true,
		opacity: 0.8,
		normalMap: waterTexture,
		shininess: 200
	});
	waterMaterial.normalMap.repeat.set(1, 2);
	waterMaterial.normalMap.wrapS = THREE.RepeatWrapping;
	waterMaterial.normalMap.wrapT = THREE.RepeatWrapping;

	var water = new THREE.Mesh(waterGeometry, waterMaterial);
	water.scale.z = 1.08;
	water.rotation.x = -Math.PI/2;
	water.position.set(5.16, 7.90, 0.36);

	dwelling.add(water);

	toiletFlush.interact = function() {
		var buttonTweenUp = new TWEEN.Tween(toiletFlush.button.position);
		var buttonTweenDown = new TWEEN.Tween(toiletFlush.button.position);
		var waterTweenUp = new TWEEN.Tween(water.scale);
		var waterTweenDown = new TWEEN.Tween(water.scale);

		waterTweenUp.to({y: 20}, 6000).start();
		waterTweenDown.to({y: 0.01}, 4000);
		waterTweenUp.chain(waterTweenDown);

		buttonTweenDown.to({y: 0}, 0).start();
		buttonTweenUp.to({y: 0.01}, 1000);
		buttonTweenDown.chain(buttonTweenUp);

		toilet_flush_sound.play();
	}

	toIntersect.push(toiletFlush);
}


function animateComputer_videoScreen(videoScreen) {
	videoScreen.isOn = false;

	videoScreen.playWebcam = function() {
		this.material.map = webcam_videoTexture;
	}

	videoScreen.startUp = function() {
		webcam_logo.addEventListener('ended', this.playWebcam.bind(this));

		this.material.map = webcam_logo_texture;
		loadVideo(webcam_logo, "windowsxp_startup.mp4");
		webcam_logo.play();

		this.visible = true;
	}

	videoScreen.interact = function() {
		if (this.isOn) {
			this.visible = false;
			this.isOn = false;
		} else {
			this.startUp();
			this.isOn = true;
		}
	}

	toIntersect.push(videoScreen);
}


function animateLightSwitch(switchMask, targetLamps) {
	var isOn = true;

	var switch_sound = new Sound(['light_switch.mp3'], 0, 1, false);

	switchMask.interact = function() {
		if (isOn) {
			this.switchOff();
			isOn = false;
		} else {
			this.switchOn();
			isOn = true;
		}
	}

	switchMask.switchOn = function() {
		var switchOnTween = new TWEEN.Tween(switchMask.parent.switchButton_hook.rotation);
		switchOnTween.to({z: 0}, 100).start();

		switch_sound.play();

		for (var i = 0; i < targetLamps.length; i++) {
			targetLamps[i].switchOn();
		}
	}

	switchMask.switchOff = function() {
		var switchOffTween = new TWEEN.Tween(switchMask.parent.switchButton_hook.rotation);
		switchOffTween.to({z: 17*Math.PI/64}, 100).start();

		switch_sound.play();

		for (var i = 0; i < targetLamps.length; i++) {
			targetLamps[i].switchOff();
		}
	}

	toIntersect.push(switchMask);
}


function animateCooker(cooker) {
	animateFire(cooker.fire1, 0.04);
	animateFire(cooker.fire2, 0.065);
	animateFire(cooker.fire3, 0.05);
	animateFire(cooker.fire4, 0.05);

	cooker.isOn = false;

	cooker.interact = function() {
		if (this.isOn) {
			this.switchFires(false);
			this.isOn = false;
		} else {
			this.switchFires(true);
			this.isOn = true;
		}
	}

	cooker.switchFires = function (v) {
		for (var i = 0; i < this.children.length; i++) {
			this.children[i].visible = v;
		}
	}

	toIntersect.push(cooker);
}


function animateFire(fire, rf){  
	var alfa = 0;    
    var counter = 1;
    var flame = fire.geometry.vertices;
    
	flame.forEach(function (v) {
		alfa += 2/50;
		if(counter%2===0) {
			new TWEEN.Tween(v)
				.to({x: (rf*1.1 * Math.cos(alfa*2* Math.PI)), y: (rf*1.3 * Math.sin(alfa*2* Math.PI)), z: 1.575}, 200)
				.repeat(Infinity)
				.easing(TWEEN.Easing.Linear.None)
				.start();
		}

		counter++;
	});
}
