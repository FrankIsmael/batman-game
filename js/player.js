const player = {
    x: 15,
    y: canvas.height - 200,
    sx: 0,
    sy: 0,
    width: 130,
    height: 160,
    speed: 4,
    velX: 0,
    velY: 0,
    color: 'orange',
    jumping: false,
    jumpStrength: 1,
    grounded: false,
    draw: function() {
        img = new Image()
        img.src = images.superman
        ctx.drawImage(img, this.sx, this.sy, this.width, this.height, this.x, this.y, 130, 160);
        player.sx += 130
        if (player.sx >= 3640) player.sx = 0
    }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    boardBatman.draw()
    player.draw()
    drawPlatforms()


    //jump
    if (keys[38] || keys[32]) {
        if (!player.jumping) {
            player.y +=10         
            player.velY = -player.jumpStrength * 4
            player.jumping = true
        }
    }

    //movimiento
    if (keys[39]) {
        if (player.velX < player.speed) {
            player.velX++
            /* player.sx += 100.5
            if (player.sx >= 500) player.sx = 0 */
            
        }
    }

    if (keys[37]) {
        if (player.velX > -player.speed) {
            player.velX--
            /* player.sx += 100.5
            if (player.sx >= 500) player.sx = 0 */
        }
    }

    //jump
    player.y += player.velY
    player.velY += gravity

    //movimiento
    player.x += player.velX
    player.velX *= friction

    //collition
    player.grounded = false
    platforms.map(platform => {
        const direction = collisionCheck(player, platform)
        if (direction == 'left' || direction == 'right') {
            player.velX = 0
        } else if (direction == 'bottom') {
            player.jumping = false
            player.grounded = true
        } else if (direction == 'top') {
            player.velY *= -1
        }
    })

    if (player.grounded) {
        player.velY = 0
    }
}