const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

let gameStarted = false
const keys = []
const friction = 0.8
const gravity = 0.98
const platforms = []
platform_width = 120
platform_height = 20
let interval
let frames = 0

// players and boards
const images = {
    boardBat1: './images/buildingsBat.jpg',
    boardBat2: './images/wallpaperBatman.jpg',
    boardBat3: './images/wallpaperBat.png',
    gotham: './images/gotham.png',
    batmanR: './images/batmanRight1.png',
    batmanL: './images/batmanLeft1.png',
    superman_fly: './images/superman.png',
    joker: './images/joker.png',
    bane: './images/bane.png',
    mario: 'http://pngimg.com/uploads/mario/mario_PNG51.png'
}

//  board game
class BatBoard {
    constructor(img) {
        this.x = 0
        this.y = 0
        this.width = canvas.width
        this.height = canvas.height
        this.img = new Image(1300, 500)
        this.img.src = img
        this.img.onload = () => {
            this.draw() // draw image when image has alrady charged
        }
    }
    // METHOD
    draw() {

        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        ctx.drawImage(this.img, this.x + this.width, this.y, this.width, this.height)
        // void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    }
}

// characters
class Character {
    constructor(x, y, img) {
        this.x = 200
        this.y = canvas.height - 100
        this.img = new Image()
        this.img.src = img
        this.sx = 0
        this.sy = 0
        this.speed = 5
        this.velX = 0
        this.velY = 0
        this.jumping = false
        this.jumpStrength = 7
        this.grounded = false
    }
    draw() {
        ctx.drawImage(
            this.img,
            this.sx,
            this.sy,
            114,
            152,
            this.x,
            this.y,
            70,
            70
        )
    }
    moveRight() {
        //this.img.src = images.batmanR
        this.x += 5

        this.sx += 228
        if (this.sx > 1823) this.sx = 228

    }
    moveLeft() {
        //this.img.src = images.batmanL
        this.x -= 5
        this.sx += 228
        if (this.sx > 1823) this.sx = 228
    }
    moveUp() {
        this.y -= 5
    }
    moveDown() {
        this.y += 5
    }
}

const boardBatman = new BatBoard(images.gotham)
const batman = new Character(200, 200, images.batmanR, 114, 152)
//const superman = new Character(0,100,images.superman_fly,60,60)
/*const bane = new Character(200,0,images.bane,70,93)
const mario = new Character(100,50,images.mario,40,40) */

// Platforms
// ctx.fillRect(platform.x, platform.y, platform.width, platform.height)
platforms.push({
    x: canvas.width - 170,
    y: 400,
    width: platform_width,
    height: platform_height
})

platforms.push({
    x: 200,
    y: canvas.height - 50,
    width: platform_width,
    height: platform_height
})

platforms.push({
    x: 400,
    y: 400,
    width: platform_width,
    height: platform_height
})

platforms.push({
    x: canvas.width - 170,
    y: canvas.height - 50,
    width: platform_width,
    height: platform_height
})

platforms.push({
    x: -canvas.width,
    y: canvas.height - 15,
    width: canvas.width + canvas.width * 2,
    height: platform_height
})

// drawing platforms
function drawPlatforms() {
    ctx.fillStyle = 'gray'
    platforms.map(platform =>
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height)
    )
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    boardBatman.draw()
    batman.draw()
    drawPlatforms()

    //jump
    if (keys[38] || keys[32]) {
        if (!batman.jumping) {
            batman.velY = -batman.jumpStrength * 2
            batman.jumping = true
        }
    }

    //movimiento
    if (keys[39]) {
        if (batman.velX < batman.speed) {
            batman.velX++
        }
    }

    if (keys[37]) {
        if (batman.velX > -batman.speed) {
            batman.velX--
        }
    }

    //jump
    batman.y += batman.velY
    batman.velY += gravity

    //movimiento
    batman.x += batman.velX
    batman.velX *= friction

    //collition
    batman.grounded = false
    platforms.map(platform => {
        const direction = collisionCheck(batman, platform)
        if (direction == 'left' || direction == 'right') {
            batman.velX = 0
        } else if (direction == 'bottom') {
            batman.jumping = false
            batman.grounded = true
        } else if (direction == 'top') {
            batman.velY *= -1
        }
    })

    if (batman.grounded) {
        batman.velY = 0
    }
}

function collisionCheck(char, plat) {
    const vectorX = char.x + char.width / 2 - (plat.x + plat.width / 2)
    const vectorY = char.y + char.height / 2 - (plat.y + plat.height / 2)
    console.log(vectorY)
    const halfWidths = char.width / 2 + plat.width / 2
    const halfHeights = char.height / 2 + plat.height / 2

    let collisionDirection = null

    if (Math.abs(vectorX) < halfWidths && Math.abs(vectorY) < halfHeights) {
        var offsetX = halfWidths - Math.abs(vectorX)
        var offsetY = halfHeights - Math.abs(vectorY)
        if (offsetX < offsetY) {
            if (vectorX > 0) {
                collisionDirection = 'left'
                char.x += offsetX
            } else {
                collisionDirection = 'right'
                char.x -= offsetX
            }
        } else {
            if (vectorY > 0) {
                collisionDirection = 'top'
                char.y += offsetY
            } else {
                collisionDirection = 'bottom'
                char.y -= offsetY
            }
        }
    }
    return collisionDirection
}

function startGame() {
    gameStarted = true
    if (interval) return
    interval = setInterval(update, 1000 / 500)
}

document.body.addEventListener('keydown', e => {
    if (e.keyCode == 13 && !gameStarted) {
        startGame()
    }
    //para movimiento
    keys[e.keyCode] = true
})

//para movimiento
document.body.addEventListener('keyup', e => {
    keys[e.keyCode] = false
})

function intro_screen() {
    ctx.font = '20px Arial'
    ctx.fillText('Press Enter To Start', canvas.width / 2, canvas.height / 2 + 50)
}










intro_screen()
/*
// EVENT
addEventListener('keydown', e => {
    if (e.keyCode == 32) startGame()
    else if (e.keyCode == 39) batman.moveRight()
    else if (e.keyCode == 37) batman.moveLeft()
    else if (e.keyCode == 38) batman.moveUp()
    else if (e.keyCode == 40) batman.moveDown()
})
*/
/* addEventListener('keydown',e =>{
    switch(e.keyCode){
        case 68:
          return superman.moveRight()
        case 65:
          return superman.moveLeft()
        case 87:
          return superman.moveUp()
        case 83:
          return superman.moveDown()
      }
}) */