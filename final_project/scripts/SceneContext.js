
function mkSkybox(filePrefix, fileExt) {
	var directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
	var skyGeometry = new THREE.CubeGeometry(5000, 5000, 5000);	
	
	var materialArray = [];
	for (var i = 0; i < 6; i++)
		materialArray.push(new THREE.MeshBasicMaterial({
			map: THREE.ImageUtils.loadTexture(imagesPath + filePrefix + directions[i] + fileExt),
			side: THREE.BackSide
		}));
	var skyMaterial = new THREE.MeshFaceMaterial(materialArray);
	var skybox = new THREE.Mesh(skyGeometry, skyMaterial);
	skybox.position.set(0, 100, 0);

	skybox.nightSky = function() {

	}

	return skybox;
}