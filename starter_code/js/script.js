const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const images = {
  boardBat1: './images/buildingsBat.jpg',
  boardBat2: './images/wallpaperBatman.jpg',
  batman: './images/batmanF_opt.png',
  superman_fly: './images/superman.png',
  joker: './images/joker.png'
}

//  board game batman
class BatBoard{
    constructor(img){
      this.x = 0
      this.y = 0
      this.width = canvas.width
      this.height = canvas.height
      this.img = new Image()
      this.img.src = img
      this.img.onload = ()=>{
        this.draw() // draw image when image has alrady charged
      }
    }
    // METHOD
    draw(){
    ctx.drawImage(this.img,this.x,this.y,this.width,this.height)
    }
  }
  class Character {
    constructor(x,y,img){
      this.x = x
      this.y = y
      this.img = new Image()
      this.img.src = img
      this.img.onload = ()=>{
      this.draw() // draw image when image has alrady charged
      }
    }
    draw(){
        ctx.drawImage(this.img,this.x,this.y,60,45)
    }
    moveRight(){
      this.x+=5
    }
    moveLeft(){
      this.x-=5
    }
    moveUp(){
      this.y-=5
    }
    moveDown(){
      this.y+=5
    }
  }


  const boardBatman = new BatBoard(images.boardBat1)
  const batman = new Character(0,0,images.batman)
  const joker = new Character(0,0,images.joker)
  const superman = new Character(100,100,images.superman_fly)

let frames = 0
let interval

function update() {
  ctx.clearRect(0,0,canvas.width,canvas.height)
   boardBatman.draw()
   batman.draw()
   joker.draw()
   superman.draw()
  frames++ 
  console.log(frames)
}

function startGame(){
  if(interval) return
  interval = setInterval(update,1000/60)
}

// EVENT 
addEventListener('keydown',e => {
   if(e.keyCode == 32)startGame()
   else if(e.keyCode == 39) batman.moveRight()
   else if(e.keyCode == 37) batman.moveLeft()
   else if(e.keyCode == 38) batman.moveUp()
   else if(e.keyCode == 40) batman.moveDown()                 
   else if(e.keyCode == 68) superman.moveRight()  
   else if(e.keyCode == 65) superman.moveLeft()  
   else if(e.keyCode == 87)superman.moveUp()  
   else if(e.keyCode == 83) superman.moveDown()
})

addEventListener('keypress',k =>{
    switch(k.keyCode){
        case 68:
          return superman.moveRight()
        case 65:
          return superman.moveLeft()
        case 87:
          return superman.moveUp()
        case 83:
          return superman.moveDown()
      }
})