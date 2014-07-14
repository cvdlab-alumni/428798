
function mkLamp(lightIntensity, lightDistance) {
	var lamp = new THREE.Object3D();

	var metalMaterial = new THREE.MeshPhongMaterial({
        specular: 0xffffff, 
        color: "#ffffff", 
        shininess: 10, 
        metal: true, 
        side: THREE.DoubleSide});
	var glassMaterial = new THREE.MeshLambertMaterial({
		color: "#ffff80", 
		transparent: true, 
		opacity: 0.1});

	var cone_radius1 = 0.05;
	var cone_radius2 = cone_radius1/5;
	var cone_height = cone_radius1;
	var cylinder_height = 0.3;
	var hat_radius = cone_radius1*3;
	var cone = new THREE.Mesh(new THREE.CylinderGeometry(cone_radius1, cone_radius2, cone_height,36, 36), metalMaterial);
	var cylinder = new THREE.Mesh(new THREE.CylinderGeometry(cone_radius2, cone_radius2, cylinder_height), metalMaterial);
	var hat = new THREE.Mesh(new THREE.SphereGeometry(hat_radius, 36, 36, 2*Math.PI, 2*Math.PI, 0, 0.5*Math.PI), metalMaterial);
	var bulb = new THREE.Mesh(new THREE.SphereGeometry(hat_radius/4, 36, 36), glassMaterial);
	var pointLight = new THREE.PointLight("#FFFFFF");
	pointLight.intensity = lightIntensity;
	pointLight.distance = lightDistance;
	
	lamp.add(cone);
	cone.add(cylinder);
	cylinder.add(hat);
	hat.add(bulb);
	bulb.add(pointLight);

	cone.rotation.x = Math.PI/2;
	cylinder.position.set(0,-(cone_height+cylinder_height)/2,0);
	hat.position.set(0,-(cylinder_height/2 + hat_radius),0);
	bulb.position.set(0,hat_radius/2,0);

	lamp.light = pointLight;

	lamp.switchOn = function() {
		this.light.intensity = lightIntensity;
	}
	
	lamp.switchOff = function() {
		this.light.intensity = 0;
	}
	
	return lamp;
}


function mkLamps() {
	var lamps = new THREE.Object3D();

	var lampLivingroom1 = mkLamp(0.4, 80);
	var lampLivingroom2 = mkLamp(0.4, 80);
	var lampHallway = mkLamp(0.4, 80);
	var lampKitchen = mkLamp(0.4, 80);
	var lampBathroom = mkLamp(0.4, 80);
	var lampBedroom1 = mkLamp(0.4, 80);
	var lampBedroom2 = mkLamp(0.4, 80);

	lampLivingroom1.position.set(2, 2, 2.57);
	lampLivingroom2.position.set(4.5, 2, 2.57);
	lampHallway.position.set(1, 7, 2.57);
	lampKitchen.position.set(4, 6, 2.57);
	lampBathroom.position.set(4, 8.5, 2.57);
	lampBedroom1.position.set(2, 11, 2.57);
	lampBedroom2.position.set(4, 11, 2.57);
	
	lamps.add(lampLivingroom1);
	lamps.add(lampLivingroom2);
	lamps.add(lampHallway);
	lamps.add(lampKitchen);
	lamps.add(lampBathroom);
	lamps.add(lampBedroom1);
	lamps.add(lampBedroom2);

	lamps.lampLivingroom1 = lampLivingroom1;
	lamps.lampLivingroom2 = lampLivingroom2;
	lamps.lampHallway = lampHallway;
	lamps.lampKitchen = lampKitchen;
	lamps.lampBathroom = lampBathroom;
	lamps.lampBedroom1 = lampBedroom1;
	lamps.lampBedroom2 = lampBedroom2;

	lamps.switchLightsOn = function() {
		for (var i = 0; i < this.children.length; i++) {
			this.children[i].switchOn();
		};
	}

	lamps.switchLightsOff = function() {
		for (var i = 0; i < this.children.length; i++) {
			this.children[i].switchOff();
		};
	}

	return lamps;
}