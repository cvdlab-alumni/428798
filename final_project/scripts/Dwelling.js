 
function mkBalcony(depth, width, heigth, grndTextureImgFile, repeat_X, repeat_Y) {
	var balcony = new THREE.Object3D();
	var ground = mkBalconyGround(depth, width, grndTextureImgFile, repeat_X, repeat_Y);
	var railing = mkBalconyRailing(depth, width, heigth);

	balcony.add(ground);
	balcony.add(railing);

	return balcony;
}


function mkBalconyRailing(depth, width, heigth) {
	var balconyRailing = new THREE.Object3D();
	var railingMaterial = new THREE.MeshPhongMaterial({color: "#8F2400", metal: true, shininess: 100});

	var zOffset = 0.1+0.05/16;
	var railingFactor = 0.15/3;
	var railingDepth = railingWidth = depth * railingFactor;
	var railingHeigth = railingWidth/5;


	var shape = [
		[0, railingWidth], [depth-railingDepth, railingWidth], [depth-railingDepth, width-railingWidth], [0, width-railingWidth], 
		[0, width-2*railingWidth], [depth-2*railingDepth, width-2*railingWidth], [depth-2*railingDepth, 2*railingWidth], [0, 2*railingWidth],
		[0, railingWidth]];
	var bottom = new THREE.Mesh(new THREE.ExtrudeGeometry(mkShape(shape), {amount: railingHeigth, bevelEnabled: false}), railingMaterial);
	var top = new THREE.Mesh(new THREE.ExtrudeGeometry(mkShape(shape), {amount: railingHeigth, bevelEnabled: false}), railingMaterial);
	bottom.position.set(-depth/2, -width/2, zOffset+railingWidth);
	top.position.set(-depth/2, -width/2, zOffset+railingWidth+railingHeigth+heigth);


	var mainPole1 = new THREE.Mesh(new THREE.BoxGeometry(railingDepth*3/5, railingWidth*3/5, railingHeigth+zOffset+heigth), railingMaterial);
	mainPole1.position.set(-depth/2+railingDepth*3/2, -width/2+railingWidth*3/2, zOffset/2+railingWidth+heigth/2+railingHeigth);
	var mainPole2 = new THREE.Mesh(new THREE.BoxGeometry(railingDepth*3/5, railingWidth*3/5, railingHeigth+zOffset+heigth), railingMaterial);
	mainPole2.position.set(depth/2-railingDepth*3/2, -width/2+railingWidth*3/2, zOffset/2+railingWidth+heigth/2+railingHeigth);
	var mainPole3 = new THREE.Mesh(new THREE.BoxGeometry(railingDepth*3/5, railingWidth*3/5, railingHeigth+zOffset+heigth), railingMaterial);
	mainPole3.position.set(-depth/2+railingDepth*3/2, width/2-railingWidth*3/2, zOffset/2+railingWidth+heigth/2+railingHeigth);
	var mainPole4 = new THREE.Mesh(new THREE.BoxGeometry(railingDepth*3/5, railingWidth*3/5, railingHeigth+zOffset+heigth), railingMaterial);
	mainPole4.position.set(depth/2-railingDepth*3/2, width/2-railingWidth*3/2, zOffset/2+railingWidth+heigth/2+railingHeigth);
	var mainPole5 = new THREE.Mesh(new THREE.BoxGeometry(railingDepth*3/5, railingWidth*3/5, railingHeigth+zOffset+heigth), railingMaterial);
	mainPole5.position.set(depth/2-railingDepth*3/2, 0, zOffset/2+railingWidth+heigth/2+railingHeigth);


	var minipole;
	for(var i = 2; i < (depth-railingDepth*2)/(railingDepth*3/2); i++) {
		minipole = new THREE.Mesh(new THREE.BoxGeometry(railingDepth*2/5, railingWidth*2/5, heigth), railingMaterial);
		minipole.position.set(-depth/2+railingDepth*3/2*i, -width/2+railingWidth*3/2, zOffset+railingWidth+heigth/2+railingHeigth);
		balconyRailing.add(minipole);
	}
	for(var i = 2; i < (depth-railingDepth*2)/(railingDepth*3/2); i++) {
		minipole = new THREE.Mesh(new THREE.BoxGeometry(railingDepth*2/5, railingWidth*2/5, heigth), railingMaterial);
		minipole.position.set(-depth/2+railingDepth*3/2*i, width/2-railingWidth*3/2, zOffset+railingWidth+heigth/2+railingHeigth);
		balconyRailing.add(minipole);
	}
	for(var i = 2; i < (width-railingDepth*2)/(railingDepth*3); i++) {
		minipole = new THREE.Mesh(new THREE.BoxGeometry(railingDepth*2/5, railingWidth*2/5, heigth), railingMaterial);
		minipole.position.set(depth/2-railingDepth*3/2, -width/2+railingWidth*3/2*i, zOffset+railingWidth+heigth/2+railingHeigth);
		balconyRailing.add(minipole);
	}
	for(var i = 1; i < (width-railingDepth*2)/(railingDepth*3); i++) {
		minipole = new THREE.Mesh(new THREE.BoxGeometry(railingDepth*2/5, railingWidth*2/5, heigth), railingMaterial);
		minipole.position.set(depth/2-railingDepth*3/2, railingWidth*3/2*i, zOffset+railingWidth+heigth/2+railingHeigth);
		balconyRailing.add(minipole);
	}


	balconyRailing.add(bottom);
	balconyRailing.add(top);
	balconyRailing.add(mainPole1);
	balconyRailing.add(mainPole2);
	balconyRailing.add(mainPole3);
	balconyRailing.add(mainPole4);
	balconyRailing.add(mainPole5);

	return balconyRailing;
}


function mkBalconyGround(depth, width, grndTextureImgFile, repeat_X, repeat_Y) {
	var balconyGround = new THREE.Object3D();

	var heigth = 0.1;
	var baseGeometry = new THREE.BoxGeometry(depth, width, heigth);
	var baseMaterial = new THREE.MeshLambertMaterial({color: 0xEEEEEE, shading: THREE.FlatShading, side: THREE.DoubleSide});
	var base = new THREE.Mesh(baseGeometry, baseMaterial);
	base.position.z = heigth/2;

	var boundaryFactor = 0.15;
	var boundWidth = boundDepth = depth * boundaryFactor;
	var ground = mkTexturedShape(grndTextureImgFile, repeat_X, repeat_Y, [
		[0, boundWidth], [depth-boundDepth, boundWidth], [depth-boundDepth, width-boundWidth], [0, width-boundWidth], [0, boundWidth]]);
	addBumpMap(ground, "mattonelle_balcone_bump.jpg", 0.1, repeat_X, repeat_Y);
	var boundary = mkTexturedShape('marmo.jpg', 1, 1, [
		[0, boundWidth], [0, 0], [depth, 0], [depth, width], [0, width],
		[0, width-boundWidth], [depth-boundDepth, width-boundWidth], [depth-boundDepth, boundWidth], [0, boundWidth]]);
	ground.position.set(-depth/2, -width/2, heigth+0.05/16);
	boundary.position.set(-depth/2, -width/2, heigth+0.05/16);

	balconyGround.add(base);
	balconyGround.add(ground);
	balconyGround.add(boundary);

	return balconyGround;
}


function mkBalconies() {
	var balconies = new THREE.Object3D();
	var balcony1 = mkBalcony(2, 6.9, 1, 'mattonelle_balcone.jpg', 1, 1);
	var balcony2 = mkBalcony(1.37, 4.75, 1, 'mattonelle_balcone.jpg', 1.5, 1.39);

	balcony1.position.set(7.2, 3.7, 0);
	balcony2.position.set(3.1, 13.086, 0);
	balcony2.rotation.z = Math.PI/2;

	balconies.add(balcony1);
	balconies.add(balcony2);

	return balconies;
}


function mkCeiling(ceilingDepth, ceilingWidth, heigth) {
	var ceilingGeometry = new THREE.PlaneGeometry(ceilingDepth, ceilingWidth, 100, 100);
	var ceilingMaterial = new THREE.MeshLambertMaterial({
		color: "#FFFEE6", 
		emissive: 0x707060, 
		side: THREE.BackSide});

	var ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
	ceiling.position.set(ceilingDepth/2, ceilingWidth/2, heigth);
	return ceiling;
}


function mkEntranceLanding(depth, width, grndTextureImgFile, repeat_X, repeat_Y) {
	var entranceLanding = mkBalconyGround(depth, width, grndTextureImgFile, repeat_X, repeat_Y);
	entranceLanding.position.set(-depth/2, width/2, 0);
	entranceLanding.rotation.z = Math.PI;

	return entranceLanding;
}