
function mkTexturedMesh(geometry, imageFile) {
    var texture = THREE.ImageUtils.loadTexture(imagesPath + imageFile);

    var material = new THREE.MeshPhongMaterial();
    material.map = texture;

    var mesh = new THREE.Mesh(geometry, material);
    return mesh;
}


function mkTexturedMesh2(geometry, imageFile1, imageFile2, imageFile3) {
	var materialArray = [];
	var texture1 = THREE.ImageUtils.loadTexture(imagesPath + imageFile1);
	var texture2 = THREE.ImageUtils.loadTexture(imagesPath + imageFile2);
	var texture3 = THREE.ImageUtils.loadTexture(imagesPath + imageFile3);
	materialArray.push(new THREE.MeshLambertMaterial({ map: texture2 }));
	materialArray.push(new THREE.MeshLambertMaterial({ map: texture1 }));
	materialArray.push(new THREE.MeshLambertMaterial({ map: texture3 }));
	materialArray.push(new THREE.MeshLambertMaterial({ map: texture3 }));
	materialArray.push(new THREE.MeshLambertMaterial({ map: texture3 }));
	materialArray.push(new THREE.MeshLambertMaterial({ map: texture3 }));
	var faceMaterial = new THREE.MeshFaceMaterial(materialArray);

	// create a multimaterial
	var mesh = new THREE.Mesh(geometry, faceMaterial);

	return mesh;
}


function mkTexturedShape(textureImageFile, repeat_U, repeat_V, shapeVList, holesVLists) {
	var texture = THREE.ImageUtils.loadTexture(imagesPath + textureImageFile);
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(repeat_U, repeat_V);

	var shape = mkShape(shapeVList);
	if (holesVLists && (holesVLists.length !== 0)) {
		for(var i = 0; i < holesVLists.length; i++) {
			mkHole(shape, holesVLists[i]);
		}
	}
	var shapeGeometry = new THREE.ShapeGeometry(shape);
    var shapeMaterial = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide });

    shapeGeometry.computeVertexNormals();
    shapeMaterial.map = texture;

    var shapeMesh = new THREE.Mesh(shapeGeometry, shapeMaterial);
    return shapeMesh;
}


function mkShape(vertices) {
	var shape = new THREE.Shape();
	shape.moveTo.apply(shape, vertices.shift());
	vertices.forEach(function (v) {
		shape.lineTo.apply(shape, v);
	});
	return shape;
}


function mkHole(shape, vertices) {
	var hole = new THREE.Path();
	hole.moveTo.apply(hole, vertices.shift());
	vertices.forEach(function (v) {
		hole.lineTo.apply(hole, v);
	});

	shape.holes.push(hole);
}


function addBumpMap(mesh, image, scale, repeat_U, repeat_V) {
	var bump = THREE.ImageUtils.loadTexture(imagesPath + image);
	bump.wrapS = THREE.RepeatWrapping;
	bump.wrapT = THREE.RepeatWrapping;
	bump.repeat.set(repeat_U, repeat_V);

	mesh.geometry.computeVertexNormals();
	mesh.material.bumpMap = bump;
	mesh.material.bumpScale = scale;
}