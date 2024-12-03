let blockSize = 33.33;
let rowCount = 15;
let columnCount = 15

let context;


let snakeX = blockSize * 0;
let snakeY = blockSize * 0;

let speedX = 0;
let speedY = 0;

let snakeBody = [[0,0]]



let foodX;
let foodY;


let gameOver = false;

let snakeColor = 'white'
let food = 'apple.jpeg'

window.onload = function () {
    canvas = document.getElementById("gameCanvas");
    canvas.setAttribute('width', columnCount * blockSize);
    canvas.setAttribute('height', rowCount * blockSize);
    canvas.style.width = columnCount * blockSize
    canvas.style.height = rowCount * blockSize
    context = canvas.getContext("2d");
    placeFood();

    document.addEventListener("keyup", moveSnake);
    setInterval(update, 2000 / 10);
}

function update() {
    if (gameOver) {
        return
    }
    context.fillStyle = "#9BBA5A";
    context.fillRect(0, 0, canvas.width, canvas.height);
    // context.drawImage(food, foodX, foodY)
    context.fillStyle = "red"
    context.fillRect(foodX, foodY, blockSize, blockSize);
    


    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    // for (let i = snakeBody.length; i > 0; i--) {
    //     snakeBody[i] = snakeBody[i-1]
    // }

    context.fillStyle = snakeColor;

    snakeX += speedX * blockSize;
    snakeY += speedY * blockSize;

    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0] + snakeX, snakeBody[i][1] + snakeY, blockSize, blockSize);
    }
    
    // console.log(snakeBody)
    
    if (snakeX < 0 || snakeX > columnCount * blockSize || snakeY < 0 || snakeY > rowCount * blockSize) { 
         gameOver = true;
        //  alert("Game Over");
         console.log(snakeX)
         return false
    }

    // for (let i = 0; i < snakeBody.length; i++) {
    //     if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) { 
    //         gameOver = true;
    //         // alert("Game Over");
    //     }
    // }
}

function moveSnake(e) {
    if (e.code == "ArrowDown" && speedY != 1) {
        speedX = 0;
        speedY = 1;
    }
    if (e.code == "ArrowUp" && speedY != -1) {
        speedX = 0;
        speedY = -1;
    }
    if (e.code == "ArrowLeft" && speedX != -1) {
        speedX = -1;
        speedY = 0;
    }
    if (e.code == "ArrowRight" && speedX != 1) {
        speedX = 1;
        speedY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * columnCount) * blockSize;
    foodY = Math.floor(Math.random() * rowCount) * blockSize;
    console.log('Food placed', foodX, ' ', foodY)
}
