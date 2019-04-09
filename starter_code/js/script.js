const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

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

//  board game batman
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
    constructor(x, y, img, sw, sh) {
        this.x = x
        this.y = y
        this.img = new Image()
        this.img.src = img
        this.sx = 0
        this.sy = 0
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
        this.img.src = images.batmanR
        this.x += 5 
        
        this.sx += 228
        if (this.sx > 1823) this.sx = 228

    }
    moveLeft() {
        this.img.src = images.batmanL
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
/* const superman = new Character(0,100,images.superman_fly,60,60)
const bane = new Character(200,0,images.bane,70,93)
const mario = new Character(100,50,images.mario,40,40) */

let frames = 0
let interval

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    boardBatman.draw()
    batman.draw()
    /* superman.draw()
    bane.draw()
    mario.draw() */
    frames++
}

function startGame() {
    if (interval) return
    interval = setInterval(update, 1000 / 500)
}

// EVENT 
addEventListener('keydown', e => {
    if (e.keyCode == 32) startGame()
    else if (e.keyCode == 39) batman.moveRight()
    else if (e.keyCode == 37) batman.moveLeft()
    else if (e.keyCode == 38) batman.moveUp()
    else if (e.keyCode == 40) batman.moveDown()
})

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