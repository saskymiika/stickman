
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