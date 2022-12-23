
class Stickman extends StickmanKeyframes {
    constructor(vector2position, size) {
        super()
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

    }
    init() {
        let headposition = new Vector2(this.position.x, this.position.y-this.size * .45)
        
        this.head = new Circle(headposition)
        this.head.setRadius(this.size * .34)

        let linewidth = this.size *.2


        this.body = new Line(this.position, this.size)
        this.body.setAngle(270)
        this.body.updateEnd()
        this.body.setLineWidth(linewidth)

        this.armJoint = new Circle(this.body.end)
        this.armJoint.setRadius(this.size * .09)

        // left arm
        this.leftArm = new Line(this.position, this.size*.6)
        this.leftArm.setAngle(0)
        this.leftArm.updateEnd()
        this.leftArm.setLineWidth(linewidth)

        this.leftJoint = new Circle(new Vector2(this.leftArm.end.x, this.leftArm.end.y))
        this.leftJoint.setRadius(linewidth *.4)
        this.leftJoint.setLineWidth(linewidth *.1)
        
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
        this.rightJoint.setLineWidth(linewidth *.1)
        
        this.rightArmLower = new Line(this.rightArm.end, this.size*.6)
        this.rightArmLower.setAngle(180)
        this.rightArmLower.updateEnd()
        this.rightArmLower.setLineWidth(linewidth)

        // leg joint
        this.legJoint = new Circle(this.body.end)
        this.legJoint.setRadius(linewidth * .48)
        this.legJoint.setLineWidth(linewidth *.1)

        // left leg
        this.leftLeg = new Line(this.legJoint.position, this.size*.6)
        this.leftLeg.setAngle(45)
        this.leftLeg.updateEnd()
        this.leftLeg.setLineWidth(linewidth)

        this.leftknee = new Circle(this.leftLeg.end)
        this.leftknee.setRadius(linewidth * .4)
        this.leftknee.setLineWidth(linewidth *.1)

        this.leftLegLower = new Line(this.leftknee.position, this.size*.7)
        this.leftLegLower.setAngle(80)
        this.leftLegLower.updateEnd()
        this.leftLegLower.setLineWidth(linewidth)

        this.leftAnckle = new Circle(this.leftLegLower.end)
        this.leftAnckle.setRadius(linewidth * .4)
        this.leftAnckle.setLineWidth(linewidth *.1)

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
        this.rightknee.setLineWidth(linewidth *.1)

        this.rightLegLower = new Line(this.rightknee.position, this.size*.7)
        this.rightLegLower.setAngle(100)
        this.rightLegLower.updateEnd()
        this.rightLegLower.setLineWidth(linewidth)

        this.rightAnckle = new Circle(this.rightLegLower.end)
        this.rightAnckle.setRadius(linewidth * .4)
        this.rightAnckle.setLineWidth(linewidth *.1)

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

    updateArmJoin() {
        this.armJoint.setPosition(this.body.end)
    }
    updateLegJoin() {
        this.legJoint.setPosition(this.body.start)
    }
    updateHeadPosition() {
        
        let endX = Math.cos(this.body.angle) * (this.size * 1.44) + this.body.start.x,
            endY = Math.sin(this.body.angle) * (this.size * 1.44) + this.body.start.y;
        let updHead = new Vector2(endX, endY)

        this.head.setPosition(updHead)
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
        this.currentFrame = 0
        this.animationTimer = 0
    }
    getUpdatedPosition(frametime, currentangle, targetangle) {
        let timeOffset = frametime - this.animationTimer

        let degrees = currentangle * 180 / Math.PI
        let offsetangle = targetangle - degrees

        return offsetangle / timeOffset + degrees
    }
    updateBodyparts() {
            if(this.keyframes[this.action]) {
                if(!this.keyframes[this.action][this.currentFrame]) {
                    this.currentFrame = 0
                    this.animationTimer = 0
                }
                // if current frame exist
                if(this.keyframes[this.action][this.currentFrame]) {
                    if(this.animationTimer < this.keyframes[this.action][this.currentFrame].time) {

                        // update left arm animations
                        let leftArmupdated = this.getUpdatedPosition(
                            this.keyframes[this.action][this.currentFrame].time,
                            this.leftArm.angle, 
                            this.keyframes[this.action][this.currentFrame].frames[0][0])
                        let leftArmLowerupdated = this.getUpdatedPosition(
                            this.keyframes[this.action][this.currentFrame].time,
                            this.leftArmLower.angle, 
                            this.keyframes[this.action][this.currentFrame].frames[0][1])
                        this.updateLeftArm( leftArmupdated, leftArmLowerupdated )

                        // update right arm animations
                        let rightArmupdated = this.getUpdatedPosition(
                            this.keyframes[this.action][this.currentFrame].time,
                            this.rightArm.angle, 
                            this.keyframes[this.action][this.currentFrame].frames[1][0])
                        let rightArmLowerupdated = this.getUpdatedPosition(
                            this.keyframes[this.action][this.currentFrame].time,
                            this.rightArmLower.angle, 
                            this.keyframes[this.action][this.currentFrame].frames[1][1])
                        this.updateRightArm( rightArmupdated, rightArmLowerupdated )

                        //update left leg animation
                        let leftLegupdated = this.getUpdatedPosition(
                            this.keyframes[this.action][this.currentFrame].time,
                            this.leftLeg.angle, 
                            this.keyframes[this.action][this.currentFrame].frames[2][0])
                        let leftLowerupdated = this.getUpdatedPosition(
                            this.keyframes[this.action][this.currentFrame].time,
                            this.leftLegLower.angle, 
                            this.keyframes[this.action][this.currentFrame].frames[2][1])
                        let leftfeetupdated = this.getUpdatedPosition(
                            this.keyframes[this.action][this.currentFrame].time,
                            this.leftFeet.angle, 
                            this.keyframes[this.action][this.currentFrame].frames[2][2])
                        this.updateLeftLeg( leftLegupdated, leftLowerupdated, leftfeetupdated )

                        //update right leg animation
                        let rightLegupdated = this.getUpdatedPosition(
                            this.keyframes[this.action][this.currentFrame].time,
                            this.rightLeg.angle, 
                            this.keyframes[this.action][this.currentFrame].frames[3][0])
                        let rightLowerupdated = this.getUpdatedPosition(
                            this.keyframes[this.action][this.currentFrame].time,
                            this.rightLegLower.angle, 
                            this.keyframes[this.action][this.currentFrame].frames[3][1])
                        let rightfeetupdated = this.getUpdatedPosition(
                            this.keyframes[this.action][this.currentFrame].time,
                            this.rightFeet.angle, 
                            this.keyframes[this.action][this.currentFrame].frames[3][2])
                        this.updateRightLeg( rightLegupdated, rightLowerupdated, rightfeetupdated )

                        // update body animation
                        let bodyUpdated = this.getUpdatedPosition(
                            this.keyframes[this.action][this.currentFrame].time,
                            this.body.angle,
                            this.keyframes[this.action][this.currentFrame].frames[4][0]
                        )
                        this.updateBody(bodyUpdated)
                        
                        //update joints
                        this.updateArmJoin()
                        this.updateLegJoin()
                        this.updateHeadPosition()
                        
                    }
                    this.animationTimer++;
                    if(this.animationTimer >= this.keyframes[this.action][this.currentFrame].time) {
                        this.currentFrame++;
                    }
                }
            }
            else {
                    // if animation does not exist
                    //legs
                    this.armJoint.setPosition(this.body.start)

                    // left arm update
                    this.updateLeftArm(0, 0)

                    // right arm update
                    this.updateRightArm(180, 180)
        
                    //body
                    this.updateBody(90)
                    
                    //legs
                    this.legJoint.setPosition(this.body.end)
        
                    //left leg
                    this.updateLeftLeg(80, 80, 0)
        
                    //right leg
                    this.updateRightLeg(180-80, 180-80, 180-0)
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