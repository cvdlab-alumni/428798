
var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

if (havePointerLock) {

  var element = document.body;

  var pointerlockchange = function(event) {
    if (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) {
      FPenabled = true;
      trackballControls.reset();
      dat.GUI.toggleHide();
      controls.enabled = true;
      camera.position.set(0, 0, 0);
      camera.up = new THREE.Vector3(0, 1, 0);
      controls.getObject().position.set(-50, 0, 53);
      controls.getObject().rotation.y = -Math.PI/2;
      $("#pointer").fadeIn(1000);
    } else {
      location.reload();
    }
  }

  var pointerlockerror = function(event) {
    location.reload();
  }

  document.addEventListener('pointerlockchange', pointerlockchange, false);
  document.addEventListener('mozpointerlockchange', pointerlockchange, false);
  document.addEventListener('webkitpointerlockchange', pointerlockchange, false);

  document.addEventListener('pointerlockerror', pointerlockerror, false);
  document.addEventListener('mozpointerlockerror', pointerlockerror, false);
  document.addEventListener('webkitpointerlockerror', pointerlockerror, false);

  var startFPS = function() {
    controls = new THREE.PointerLockControls(camera);
    scene.add(controls.getObject());
    element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
    if (/Firefox/i.test(navigator.userAgent)) {
      var fullscreenchange = function(event) {
        if (document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element) {
          document.removeEventListener('fullscreenchange', fullscreenchange);
          document.removeEventListener('mozfullscreenchange', fullscreenchange);
          element.requestPointerLock();
        }
      }
      document.addEventListener('fullscreenchange', fullscreenchange, false);
      document.addEventListener('mozfullscreenchange', fullscreenchange, false);
      element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;
      element.requestFullscreen();
    } else {
      element.requestPointerLock();
    }
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

}