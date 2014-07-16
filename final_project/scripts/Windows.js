
function mkWindowShutter(frmDepth, frmWidth, frmHeight, voidWidth) {
	var window = new THREE.Object3D();
	var frame = new THREE.Object3D();
	var frameOffset = (voidWidth - frmWidth)/2;

	var rightHandLintel = mkTexturedMesh(new THREE.BoxGeometry(frmDepth, frmWidth, frmHeight), 'wood.jpg');
	var lefthandLintel = mkTexturedMesh(new THREE.BoxGeometry(frmDepth, frmWidth, frmHeight), 'wood.jpg');
	var topLintel = mkTexturedMesh(new THREE.BoxGeometry(frmDepth, frameOffset*2 + frmWidth, frmWidth), 'wood.jpg');
	var bottomLintel = mkTexturedMesh(new THREE.BoxGeometry(frmDepth, frameOffset*2 + frmWidth, frmWidth), 'wood.jpg');
	var glass = new THREE.Mesh(new THREE.BoxGeometry(frmWidth/5, frameOffset*2, frmHeight), 
		new THREE.MeshLambertMaterial({ color: "#CCCCFF", transparent: true, opacity: 0.5}));

	topLintel.position.set(0, 0, frmHeight + frmWidth);
	rightHandLintel.position.set(0, frameOffset, frmHeight/2 + frmWidth/2);
	lefthandLintel.position.set(0, -frameOffset, frmHeight/2 + frmWidth/2);
	glass.position.set(0, 0, frmHeight/2 + frmWidth/2);
	
	frame.add(topLintel);
	frame.add(rightHandLintel);
	frame.add(lefthandLintel);
	frame.add(bottomLintel);
	window.add(frame);
	window.add(glass);

	window.frame = frame;
	window.glass = glass;

	return window;
}


function mkLargeWindowShutter(frmDepth, frmWidth, frmHeight, voidWidth) {
	var largeWindow = mkWindowShutter(frmDepth, frmWidth, frmHeight, voidWidth);
	var middleLintel = mkTexturedMesh(new THREE.BoxGeometry(frmDepth, voidWidth-frmWidth*2, frmWidth), 'wood.jpg');

	middleLintel.position.set(0, 0, frmHeight/2 + frmWidth/2);

	largeWindow.frame.add(middleLintel);

	return largeWindow;
}


function mk2ShuttersSmallWindow(frmDepth, frmWidth, frmHeight, voidWidth) {
	var twoShutterSmallWindow = new THREE.Object3D();

	var frame = mkFrame(0.35, 0.05, 1.02-0.05/2, 1.52, 'wood.jpg', 'wood.jpg');
	var bottomLintel = mkTexturedMesh(new THREE.BoxGeometry(0.35, 1.52, 0.05), 'wood.jpg');
	bottomLintel.position.set(0, 0, -0.05/2)
	frame.add(bottomLintel);
	frame.bottomLintel = bottomLintel;

	var hookShutter1 = new THREE.Object3D();
	var hookShutter2 = new THREE.Object3D();
	var smallShutter1 = mkWindowShutter(frmDepth, frmWidth, frmHeight, voidWidth);
	var smallShutter2 = mkWindowShutter(frmDepth, frmWidth, frmHeight, voidWidth);
	var handle = mkHandle();

	hookShutter1.position.set(0, -voidWidth, 0);
	hookShutter2.position.set(0, voidWidth, 0);
	smallShutter1.position.set(0, voidWidth/2, 0.03);
	smallShutter2.position.set(0, -voidWidth/2, 0.03);
	handle.hook.rotation.y = -Math.PI/2;
	handle.position.set(-frmDepth/2, (voidWidth-frmWidth)/2, frmHeight/2);

	twoShutterSmallWindow.add(frame);
	frame.add(hookShutter1);
	frame.add(hookShutter2);
	hookShutter1.add(smallShutter1);
	hookShutter2.add(smallShutter2);
	smallShutter1.add(handle);

	smallShutter1.handleHook = handle.hook;
	smallShutter1.sibling = smallShutter2;
	smallShutter1.glass.owningShutter = smallShutter1;
	animateWindowShutter(smallShutter1.glass);
	animateWindowShutter(smallShutter1);

	return twoShutterSmallWindow;
}


function mk2ShuttersLargeWindow(frmDepth, frmWidth, frmHeight, voidWidth) {
	var twoShutterLargeWindow = new THREE.Object3D();
	var hookShutter1 = new THREE.Object3D();
	var hookShutter2 = new THREE.Object3D();

	var frame = mkFrame(0.35, 0.05, 1.95, 1.5, 'wood.jpg', 'wood.jpg');
	var largeShutter1 = mkLargeWindowShutter(frmDepth, frmWidth, frmHeight, voidWidth);
	var largeShutter2 = mkLargeWindowShutter(frmDepth, frmWidth, frmHeight, voidWidth);
	var handle = mkHandle();

	hookShutter1.position.set(0, -voidWidth, 0);
	hookShutter2.position.set(0, voidWidth, 0);
	largeShutter1.position.set(0, voidWidth/2, 0.03);
	largeShutter2.position.set(0, -voidWidth/2, 0.03);
	handle.hook.rotation.y = -Math.PI/2;
	handle.position.set(-frmDepth/2, (voidWidth-frmWidth)/2, frmHeight*2/3);

	twoShutterLargeWindow.add(frame);
	frame.add(hookShutter1);
	frame.add(hookShutter2);
	hookShutter1.add(largeShutter1);
	hookShutter2.add(largeShutter2);
	largeShutter1.add(handle);

	largeShutter1.handleHook = handle.hook;
	largeShutter1.sibling = largeShutter2;
	largeShutter1.glass.owningShutter = largeShutter1;
	animateWindowShutter(largeShutter1.glass);
	animateWindowShutter(largeShutter1);

	return twoShutterLargeWindow;
}


function mk4ShuttersLargeWindow(frmDepth, frmWidth, frmHeight, voidWidth) {
	var fourShutterLargeWindow = new THREE.Object3D();
	var hookShutter2 = new THREE.Object3D();
	var hookShutter3 = new THREE.Object3D();

	var frame = mkFrame(0.35, 0.05, 1.95, 2.8, 'wood.jpg', 'wood.jpg');
	var largeShutter1 = mkLargeWindowShutter(frmDepth, frmWidth, frmHeight, voidWidth);
	var largeShutter2 = mkLargeWindowShutter(frmDepth, frmWidth, frmHeight, voidWidth);
	var largeShutter3 = mkLargeWindowShutter(frmDepth, frmWidth, frmHeight, voidWidth);
	var largeShutter4 = mkLargeWindowShutter(frmDepth, frmWidth, frmHeight, voidWidth);
	var handle = mkHandle();

	hookShutter2.position.set(0,-0.35+0.05/2,0);
	hookShutter3.position.set(0,0.35-0.05/2,0);
	largeShutter1.position.set(0, 1.025, 0.03);
	largeShutter2.position.set(0, -0.35, 0);
	largeShutter3.position.set(0, 0.35, 0);
	largeShutter4.position.set(0, -1.025, 0.03);
	handle.hook.rotation.y = -Math.PI/2;
	handle.position.set(-frmDepth/2, (voidWidth-frmWidth)/2, frmHeight*4/7);

	fourShutterLargeWindow.add(frame);
	fourShutterLargeWindow.add(largeShutter1);
	fourShutterLargeWindow.add(largeShutter4);
	largeShutter1.add(hookShutter2);
	largeShutter4.add(hookShutter3);
	hookShutter2.add(largeShutter2);
	hookShutter3.add(largeShutter3);
	largeShutter3.add(handle);

	largeShutter3.handleHook = handle.hook;
	largeShutter3.sibling = largeShutter2;
	largeShutter3.glass.owningShutter = largeShutter3;
	animateWindowShutter(largeShutter3.glass);

	return fourShutterLargeWindow;
}


function mkAllWindows() {
	var windows = new THREE.Object3D();
	var livingroomWindow = mk4ShuttersLargeWindow(0.05,0.05,1.85,0.7);
	var kitchenWindow = mk2ShuttersLargeWindow(0.05,0.05,1.85,0.7);
	var bathroomWindow = mk2ShuttersSmallWindow(0.05,0.05,0.89,0.72);
	var bedroomSmallWindow = mk2ShuttersSmallWindow(0.05,0.05,0.89,0.72);
	var bedroomLargeWindow = mk4ShuttersLargeWindow(0.05,0.05,1.85,0.7);

	livingroomWindow.position.set(6.05, 2.25, 0.1);
	kitchenWindow.position.set(6.05, 5.9, 0.1);
	bathroomWindow.position.set(6.05, 8.6, 1.055);
	bedroomSmallWindow.position.set(6.05, 10.95, 1.055);
	bedroomSmallWindow.scale.y = 0.9;
	bedroomLargeWindow.position.set(3.1, 12.25, 0.1);
	bedroomLargeWindow.scale.y = 0.8;
	bedroomLargeWindow.rotation.z = -Math.PI*3/2;

	windows.add(livingroomWindow);
	windows.add(kitchenWindow);
	windows.add(bathroomWindow);
	windows.add(bedroomSmallWindow);
	windows.add(bedroomLargeWindow);

	return windows;
}