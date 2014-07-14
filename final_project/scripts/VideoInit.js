
function loadVideo(vid, src) {
	vid.src = videosPath + src;
	vid.load();
}

// ******** television ********* 
video = document.createElement('video');
video_image = document.createElement('canvas');
video_image.width = 240;
video_image.height = 144;
video_imageContext = video_image.getContext('2d');
video_imageContext.fillStyle = '#000000';
video_imageContext.fillRect(0, 0, video_image.width, video_image.height);
video_texture = new THREE.Texture(video_image);
video_texture.minFilter = THREE.LinearFilter;
video_texture.magFilter = THREE.LinearFilter;
video_texture.format = THREE.RGBFormat;
video_texture.generateMipmaps = false;
// tv video volume fade
video.defaultRadius = 40;
video.defaultVolume = 1;
video.position = new THREE.Vector3(9, 14, 24);
video.updateVolume = function() {
	var distance = this.position.distanceTo((!FPenabled) ? camera.position : controls.getObject().position);
	if (distance <= this.defaultRadius) {
		this.volume = this.defaultVolume * (1 - distance / this.defaultRadius);
	} else {
		this.volume = 0;
	}
}


// ******** monitor logo *********
webcam_logo = document.createElement('video');
webcam_logo_image = document.createElement('canvas');
webcam_logo_image.width = 1024;
webcam_logo_image.height = 768;
webcam_logo_imageContext = webcam_logo_image.getContext('2d');
webcam_logo_imageContext.fillStyle = '#000000';
webcam_logo_imageContext.fillRect(0, 0, webcam_logo_image.width, webcam_logo_image.height);
webcam_logo_texture = new THREE.Texture(webcam_logo_image);
webcam_logo_texture.minFilter = THREE.LinearFilter;
webcam_logo_texture.magFilter = THREE.LinearFilter;
webcam_logo_texture.format = THREE.RGBFormat;
webcam_logo_texture.generateMipmaps = false;

// ******** monitor webcam *********
webcam_video = document.getElementById('monitor');
webcam_videoImage = document.createElement('canvas');
webcam_videoImage.width = 1024;
webcam_videoImage.height = 768;
webcam_videoImageContext = webcam_videoImage.getContext('2d');
webcam_videoImageContext.fillStyle = '#000000';
webcam_videoImageContext.fillRect(0, 0, webcam_videoImage.width, webcam_videoImage.height);
webcam_videoTexture = new THREE.Texture(webcam_videoImage);
webcam_videoTexture.minFilter = THREE.LinearFilter;
webcam_videoTexture.magFilter = THREE.LinearFilter;