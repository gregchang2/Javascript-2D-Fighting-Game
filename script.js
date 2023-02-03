const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d'); //context to draw

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height)//creates a rectangle to take over the background behhind canvas

const gravity = 0.7

class sprite{
    constructor({position, velocity, color}){ //funtion within a class that boots up everytime we creat a new object from the sprite class
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.lastkey
        this.hitBox = {
            position: this.position,
            width: 100,
            height: 50
        }
        this.color = color
    }

    draw(){
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, 50, this.height)

        // hit box
        c.fillStyle = 'green'
        c.fillRect(this.hitBox.position.x, this.hitBox.position.y, this.hitBox.width, this.hitBox.height)
    }

    update(){
        this.draw()
        
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if(this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0;
        }
        else{
            this.velocity.y += gravity
        }
    }
}

//p1 sprite
const player = new sprite({
    position: {
        x: 100,
        y: 100
    },
    velocity:{
        x: 0,
        y: 0,
    },
    color: 'blue'
})

//p2 sprite
const enemy = new sprite({
    position: {
        x: 400,
        y: 100
    },
    velocity:{
        x: 0,
        y: 0,
    },
    color: 'red'
})

console.log(player);

const keys = {
    a: {
        pressed: false
    },
    d:{
        pressed: false
    },
    w:{
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft:{
        pressed: false
    },
    ArrowUp:{
        pressed: false
    }
}
let lastkey

function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0,0, canvas.width,canvas.height)
    player.update()
    enemy.update()

//p1 animation
    player.velocity.x = 0
    if (keys.a.pressed && lastkey === 'a') {
        player.velocity.x = -5
    }
    else if(keys.d.pressed && lastkey === 'd'){
        player.velocity.x = 5
    }
//p2 animation
    enemy.velocity.x = 0
    if (keys.ArrowLeft.pressed && enemy.lastkey === 'ArrowLeft') {
        enemy.velocity.x = -5
    }
    else if(keys.ArrowRight.pressed && enemy.lastkey === 'ArrowRight'){
        enemy.velocity.x = 5
    }

}

animate()

window.addEventListener('keydown', (event) => {
// p1 movement 
    switch(event.key){
        case 'd':
            keys.d.pressed = true
            lastkey = 'd'
            break
        case 'a':
            keys.a.pressed = true 
            lastkey = 'a'
            break
        case 'w':
            player.velocity.y = -20
            break
//  p2 movement
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastkey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastkey = 'ArrowLeft'
            break
        case 'ArrowUp':
            enemy.velocity.y = -20
            break
        }
    console.log(event.key);
})

window.addEventListener('keyup', (event) => { 
//  p2 controls
    switch(event.key){
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
//  p2 controls
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        }
    console.log(event.key);
})