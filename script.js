const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d'); //context to draw

canvas.width = 1920;
canvas.height = 1080;

c.fillRect(0, 0, canvas.width, canvas.height) //creates a rectangle to take over the background behhind canvas

const gravity = 0.7

//game background
const background = new Sprite({
    position:{
        x:0,
        y:0
    },
    imageSrc: './img/background.png'
})
//shop sprite
const shop = new Sprite({
    position:{
        x:1170,
        y:520
    },
    imageSrc: './img/shop.png',
    scale: 3,
    framesMax: 6
})
//background character
const bgCh = new Sprite({
    position:{
        x:1104,
        y:824
    },
    imageSrc: './img/ch/AnimationSheet_Character.png',
    scale: 2.5,
    framesMax:2,

})

//p1 sprite
const player = new Fighter({
    position: {
        x: 100,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0,
    },
    offset:{
        x:0,
        y:0
    },
    imageSrc: './img/samuraiMack/idle.png',
    framesMax: 8,
    scale: 2.7,
    offset: {
        x: 215,
        y: 180
    },
    sprites: {
       idle: {
        imageSrc: './img/samuraiMack/Idle.png',
        framesMax: 8
       },
       run: {
        imageSrc: './img/samuraiMack/Run.png',
        framesMax: 8
        },
        jump: {
            imageSrc: './img/samuraiMack/Jump.png',
            framesMax: 2
            },
        fall: {
            imageSrc: './img/samuraiMack/Fall.png',
            framesMax: 2

        },
        attack1: {
            imageSrc: './img/samuraiMack/Attack1.png',
            framesMax: 6
        },
        takeHit: {
            imageSrc:'./img/samuraiMack/Take Hit.png',
            framesMax: 4
        },
        death: {
            imageSrc:'./img/samuraiMack/Death.png',
            framesMax: 6
        }

        
    },
    attackBox: {
        offset: {
            x:143,
            y:20 
        },
        width: 150,
        height: 100
    }
})

//p2 sprite
const enemy = new Fighter({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0,
    },
    offset:{
        x: -50,
        y: 0
    },
    imageSrc: './img/kenji/idle.png',
    framesMax: 4,
    scale: 2.7,
    offset: {
        x: 215,
        y: 195
    },
    sprites: {
       idle: {
        imageSrc: './img/kenji/Idle.png',
        framesMax: 4
       },
       run: {
        imageSrc: './img/kenji/Run.png',
        framesMax: 8
        },
        jump: {
            imageSrc: './img/kenji/Jump.png',
            framesMax: 2
            },
        fall: {
            imageSrc: './img/kenji/Fall.png',
            framesMax: 2

        },
        attack1: {
            imageSrc: './img/kenji/Attack1.png',
            framesMax: 4

        },
        takeHit: {
            imageSrc:'./img/kenji/Take hit.png',
            framesMax: 3
        },
        death: {
            imageSrc:'./img/kenji/Death.png',
            framesMax: 7
        }
    },
    attackBox: {
        offset: {
            x:-143,
            y:20 
        },
        width: 150,
        height: 100
    }
})

console.log(player);

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}


decreaseTimer()

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
    bgCh.update()
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0

    //p1 movement
   
    if (keys.a.pressed && lastkey === 'a'){
        player.velocity.x = -6
        player.switchSprite('run')
    } else if (keys.d.pressed && lastkey === 'd'){ 
        player.velocity.x = 6
        player.switchSprite('run')
    }else{
        player.switchSprite('idle')
    }
    
    //p1 jumping
    if(player.velocity.y < 0){
        player.switchSprite('jump')
    }
    else if(player.velocity.y > 0){
        player.switchSprite('fall')
    }
      

    //p2 movement
    enemy.velocity.x = 0
    if (keys.ArrowLeft.pressed && enemy.lastkey === 'ArrowLeft') {
        enemy.velocity.x = -5
        enemy.switchSprite('run')
    } else if (keys.ArrowRight.pressed && enemy.lastkey === 'ArrowRight') {
        enemy.velocity.x = 5
        enemy.switchSprite('run')
    } else{
        enemy.switchSprite('idle')
    }

    //p2jumping
    if(enemy.velocity.y < 0){
        enemy.switchSprite('jump')
    }
    else if(enemy.velocity.y > 0){
        enemy.switchSprite('fall')
    }


    // detect for collision & p2 taking dmg
    if (
        recCollision({
            rectangle1: player,
            rectangle2: enemy
          }) &&
          player.attack &&
          player.framesCurrent === 4
        ) {
        enemy.takeHit()
        player.attack = false

        document.querySelector('#enemyHealth').style.width = enemy.health + '%'
    }
  //a little if statement if p1 misses attack
    if(player.attack && player.framesCurrent == 4){
        player.attack = false
}
    // detect for collision & p1 taking dmg
    if (
        recCollision({
            rectangle1: enemy,
            rectangle2: player
            }) &&
            enemy.attack &&
            enemy.framesCurrent === 2
        ) {
        player.takeHit()
        enemy.attack = false


        document.querySelector('#playerHealth').style.width = player.health + '%'
    }
      //a little if statement if p2 misses attack
      if(enemy.attack && enemy.framesCurrent == 4){
        enemy.attack = false
      }

    if(enemy.health <= 0 || player.health <= 0){
        winner({player,enemy,timerId})
    }

}

animate()

window.addEventListener('keydown', (event) => {
    //  p1 movement 
    switch (event.key) {
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

    //  p1 attack
        case ' ':
            player.isAttacking()
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
    // p2 attack
        case 'ArrowDown':
            enemy.isAttacking()
            break
    }
})

window.addEventListener('keyup', (event) => {
    //  p2 controls
    switch (event.key) {
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
})