class vec2 {
    x: number
    y: number
    constructor (x:number, y:number){
        this.x=x
        this.y=y
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
let camerapos = new vec2(-2,0)
let zoom = 0.02
let zoomfactor = 2
let bg = image.create(160, 120)
scene.setBackgroundImage(bg)
game.onUpdateInterval(10, function() {
    for (let x = 0; x < 160; x++) {
        for (let y = 0; y < 120; y++) {
            let point = new vec2((x-80) * zoom + camerapos.x, (y-60) * zoom + camerapos.y)
            bg.setPixel(x, y, mandel(point))
        }
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function() {
    zoom *= 1/zoomfactor 
    detail += zoomfactor*0.5
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function() {
    zoom *= zoomfactor 
    detail -= zoomfactor*0.5
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function() {
    camerapos.x -= zoom*20
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function() {
    camerapos.x += zoom*20
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function() {
    camerapos.y -= zoom*20
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function() {
    camerapos.y += zoom*20
})