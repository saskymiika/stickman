
class StickmanKeyframes {
    constructor() {

        this.action = 'idle' // idle,walking,meleeattack,rangedattack,magicattack,
        this.direction = 1 // [1 left | -1 right]
        this.animationTimer = 0;
        this.currentFrame = 0;

        this.keyframes = {
            'idle': [
                // keyframes structure: transition time, frames[]
                {
                    time: 80,
                    frames: [ // update angles of the body parts..
                        [-10, -90],             // left arm
                        [180-60, 180+80],       // right arm
                        [76, 90, 0],            // left leg
                        [180-76, 180-90, 180-0],// right leg
                        [280]                    // body
                    ]
                },
                {
                    time: 160,
                    frames: [
                        [60, -80],
                        [180+10, 180+90],
                        [76, 90, 0],
                        [180-76, 180-90, 180-0],
                        [260]
                    ]
                },
            ]
        }
    }
    // 
    setKeyframes(keyframesAnimations) {
        this.keyframes(keyframesAnimations)
    }
}