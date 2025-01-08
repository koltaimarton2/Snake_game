let blockSize = 33.33;
let rowCount = 15;
let columnCount = 15;

let context;


let snakeX = 0;
let snakeY = 0;

let speedX = 0;
let speedY = 0;

let snakeBody = [[0,0]]



var appleCount = 1;

let foodX;
let foodY;

let foodX2;
let foodY2;

let foodX3;
let foodY3;


let gameOver = false;



let food = new Image(blockSize, blockSize)
food.src = "../img/apple.png"
if (sessionStorage.getItem("source"))
food.src = "../img/" + sessionStorage.getItem("source");

if (sessionStorage.getItem("source")) 
document.getElementById(sessionStorage.getItem("source")).selected = true;

var bestScore = 0;
bestScore = sessionStorage.getItem("bestId");

let interval = 200;
var timerID;

document.getElementById("colorpick").value = sessionStorage.getItem("colorpick");    
snakeColor = sessionStorage.getItem("colorpick");

if (sessionStorage.getItem("appleCount")) {
document.getElementById(sessionStorage.getItem("appleCount")).checked = true;
appleCount = sessionStorage.getItem("appleCount");
}
else {
    appleCount = 1
}

if (sessionStorage.getItem("mapSize")) {
document.getElementById(sessionStorage.getItem("mapSize")).checked = true;
SetupMap(sessionStorage.getItem("mapSize"));
}
else {
    SetupMap("small")
}

if (sessionStorage.getItem("speed")) {
document.getElementById(sessionStorage.getItem("speed")).checked = true;
SetupSpeed(sessionStorage.getItem("speed"));
}
else {
    SetupSpeed("worm")
}
function saveValue(e){
    var id = e.id;
    var val = e.value;
    sessionStorage.setItem(id, val);
}

function SetupMap(mapSize) {
    if (mapSize == "big") {
        blockSize = 25
        rowCount = 20
        columnCount = 20
        placeFood()
        placeFood2()
        placeFood3()
    }
    else if (mapSize == "mid") {
        blockSize = 33.33
        rowCount = 15
        columnCount = 15
        placeFood()
        placeFood2()
        placeFood3()
    }
    else if (mapSize == "small") {
        blockSize = 50
        rowCount = 10
        columnCount =10
        placeFood()
        placeFood2()
        placeFood3()
    }
}

function MapSize(input) {
    mapSize = input.value;
    SetupMap(mapSize);
    sessionStorage.setItem("mapSize", mapSize);
} 

function SetupSpeed(speed) {
    if (speed == "python") {
        interval = 75
    }
    else if (speed == "worm") {
        interval = 200
    }
    else if (speed == "slug"){
        interval = 350
    }
    startGame()
}

function Speed(input) {
    speed = input.id
    SetupSpeed(speed);
    sessionStorage.setItem("speed",speed)
} 


function startGame(){
    if (timerID) {
        clearInterval(timerID);
    }
    writeBestScore();
    canvas = document.getElementById("gameCanvas");
    canvas.setAttribute('width', columnCount * blockSize);
    canvas.setAttribute('height', rowCount * blockSize);
    canvas.style.width = columnCount * blockSize
    canvas.style.height = rowCount * blockSize
    context = canvas.getContext("2d");
    placeFood();
    placeFood2();
    placeFood3();

    document.addEventListener("keydown", moveSnake);
    update();
    timerID = setInterval(update, interval);

    setInterval(keepScore, 50);
}

function update() {
    if (gameOver) {
        return
    }
    context.fillStyle = "#9BBA5A";
    context.fillRect(0, 0, canvas.width, canvas.height);
    // context.drawImage(food, foodX, foodY)
    // context.fillStyle = "red"
    // context.fillRect(foodX, foodY, blockSize, blockSize);


    const lastBlock = snakeBody[-1]
    
    
    //1 alma
    if (appleCount == 1) {
        context.drawImage(food, foodX, foodY, blockSize, blockSize);
        if (Math.floor(snakeBody[0][0]) == Math.floor(foodX) && Math.floor(snakeBody[0][1]) == Math.floor(foodY)) {
            placeFood();
            snakeBody.push(lastBlock);
        }
    }
    
    //2 alma
    if (appleCount == 2) {
        context.drawImage(food, foodX, foodY, blockSize, blockSize);
        context.drawImage(food, foodX2, foodY2, blockSize, blockSize);
        if (Math.floor(snakeBody[0][0]) == Math.floor(foodX) && Math.floor(snakeBody[0][1]) == Math.floor(foodY)) {
            placeFood();
            snakeBody.push(lastBlock);
        }
        if (Math.floor(snakeBody[0][0]) == Math.floor(foodX2) && Math.floor(snakeBody[0][1]) == Math.floor(foodY2)) {
            placeFood2();
            snakeBody.push(lastBlock);
        }
    }

    //3 alma
    if (appleCount == 3) {
        context.drawImage(food, foodX, foodY, blockSize, blockSize);
        context.drawImage(food, foodX2, foodY2, blockSize, blockSize);
        context.drawImage(food, foodX3, foodY3, blockSize, blockSize);
        if (Math.floor(snakeBody[0][0]) == Math.floor(foodX) && Math.floor(snakeBody[0][1]) == Math.floor(foodY)) {
            placeFood();
            snakeBody.push(lastBlock);
        }
        if (Math.floor(snakeBody[0][0]) == Math.floor(foodX2) && Math.floor(snakeBody[0][1]) == Math.floor(foodY2)) {
            placeFood2();
            snakeBody.push(lastBlock);
        }
        if (Math.floor(snakeBody[0][0]) == Math.floor(foodX3) && Math.floor(snakeBody[0][1]) == Math.floor(foodY3)) {
            placeFood3();
            snakeBody.push(lastBlock);
        }

    }
    


    
    
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1]
    }
    
    context.fillStyle = snakeColor;
    
    snakeX += speedX * blockSize;
    snakeY += speedY * blockSize;

    snakeBody[0] = [snakeX, snakeY]

    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
    
    // console.log(snakeBody)
    
    if (snakeX < 0 || snakeX > columnCount * blockSize - blockSize|| snakeY < 0 || snakeY > rowCount * blockSize -blockSize) { 
        gameOver = true;
        console.log(snakeX)

        updateBestScore(bestScore, snakeBody.length -1)

        lossScreen()
    }

    for (let i = 1; i < snakeBody.length -1 ; i++) {
         if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) { 
            gameOver = true;
             
            updateBestScore(bestScore, snakeBody.length -1)

            

            lossScreen()
         }
     }
}

function moveSnake(e) {
    e.preventDefault()
    if (e.code == "ArrowDown" && speedY != -1 || e.code == "KeyS" && speedY != -1) {
        e.preventDefault()
        speedX = 0;
        speedY = 1;
    }
    if (e.code == "ArrowUp" && speedY != 1 || e.code == "KeyW" && speedY != 1) {
        e.preventDefault()
        speedX = 0;
        speedY = -1;
    }
    if (e.code == "ArrowLeft" && speedX != 1 ||e.code == "KeyA" && speedX != 1) {
        e.preventDefault()
        speedX = -1;
        speedY = 0;
    }
    if (e.code == "ArrowRight" && speedX != -1 ||e.code == "KeyD" && speedX != -1) {
        e.preventDefault()
        speedX = 1;
        speedY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * columnCount) * blockSize;
    foodY = Math.floor(Math.random() * rowCount) * blockSize;
    console.log('Food placed', foodX, ' ', foodY);
}

function placeFood2() {
    foodX2 = Math.floor(Math.random() * columnCount) * blockSize;
    foodY2 = Math.floor(Math.random() * rowCount) * blockSize;
}

function placeFood3() {
    foodX3 = Math.floor(Math.random() * columnCount) * blockSize;
    foodY3 = Math.floor(Math.random() * rowCount) * blockSize;
}

function lossScreen() {
    document.getElementById('lossButton').style.display = "block"
    document.getElementById('gameOver').style.display = "block"
}

function restart(button) {
    button.style.display = "none"
    document.getElementById('gameOver').style.display = "none"
    location.reload()
}


function changeColor(color) {
    snakeColor = color.value
}

function changeFood(source) {
    food.src = '../img/'+ source.value
    sessionStorage.setItem('source', source.value)
}

function changeAppleCount(count) {
    appleCount = count.value    
    sessionStorage.setItem("appleCount", appleCount)
    startGame()
}

function keepScore() {

    document.getElementById("score").innerHTML = "SCORE: " + (snakeBody.length-1)
}

function writeBestScore() {
    document.getElementById("best_score").innerHTML = "BEST SCORE: " + (bestScore)
}

function updateBestScore(best, recent) {
    if (recent > best) {
        bestScore = recent
    }
    sessionStorage.setItem("bestId", bestScore)
}




