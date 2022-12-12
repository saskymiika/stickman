const UNIT = 10;

class Vector2 {
    constructor(x, y) {
        this.x = x,
        this.y = y
    }
}

class Line {
    constructor(vetor2start, length) {
        this.start = vetor2start
        this.end = new Vector2(0, 0)
        this.length = length
        this.angle = 0
        this.lineWidth = 2
        this.color = "#000000"
    }
    setStart(vetor2start) {
        this.start = vetor2start
    }
    updateEnd() {
        let endX = Math.cos(this.angle) * this.length + this.start.x,
            endY = Math.sin(this.angle) * this.length + this.start.y;
        this.end = new Vector2(endX, endY)
    }
    setLength(length) {
        this.length = length
    }
    setAngle(angle) {
        this.angle = Math.PI / 180 * angle
    }
    setLineWidth(width) {
        this.lineWidth = width
    }
    setColor(color) {
        this.color = color
    }

    draw(c) {
        c.beginPath()
        c.lineWidth = this.lineWidth
        c.strokeStyle = this.color
        c.moveTo(this.start.x, this.start.y)
        this.updateEnd()
        c.lineTo(this.end.x, this.end.y)
        c.stroke()
    }
}

class Circle {
    constructor(vector2position) {
        this.position = vector2position
        this.lineWidth = 2
        this.radius = UNIT
        this.color = "#000000"
    }
    setColor(color) {
        this.color = color
    }
    setPosition(vector2) {
        this.position = vector2
    }
    setLineWidth(width) {
        this.lineWidth = width
    }
    setRadius(radius) {
        this.radius = radius
    }
    draw(c) {
        c.beginPath()
        c.lineWidth = this.lineWidth
        c.strokeStyle = this.color
        c.fillStyle = this.color
        c.arc(this.position.x, this.position.y, this.radius, 0, 2* Math.PI)
        c.fill()
        c.stroke()
    }
}


class Stickman {
    constructor(vector2position, size) {
        this.position = vector2position
        this.size = size * UNIT
        /* bodyparts start */
        this.armJoint = null
        this.head = null
        this.body = null
        this.leftArm = null
        this.leftJoint = null
        this.leftArmLower = null
        this.rightArm = null
        this.rightJoint = null
        this.rightArmLower = null
        this.legJoint = null
        this.leftLeg = null
        this.leftknee = null
        this.leftLegLower = null
        this.leftAnckle = null
        this.leftFeet = null
        this.rightLeg = null
        this.rightknee = null
        this.rightLegLower = null
        this.rightAnckle = null
        this.rightFeet = null
        /* bodyparts end */
        this.armsAnimation = 'idle' // idle,walking,running,action,climbing,crouch
        this.legsAnimation = 'idle' // idle,walking,running,action,climbing,crouch
        this.action = 'idle' // idle,walking,meleeattack,rangedattack,magicattack,
        this.direction = 1 // [1 left | -1 right]

        this.animationTimer = 0;
        this.currentFrame = 0;
        
        this.keyframes = {
            'idle': [
                // keyframes structure: transition time, frames[]
                {
                    time: 40,
                    frames: [
                        [62, 88]
                    ]
                },
                {
                    time: 80,
                    frames: [
                        [68, 80]
                    ]
                },
                {
                    time: 120,
                    frames: [
                        [62, 88]
                    ]
                },
                {
                    time: 160,
                    frames: [
                        [68, 80]
                    ]
                },
                {
                    time: 200,
                    frames: [
                        [45, 30]
                    ]
                },
                {
                    time: 500,
                    frames: [
                        [10, 350]
                    ]
                },
            ]
        }

    }
    init() {
        let headposition = new Vector2(this.position.x, this.position.y-this.size * .45)
        
        this.head = new Circle(headposition)
        this.head.setRadius(this.size * .34)

        let linewidth = this.size *.2

        this.armJoint = new Circle(this.position)
        this.armJoint.setRadius(this.size * .09)

        this.body = new Line(this.position, this.size)
        this.body.setAngle(90)
        this.body.updateEnd()
        this.body.setLineWidth(linewidth)

        // left arm
        this.leftArm = new Line(this.position, this.size*.6)
        this.leftArm.setAngle(0)
        this.leftArm.updateEnd()
        this.leftArm.setLineWidth(linewidth)

        this.leftJoint = new Circle(new Vector2(this.leftArm.end.x, this.leftArm.end.y))
        this.leftJoint.setRadius(linewidth * .4)
        
        this.leftArmLower = new Line(this.leftArm.end, this.size*.6)
        this.leftArmLower.setAngle(0)
        this.leftArmLower.updateEnd()
        this.leftArmLower.setLineWidth(linewidth)
        

        // right arm
        this.rightArm = new Line(this.position, this.size*.6)
        this.rightArm.setAngle(180)
        this.rightArm.updateEnd()
        this.rightArm.setLineWidth(linewidth)

        this.rightJoint = new Circle(new Vector2(this.rightArm.end.x, this.rightArm.end.y))
        this.rightJoint.setRadius(linewidth *.4)
        
        this.rightArmLower = new Line(this.rightArm.end, this.size*.6)
        this.rightArmLower.setAngle(180)
        this.rightArmLower.updateEnd()
        this.rightArmLower.setLineWidth(linewidth)

        // leg joint
        this.legJoint = new Circle(this.body.end)
        this.legJoint.setRadius(linewidth * .48)

        // left leg
        this.leftLeg = new Line(this.legJoint.position, this.size*.6)
        this.leftLeg.setAngle(45)
        this.leftLeg.updateEnd()
        this.leftLeg.setLineWidth(linewidth)

        this.leftknee = new Circle(this.leftLeg.end)
        this.leftknee.setRadius(linewidth * .4)

        this.leftLegLower = new Line(this.leftknee.position, this.size*.7)
        this.leftLegLower.setAngle(80)
        this.leftLegLower.updateEnd()
        this.leftLegLower.setLineWidth(linewidth)

        this.leftAnckle = new Circle(this.leftLegLower.end)
        this.leftAnckle.setRadius(linewidth * .4)

        this.leftFeet = new Line(this.leftAnckle.position, this.size*.3)
        this.leftFeet.setAngle(0)
        this.leftFeet.updateEnd()
        this.leftFeet.setLineWidth(linewidth)

        // right leg
        this.rightLeg = new Line(this.legJoint.position, this.size*.6)
        this.rightLeg.setAngle(135)
        this.rightLeg.updateEnd()
        this.rightLeg.setLineWidth(linewidth)

        this.rightknee = new Circle(this.rightLeg.end)
        this.rightknee.setRadius(linewidth * .4)

        this.rightLegLower = new Line(this.rightknee.position, this.size*.7)
        this.rightLegLower.setAngle(100)
        this.rightLegLower.updateEnd()
        this.rightLegLower.setLineWidth(linewidth)

        this.rightAnckle = new Circle(this.rightLegLower.end)
        this.rightAnckle.setRadius(linewidth * .4)

        this.rightFeet = new Line(this.rightAnckle.position, this.size*.3)
        this.rightFeet.setAngle(180)
        this.rightFeet.updateEnd()
        this.rightFeet.setLineWidth(linewidth)
    }
    setColor(color) {
        this.armJoint.setColor(color)
        this.head.setColor(color)
        this.body.setColor(color)
        this.leftArm.setColor(color)
        this.leftJoint.setColor(color)
        this.leftArmLower.setColor(color)
        this.rightArm.setColor(color)
        this.rightJoint.setColor(color)
        this.rightArmLower.setColor(color)
        this.legJoint.setColor(color)
        this.leftLeg.setColor(color)
        this.leftknee.setColor(color)
        this.leftLegLower.setColor(color)
        this.leftAnckle.setColor(color)
        this.leftFeet.setColor(color)
        this.rightLeg.setColor(color)
        this.rightknee.setColor(color)
        this.rightLegLower.setColor(color)
        this.rightAnckle.setColor(color)
        this.rightFeet.setColor(color)
    }
    updateBody(angle) {
        this.body.setStart(this.position)
        this.body.setAngle(angle)
        this.body.updateEnd()
    }
    updateLeftArm(angle, angle2) {
        this.leftArm.setStart(this.armJoint.position)
        this.leftArm.setAngle(angle)
        this.leftArm.updateEnd()
        this.leftJoint.setPosition(this.leftArm.end)
        this.leftArmLower.setStart(this.leftJoint.position)
        this.leftArmLower.setAngle(angle2)
        this.leftArmLower.updateEnd()
    }
    updateRightArm(angle, angle2) {
        this.rightArm.setStart(this.armJoint.position)
        this.rightArm.setAngle(angle)
        this.rightArm.updateEnd()
        this.rightJoint.setPosition(this.rightArm.end)
        this.rightArmLower.setStart(this.rightJoint.position)
        this.rightArmLower.setAngle(angle2)
        this.rightArmLower.updateEnd()
    }
    updateLeftLeg(angle, angle2, angle3) {
        this.leftLeg.setStart(this.legJoint.position)
        this.leftLeg.setAngle(angle)
        this.leftLeg.updateEnd()
        this.leftknee.setPosition(this.leftLeg.end)
        this.leftLegLower.setStart(this.leftknee.position)
        this.leftLegLower.setAngle(angle2)
        this.leftLegLower.updateEnd()
        this.leftAnckle.setPosition(this.leftLegLower.end)
        this.leftFeet.setStart(this.leftAnckle.position)
        this.leftFeet.setAngle(angle3)
        this.leftFeet.updateEnd()
    }
    updateRightLeg(angle, angle2, angle3) {
        this.rightLeg.setStart(this.legJoint.position)
        this.rightLeg.setAngle(angle)
        this.rightLeg.updateEnd()
        this.rightknee.setPosition(this.rightLeg.end)
        this.rightLegLower.setStart(this.rightknee.position)
        this.rightLegLower.setAngle(angle2)
        this.rightLegLower.updateEnd()
        this.rightAnckle.setPosition(this.rightLegLower.end)
        this.rightFeet.setStart(this.rightAnckle.position)
        this.rightFeet.setAngle(angle3)
        this.rightFeet.updateEnd()
    }
    keyDown(key) {
        this.action = 'walking'
    }
    keyUp(key) {
        this.action = 'idle'
    }
    updateBodyparts() {
        if(this.action === 'idle') {
            // arms
            this.armJoint.setPosition(this.position)

            // left arm update
            if(this.keyframes[this.action]) {
                if(!this.keyframes[this.action][this.currentFrame]) {
                    this.currentFrame = 0
                    this.animationTimer = 0
                }
                // if current frame exist
                if(this.keyframes[this.action][this.currentFrame]) {

                    this.animationTimer++;

                    if(this.animationTimer < this.keyframes[this.action][this.currentFrame].time){

                        let ang1 = this.leftArm.angle * 180 / Math.PI
                        let offsetangle1 = this.keyframes[this.action][this.currentFrame].frames[0][0] - ang1
                        let final1 = offsetangle1 / this.keyframes[this.action][this.currentFrame].frames[0][0] + ang1

                        let ang2 = this.leftArmLower.angle * 180 / Math.PI
                        let offsetangle2 = this.keyframes[this.action][this.currentFrame].frames[0][1] - ang2
                        let final2 = offsetangle2 / this.keyframes[this.action][this.currentFrame].frames[0][1] + ang2
                        
                        this.updateLeftArm( final1, final2 )

                    }
                    else if(this.animationTimer >= this.keyframes[this.action][this.currentFrame].time) {
                        this.currentFrame++;
                    }
                }
            }
            else
                this.updateLeftArm(62, 88)
            
            // right arm update
            this.updateRightArm(180-62, 180-88)

            //body
            this.updateBody(90)
            
            //legs
            this.legJoint.setPosition(this.body.end)

            //left leg
            this.updateLeftLeg(76, 90, 0)

            //right leg
            this.updateRightLeg(180-76, 180-90, 180-0)
        }
    }
    draw(c) {
        this.updateBodyparts()

        this.body.draw(c)
        this.armJoint.draw(c)
        this.head.draw(c)

        this.leftArm.draw(c)
        this.leftJoint.draw(c)
        this.leftArmLower.draw(c)

        this.rightArm.draw(c)
        this.rightJoint.draw(c)
        this.rightArmLower.draw(c)
        
        this.legJoint.draw(c)

        this.leftLeg.draw(c)
        this.leftknee.draw(c)
        this.leftLegLower.draw(c)
        this.leftAnckle.draw(c)
        this.leftFeet.draw(c)

        this.rightLeg.draw(c)
        this.rightknee.draw(c)
        this.rightLegLower.draw(c)
        this.rightAnckle.draw(c)
        this.rightFeet.draw(c)
    }
}