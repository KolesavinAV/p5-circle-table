const canvasSize = 750
const circlesCount = 4
const circleSize = canvasSize / circlesCount
const cellPadding = 6
const drawGuideLines = true
let circles = []

function setup() {
    createCanvas(canvasSize, canvasSize)
    colorMode(HSB)
    smooth();

    let speed = 0.01
    for (let i = 0; i < circlesCount; i++) {
        if (i == 0) continue

        circles.push(new Circle({
            x: i * circleSize + circleSize / 2,
            y: circleSize / 2,
            speed: speed,
            color: map(i, 0, circlesCount, 0, 255),
            size: circleSize / 2 - cellPadding,
            horizon: true,
            drawGuideLines
        }))
        //, , , , )
        speed += 0.008
    }
    speed = 0.01
    for (let i = 0; i < circlesCount; i++) {
        if (i == 0) continue
        circles.push(new Circle({
            y: i * circleSize + circleSize / 2,
            x: circleSize / 2,
            speed: speed,
            color: map(i, 0, circlesCount, 0, 255),
            size: circleSize / 2 - cellPadding,
            // angle: PI / 2,
            drawGuideLines
        }))
        //, i * circleSize + circleSize / 2, circleSize / 2 - cellPadding, speed, map(i, 0, circlesCount, 0, 255), 
        speed += 0.008
    }
}

function draw() {
    background(8)
    stroke(0, 0, 255, 0.3)
    for (let x = 1; x <= circlesCount; x++) {
        line(x * circleSize, 0, x * circleSize, height)
    }
    for (let y = 1; y <= circlesCount; y++) {
        line(0, y * circleSize, width, y * circleSize)
    }

    for (let c of circles) {
        c.rotate()
        c.display()
    }

    // c.display()
    // c.rotate()
}

function mouseMoved() {
    // c.color = map(mouseX, 0, width, 0, 255)
}

class Circle {

    constructor(config) {
        this.x = config.x
        this.y = config.y
        this.size = config.size
        this.speed = config.speed

        this.angle = 0
        if (config.angle) {
            this.angle = config.angle
        }
        this.color = map(config.speed, 0, 0.09, 0, 255)

        this.point = {}
        this.point.x = sin(this.angle) * this.size
        this.point.y = cos(this.angle) * this.size

        this.horizon = config.horizon
        this.drawGuideLines = config.drawGuideLines
    }

    rotate() {
        this.angle += this.speed
        if (this.angle >= TWO_PI) {
            this.angle = 0
        }

        stroke(0, 0, 255, 0.1)
        if (this.drawGuideLines) {
            // console.log('draw line')
            if (this.horizon) {
                this.translateToThis(() => {
                    stroke(0.5)
                    stroke(0, 0, 255, 0.1)
                    line(this.point.x, this.point.y, this.point.x, height)
                })
            } else {
                this.translateToThis(() => {
                    stroke(0.5)
                    stroke(0, 0, 255, 0.1)
                    line(this.point.x, this.point.y, width, this.point.y)
                })
            }
        }

        this.updatePointPosition()
    }

    display() {
        push()
        translate(this.x, this.y)
        //Circle
        noFill()
        strokeWeight(2)
        stroke(this.color, 255, 255, 0.4)
        circle(0, 0, this.size)

        //Point
        strokeWeight(5)
        // stroke(this.color, 255, 255, 1)
        stroke(255)
        point(this.point.x, this.point.y)

        pop()
    }

    updatePointPosition() {
        this.point.x = sin(this.angle) * this.size
        this.point.y = cos(this.angle) * this.size
    }

    translateToThis(foo) {
        push()
        translate(this.x, this.y)

        foo()

        pop()
    }
}