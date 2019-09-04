const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

let gameStarted = false
const keys = []
let weaponsArr = []
const friction = 0.8
const platforms = []
platform_width = 120
platform_height = 20
let interval

// players and boards
const images = {
    introLego: './images/introLego-min.png',
    gotham: './images/wallpaperBat.png',
    batmanR: './images/batmanR.png',
    batmanL: './images/batmanL.png',
    supermanL: './images/supermanFL.png',
    supermanR: './images/supermanFR.png',
    joker: './images/joker.png',
    bane: './images/bane.png',
    spaceShip: './images/spaceShip.png',// 15444 × 250 54 frames
    batarang: './images/batarang4.png',
    platform: './images/backgroundPlatform.png'
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

class Character {
    constructor(dx, dy, img, sw, sh, g = .98) {
        this.img = new Image()
        this.img.src = img
        this.sx = 0
        this.sy = 0
        this.sw = sw
        this.sh = sh
        this.dx = dx
        this.dy = dy
        this.speed = 5
        this.velX = 0
        this.velY = 0
        this.jumping = false
        this.jumpStrength = 5
        this.grounded = false
        this.gravity = g
        this.health = 5
        this.direction = ''
    }
    draw() {
        ctx.drawImage(
            this.img,
            this.sx,
            this.sy,
            this.sw,
            this.sh,
            this.dx,
            this.dy,
            this.sw,
            this.sh)
    }
}


function generateWeapon(x, y) {
    const weapon = new WeaponCharacter(x, y)
    weaponsArr.push(weapon)
}
function drawWeapon() {
    weaponsArr.forEach((shoot) => {
        if (shoot.status === 1) shoot.draw()
        shoot.velX++

        shoot.x += shoot.velX
        shoot.velX *= friction
    })
}
function checkCollisionWeapons() {
    weaponsArr.forEach((shoot) => {
        if (spaceShip.isTouching(shoot) && spaceShip.status == 1 && shoot.status == 1) {
            spaceShip.health--
            if (spaceShip.health == 0) spaceShip.status = 0
            shoot.status = 0
        }
    })
}



class SpaceShip {
    constructor(img, sw, sh) {
        this.img = new Image()
        this.img.src = img
        this.sx = 0
        this.sy = 0
        this.sw = sw
        this.sh = sh
        this.dx = Math.floor(Math.random() * (canvas.width - 250))
        this.dy = Math.floor(Math.random() * 200)
        this.speed = 1
        this.velX = 0
        this.velY = 0
        this.health = 10
        this.status = 1
    }

    draw() {
        if (spaceShip.status == 1) {
            ctx.drawImage(
                this.img,
                this.sx,
                this.sy,
                this.sw,
                this.sh,
                this.dx,
                this.dy,
                this.sw,
                this.sh)

            this.dx++
            if (this.dx == 0) this.velX++
            if (this.dx == (canvas.width - 250)) this.velX--
            this.dx += this.velX
            this.sx += this.sw
            if (this.sx > (this.img.width - this.sw)) this.sx = 0
        } else {
            ctx.font = '50px Arial'
            ctx.fillStyle = 'white'
            ctx.fillText('SpaceShip XX', 400, 300)
        }

    }
    isTouching(shoot) {
        return (this.x < shoot.x + shoot.width) &&
            (this.x + this.width > shoot.x) &&
            (this.y < shoot.y + shoot.height) &&
            (this.y + this.height > shoot.y)
    }
}

class WeaponCharacter {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.sw = 367
        this.sh = 367
        this.img = new Image()
        this.img.src = images.batarang

        this.speed = 5
        this.velX = 0
        this.velY = 0
        this.status = 1
    }
    draw() {
        ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.sw / 5,
            this.sh / 5)
        this.x++
    }
}

// Objects
const boardBatman = new BatBoard(images.gotham)
const spaceShip = new SpaceShip(images.spaceShip, 286, 250)
const batman = new Character(5, canvas.height - 170, images.batmanR, 168, 160, .8)//168,160
const superman = new Character(canvas.width - 200, canvas.height / 2, images.supermanR, 130, 160, .5)
const weap = new WeaponCharacter(100, 100)
let xI = 0
function Intro() {
    img = new Image()
    img.src = images.introLego
    if (!gameStarted) {
        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(
            img,
            xI,
            0,
            1200,
            1200,
            0,
            -300,
            1200,
            1200
        )
        ctx.font = '50px Arial'
        ctx.fillStyle = 'white'
        ctx.fillText('LEGO GAME', 400, 300)
    }
}

function updateIntro() {
    if (!gameStarted) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        Intro()
        xI += 1200
        if (xI > 22800) xI = 0
    }
}

setInterval(updateIntro, 1000 / 12)


platforms.push({
    x: canvas.width - 340,
    y: 400,
    width: platform_width,
    height: platform_height
})

platforms.push({
    x: 300,
    y: 400,
    width: platform_width,
    height: platform_height
})

platforms.push({
    x: -canvas.width,
    y: canvas.height - 15,
    width: canvas.width + canvas.width * 2,
    height: platform_height
})

document.body.addEventListener('keydown', e => {
    keys[e.keyCode] = true
})

//Move
document.body.addEventListener('keyup', e => {
    keys[e.keyCode] = false
})

let button = document.getElementById("button");
button.onclick = function () {
    if (!gameStarted) {
        startGame()
    }
}

function startGame() {
    gameStarted = true
    if (interval) return
    interval = setInterval(update, 1000 / 60)
}

// Platforms
function drawPlatforms() {
    ctx.fillStyle = 'gray'
    platforms.map(platform => {
        var img = new Image();
        img.src = images.platform
        
            var pattern = ctx.createPattern(img, 'repeat');
            ctx.fillStyle = pattern;
            ctx.fillRect(platform.x, platform.y, platform.width, platform.height)
        }

    )
}
let frames = 0
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    boardBatman.draw()
    drawPlatforms()
    batman.draw()
    superman.draw()
    spaceShip.draw()
    weap.draw()

    drawWeapon()
    checkCollisionWeapons()
    frames++

    //weap.draw()

    /*----------BATMAN-----------*/
    //jump Batman
    if (keys[38]) {
        if (!batman.jumping) {
            batman.velY = -batman.jumpStrength * 4
            batman.jumping = true
        }
    }
    //move +x
    if (keys[39]) {
        batman.img.src = images.batmanR
        batman.direction = 'R'
        if (batman.velX < batman.speed) {
            batman.velX++
        }
        batman.sx += 168
        if (batman.sx > 3192) batman.sx = 0
    }
    //move -x
    if (keys[37]) {
        batman.img.src = images.batmanL
        batman.direction = 'L'
        if (batman.velX > -batman.speed) {
            batman.velX--
        }
        batman.sx += 168
        if (batman.sx > 3192) batman.sx = 0

    }

    if (keys[16]) {
        if (frames % 5) {
            return generateWeapon(batman.dx + 50, batman.dy)
        }
    }

    //jump batman
    batman.dy += batman.velY
    batman.velY += batman.gravity
    //move batman
    batman.dx += batman.velX
    batman.velX *= friction

    //collition batman-platforms
    batman.grounded = false
    platforms.map(platform => {
        const direction = collisionCheck(batman, platform)//platform
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


    /*----------------SUPERMAN-------------------------*/
    //jump superman
    if (keys[87]) {
        if (!superman.jumping) {
            superman.velY = -superman.jumpStrength * 4
            superman.jumping = true
        }
    }
    //move +x
    if (keys[68]) {
        superman.img.src = images.supermanR
        if (superman.velX < superman.speed) {
            superman.velX++
        }
        superman.sx += 130
        if (superman.sx > 3640) superman.sx = 0
    }
    //move -x
    if (keys[65]) {
        superman.img.src = images.supermanL
        if (superman.velX > -superman.speed) {
            superman.velX--
        }
        superman.sx += 130
        if (superman.sx > 3640) superman.sx = 0
    }
    //jump superman
    superman.dy += superman.velY
    superman.velY += superman.gravity
    //move superman
    superman.dx += superman.velX
    superman.velX *= friction

    //collition superman-platforms
    superman.grounded = false
    platforms.map(platform => {
        const direction = collisionCheck(superman, platform)//platform
        if (direction == 'left' || direction == 'right') {
            superman.velX = 0
        } else if (direction == 'bottom') {
            superman.jumping = false
            superman.grounded = true
        } else if (direction == 'top') {
            superman.velY *= -1
        }
    })
    if (superman.grounded) {
        superman.velY = 0
    }
}

function collisionCheck(char, plat) {
    const vectorX = char.dx + char.sw / 2 - (plat.x + plat.width / 2)
    const vectorY = char.dy + char.sh / 2 - (plat.y + plat.height / 2)

    const halfWidths = char.sw / 2 + plat.width / 2
    const halfHeights = char.sh / 2 + plat.height / 2


    let collisionDirection = null

    if (Math.abs(vectorX) < halfWidths && Math.abs(vectorY) < halfHeights) {
        var offsetX = halfWidths - Math.abs(vectorX)
        var offsetY = halfHeights - Math.abs(vectorY)
        if (offsetX < offsetY) {
            if (vectorX > 0) {
                collisionDirection = 'left'
                char.dx += offsetX
            } else {
                collisionDirection = 'right'
                char.dx -= offsetX
            }
        } else {
            if (vectorY > 0) {
                collisionDirection = 'top'
                char.dy += offsetY
            } else {
                collisionDirection = 'bottom'
                char.dy -= offsetY
            }
        }
    }
    return collisionDirection
}



