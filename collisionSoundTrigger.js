
// This script allows you to play audio when inside a collision area of the associated object
// You must give the object a collision component and a sound component
// The sound component must have 1 audio track. The audio track in the top slot position will be used for this interaction.
// Sound behaviors adjust how sound is played, resumed, or ignored based on interaction with the collision

var CollisionSoundTrigger = pc.createScript('collisionSoundTrigger');

CollisionSoundTrigger.attributes.add('exitRule', {
    type: 'number',
    title: 'Sound behavior',
    default: 1,
    enum: [
        { 'Stop on exit':1 },
        { 'Pause on exit':2 },
        { 'Play only once':3 },
        { 'Play on exit':4 }
    ]
});


CollisionSoundTrigger.prototype.initialize = function() {
    this.entity.collision.on('triggerenter', this.onTriggerEnter, this);
    this.entity.collision.on('triggerleave', this.onTriggerLeave, this);
    this.entity.isSoundPaused = false;
    this.entity.playedOnce = false;
    
    
    
};


CollisionSoundTrigger.prototype.onTriggerEnter = function(entity) {
    // Retrieve the first slot name from the sound component
    var slotNames = Object.keys(this.entity.sound.slots);
    var firstSlotName = slotNames.length > 0 ? slotNames[0] : null;
    
    if (!firstSlotName) {
        console.log("No sound slots found on sound entity.");
        return;
    }
    if (!this.entity.sound) return;

    if ((this.exitRule === 1 || this.exitRule === 4) && !this.entity.playedOnce) {
        this.entity.sound.play(firstSlotName);
        this.entity.isSoundPaused = false;
    } else if (this.exitRule === 2 && !this.entity.playedOnce) {
        if (this.entity.isSoundPaused) {
            this.entity.sound.resume(firstSlotName);
        } else {
            this.entity.sound.play(firstSlotName);
        }
        this.entity.isSoundPaused = false;
    } else if (this.exitRule === 3 && !this.entity.playedOnce) {
        this.entity.sound.play(firstSlotName);
        this.entity.playedOnce = true; // Ensure sound plays only once for case 3
    }
};


CollisionSoundTrigger.prototype.onTriggerLeave = function(entity) {
    // Retrieve the first slot name from the sound component
    var slotNames = Object.keys(this.entity.sound.slots);
    var firstSlotName = slotNames.length > 0 ? slotNames[0] : null;
    
    if (!firstSlotName) {
        console.log("No sound slots found on sound entity.");
        return;
    }
    if (!this.entity.sound) return;

    switch(this.exitRule) {
        case 1: // 'Stop audio'
            this.entity.sound.stop(firstSlotName);
            break;
        case 2: // 'Pause audio'
            this.entity.sound.pause(firstSlotName);
            this.entity.isSoundPaused = true;
            break;
        case 3: // 'Do nothing'
            // No action taken
            break;
        case 4: // 'Keep playing'
            // No action taken
            break;
        
    }
};
