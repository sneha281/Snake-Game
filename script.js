

var blockSize = 25;
var total_row = 17; //total row number
var total_col = 17; //total column number
var board;
var context; 


var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var speedX = 0;  //speed of snake in x cordinate.
var speedY = 0;  //speed of snake in Y cordinate.

var snakeBody = [];


var foodX;
var foodY;

var gameOver = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = total_row * blockSize;
    board.width = total_col * blockSize;
    context = board.getContext("2d"); 

    placeFood();
    document.addEventListener("keyup", changeDirection);  //for movements
    // update();
    setInterval(update, 1000/10); 
}


function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle="green";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="yellow";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    for (let i = snakeBody.length-1; i > 0; i--) { //body of snake will grow
        snakeBody[i] = snakeBody[i-1]; //it will store previous part of snake to the current part
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle="white";
    snakeX += speedX * blockSize; //updating Snake position in X cordinate.
    snakeY += speedY * blockSize;  //updating Snake position in Y cordinate.
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    
    if (snakeX < 0 || snakeX > total_col*blockSize || snakeY < 0 || snakeY > total_row*blockSize) { //out of bound condition
        gameOver = true;
        alert("Game Over");
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {  //snake eats own body
            gameOver = true;
            alert("Game Over");
        }
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && speedY != 1) {  // If up arrow key pressed with this condition snake will not move in the opposite direction
        speedX = 0;
        speedY = -1;
    }
    else if (e.code == "ArrowDown" && speedY != -1) { //If down arrow key pressed
        speedX = 0;
        speedY = 1;
    }
    else if (e.code == "ArrowLeft" && speedX != 1) { //If left arrow key pressed
        speedX = -1;
        speedY = 0;
    }
    else if (e.code == "ArrowRight" && speedX != -1) { //If Right arrow key pressed
        speedX = 1;
        speedY = 0;
    }
}

//randomly place food
function placeFood() {

    foodX = Math.floor(Math.random() * total_col) * blockSize; // in x cordinates.
    foodY = Math.floor(Math.random() * total_row) * blockSize;  //in y cordinates.
}