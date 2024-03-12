// Add the Script Component to an object
// Select a material to animate in the scene

var ScrollingTexture = pc.createScript('scrollingTexture');

ScrollingTexture.attributes.add('materialAsset', {
    type: 'asset'
});

ScrollingTexture.attributes.add('speed', {
    type: 'vec2'
});

ScrollingTexture.tmpVec2 = new pc.Vec2();
ScrollingTexture.tmpOffset = new pc.Vec2();

// initialize code called once per entity
ScrollingTexture.prototype.initialize = function() {
    // get the material that we will animate
    if (this.materialAsset) {
        this.material = this.materialAsset.resource;
    } 
};

// update code called every frame
ScrollingTexture.prototype.update = function(dt) {
    var velocity = ScrollingTexture.tmpVec2;
    var offset = ScrollingTexture.tmpOffset;
    
    // Calculate how much to offset the texture
    // Speed * dt
    velocity.set(this.speed.x, this.speed.y);
    velocity.scale(dt);

    // Update the diffuse and normal map offset values
    offset.copy(this.material.diffuseMapOffset);
    offset.add(velocity);
    
    this.material.diffuseMapOffset = offset;
    this.material.normalMapOffset = offset;
    this.material.update();
};
