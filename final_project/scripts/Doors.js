
function mkDoor(depth, width, height, doorDepth) {
	var completeDoor = new THREE.Object3D();
	var hook = new THREE.Object3D();
	var handles = new THREE.Object3D();
	var handleHooks = new THREE.Object3D();

	var frmDepth = depth + 0.05;
	var frmWidth = 0.05;
	var frmHeight = 1.95

	var frame = mkFrame(frmDepth, frmWidth, frmHeight, width);
	var door = mkTexturedMesh2(new THREE.BoxGeometry(doorDepth, width-frmWidth*2 , height- frmWidth), 
		'porta_facciata1.jpg', 'porta_facciata2.jpg', 'porta_bordo.jpg');
	var handle1 = mkHandle();
	var handle2 = mkHandle();
	handle1.position.set(-doorDepth/2, 0, 0);
	handle2.rotation.z = Math.PI;
	handle2.rotation.x = Math.PI;
	handle2.position.set(doorDepth/2, 0, 0);
	handles.position.set(0, width*4/11, -height/32);

	hook.position.set(0, -width/2 + frmWidth + doorDepth/2, frmHeight/2);
	door.position.set(0, (width - doorDepth)/2 - frmWidth, 0);

	completeDoor.add(frame);
	completeDoor.add(hook);
	hook.add(door);
	door.add(handles);
	handles.add(handle1);
	handles.add(handle2);
	handles.add(handleHooks);
	handleHooks.add(handle1);
	handleHooks.add(handle2);

	door.handleHooks = handleHooks;
	animateDoor(door);

	return completeDoor;
}


function mkFrame(frmDepth, frmWidth, frmHeight, voidWidth) {
	var frame = new THREE.Object3D();
	var frameOffset = (voidWidth - frmWidth)/2;

	var rightHandLintel = mkTexturedMesh(new THREE.BoxGeometry(frmDepth, frmWidth, frmHeight), 'porta_bordo.jpg');
	var lefthandLintel = mkTexturedMesh(new THREE.BoxGeometry(frmDepth, frmWidth, frmHeight), 'porta_bordo2.jpg');
	var topLintel = mkTexturedMesh(new THREE.BoxGeometry(frmDepth, frameOffset*2 + frmWidth, frmWidth), 'porta_bordo.jpg');

	rightHandLintel.position.set(0, frameOffset, frmHeight/2);
	lefthandLintel.position.set(0, -frameOffset, frmHeight/2);
	topLintel.position.set(0, 0, frmHeight + frmWidth/2);

	frame.add(rightHandLintel);
	frame.add(lefthandLintel);
	frame.add(topLintel);

	return frame;
}


function mkHandle() {
	var handle = new THREE.Object3D();
	var hook = new THREE.Object3D();
	var material = new THREE.MeshPhongMaterial({
		specular: 0xffffff, 
		color: 0xcccccc, 
		shininess: 10, 
		metal: true, 
		side: THREE.DoubleSide});

	var baseCylinder_radius = 0.02;
	var baseCylinder_height = 0.01;
	var cylinder1_radius = 0.005;
	var cylinder1_height = 0.03;
	var cylinder2_radius = 0.005;
	var cylinder2_height = 0.09;
	var baseCylinder = new THREE.Mesh(
		new THREE.CylinderGeometry(baseCylinder_radius, baseCylinder_radius, baseCylinder_height, 20, 20), material);
	var cylinder1 = new THREE.Mesh(
		new THREE.CylinderGeometry(cylinder1_radius, cylinder1_radius, cylinder1_height, 20, 20), material);
	var cylinder2 = new THREE.Mesh(
		new THREE.CylinderGeometry(cylinder2_radius, cylinder2_radius, cylinder2_height, 20, 20), material);

	handle.add(baseCylinder);
	baseCylinder.add(hook);
	hook.add(cylinder1);
	cylinder1.add(cylinder2);

	baseCylinder.rotation.z = Math.PI/2;
	hook.position.set(0, baseCylinder_height/2, 0);
	cylinder1.position.set(0, cylinder1_height/2, 0);
	cylinder2.rotation.z = Math.PI/2;
	cylinder2.position.set(-cylinder2_height/3, cylinder1_height/2, 0);

	handle.hook = hook;

	return handle;
}


function mkAllDoors() {
	var doors = new THREE.Object3D();
	var entranceDoor = mkDoor(0.3,0.7,2, 0.3/3);
	var kitchenDoor = mkDoor(0.1,0.8,2, 0.1/3);
	var bathroomDoor = mkDoor(0.1,0.8,2, 0.1/3);
	var bedroomDoor = mkDoor(0.1,0.7,2, 0.1/3);

	entranceDoor.position.set(0.15, 0.925, 0.1);
	kitchenDoor.position.set(1.85, 5.9, 0.1);
	bathroomDoor.position.set(1.85, 8.6, 0.1);
	bedroomDoor.rotation.z = -Math.PI/2;
	bedroomDoor.position.set(1.05, 9.72, 0.1);

	doors.add(entranceDoor);
	doors.add(kitchenDoor);
	doors.add(bathroomDoor);
	doors.add(bedroomDoor);

	return doors;
}