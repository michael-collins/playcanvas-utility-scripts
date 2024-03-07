// Playcanvas.com
// To use this script, add it as a script component to an object.
// Set up a collision area on the object to act as start/stop trigger
// Select an uploaded video (.mp4 is tested to work) in the videoAsset slot
// Select the material that you want to assign the video to in the Screen Material slot
// This script will run the video through the emissive channel on the material, so make sure that the diffuse color is set to black, otherwise it will add color to the video.

var Videotexture = pc.createScript('videotexture');

Videotexture.attributes.add('screenMaterial', { type: 'asset', assetType: 'material', title: 'Screen material'});
Videotexture.attributes.add('materials', {
    type: 'asset',
    assetType: 'material',
    array: true
});

Videotexture.attributes.add('videoAsset', {
   type: 'asset',
   assetType: 'audio',
});


// Assuming collision component is properly set up on the entity with Videotexture script
Videotexture.prototype.initialize = function() {
    this.entity.collision.on('triggerenter', this.onTriggerEnter, this);
    this.playVideo();
};



// initialize code called once per entity
Videotexture.prototype.initialize = function() {
    var app = this.app;
    
    // Create a texture to hold the video frame data            
    var videoTexture = new pc.Texture(app.graphicsDevice, {
        format: pc.PIXELFORMAT_R5_G6_B5,
        autoMipmap: false
    });
    videoTexture.minFilter = pc.FILTER_LINEAR;
    videoTexture.magFilter = pc.FILTER_LINEAR;
    videoTexture.addressU = pc.ADDRESS_CLAMP_TO_EDGE;
    videoTexture.addressV = pc.ADDRESS_CLAMP_TO_EDGE;

    // Create HTML Video Element to play the video
    var video = document.createElement('video');
    video.addEventListener('canplay', function (e) {
        videoTexture.setSource(video);
    });
    
    // This is how to get the full URL path to the asset.
    video.src = this.videoAsset.getFileUrl();
    video.crossOrigin = 'anonymous';
    video.loop = false;
    
    var style = video.style;
    style.width = '1px';
    style.height = '1px';
    style.position = 'absolute';
    style.opacity = '0';
    style.zIndex = '-1000';
    style.pointerEvents = 'none';
    document.body.appendChild(video);

    // Assuming screenMaterial is the correct material asset for the TV screen
    var screenMaterial = this.screenMaterial.resource;
    screenMaterial.emissiveMap = videoTexture;
    screenMaterial.update();

    this.videoTexture = videoTexture;

    // Set up the collision event listener to play the video when triggered
    this.entity.collision.on('triggerenter', function (entity) {
        video.play()
    }, this);

    this.entity.collision.on('triggerleave', function (entity) {
        video.pause();
        video.currentTime = 0; // Optionally rewind the video
    }, this);
    
    this.upload = true;
};
// Videotexture.prototype

// update code called every frame
Videotexture.prototype.update = function(dt) {
    // Upload the video data to the texture every other frame
    this.upload = !this.upload;
    if (this.upload) {
        this.videoTexture.upload();
    }
};
