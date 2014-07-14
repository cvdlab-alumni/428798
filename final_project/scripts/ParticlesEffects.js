
function mkFire(count, radius, height) {
  var fireDrop = new THREE.Geometry();
  var fireDropMaterial = new THREE.ParticleBasicMaterial({
    color: 0xff0000,
    size: 0.5,
    map: THREE.ImageUtils.loadTexture(imagesPath + "smokeparticle.png"),
    blending: THREE.AdditiveBlending,
    transparent: true
  });

  var alfa = 0;
  for (var i = 0; i < count; i++) {
    alfa += (2/count);

    var px = radius * Math.cos(alfa * 2 * Math.PI);
    var py = radius * Math.sin(alfa * 2 * Math.PI);
    var pz = height * Math.PI;
    var drop = new THREE.Vector3(px,py,pz);

    fireDrop.vertices.push(drop);
  }

  var fireSystem = new THREE.ParticleSystem(fireDrop, fireDropMaterial);
  fireSystem.sortParticles = true;
  fireSystem.visible = false;

  return fireSystem;
}