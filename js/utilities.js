let lastkey

function recCollision({rectangle1, rectangle2}) {
    return(
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}
function winner({player, enemy, timerId}){
    clearTimeout(timerId)
    document.querySelector('#displayText').style.display = 'flex'
    if(player.health === enemy.health){
        document.querySelector('#displayText').innerHTML = 'Draw'
    }else if(player.health > enemy.health){
        document.querySelector('#displayText').innerHTML = 'Player 1 Wins'
    }else if(player.health < enemy.health){
        document.querySelector('#displayText').innerHTML = 'Player 2 Wins'
    }
}

//timer function for clock
let timer = 190
let timerId
function decreaseTimer(){
    if(timer > 0){
    timer --
    timerId = setTimeout(decreaseTimer, 1000)
    document.querySelector('#timer').innerHTML = timer
    }

    if(timer === 0){
        winner({player, enemy, timerId})
    }

    
}