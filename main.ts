class vec2 {
    x: number
    y: number
    constructor (x:number, y:number){
        this.x=x
        this.y=y
    }
    static Multiply(vector1: vec2, vector2: vec2) {
        return(new vec2(vector1.x*vector2.x - vector1.y*vector2.y, vector1.x*vector2.y + vector1.y*vector2.x))
    }
    static Add(vector1: vec2, vector2: vec2) {
        return(new vec2(vector1.x+vector2.x, vector1.y+vector2.y))
    }
    static Abs(vector:vec2) {
        return(new vec2(Math.abs(vector.x), Math.abs(vector.y)))
    }
}
function iterate(point: vec2, origpoint: vec2) {
    let newx = point.x**2 - point.y**2 + origpoint.x
    let newy = 2*point.x*point.y + origpoint.y
    return (new vec2(newx,newy))
}
let detail = 20
function mandel(point: vec2) {
    let colour = Math.floor(detail)
    let newpoint = new vec2(point.x,point.y)
    let its = 0
    while(newpoint.x**2+newpoint.y**2 <= 4 && its < Math.floor(detail)) {
        newpoint = iterate(newpoint, point)
        its++
    }
    return(Math.floor(detail)-its)
}
let camerapos = new vec2(0,0)
let zoom = 0.02
let zoomfactor = 2
let movefactor = 40
let bg = image.create(160, 120)
scene.setBackgroundImage(bg)
function draw(minx:number, maxx:number, miny:number, maxy:number){
    for (let x = minx; x < maxx; x++) {
        for (let y = miny; y < maxy; y++) {
            let point = new vec2((x-80) * zoom + camerapos.x, (y-60) * zoom + camerapos.y)
            bg.setPixel(x, y, mandel(point))
        }
    }
}
draw(0,160,0,120)
controller.A.onEvent(ControllerButtonEvent.Pressed, function() {
    zoom *= 1/zoomfactor 
    detail += zoomfactor*0.5
    draw(0,160,0,120)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function() {
    zoom *= zoomfactor 
    detail -= zoomfactor*0.5
    draw(0,160,0,120)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function() {
    camerapos.x -= zoom*movefactor
    let temp = bg.clone()
    bg.drawImage(temp, movefactor, 0)
    draw(0,movefactor,0,120)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function() {
    camerapos.x += zoom*movefactor
    let temp = bg.clone()
    bg.drawImage(temp, -movefactor, 0)
    draw(160 - movefactor,160,0,120)
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function() {
    camerapos.y -= zoom*movefactor
    let temp = bg.clone()
    bg.drawImage(temp, 0, movefactor)
    draw(0,160,0,movefactor)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function() {
    camerapos.y += zoom*movefactor
    let temp = bg.clone()
    bg.drawImage(temp, 0, -movefactor)
    draw(0,160,120 - movefactor,120)
})