// window.addEventListener('DOMContentLoaded', (event) => {
    const squaretable = {} // this section of code is an optimization for use of the hypotenuse function on Line and LineOP objects
    for (let t = 0; t < 10000000; t++) {
        squaretable[`${t}`] = Math.sqrt(t)
        if (t > 999) {
            t += 9
        }
    }
    let video_recorder
    let recording = 0
    // function CanvasCaptureToWEBM(canvas, bitrate) {
    //     // the video_recorder is set to  '= new CanvasCaptureToWEBM(canvas, 4500000);' in the setup, 
    //     // it uses the same canvas as the rest of the file.
    //     // to start a recording call .record() on video_recorder
    //     /*
    //     for example, 
    //     if(keysPressed['-'] && recording == 0){
    //         recording = 1
    //         video_recorder.record()
    //     }
    //     if(keysPressed['='] && recording == 1){
    //         recording = 0
    //         video_recorder.stop()
    //         video_recorder.download('File Name As A String.webm')
    //     }
    //     */
    //     this.record = Record
    //     this.stop = Stop
    //     this.download = saveToDownloads
    //     let blobCaptures = []
    //     let outputFormat = {}
    //     let recorder = {}
    //     let canvasInput = canvas.captureStream()
    //     if (typeof canvasInput == undefined || !canvasInput) {
    //         return
    //     }
    //     const video = document.createElement('video')
    //     video.style.display = 'none'
    
    //     function Record() {
    //         let formats = [
    //             'video/vp8',
    //             "video/webm",
    //             'video/webm,codecs=vp9',
    //             "video/webm\;codecs=vp8",
    //             "video/webm\;codecs=daala",
    //             "video/webm\;codecs=h264",
    //             "video/mpeg"
    //         ];
    
    //         for (let t = 0;t<formats.length;t++) {
    //             if (MediaRecorder.isTypeSupported(formats[t])) {
    //                 outputFormat = formats[t]
    //                 break
    //             }
    //         }
    //         if (typeof outputFormat != "string") {
    //             return
    //         }else{
    //             let videoSettings = {
    //                 mimeType: outputFormat,
    //                 videoBitsPerSecond: bitrate || 2000000 // 2Mbps
    //             };
    //             blobCaptures = []
    //             try {
    //                 recorder = new MediaRecorder(canvasInput, videoSettings)
    //             } catch (error) {
    //                 return;
    //             }
    //             recorder.onstop = handleStop
    //             recorder.ondataavailable = handleAvailableData
    //             recorder.start(100)
    //         } 
    //     }
    //     function handleAvailableData(event) {
    //         if (event.data && event.data.size > 0) {
    //             blobCaptures.push(event.data)
    //         }
    //     }
    //     function handleStop() {
    //         const superBuffer = new Blob(blobCaptures, { type: outputFormat })
    //         video.src = window.URL.createObjectURL(superBuffer)
    //     }
    //     function Stop() {
    //         recorder.stop()
    //         video.controls = true
    //     }
    //     function saveToDownloads(input) { // specifying a file name for the output
    //         const name = input || 'video_out.webm'
    //         const blob = new Blob(blobCaptures, { type: outputFormat })
    //         const url = window.URL.createObjectURL(blob)
    //         const storageElement = document.createElement('a')
    //         storageElement.style.display = 'none'
    //         storageElement.href = url
    //         storageElement.download = name
    //         document.body.appendChild(storageElement)
    //         storageElement.click()
    //         setTimeout(() => {
    //             document.body.removeChild(storageElement)
    //             window.URL.revokeObjectURL(url)
    //         }, 100)
    //     }
    // }
    const gamepadAPI = {
        controller: {},
        turbo: true,
        connect: function(evt) {
            if (navigator.getGamepads()[0] != null) {
                gamepadAPI.controller = navigator.getGamepads()[0]
                gamepadAPI.turbo = true;
            } else if (navigator.getGamepads()[1] != null) {
                gamepadAPI.controller = navigator.getGamepads()[0]
                gamepadAPI.turbo = true;
            } else if (navigator.getGamepads()[2] != null) {
                gamepadAPI.controller = navigator.getGamepads()[0]
                gamepadAPI.turbo = true;
            } else if (navigator.getGamepads()[3] != null) {
                gamepadAPI.controller = navigator.getGamepads()[0]
                gamepadAPI.turbo = true;
            }
            for (let i = 0; i < gamepads.length; i++) {
                if (gamepads[i] === null) {
                    continue;
                }
                if (!gamepads[i].connected) {
                    continue;
                }
            }
        },
        disconnect: function(evt) {
            gamepadAPI.turbo = false;
            delete gamepadAPI.controller;
        },
        update: function() {
            gamepadAPI.controller = navigator.getGamepads()[0]
            gamepadAPI.buttonsCache = []; // clear the buttons cache
            for (var k = 0; k < gamepadAPI.buttonsStatus.length; k++) { // move the buttons status from the previous frame to the cache
                gamepadAPI.buttonsCache[k] = gamepadAPI.buttonsStatus[k];
            }
            gamepadAPI.buttonsStatus = []; // clear the buttons status
            var c = gamepadAPI.controller || {}; // get the gamepad object
            var pressed = [];
            if (c.buttons) {
                for (var b = 0, t = c.buttons.length; b < t; b++) { // loop through buttons and push the pressed ones to the array
                    if (c.buttons[b].pressed) {
                        pressed.push(gamepadAPI.buttons[b]);
                    }
                }
            }
            var axes = [];
            if (c.axes) {
                for (var a = 0, x = c.axes.length; a < x; a++) { // loop through axes and push their values to the array
                    axes.push(c.axes[a].toFixed(2));
                }
            }
            gamepadAPI.axesStatus = axes; // assign received values
            gamepadAPI.buttonsStatus = pressed;
            // ////console.log(pressed); // return buttons for debugging purposes
            return pressed;
        },
        buttonPressed: function(button, hold) {
            var newPress = false;
            for (var i = 0, s = gamepadAPI.buttonsStatus.length; i < s; i++) { // loop through pressed buttons
                if (gamepadAPI.buttonsStatus[i] == button) { // if we found the button we're looking for...
                    newPress = true; // set the boolean variable to true
                    if (!hold) { // if we want to check the single press
                        for (var j = 0, p = gamepadAPI.buttonsCache.length; j < p; j++) { // loop through the cached states from the previous frame
                            if (gamepadAPI.buttonsCache[j] == button) { // if the button was already pressed, ignore new press
                                newPress = false;
                            }
                        }
                    }
                }
            }
            return newPress;
        },
        buttons: [
            'A', 'B', 'X', 'Y', 'LB', 'RB', 'Left-Trigger', 'Right-Trigger', 'Back', 'Start', 'Axis-Left', 'Axis-Right', 'DPad-Up', 'DPad-Down', 'DPad-Left', 'DPad-Right', "Power"
        ],
        buttonsCache: [],
        buttonsStatus: [],
        axesStatus: []
    };
    let canvas
    let canvas_context
    let keysPressed = {}
    let FLEX_engine
    let TIP_engine = {}
    let XS_engine
    let YS_engine
    //(2).valueOf() 
    //2
    class Point {
        constructor(x, y) {
            this.x = x
            this.y = y
            this.radius = 0
        }
        pointDistance(point) {
            return (new LineOP(this, point, "transparent", 0)).hypotenuse()
        }
    }
    
    class Vector { // vector math and physics if you prefer this over vector components on circles
        constructor(object = (new Point(0, 0)), xmom = 0, ymom = 0) {
            this.xmom = xmom
            this.ymom = ymom
            this.object = object
        }
        isToward(point) {
            let link = new LineOP(this.object, point)
            let dis1 = link.squareDistance()
            let dummy = new Point(this.object.x + this.xmom, this.object.y + this.ymom)
            let link2 = new LineOP(dummy, point)
            let dis2 = link2.squareDistance()
            if (dis2 < dis1) {
                return true
            } else {
                return false
            }
        }
        rotate(angleGoal) {
            let link = new Line(this.xmom, this.ymom, 0, 0)
            let length = link.hypotenuse()
            let x = (length * Math.cos(angleGoal))
            let y = (length * Math.sin(angleGoal))
            this.xmom = x
            this.ymom = y
        }
        magnitude() {
            return (new Line(this.xmom, this.ymom, 0, 0)).hypotenuse()
        }
        normalize(size = 1) {
            let magnitude = this.magnitude()
            this.xmom /= magnitude
            this.ymom /= magnitude
            this.xmom *= size
            this.ymom *= size
        }
        multiply(vect) {
            let point = new Point(0, 0)
            let end = new Point(this.xmom + vect.xmom, this.ymom + vect.ymom)
            return point.pointDistance(end)
        }
        add(vect) {
            return new Vector(this.object, this.xmom + vect.xmom, this.ymom + vect.ymom)
        }
        subtract(vect) {
            return new Vector(this.object, this.xmom - vect.xmom, this.ymom - vect.ymom)
        }
        divide(vect) {
            return new Vector(this.object, this.xmom / vect.xmom, this.ymom / vect.ymom) //be careful with this, I don't think this is right
        }
        draw() {
            let dummy = new Point(this.object.x + this.xmom, this.object.y + this.ymom)
            let link = new LineOP(this.object, dummy, "#FFFFFF", 1)
            link.draw()
        }
    }
    class Line {
        constructor(x, y, x2, y2, color, width) {
            this.x1 = x
            this.y1 = y
            this.x2 = x2
            this.y2 = y2
            this.color = color
            this.width = width
        }
        angle() {
            return Math.atan2(this.y1 - this.y2, this.x1 - this.x2)
        }
        squareDistance() {
            let xdif = this.x1 - this.x2
            let ydif = this.y1 - this.y2
            let squareDistance = (xdif * xdif) + (ydif * ydif)
            return squareDistance
        }
        hypotenuse() {
            let xdif = this.x1 - this.x2
            let ydif = this.y1 - this.y2
            let hypotenuse = (xdif * xdif) + (ydif * ydif)
            if (hypotenuse < 10000000 - 1) {
                if (hypotenuse > 1000) {
                    return squaretable[`${Math.round(10 * Math.round((hypotenuse * .1)))}`]
                } else {
                    return squaretable[`${Math.round(hypotenuse)}`]
                }
            } else {
                return Math.sqrt(hypotenuse)
            }
        }
        draw() {
            let linewidthstorage = canvas_context.lineWidth
            canvas_context.strokeStyle = this.color
            canvas_context.lineWidth = this.width
            canvas_context.beginPath()
            canvas_context.moveTo(this.x1, this.y1)
            canvas_context.lineTo(this.x2, this.y2)
            canvas_context.stroke()
            canvas_context.lineWidth = linewidthstorage
        }
    }
    class LineOP {
        constructor(object, target, color, width) {
            this.object = object
            this.target = target
            this.color = color
            this.width = width
        }
        squareDistance() {
            let xdif = this.object.x - this.target.x
            let ydif = this.object.y - this.target.y
            let squareDistance = (xdif * xdif) + (ydif * ydif)
            return squareDistance
        }
        hypotenuse() {
            let xdif = this.object.x - this.target.x
            let ydif = this.object.y - this.target.y
            let hypotenuse = (xdif * xdif) + (ydif * ydif)
            if (hypotenuse < 10000000 - 1) {
                if (hypotenuse > 1000) {
                    return squaretable[`${Math.round(10 * Math.round((hypotenuse * .1)))}`]
                } else {
                    return squaretable[`${Math.round(hypotenuse)}`]
                }
            } else {
                return Math.sqrt(hypotenuse)
            }
        }
        angle() {
            return Math.atan2(this.object.y - this.target.y, this.object.x - this.target.x)
        }
        draw() {
            let linewidthstorage = canvas_context.lineWidth
            canvas_context.strokeStyle = this.color
            canvas_context.lineWidth = this.width
            canvas_context.beginPath()
            canvas_context.moveTo(this.object.x, this.object.y)
            canvas_context.lineTo(this.target.x, this.target.y)
            canvas_context.stroke()
            canvas_context.lineWidth = linewidthstorage
        }
    }
    class Triangle {
        constructor(x, y, color, length, fill = 0, strokeWidth = 0, leg1Ratio = 1, leg2Ratio = 1, heightRatio = 1) {
            this.x = x
            this.y = y
            this.color = color
            this.length = length
            this.x1 = this.x + this.length * leg1Ratio
            this.x2 = this.x - this.length * leg2Ratio
            this.tip = this.y - this.length * heightRatio
            this.accept1 = (this.y - this.tip) / (this.x1 - this.x)
            this.accept2 = (this.y - this.tip) / (this.x2 - this.x)
            this.fill = fill
            this.stroke = strokeWidth
        }
        draw() {
            canvas_context.strokeStyle = this.color
            canvas_context.stokeWidth = this.stroke
            canvas_context.beginPath()
            canvas_context.moveTo(this.x, this.y)
            canvas_context.lineTo(this.x1, this.y)
            canvas_context.lineTo(this.x, this.tip)
            canvas_context.lineTo(this.x2, this.y)
            canvas_context.lineTo(this.x, this.y)
            if (this.fill == 1) {
                canvas_context.fill()
            }
            canvas_context.stroke()
            canvas_context.closePath()
        }
        isPointInside(point) {
            if (point.x <= this.x1) {
                if (point.y >= this.tip) {
                    if (point.y <= this.y) {
                        if (point.x >= this.x2) {
                            this.accept1 = (this.y - this.tip) / (this.x1 - this.x)
                            this.accept2 = (this.y - this.tip) / (this.x2 - this.x)
                            this.basey = point.y - this.tip
                            this.basex = point.x - this.x
                            if (this.basex == 0) {
                                return true
                            }
                            this.slope = this.basey / this.basex
                            if (this.slope >= this.accept1) {
                                return true
                            } else if (this.slope <= this.accept2) {
                                return true
                            }
                        }
                    }
                }
            }
            return false
        }
    }
    class Rectangle {
        constructor(x, y, width, height, color, fill = 1, stroke = 0, strokeWidth = 1) {
            this.x = x
            this.y = y
            this.height = height
            this.width = width
            this.color = color
            this.xmom = 0
            this.ymom = 0
            this.stroke = stroke
            this.strokeWidth = strokeWidth
            this.fill = fill
        }
        draw() {
            canvas_context.strokeStyle = this.color
            canvas_context.lineWidth = 3
            canvas_context.strokeRect(this.x, this.y, this.width, this.height)
        }
        move() {
            this.x += this.xmom
            this.y += this.ymom
        }
        isPointInside(point) {
            if (point.x >= this.x) {
                if (point.y >= this.y) {
                    if (point.x <= this.x + this.width) {
                        if (point.y <= this.y + this.height) {
                            return true
                        }
                    }
                }
            }
            return false
        }
        doesPerimeterTouch(point) {
            if (point.x + point.radius >= this.x) {
                if (point.y + point.radius >= this.y) {
                    if (point.x - point.radius <= this.x + this.width) {
                        if (point.y - point.radius <= this.y + this.height) {
                            return true
                        }
                    }
                }
            }
            return false
        }
    }
    class Circle {
        constructor(x, y, radius, color, xmom = 0, ymom = 0, friction = 1, reflect = 0, strokeWidth = 0, strokeColor = "transparent") {
            this.x = x
            this.y = y
            this.radius = radius
            this.color = color
            this.xmom = xmom
            this.ymom = ymom
            this.friction = friction
            this.reflect = reflect
            this.strokeWidth = strokeWidth
            this.strokeColor = strokeColor
        }
        draw() {
            canvas_context.lineWidth = 2
            canvas_context.strokeStyle = this.color
            canvas_context.beginPath();
            if (this.radius > 0) {
                canvas_context.arc(this.x, this.y, this.radius, 0, (Math.PI * 2), true)
                canvas_context.fillStyle = this.color
                // canvas_context.fill()
                canvas_context.stroke();
            } else {
                //console.l\og("The circle is below a radius of 0, and has not been drawn. The circle is:", this)
            }
        }
        move() {
            if (this.reflect == 1) {
                if (this.x + this.radius > canvas.width) {
                    if (this.xmom > 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y + this.radius > canvas.height) {
                    if (this.ymom > 0) {
                        this.ymom *= -1
                    }
                }
                if (this.x - this.radius < 0) {
                    if (this.xmom < 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y - this.radius < 0) {
                    if (this.ymom < 0) {
                        this.ymom *= -1
                    }
                }
            }
            this.x += this.xmom
            this.y += this.ymom
        }
        unmove() {
            if (this.reflect == 1) {
                if (this.x + this.radius > canvas.width) {
                    if (this.xmom > 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y + this.radius > canvas.height) {
                    if (this.ymom > 0) {
                        this.ymom *= -1
                    }
                }
                if (this.x - this.radius < 0) {
                    if (this.xmom < 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y - this.radius < 0) {
                    if (this.ymom < 0) {
                        this.ymom *= -1
                    }
                }
            }
            this.x -= this.xmom
            this.y -= this.ymom
        }
        frictiveMove() {
            if (this.reflect == 1) {
                if (this.x + this.radius > canvas.width) {
                    if (this.xmom > 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y + this.radius > canvas.height) {
                    if (this.ymom > 0) {
                        this.ymom *= -1
                    }
                }
                if (this.x - this.radius < 0) {
                    if (this.xmom < 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y - this.radius < 0) {
                    if (this.ymom < 0) {
                        this.ymom *= -1
                    }
                }
            }
            this.x += this.xmom
            this.y += this.ymom
            this.xmom *= this.friction
            this.ymom *= this.friction
        }
        frictiveunMove() {
            if (this.reflect == 1) {
                if (this.x + this.radius > canvas.width) {
                    if (this.xmom > 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y + this.radius > canvas.height) {
                    if (this.ymom > 0) {
                        this.ymom *= -1
                    }
                }
                if (this.x - this.radius < 0) {
                    if (this.xmom < 0) {
                        this.xmom *= -1
                    }
                }
                if (this.y - this.radius < 0) {
                    if (this.ymom < 0) {
                        this.ymom *= -1
                    }
                }
            }
            this.xmom /= this.friction
            this.ymom /= this.friction
            this.x -= this.xmom
            this.y -= this.ymom
        }
        isPointInside(point) {
            this.areaY = point.y - this.y
            this.areaX = point.x - this.x
            if (((this.areaX * this.areaX) + (this.areaY * this.areaY)) <= (this.radius * this.radius)) {
                return true
            }
            return false
        }
        doesPerimeterTouch(point) {
            this.areaY = point.y - this.y
            this.areaX = point.x - this.x
            if (((this.areaX * this.areaX) + (this.areaY * this.areaY)) <= ((this.radius + point.radius) * (this.radius + point.radius))) {
                return true
            }
            return false
        }
    }
    class Polygon {
        constructor(x, y, size, color, sides = 3, xmom = 0, ymom = 0, angle = 0, reflect = 0) {
            if (sides < 2) {
                sides = 2
            }
            this.reflect = reflect
            this.xmom = xmom
            this.ymom = ymom
            this.body = new Circle(x, y, size - (size * .293), "transparent")
            this.nodes = []
            this.angle = angle
            this.size = size
            this.color = color
            this.angleIncrement = (Math.PI * 2) / sides
            this.sides = sides
            for (let t = 0; t < sides; t++) {
                let node = new Circle(this.body.x + (this.size * (Math.cos(this.angle))), this.body.y + (this.size * (Math.sin(this.angle))), 0, "transparent")
                this.nodes.push(node)
                this.angle += this.angleIncrement
            }
        }
        isPointInside(point) { // rough approximation
            this.body.radius = this.size - (this.size * .293)
            if (this.sides <= 2) {
                return false
            }
            this.areaY = point.y - this.body.y
            this.areaX = point.x - this.body.x
            if (((this.areaX * this.areaX) + (this.areaY * this.areaY)) <= (this.body.radius * this.body.radius)) {
                return true
            }
            return false
        }
        move() {
            if (this.reflect == 1) {
                if (this.body.x > canvas.width) {
                    if (this.xmom > 0) {
                        this.xmom *= -1
                    }
                }
                if (this.body.y > canvas.height) {
                    if (this.ymom > 0) {
                        this.ymom *= -1
                    }
                }
                if (this.body.x < 0) {
                    if (this.xmom < 0) {
                        this.xmom *= -1
                    }
                }
                if (this.body.y < 0) {
                    if (this.ymom < 0) {
                        this.ymom *= -1
                    }
                }
            }
            this.body.x += this.xmom
            this.body.y += this.ymom
        }
        draw() {
            this.nodes = []
            this.angleIncrement = (Math.PI * 2) / this.sides
            this.body.radius = this.size - (this.size * .293)
            for (let t = 0; t < this.sides; t++) {
                let node = new Circle(this.body.x + (this.size * (Math.cos(this.angle))), this.body.y + (this.size * (Math.sin(this.angle))), 0, "transparent")
                this.nodes.push(node)
                this.angle += this.angleIncrement
            }
            canvas_context.strokeStyle = this.color
            canvas_context.fillStyle = this.color
            canvas_context.lineWidth = 1
            canvas_context.beginPath()
            canvas_context.moveTo(this.nodes[0].x, this.nodes[0].y)
            for (let t = 1; t < this.nodes.length; t++) {
                canvas_context.lineTo(this.nodes[t].x, this.nodes[t].y)
            }
            canvas_context.lineTo(this.nodes[0].x, this.nodes[0].y)
            canvas_context.fill()
            canvas_context.stroke()
            canvas_context.closePath()
        }
    }
    class Shape {
        constructor(shapes) {
            this.shapes = shapes
        }
        draw() {
            for (let t = 0; t < this.shapes.length; t++) {
                this.shapes[t].draw()
            }
        }
        isPointInside(point) {
            for (let t = 0; t < this.shapes.length; t++) {
                if (this.shapes[t].isPointInside(point)) {
                    return true
                }
            }
            return false
        }
        doesPerimeterTouch(point) {
            for (let t = 0; t < this.shapes.length; t++) {
                if (this.shapes[t].doesPerimeterTouch(point)) {
                    return true
                }
            }
            return false
        }
        innerShape(point) {
            for (let t = 0; t < this.shapes.length; t++) {
                if (this.shapes[t].doesPerimeterTouch(point)) {
                    return this.shapes[t]
                }
            }
            return false
        }
        isInsideOf(box) {
            for (let t = 0; t < this.shapes.length; t++) {
                if (box.isPointInside(this.shapes[t])) {
                    return true
                }
            }
            return false
        }
        adjustByFromDisplacement(x, y) {
            for (let t = 0; t < this.shapes.length; t++) {
                if (typeof this.shapes[t].fromRatio == "number") {
                    this.shapes[t].x += x * this.shapes[t].fromRatio
                    this.shapes[t].y += y * this.shapes[t].fromRatio
                }
            }
        }
        adjustByToDisplacement(x, y) {
            for (let t = 0; t < this.shapes.length; t++) {
                if (typeof this.shapes[t].toRatio == "number") {
                    this.shapes[t].x += x * this.shapes[t].toRatio
                    this.shapes[t].y += y * this.shapes[t].toRatio
                }
            }
        }
        mixIn(arr) {
            for (let t = 0; t < arr.length; t++) {
                for (let k = 0; k < arr[t].shapes.length; k++) {
                    this.shapes.push(arr[t].shapes[k])
                }
            }
        }
        push(object) {
            this.shapes.push(object)
        }
    }
    
    class Spring {
        constructor(x, y, radius, color, body = 0, length = 1, gravity = 0, width = 1) {
            if (body == 0) {
                this.body = new Circle(x, y, radius, color)
                this.anchor = new Circle(x, y, radius, color)
                this.beam = new Line(this.body.x, this.body.y, this.anchor.x, this.anchor.y, "yellow", width)
                this.length = length
            } else {
                this.body = body
                this.anchor = new Circle(x, y, radius, color)
                this.beam = new Line(this.body.x, this.body.y, this.anchor.x, this.anchor.y, "yellow", width)
                this.length = length
            }
            this.gravity = gravity
            this.width = width
        }
        balance() {
            this.beam = new Line(this.body.x, this.body.y, this.anchor.x, this.anchor.y, "yellow", this.width)
            if (this.beam.hypotenuse() < this.length) {
                this.body.xmom += (this.body.x - this.anchor.x) / this.length
                this.body.ymom += (this.body.y - this.anchor.y) / this.length
                this.anchor.xmom -= (this.body.x - this.anchor.x) / this.length
                this.anchor.ymom -= (this.body.y - this.anchor.y) / this.length
            } else {
                this.body.xmom -= (this.body.x - this.anchor.x) / this.length
                this.body.ymom -= (this.body.y - this.anchor.y) / this.length
                this.anchor.xmom += (this.body.x - this.anchor.x) / this.length
                this.anchor.ymom += (this.body.y - this.anchor.y) / this.length
            }
            let xmomentumaverage = (this.body.xmom + this.anchor.xmom) / 2
            let ymomentumaverage = (this.body.ymom + this.anchor.ymom) / 2
            this.body.xmom = (this.body.xmom + xmomentumaverage) / 2
            this.body.ymom = (this.body.ymom + ymomentumaverage) / 2
            this.anchor.xmom = (this.anchor.xmom + xmomentumaverage) / 2
            this.anchor.ymom = (this.anchor.ymom + ymomentumaverage) / 2
        }
        draw() {
            this.beam = new Line(this.body.x, this.body.y, this.anchor.x, this.anchor.y, "yellow", this.width)
            this.beam.draw()
            this.body.draw()
            this.anchor.draw()
        }
        move() {
            this.anchor.ymom += this.gravity
            this.anchor.move()
        }
    
    }
    class SpringOP {
        constructor(body, anchor, length, width = 3, color = body.color) {
            this.body = body
            this.anchor = anchor
            this.beam = new LineOP(body, anchor, color, width)
            this.length = length
        }
        balance() {
            if (this.beam.hypotenuse() < this.length) {
                this.body.xmom += ((this.body.x - this.anchor.x) / this.length)
                this.body.ymom += ((this.body.y - this.anchor.y) / this.length)
                this.anchor.xmom -= ((this.body.x - this.anchor.x) / this.length)
                this.anchor.ymom -= ((this.body.y - this.anchor.y) / this.length)
            } else if (this.beam.hypotenuse() > this.length) {
                this.body.xmom -= (this.body.x - this.anchor.x) / (this.length)
                this.body.ymom -= (this.body.y - this.anchor.y) / (this.length)
                this.anchor.xmom += (this.body.x - this.anchor.x) / (this.length)
                this.anchor.ymom += (this.body.y - this.anchor.y) / (this.length)
            }
    
            let xmomentumaverage = (this.body.xmom + this.anchor.xmom) / 2
            let ymomentumaverage = (this.body.ymom + this.anchor.ymom) / 2
            this.body.xmom = (this.body.xmom + xmomentumaverage) / 2
            this.body.ymom = (this.body.ymom + ymomentumaverage) / 2
            this.anchor.xmom = (this.anchor.xmom + xmomentumaverage) / 2
            this.anchor.ymom = (this.anchor.ymom + ymomentumaverage) / 2
        }
        draw() {
            this.beam.draw()
        }
        move() {
            //movement of SpringOP objects should be handled separate from their linkage, to allow for many connections, balance here with this object, move nodes independently
        }
    }
    
    class Color {
        constructor(baseColor, red = -1, green = -1, blue = -1, alpha = 1) {
            this.hue = baseColor
            if (red != -1 && green != -1 && blue != -1) {
                this.r = red
                this.g = green
                this.b = blue
                if (alpha != 1) {
                    if (alpha < 1) {
                        this.alpha = alpha
                    } else {
                        this.alpha = alpha / 255
                        if (this.alpha > 1) {
                            this.alpha = 1
                        }
                    }
                }
                if (this.r > 255) {
                    this.r = 255
                }
                if (this.g > 255) {
                    this.g = 255
                }
                if (this.b > 255) {
                    this.b = 255
                }
                if (this.r < 0) {
                    this.r = 0
                }
                if (this.g < 0) {
                    this.g = 0
                }
                if (this.b < 0) {
                    this.b = 0
                }
            } else {
                this.r = 0
                this.g = 0
                this.b = 0
            }
        }
        normalize() {
            if (this.r > 255) {
                this.r = 255
            }
            if (this.g > 255) {
                this.g = 255
            }
            if (this.b > 255) {
                this.b = 255
            }
            if (this.r < 0) {
                this.r = 0
            }
            if (this.g < 0) {
                this.g = 0
            }
            if (this.b < 0) {
                this.b = 0
            }
        }
        randomLight() {
            var letters = '0123456789ABCDEF';
            var hash = '#';
            for (var i = 0; i < 6; i++) {
                hash += letters[(Math.floor(Math.random() * 12) + 4)];
            }
            var color = new Color(hash, 55 + Math.random() * 200, 55 + Math.random() * 200, 55 + Math.random() * 200)
            return color;
        }
        randomDark() {
            var letters = '0123456789ABCDEF';
            var hash = '#';
            for (var i = 0; i < 6; i++) {
                hash += letters[(Math.floor(Math.random() * 12))];
            }
            var color = new Color(hash, Math.random() * 200, Math.random() * 200, Math.random() * 200)
            return color;
        }
        random() {
            var letters = '0123456789ABCDEF';
            var hash = '#';
            for (var i = 0; i < 6; i++) {
                hash += letters[(Math.floor(Math.random() * 16))];
            }
            var color = new Color(hash, Math.random() * 255, Math.random() * 255, Math.random() * 255)
            return color;
        }
    }
    class Softbody { //buggy, spins in place
        constructor(x, y, radius, color, members = 10, memberLength = 5, force = 10, gravity = 0) {
            this.springs = []
            this.pin = new Circle(x, y, radius, color)
            this.spring = new Spring(x, y, radius, color, this.pin, memberLength, gravity)
            this.springs.push(this.spring)
            for (let k = 0; k < members; k++) {
                this.spring = new Spring(x, y, radius, color, this.spring.anchor, memberLength, gravity)
                if (k < members - 1) {
                    this.springs.push(this.spring)
                } else {
                    this.spring.anchor = this.pin
                    this.springs.push(this.spring)
                }
            }
            this.forceConstant = force
            this.centroid = new Point(0, 0)
        }
        circularize() {
            this.xpoint = 0
            this.ypoint = 0
            for (let s = 0; s < this.springs.length; s++) {
                this.xpoint += (this.springs[s].anchor.x / this.springs.length)
                this.ypoint += (this.springs[s].anchor.y / this.springs.length)
            }
            this.centroid.x = this.xpoint
            this.centroid.y = this.ypoint
            this.angle = 0
            this.angleIncrement = (Math.PI * 2) / this.springs.length
            for (let t = 0; t < this.springs.length; t++) {
                this.springs[t].body.x = this.centroid.x + (Math.cos(this.angle) * this.forceConstant)
                this.springs[t].body.y = this.centroid.y + (Math.sin(this.angle) * this.forceConstant)
                this.angle += this.angleIncrement
            }
        }
        balance() {
            for (let s = this.springs.length - 1; s >= 0; s--) {
                this.springs[s].balance()
            }
            this.xpoint = 0
            this.ypoint = 0
            for (let s = 0; s < this.springs.length; s++) {
                this.xpoint += (this.springs[s].anchor.x / this.springs.length)
                this.ypoint += (this.springs[s].anchor.y / this.springs.length)
            }
            this.centroid.x = this.xpoint
            this.centroid.y = this.ypoint
            for (let s = 0; s < this.springs.length; s++) {
                this.link = new Line(this.centroid.x, this.centroid.y, this.springs[s].anchor.x, this.springs[s].anchor.y, 0, "transparent")
                if (this.link.hypotenuse() != 0) {
                    this.springs[s].anchor.xmom += (((this.springs[s].anchor.x - this.centroid.x) / (this.link.hypotenuse()))) * this.forceConstant
                    this.springs[s].anchor.ymom += (((this.springs[s].anchor.y - this.centroid.y) / (this.link.hypotenuse()))) * this.forceConstant
                }
            }
            for (let s = 0; s < this.springs.length; s++) {
                this.springs[s].move()
            }
            for (let s = 0; s < this.springs.length; s++) {
                this.springs[s].draw()
            }
        }
    }
    class Observer {
        constructor(x, y, radius, color, range = 100, rays = 10, angle = (Math.PI * .125)) {
            this.body = new Circle(x, y, radius, color)
            this.color = color
            this.ray = []
            this.rayrange = range
            this.globalangle = Math.PI
            this.gapangle = angle
            this.currentangle = 0
            this.obstacles = []
            this.raymake = rays
        }
        beam() {
            this.currentangle = this.gapangle / 2
            for (let k = 0; k < this.raymake; k++) {
                this.currentangle += (this.gapangle / Math.ceil(this.raymake / 2))
                let ray = new Circle(this.body.x, this.body.y, 1, "white", (((Math.cos(this.globalangle + this.currentangle)))), (((Math.sin(this.globalangle + this.currentangle)))))
                ray.collided = 0
                ray.lifespan = this.rayrange - 1
                this.ray.push(ray)
            }
            for (let f = 0; f < this.rayrange; f++) {
                for (let t = 0; t < this.ray.length; t++) {
                    if (this.ray[t].collided < 1) {
                        this.ray[t].move()
                        for (let q = 0; q < this.obstacles.length; q++) {
                            if (this.obstacles[q].isPointInside(this.ray[t])) {
                                this.ray[t].collided = 1
                            }
                        }
                    }
                }
            }
        }
        draw() {
            this.beam()
            this.body.draw()
            canvas_context.lineWidth = 1
            canvas_context.fillStyle = this.color
            canvas_context.strokeStyle = this.color
            canvas_context.beginPath()
            canvas_context.moveTo(this.body.x, this.body.y)
            for (let y = 0; y < this.ray.length; y++) {
                canvas_context.lineTo(this.ray[y].x, this.ray[y].y)
                canvas_context.lineTo(this.body.x, this.body.y)
            }
            canvas_context.stroke()
            canvas_context.fill()
            this.ray = []
        }
    }
    
    function setUp(canvas_pass, style = "#888888") {
        canvas = canvas_pass
        // video_recorder = new CanvasCaptureToWEBM(canvas, 4500000);
        canvas_context = canvas.getContext('2d');
        canvas.style.background = style
        window.setInterval(function() {
            main()
        }, 40)
        document.addEventListener('keydown', (event) => {
            keysPressed[event.key] = true;
        });
        document.addEventListener('keyup', (event) => {
            delete keysPressed[event.key];
        });
        window.addEventListener('pointerdown', e => {
            FLEX_engine = canvas.getBoundingClientRect();
            XS_engine = e.clientX - FLEX_engine.left;
            YS_engine = e.clientY - FLEX_engine.top;
            TIP_engine.x = XS_engine
            TIP_engine.y = YS_engine
            TIP_engine.body = TIP_engine
            organeo.genes[0].body.x += 10
            // example usage: if(object.isPointInside(TIP_engine)){ take action }
            window.addEventListener('pointermove', continued_stimuli);
        });
        window.addEventListener('pointerup', e => {
            window.removeEventListener("pointermove", continued_stimuli);
        })
    
        function continued_stimuli(e) {
            FLEX_engine = canvas.getBoundingClientRect();
            XS_engine = e.clientX - FLEX_engine.left;
            YS_engine = e.clientY - FLEX_engine.top;
            TIP_engine.x = XS_engine
            TIP_engine.y = YS_engine
            TIP_engine.body = TIP_engine
        }
    }
    
    function gamepad_control(object, speed = 1) { // basic control for objects using the controler
        //         //console.l\og(gamepadAPI.axesStatus[1]*gamepadAPI.axesStatus[0]) //debugging
        if (typeof object.body != 'undefined') {
            if (typeof(gamepadAPI.axesStatus[1]) != 'undefined') {
                if (typeof(gamepadAPI.axesStatus[0]) != 'undefined') {
                    object.body.x += (gamepadAPI.axesStatus[0] * speed)
                    object.body.y += (gamepadAPI.axesStatus[1] * speed)
                }
            }
        } else if (typeof object != 'undefined') {
            if (typeof(gamepadAPI.axesStatus[1]) != 'undefined') {
                if (typeof(gamepadAPI.axesStatus[0]) != 'undefined') {
                    object.x += (gamepadAPI.axesStatus[0] * speed)
                    object.y += (gamepadAPI.axesStatus[1] * speed)
                }
            }
        }
    }
    
    function control(object, speed = 1) { // basic control for objects
        if (typeof object.body != 'undefined') {
            if (keysPressed['w']) {
                object.body.y -= speed
            }
            if (keysPressed['d']) {
                object.body.x += speed
            }
            if (keysPressed['s']) {
                object.body.y += speed
            }
            if (keysPressed['a']) {
                object.body.x -= speed
            }
        } else if (typeof object != 'undefined') {
            if (keysPressed['w']) {
                object.y -= speed
            }
            if (keysPressed['d']) {
                object.x += speed
            }
            if (keysPressed['s']) {
                object.y += speed
            }
            if (keysPressed['a']) {
                object.x -= speed
            }
        }
    }
    
    function getRandomLightColor() { // random color that will be visible on  black background
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[(Math.floor(Math.random() * 12) + 4)];
        }
        return color;
    }
    
    function getRandomColor() { // random color
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[(Math.floor(Math.random() * 16) + 0)];
        }
        return color;
    }
    
    function getRandomDarkColor() { // color that will be visible on a black background
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[(Math.floor(Math.random() * 12))];
        }
        return color;
    }
    
    function castBetween(from, to, granularity = 10, radius = 1) { //creates a sort of beam hitbox between two points, with a granularity (number of members over distance), with a radius defined as well
        let limit = granularity
        let shape_array = []
        for (let t = 0; t < limit; t++) {
            let circ = new Circle((from.x * (t / limit)) + (to.x * ((limit - t) / limit)), (from.y * (t / limit)) + (to.y * ((limit - t) / limit)), radius, "red")
            circ.toRatio = t / limit
            circ.fromRatio = (limit - t) / limit
            shape_array.push(circ)
        }
        return (new Shape(shape_array))
    }
    
    function castBetweenPoints(from, to, granularity = 10, radius = 1) { //creates a sort of beam hitbox between two points, with a granularity (number of members over distance), with a radius defined as well
        let limit = granularity
        let shape_array = []
        for (let t = 0; t < limit; t++) {
            let circ = new Circle((from.x * (t / limit)) + (to.x * ((limit - t) / limit)), (from.y * (t / limit)) + (to.y * ((limit - t) / limit)), radius, "red")
            circ.toRatio = t / limit
            circ.fromRatio = (limit - t) / limit
            shape_array.push(circ)
        }
        return shape_array
    }
    
    class Disang {
        constructor(dis, ang) {
            this.dis = dis
            this.angle = ang
        }
    }
    
    class BezierHitbox {
        constructor(x, y, cx, cy, ex, ey, color = "red") { // this function takes a starting x,y, a control point x,y, and a end point x,y
            this.color = color
            this.x = x
            this.y = y
            this.cx = cx
            this.cy = cy
            this.ex = ex
            this.ey = ey
            this.metapoint = new Circle((x + cx + ex) / 3, (y + cy + ey) / 3, 3, "#FFFFFF")
            this.granularity = 100
            this.body = [...castBetweenPoints((new Point(this.x, this.y)), (new Point(this.ex, this.ey)), this.granularity, 0)]
    
            let angle = (new Line(this.x, this.y, this.ex, this.ey)).angle()
    
            this.angles = []
            for (let t = 0; t < this.granularity; t++) {
                this.angles.push(angle)
            }
            for (let t = 0; t <= 1; t += 1 / this.granularity) {
                this.body.push(this.getQuadraticXY(t))
                this.angles.push(this.getQuadraticAngle(t))
            }
            this.hitbox = []
            for (let t = 0; t < this.body.length; t++) {
                let link = new LineOP(this.body[t], this.metapoint)
                let disang = new Disang(link.hypotenuse(), link.angle() + (Math.PI * 2))
                this.hitbox.push(disang)
            }
            this.constructed = 1
        }
        isPointInside(point) {
            let link = new LineOP(point, this.metapoint)
            let angle = (link.angle() + (Math.PI * 2))
            let dis = link.hypotenuse()
            for (let t = 1; t < this.hitbox.length; t++) {
                if (Math.abs(this.hitbox[t].angle - this.hitbox[t - 1].angle) > 1) {
                    continue
                }
                if (angle.between(this.hitbox[t].angle, this.hitbox[t - 1].angle)) {
                    if (dis < (this.hitbox[t].dis + this.hitbox[t - 1].dis) * .5) {
                        return true
                    }
                }
            }
            return false
        }
        doesPerimeterTouch(point) {
            let link = new LineOP(point, this.metapoint)
            let angle = (link.angle() + (Math.PI * 2))
            let dis = link.hypotenuse()
            for (let t = 1; t < this.hitbox.length; t++) {
                if (Math.abs(this.hitbox[t].angle - this.hitbox[t - 1].angle) > 1) {
                    continue
                }
                if (angle.between(this.hitbox[t].angle, this.hitbox[t - 1].angle)) {
                    if (dis < ((this.hitbox[t].dis + this.hitbox[t - 1].dis) * .5) + point.radius) {
                        return this.angles[t]
                    }
                }
            }
            return false
        }
        draw() {
            this.metapoint.draw()
            let tline = new Line(this.x, this.y, this.ex, this.ey, this.color, 3)
            tline.draw()
            canvas_context.beginPath()
            this.median = new Point((this.x + this.ex) * .5, (this.y + this.ey) * .5)
            let angle = (new LineOP(this.median, this.metapoint)).angle()
            let dis = (new LineOP(this.median, this.metapoint)).hypotenuse()
            canvas_context.bezierCurveTo(this.x, this.y, this.cx - (Math.cos(angle) * dis * .38), this.cy - (Math.sin(angle) * dis * .38), this.ex, this.ey)
    
            canvas_context.fillStyle = this.color
            canvas_context.strokeStyle = this.color
            canvas_context.lineWidth = 3
            canvas_context.stroke()
        }
        getQuadraticXY(t) {
            return new Point((((1 - t) * (1 - t)) * this.x) + (2 * (1 - t) * t * this.cx) + (t * t * this.ex), (((1 - t) * (1 - t)) * this.y) + (2 * (1 - t) * t * this.cy) + (t * t * this.ey))
        }
        getQuadraticAngle(t) {
            var dx = 2 * (1 - t) * (this.cx - this.x) + 2 * t * (this.ex - this.cx);
            var dy = 2 * (1 - t) * (this.cy - this.y) + 2 * t * (this.ey - this.cy);
            return -Math.atan2(dx, dy) + 0.5 * Math.PI;
        }
    }
    
    Number.prototype.between = function(a, b, inclusive) {
        var min = Math.min(a, b),
            max = Math.max(a, b);
        return inclusive ? this >= min && this <= max : this > min && this < max;
    }
    
    // if( n < 3 && n > 1){
    
    // }
    // if((n).between(1,3)){
    
    // }
    
    
    let setup_canvas = document.getElementById('canvas') //getting canvas from document
    
    setUp(setup_canvas) // setting up canvas refrences, starting timer. 
    
    // object instantiation and creation happens here 
    // class PolygonSorter {
    //     constructor(points) {
    //         this.points = points;
    //         this.hull = this.computeConcavePolygon();
    //     }
    
    //     computeConcavePolygon() {
    //         // Ensure we work on a copy of the points
    //         const points = this.points.slice();
    
    //         // Sort points by their position (you may want a specific order)
    //         points.sort((a, b) => a.x - b.x || a.y - b.y);
    
    //         // Start with the first point
    //         const polygon = [points[0]];
    
    //         // Iterate through the points to create a non-crossing concave shape
    //         for (let i = 1; i < points.length; i++) {
    //             const point = points[i];
    
    //             // Check for intersection and add the point
    //             while (polygon.length > 1 && this.doesIntersect(polygon[polygon.length - 2], polygon[polygon.length - 1], polygon[polygon.length - 1], point)) {
    //                 polygon.pop(); // Remove last point if it causes intersection
    //             }
    //             polygon.push(point);
    //         }
    
    //         // Optionally, close the polygon by connecting back to the starting point
    //         if (polygon.length > 2 && !this.doesIntersect(polygon[polygon.length - 1], polygon[0], polygon[polygon.length - 1], polygon[0])) {
    //             polygon.push(polygon[0]); // Close the polygon if it doesn't cause an intersection
    //         }
    
    //         return polygon;
    //     }
    
    //     doesIntersect(p1, q1, p2, q2) {
    //         // Helper function to check if two segments intersect
    //         return this.orientation(p1, q1, p2) !== this.orientation(p1, q1, q2) &&
    //                this.orientation(p2, q2, p1) !== this.orientation(p2, q2, q1);
    //     }
    
    //     orientation(p, q, r) {
    //         const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    //         return val === 0 ? 0 : (val > 0 ? 1 : 2); // collinear, clockwise, counterclockwise
    //     }
    
    //     minimizeArea(polygon) {
    //         // Implement a strategy to minimize the area of the polygon
    //         // This can involve a more complex triangulation method if needed
    //         return polygon; // Placeholder: Return the input polygon for now
    //     }
    
    //     getSortedPoints() {
    //         return this.minimizeArea(this.hull);
    //     }
    // }
    class PolygonSorter {
        constructor(points) {
            this.points = points;
            this.hull = this.points
        }
    
        // Function to calculate the centroid of the points
        calculateCentroid() {
            const numPoints = this.points.length;
            const sum = this.points.reduce((acc, point) => {
                acc.x += point.x;
                acc.y += point.y;
                return acc;
            }, {
                x: 0,
                y: 0
            });
    
            return {
                x: sum.x / numPoints,
                y: sum.y / numPoints
            };
        }
    
        // Function to calculate the angle between the point and the centroid
        calculateAngle(point, centroid) {
            return Math.atan2(point.y - centroid.y, point.x - centroid.x);
        }
    
        // Function to sort points based on their angle relative to the centroid
        sortPointsByAngle() {
            const centroid = this.calculateCentroid();
            this.points.sort((a, b) => {
                const angleA = this.calculateAngle(a, centroid);
                const angleB = this.calculateAngle(b, centroid);
                return angleA - angleB; // Sort by angle in ascending order
            });
            return this.points; // Return the sorted array
        }
    }
    
    
    
    class PolygonDrawer {
        constructor(points, color = '#000000', width = 3) {
            this.points = points; // Array of Point objects
            //console.l\og(points)
            this.color = color;
            this.width = width;
            this.hull = this.points
        }
    
    
        // Function to calculate the centroid of the points
        calculateCentroid() {
            const numPoints = this.points.length;
            const sum = this.points.reduce((acc, point) => {
                acc.x += point.x;
                acc.y += point.y;
                return acc;
            }, {
                x: 0,
                y: 0
            });
    
            return {
                x: sum.x / numPoints,
                y: sum.y / numPoints
            };
        }
    
        // Function to calculate the angle between the point and the centroid
        calculateAngle(point, centroid) {
            return Math.atan2(point.y - centroid.y, point.x - centroid.x);
        }
    
        // Function to sort points based on their angle relative to the centroid
        sortPointsByAngle() {
            const centroid = this.calculateCentroid();
            this.points.sort((a, b) => {
                const angleA = this.calculateAngle(a, centroid);
                const angleB = this.calculateAngle(b, centroid);
                return angleA - angleB; // Sort by angle in ascending order
            });
            return this.points; // Return the sorted array
        }
        drawHull() {
            if (this.liner != 1) {
    
                this.links = []
                for (let i = 0; i < this.hull.length; i++) {
                    const start = this.hull[i];
                    const end = this.hull[(i + 1) % this.hull.length]; // Wrap around to the first point
                    const lineOp = new LineOP(start, end, this.color, this.width);
                    lineOp.draw();
                    this.links.push(lineOp)
                }
            }
            this.liner = 1
    
            this.sums = [0, 0, 0, 0]
            let f = 0
    
            for (let t = 0; t < people.length; t++) {
                if (isPointInPolygon(this.hull, people[t].body)) {
                    this.sums[people[t].type]++
                    f++
                }
            }
    
            // Determine the color based on which sum is maximum
            let calccolor;
            //console.l\og(this.sums)
            const maxSum = Math.max(...this.sums);
            const maxIndex = this.sums.indexOf(maxSum);
    
            if (f != groups[groupi]) {
                calccolor = '#88888888'
                this.t = -1
            } else {
    
                if (maxIndex === 0) {
                    calccolor = '#ff000040';
                    this.t = 0
                } else if (maxIndex === 1) {
                    this.t = 1
                    calccolor = '#00ff0040';
                } else if (maxIndex === 2) {
                    this.t = 2
                    calccolor = '#0000ff40';
                } else if (maxIndex === 3) {
                    this.t = 3
                    calccolor = '#ffff0040';
                } else {
                    this.t = -1
                    calccolor = 'white'; // Replace with a color for index 2 and 3 if needed
                }
    
            }
    
            const maxCount = this.sums.filter(sum => sum === maxSum).length;
    
            if (maxCount > 1) {
                calccolor = '#88888888'; // Set to gray if there are ties
            }
    
    
            fillPolygon(canvas_context, this.hull, calccolor)
        }
    }
    
    function fillPolygon(ctx, points, color) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
    
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
    
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
    }
    
    class People {
        constructor(x, y, colorValue) {
            this.type = colorValue
            this.body = new Circle(x, y, 50, "white");
            this.colors = ['red', '#00ff00', 'blue', 'yellow'];
    
            this.body.color = this.colors[colorValue % 4];
        }
    
        // Check if the circle is on the line
        isCircleOnLine(link) {
            this.body.radius = 50
            const x = this.body.x;
            const y = this.body.y;
            const radius = this.body.radius;
    
            // Line is defined by two points (x1, y1) and (x2, y2)
            // const [x1, y1, x2, y2] = link;
            const x1 = link.object.x
            const x2 = link.target.x
            const y1 = link.object.y
            const y2 = link.target.y
    
            // Line equation: Ax + By + C = 0
            const A = y2 - y1;
            const B = x1 - x2;
            const C = x2 * y1 - x1 * y2;
    
            // Distance from circle center to the line
            const distance = Math.abs(A * x + B * y + C) / Math.sqrt(A * A + B * B);
    
            // Check if the distance is less than or equal to the radius
            return distance <= radius;
        }
        draw() {
            this.body.radius = 10
            this.body.draw()
        }
    }
    let hulls = []
    let hull = []
    let people = []
    let peo = []
    
    let groups = [3, 4, 5, 6, 10, 12]
    
    let diff = 2
    let groupi = 3
    for (let t = 0; t < 60; t++) {
        peo.push(t % diff)
    }
    
    for (let t = 0; t < 60; t++) {
        let per = new People(100 + (100 * (t % 10)), 100 + (100 * Math.floor(t / 10)), peo[t])
    
        people.push(per)
    }
    
    
    function isPointInPolygon(point, polygon) {
        const {
            x,
            y
        } = point;
        let isInside = false;
    
        // Loop through each edge of the polygon
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            const {
                x: xi,
                y: yi
            } = polygon[i];
            const {
                x: xj,
                y: yj
            } = polygon[j];
    
            // Check if the point is inside the polygon
            const intersect = ((yi > y) !== (yj > y)) &&
                (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    
            if (intersect) {
                isInside = !isInside;
            }
        }
    
        return isInside;
    }
    
    let h1 = {}
    let sure = {}
    
    function isPointInPolygon(points, testPoint) {
        const x = testPoint.x;
        const y = testPoint.y;
        let inside = false;
    
        for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
            const xi = points[i].x;
            const yi = points[i].y;
            const xj = points[j].x;
            const yj = points[j].y;
    
            const intersect = ((yi > y) !== (yj > y)) &&
                (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    
            if (intersect) {
                inside = !inside;
            }
        }
    
        return inside;
    }
    
    function arePointsOverlapping(a, b, c, d, e, f, g, h) {
        // Create an array of points from the provided coordinates
        const points = [{
                x: a,
                y: b
            }, // First point
            {
                x: c,
                y: d
            }, // Second point
            {
                x: e,
                y: f
            }, // Third point
            {
                x: g,
                y: h
            } // Fourth point
        ];
    
        //console.log(points)
        // Use a Set to track unique positions
        const uniquePositions = new Set();
    
        for (const point of points) {
            // Create a unique key for each point based on its x and y values
            const key = `${point.x},${point.y}`;
    
            // If the key is already in the Set, return true (overlapping point found)
            if (uniquePositions.has(key)) {
                return true;
            }
    
            // Add the key to the Set
            uniquePositions.add(key);
        }
    
        // No overlapping points found
        return false;
    }
    // returns true if the line from (a,b)->(c,d) intersects with (p,q)->(r,s)
    function intersects(a, b, c, d, p, q, r, s) {
        var det, gamma, lambda;
        a = Math.round(a)
        b = Math.round(b)
        c = Math.round(c)
        d = Math.round(d)
        p = Math.round(p)
        q = Math.round(q)
        r = Math.round(r)
        s = Math.round(s)
        //console.log(arePointsOverlapping(a, b, c, d, p, q, r, s))
        if (arePointsOverlapping(a, b, c, d, p, q, r, s)) {
            return false
        }
    
    
        det = (c - a) * (s - q) - (r - p) * (d - b);
        if (det === 0) {
            return false;
        } else {
            lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
            gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
            return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
        }
    };
    
    
    
    
    // Example usage
    // const polygon1 = [{x: 1, y: 1}, {x: 3, y: 3}, {x: 1, y: 3}, {x: 3, y: 1}]; // Self-intersecting
    // const polygon2 = [{x: 1, y: 1}, {x: 1, y: 5}, {x: 5, y: 5}, {x: 5, y: 1}]; // Not self-intersecting
    
    // //console.l\og(isPolygonSelfIntersecting(polygon1)); // true
    // //console.l\og(isPolygonSelfIntersecting(polygon2)); // false
    
    
    
    
    class Puppeteer {
        constructor(points, personSpawnID, targetRoom, footing, targetID) {
            this.points = points //points is a list of x,y objects like {"x":10,"y":12}, they will be in an array like [point1, point2, point3] etc.
            this.targetRoom = targetRoom //Target room is where the new character will spawn
            this.personSpawnID = personSpawnID //this is the ID of who will spawn in the room (at the footing)
            this.footing = footing //this is an  x,y object, just one, not a list, like point =  {"x":10,"y":12}, and it's where the npc will spawn
            this.targetID = targetID //this is the ID of who will be moved in the room to a new position, and will tag their people object to animate a walk animation(which exist)
    
    
            //animation variables, these control the puppeting 
            this.count = 0 //what "frame" of the interpolation between the points selected
            this.pointer1 = 0; //this is the starting point in the array for where to interopolate from
            this.ponter2 = 1 // this is the number that is the index of the point to interpolate to 
            this.distances = [] //arraay this holds the distances in pixels from A to B as they traverse
            this.lengths = [] //the lengths in frames of how long they will be walking from a to b
            this.link = new LineOP(this.points[0].this.points[1]) //dummy line object for geometry
            for (let t = 1; t < this.points.length; t++) { //loop for calculating the distances and lengths
                this.link.target = this.points[t] //this sets the line geometry to measure from the point at index t
                this.link.object = this.points[t - 1] //this sets the line geometry to measure to the point at index t-1,,this with the array starting loop at 1 means it won't overflow, regardless of the points, as long as there are two or more
                let h = this.link.hypotenuse() //h is the hypotenuse of the line that connects the points in question, and makes for a measure of their euclidian distance
                this.distances.push(h) //then we store that distance
                this.lengths.push(Math.ceil(h / 6)) //and also store the length in frames they will be animated for
            }
    
    
    
            this.active = 1 // sets up to run automatically on formation of trigger
    
        }
        interpolate(point1, point2, time, length) {
            let x = point1.x + ((point2.x - point1.x) * (time / length)) //averaging from x to x on a time slider
            let y = point1.y + ((point2.y - point1.y) * (time / length)) //averaging from y to y on a time slider
            return {
                "x": x,
                "y": y
            }
        }
        play() { //this will be on all triggerd puppet objects, in a loop of their array, in main probably at the top, and there will need to be a cleanup function
            if (this.active == 1) {
    
                //lookup people data and convert them to a class variable called target person
                this.targetPerson = {} //lookup
    
                let interpoint = this.interpolate(this.points[this.pointer1], this.points[this.ponter2], this.count, this.lengths[this.ponter2]) //call for the creation of a point that is where the npc should be drawn
                this.targetPerson.x = interpoint.x
                this.targetPerson.y = interpoint.y
    
    
                this.count++
                if (this.count > this.lengths[this.ponter2]) {
                    this.count = 0
                    this.pointer1++ //increment to the next point
                    this.pointer2++ //increment to the next point
                    if (this.pointer2 > this.lengths.length) { //if it's the ned, tun the swap
    
                        this.targetPerson.kill = 1 //code to remove target person from the array of people
    
                        let newDude = new Person(this.personSpawnID, this.footing.x, this.footing.y) //code to add people to other room 
                        people[this.targetRoom].push(newDude)
                        this.cleanup()
                    }
                }
            }
    
        }
        cleanup() {
            this.active = 0
        }
    
    }
    
    
    class GeneTable {
        constructor() {
            this.pairs = []
            this.alphabet = ("PO").split('')
            for (let t = 0; t < this.alphabet.length; t++) {
                for (let k = 0; k < this.alphabet.length; k++) {
                    let p = ''
                    p += this.alphabet[t]
                    p += this.alphabet[k]
                    this.pairs.push(p)
                }
            }
            this.hash = {}
    
    
            // 3
            // +
            // -
            // 0
    
            this.lester = []
            for (let t = 0; t < this.pairs.length; t++) {
                this.lester.push(t % 9)
            }
    
            for (let t = 0; t < this.pairs.length; t++) {
                this.hash[this.pairs[t]] = this.lester[t]
            }
            //console.log(this)
        }
    }
    
    
    let colors = ["REd", "orange", "yellow", "#00ff00", 'cyan', "blue", "indigo", "violet", "magenta"]
    class Amine {
        constructor(i, t) {
            this.body = new Circle(180 + (i * 10), 360 + (Math.random() * 10), 5, colors[t])
            this.link = new LineOP(this.body, this.body)
            this.type = t
            this.friction = 1 - (this.type * .001)
        }
        draw() {
            this.body.draw()
        }
        move() {
            this.body.frictiveMove()
        }
    }
    
    
    //all my worst injuries are self inflicted
    //asked how I feel about failing I say I'm addicted 
    
    class Organism {
        constructor() {
            this.genes = []
            this.alphabet = ("PO").split('')
            this.geneslist = []
            for (let t = 0; t < 40; t++) {
                this.geneslist.push(this.alphabet[Math.floor(Math.random() * this.alphabet.length)] + this.alphabet[Math.floor(Math.random() * this.alphabet.length)])
            }
    
            this.spr = []
            for (let t = 0; t < 40; t++) {
                let ami = new Amine(t, genetable.hash[this.geneslist[t]])
    
                this.genes.push(ami)
    
                if (t > 0) {
                    let spring = new SpringOP(this.genes[t - 1].body, ami.body, 11, 1, 'transparent')
                    this.spr.push(spring)
                }
    
            }
        }
        draw() {
            for (let t = 0; t < this.genes.length; t++) {
                this.genes[t].draw()
                this.genes[t].move()
    
                for (let k = 0; k < this.genes.length; k++) {
                    if (k != t) {
    
    
                        this.genes[t].link.target = this.genes[k].body
                        if (this.genes[t].link.hypotenuse() < 10) {
    
                            this.genes[t].body.x += Math.cos(this.genes[t].link.angle()) / 3
                            this.genes[t].body.y += Math.sin(this.genes[t].link.angle()) / 3
                        }
                        if (this.genes[t].link.hypotenuse() < 20) {
                            this.genes[t].body.x += Math.cos(this.genes[t].link.angle()) / 40
                            this.genes[t].body.y += Math.sin(this.genes[t].link.angle()) / 40
                        }
                    }
                }
    
                for (let k = 0; k < this.genes.length; k++) {
                    if (this.genes[t].type == this.genes[k].type) {
                        if (k != t) {
                            this.genes[t].link.target = this.genes[k].body
                            if (this.genes[t].link.hypotenuse() < 20) {
                                this.genes[t].body.x -= Math.cos(this.genes[t].link.angle()) / 40
                                this.genes[t].body.y -= Math.sin(this.genes[t].link.angle()) / 40
                            }
                        }
                    }
                }
    
    
            }
            for (let t = 0; t < this.spr.length; t++) {
                this.spr[t].balance()
            }
        }
    }
    
    let genetable = new GeneTable()
    
    
    
    let organeo = new Organism()
    
    
    //console.log(organeo)
    
    let rmod = Math.floor(Math.random() * 25) + 5
    let gmod = Math.floor(Math.random() * 25) + 5
    let bmod = Math.floor(Math.random() * 25) + 5
    
    rmod = 1
    bmod = 1
    gmod = 1
    
    
    function getIndex(x, y, width) {
        return (y * width + x) * 4;
    }
    
    
    class Counter {
        constructor() {
    
        }
    }
    
    let seenToday = {}
    let superclick = 0
    class Node {
        constructor(x, y, t) {
            this.neighbors = []
            this.type = t
            this.id = superclick
            superclick++
            this.x = x
            this.y = y
            this.link = new LineOP(this, this, "cyan")
            this.link.list  =[]
            this.lout = 10//8 + (Math.random() * 24)
            this.las = []
            for (let t = 0; t < 100; t++) {
                this.las.push(Math.random() * 6.283)
            }
            this.rigs = []
            this.times = []
            this.ticks = []
            for (let t = 0; t < 100; t++) {
                this.times.push(0)
                this.ticks.push(((Math.random() - .5) / 40))
            }
            for (let t = 0; t < 100; t++) {
                this.rigs.push(1 - ((Math.random() / 40) + .975))
            }
            this.pushout =  Math.random() * 6.283
            this.pushoutsto = this.pushout
            // //console.log(this.id)
            globalnodes.push(this)
            this.energy = 0
            this.generate = 0
            if (this.type == 4) {
                this.generate = .3333
            }
            this.gencap = 10
            this.energy = 0
    
            this.hit = 0
        }
        map(k,f){

            let scare = {}

            for(let d = 0;d<f.length;d++){
                scare[d] = k[d]
            }
            // //console.log(scare)

            return scare
        }
        dupe(num, macro, me){
            if(globalnodes.length > 500 || num == 0){
                return false
            }
            let node = new Node(this.x+((Math.random()-.5)*10), this.y+((Math.random()-.5)*10) , this.type)
            return node
        }
        tupe(num, macro, me,node){
            if(globalnodes.length > 500 || num == 0){
                return
            }
            let keys = Object.keys(macro.match)
            // //console.log(keys)

            // me -= macro.start
            let arts = this.map(keys, macro.f)


            let letters = macro.match[arts[me]]
            //console.log(macro,me,arts,macro.match[arts[me]])


            // for(let t = 0;t<letters.length;t++){
            //     if(letters[t] >= 0){
            //         //console.log(letters[t])
            //         letters[t] = parseInt(letters[t], 10)
            //     }else{
            //         letters.splice(t,1)
            //     }
            // }

            // //console.log(letters)
            console.log(globalnodes.length, letters, macro.start)
            for(let t = 0;t<letters.length;t++){
                //console.log(globalnodes[letters[t]+macro.start])
                if(globalnodes[t+macro.start]){

                node.connect(globalnodes[t+macro.start])
                }
            }
        }
        energyBalance(){


            let glist = [this]

        
            let f = [this.id]
            for(let t =0 ;t<glist.length;t++){
                for(let k = 0;k<glist[t].link.list.length;k++){
                      if(f.includes(globalnodes[glist[t].link.list[k]].id) || glist.length > globalnodes.length){
                      }else{
                        f.push(globalnodes[glist[t].link.list[k]].id)
                        glist.push(globalnodes[glist[t].link.list[k]])
                      }
                }
            }

            let g = 0
            let m = 0
            let p = 0
            for(let t =0 ;t<glist.length;t++){
                // for(let k = 0;k<glist[t].link.list.length;k++){
                    g += glist[t].energy
                    p += glist[t].pushoutsto
                    m++
                // }
            }

            if(keysPressed[' ']){
                //console.log(glist)
            }
            g/=m
            p/=m

            // //console.log(g,m)

            let matmatch = {}
            let startin = globalnodes.length
            let macro = {}
            macro.match = matmatch
            macro.start = startin
            macro.f = f.sort((a,b)=>a>b?1:-1)

            if(g >= 10 && glist.length>1 && macrodupe == 0){

                macrodupe = 1

                for(let t =0 ;t<glist.length;t++){
                        matmatch[glist[t].id] = []
                        let mv  = []
                    for(let k = 0;k<glist[t].link.list.length;k++){
                        if(!mv.includes(glist[t].link.list[k])){
                            mv.push(glist[t].link.list[k])
                            matmatch[glist[t].id].push(glist[t].link.list[k])
                        }
                    }

                }



                let nodds = []
                for(let t =0 ;t<glist.length;t++){
                    let nodd = glist[t].dupe(glist[t].link.list.length, macro, globalnodes.indexOf(glist[t]))
                    if(nodd != false){
                        nodd.t = t
                        nodds.push(nodd)
                    }
                }
                for(let t =0 ;t<nodds.length;t++){
                    nodds[t].tupe(10, macro, nodds[t].t, nodds[t])
                }

                g -=10

                // //console.log(macro)
            }


            for(let t =0 ;t<glist.length;t++){
                // for(let k = 0;k<glist[t].link.list.length;k++){
                    glist[t].energy = g
                    glist[t].pushoutsto = p
                    glist[t].hit = 1
                    
                // }
            }

            this.energy = g
            this.pushoutsto = p

            // //console.log(this)
            this.hit = 1

        }
        connect(node) {


            if (this.type == 0 || this.type == 3) {
                if(this.type == 3){
                    if(node.type != 3 && node.type != 1){

                        this.neighbors.push(node.id)
                        node.neighbors.push(this.id)
                    }
                }else{
            
                    this.neighbors.push(node.id)
                    node.neighbors.push(this.id)
                }
            } else {
                if (this.type == 1) {
                    if (this.neighbors.length < 3) {
                        if (node.type != 1 && node.type != 3) {
                            this.neighbors.push(node.id)
                            node.neighbors.push(this.id)
                        }
                    }
                }
                if (this.type == 2) {
                    if (this.neighbors.length < 2) {
                        if (node.type != 2) {
                            this.neighbors.push(node.id)
                            node.neighbors.push(this.id)
                        }
                    }
                }
                if (this.type == 4) {
                    if (this.neighbors.length < 2) {
                        this.neighbors.push(node.id)
                        node.neighbors.push(this.id) 
                    }
                }
    
    
            }
        }
        drive() {
            
    
            this.hit = 0
            this.fed = 0
            if (this.type == 4) {
                if(this.energy < this.gencap){
                    this.energy += this.generate
                }
            }


            if (this.type == 2 || this.type == 3) {
                    if (this.energy >= 1) {
                        this.x += Math.cos(this.pushout) *this.lout/2
                        this.y += Math.sin(this.pushout) *this.lout/2
                        this.energy-=.1
                    }
            }
        }
        make() {
            if (this.type == 0) {
                this.body = new Circle(this.x, this.y, 3, "blue")
            }
            if (this.type == 1) {
                this.body = new Rectangle(this.x - 1.5, this.y - 1.5, 3, 3, "pink")
            }
            if (this.type == 2) {
                this.body = new Polygon(this.x, this.y, 4, "red", 3, 0, 0, (this.pushout))
            }
            if (this.type == 3) {
                this.body = new Circle(this.x, this.y, 3, "Magenta")
            }
            if (this.type == 4) {
                this.body = new Polygon(this.x, this.y, 4, "#00ff00", 5, 0, 0, (this.pushout) + Math.PI)
            }
            this.x = Math.max(0, this.x)
            this.x = Math.min(canvas.width, this.x)
            this.y = Math.max(0, this.y)
            this.y = Math.min(canvas.width, this.y)
        }
        drawBody() {
    
            this.body.draw()
        }
        time() {
            for (let t = 0; t < this.times.length; t++) {
                if(this.energy >= 1){
                    this.times[t] += this.ticks[t]
                }
            }
        }





        makeLink() {
            let z = 0
            for (let t = 0; t < globalnodes.length; t++) {
                if (this.neighbors.includes(globalnodes[t].id)) {
    
                    this.link.target = globalnodes[t]
                    while (this.link.hypotenuse() > this.lout) {
                        let a = this.link.angle()
                        this.x -= Math.cos(a) * 1
                        this.y -= Math.sin(a) * 1
                        this.link.target.x += Math.cos(a) * 1
                        this.link.target.y += Math.sin(a) * 1
                    }
    
                    let lt = new Point(this.x + (Math.cos(((this.times[z]))) * this.lout), this.y + (Math.sin(this.times[z]) * this.lout))
    
    
                    // let easedp = new Point((this.link.target.x*(1-this.rigs[z])) + (lt.x*this.rigs[z]),    (this.link.target.y*(1-this.rigs[z])) + (lt.y*this.rigs[z]))
    
                    //
    
    
    
                    if (this.type == 1 || this.type == 3) {
                            if (this.energy >= .1) {
                                this.energy-=.01
                                this.link.target.x = (this.link.target.x * (1 - this.rigs[z])) + (this.rigs[z] * lt.x)
                                this.link.target.y = (this.link.target.y * (1 - this.rigs[z])) + (this.rigs[z] * lt.y)
    
                                if (this.type == 1 || this.type == 3) { 
                                        globalnodes[t].pushout = globalnodes[t].pushoutsto + this.times[z]
                                }
                            } else {
    
                            }
    
                    }
    
    
                    z++
                    z %= this.las.length
    
    
                    this.link.mark = 1
                    this.link.list.push(t)
                    globalnodes[t].link.mark = 1
                    globalnodes[t].link.list.push(globalnodes.indexOf(this))
                }
            }
        }
        text(){
            if(!keysPressed['h']){

                return
            }
            canvas_context.fillStyle = "white"
            canvas_context.strokeStyle = "black"
            canvas_context.font = "10px arial"

            this.energy = Math.round(this.energy*100)/100
            canvas_context.strokeText(this.energy, this.x, this.y)
            canvas_context.fillText(this.energy, this.x, this.y)
        }
    }
    
    let globalnodes = []
    
      for(let t = 0;t<25;t++){
        let node = new Node(Math.random()*canvas.width,Math.random()*canvas.height, Math.floor(Math.random()*5))
      }
    
      for(let t = 0;t<15;t++){
        globalnodes[Math.floor(Math.random()*globalnodes.length)].connect(globalnodes[Math.floor(Math.random()*globalnodes.length)])
      }
    
    
    // let nod1 = new Node(100, 100, 0)
    // let nod2 = new Node(110, 100, 0)
    // let nod3 = new Node(130, 100, 0)
    // let nod4 = new Node(140, 100, 1)
    // let nod5 = new Node(140, 100, 2)
    // // let nod6 = new Node(160, 100, 0)
    // let leaf1 = new Node(110, 110, 4)
    // let leaf2 = new Node(110, 90, 4)
    // let leaf3 = new Node(120, 110, 4)
    // let leaf4 = new Node(120, 90, 4)
    // let leaf5 = new Node(120, 90, 4)
    
    // let push1 = new Node(90, 100, 2)
    // let push2 = new Node(690, 100, 2)
    // let push3 = new Node(90, 100, 2)
    // let push4 = new Node(90, 100, 2)
    // let pivot1 = new Node(120, 100, 0)
    // let pivot3 = new Node(420, 400, 1)
    // let pivot2 = new Node(120, 100, 1)
    // let pivot3 = new Node(120, 100, 1)
    // let pivot4 = new Node(120, 100, 1)
    
    
    // globalnodes.push(nod1, nod2, nod3, leaf1, leaf2, push1, pivot1)
    
    
    // nod2.connect(leaf1)
    // nod2.connect(leaf2)
    // nod3.connect(leaf3)
    // nod3.connect(leaf4)
    // nod2.connect(pivot1)
    // // nod2.connect(pivot2)
    // // nod2.connect(pivot3)
    // // nod2.connect(pivot4)
    // nod1.connect(nod2)
    // pivot1.connect(nod3)
    // // pivot2.connect(nod3)
    // // pivot3.connect(nod3)
    // // pivot4.connect(nod3)
    // nod3.connect(nod4)
    // nod4.connect(nod5)
    // // nod.connect(nod3)




    // push1.connect(pivot3)
    // pivot3.connect(leaf5)
    // push2.connect(nod1)
    // push3.connect(nod1)
    // push4.connect(nod1)
    // // pivot1.connect(nod6)
    // nod3.connect(leaf1)

    // leaf1.connect(nod2)
    // leaf2.connect(nod2)
    
    
    
    
    function main() {
        macrodupe= 0
        seenToday = {}
        canvas_context.clearRect(0, 0, 720, 720)
    
        for (let t = 0; t < globalnodes.length; t++) {
            globalnodes[t].time()
        }
        for (let t = 0; t < globalnodes.length; t++) {
            globalnodes[t].drive()
        }

        
        for (let t = 0; t < globalnodes.length; t++) {
            globalnodes[t].link.mark = 0
            globalnodes[t].link.list = []
        }
        for (let t = 0; t < globalnodes.length; t++) {
            globalnodes[t].makeLink()
        }
    
        for (let t = 0; t < globalnodes.length; t++) {
            globalnodes[t].make()
        }
        for (let t = 0; t < globalnodes.length; t++) {
            if (globalnodes[t].link.mark == 1) {
                for (let r = 0; r < globalnodes[t].link.list.length; r++) {
                    globalnodes[t].link.target = globalnodes[globalnodes[t].link.list[r]]
                    globalnodes[t].link.draw()
                }
            }
        }
        for (let t = 0; t < globalnodes.length; t++) {
            globalnodes[t].drawBody()
        }
        for (let t = 0; t < globalnodes.length; t++) {
            for (let k = 0; k < globalnodes.length; k++) {
                if (t != k) {
                    globalnodes[t].link.target = globalnodes[k]
                    while (globalnodes[t].link.hypotenuse() < (globalnodes[t].lout)) {
    
                        let a = globalnodes[t].link.angle()
                        globalnodes[t].x += Math.cos(a) * .2
                        globalnodes[t].y += Math.sin(a) * .2
                        globalnodes[t].link.target.x -= Math.cos(a) * .2
                        globalnodes[t].link.target.y -= Math.sin(a) * .2
                    }
                }
            }
        }
    
        for (let t = 0; t < globalnodes.length; t++) {
            if(globalnodes[t].hit != 1){
                globalnodes[t].energyBalance()
            }
        }
        for (let t = 0; t < globalnodes.length; t++) {
            globalnodes[t].text()
        }
        
    }
    
    // })