let blockSize = 33.33;
let rowCount = 15;
let columnCount = 15
let canvas; 
let context;


let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let speedX = 0;
let speedY = 0;

let snakeBody = []



let foodX;
let foodY;


let gameOver = false;

let snakeColor = 'white'
let food = 'apple.jpeg'
window.onload = function () {
    canvas = document.getElementById("gameCanvas");
    canvas.style.width = rowCount * blockSize ;
    canvas.style.height = columnCount * blockSize;
    context = canvas.getContext("2d");
    placeFood();

    document.addEventListener("keyup", moveSnake);
    setInterval(update, 1000 / 10);
}

function update() {
    if (gameOver) {
        return
    }
    context.fillStyle = "#9BBA5A";
    context.fillRect(0, 0, board.width, board.height);
    context.drawImage(food, foodX, foodY)

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    for (let i = snakeBody.length; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1]
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX,snakeY]
    }
    context.fillStyle = snakeColor;

    snakeX += speedX * blockSize;
    snakeY += speedY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }if (snakeX < 0 || snakeX > total_col * blockSize || snakeY < 0 || snakeY > total_row * blockSize) { 
        gameOver = true;
        alert("Game Over");
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) { 
            gameOver = true;
            alert("Game Over");
        }
    }

}

function moveSnake(e) {
    if (e.code = "ArrowDown" && speedY != -1) {
        speedX = 0;
        speedY = -1;
    }
    if (e.code = "ArrowUp" && speedY != 1) {
        speedX = 0;
        speedY = 1;
    }
    if (e.code = "ArrowLeft" && speedX != -1) {
        speedX = -1;
        speedY = 0;
    }
    if (e.code = "ArrowRight" && speedX != 1) {
        speedX = 1;
        speedY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * columnCount) * blockSize;
    foodY = Math.floor(Math.random() * rowCount) * blockSize;
}
