const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 25;
canvas.width = 19 * box;
canvas.height = 19 * box;

// Load images
const ground = new Image();
ground.src = "./images/ground.png";  // Ensure this path is correct

const foodImg = new Image();
foodImg.src = "./images/food.png";  // Ensure this path is correct

let snake, food, score, d, game;

document.getElementById("retryBtn").addEventListener("click", startGame);
document.addEventListener("keydown", direction);

// Add event listeners for touch controls
document.getElementById("upBtn").addEventListener("click", () => setDirection("UP"));
document.getElementById("downBtn").addEventListener("click", () => setDirection("DOWN"));
document.getElementById("leftBtn").addEventListener("click", () => setDirection("LEFT"));
document.getElementById("rightBtn").addEventListener("click", () => setDirection("RIGHT"));

function startGame() {
    snake = [];
    snake[0] = { x: 9 * box, y: 10 * box };

    food = {
        x: Math.floor(Math.random() * 17 + 1) * box,
        y: Math.floor(Math.random() * 17 + 1) * box
    };

    score = 0;
    d = null;

    clearInterval(game);
    game = setInterval(draw, 100);
    updateScore();
}

function direction(event) {
    if (event.keyCode == 37 && d != "RIGHT") {
        d = "LEFT";
    } else if (event.keyCode == 38 && d != "DOWN") {
        d = "UP";
    } else if (event.keyCode == 39 && d != "LEFT") {
        d = "RIGHT";
    } else if (event.keyCode == 40 && d != "UP") {
        d = "DOWN";
    }
}

// Function to set direction from touch controls
function setDirection(dir) {
    if (dir == "LEFT" && d != "RIGHT") {
        d = dir;
    } else if (dir == "UP" && d != "DOWN") {
        d = dir;
    } else if (dir == "RIGHT" && d != "LEFT") {
        d = dir;
    } else if (dir == "DOWN" && d != "UP") {
        d = dir;
    }
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

function updateScore() {
    document.getElementById("score").innerText = `Score: ${score}`;
}

function draw() {
    ctx.drawImage(ground, 0, 0);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.drawImage(foodImg, food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 17 + 1) * box
        }
        updateScore();
    } else {
        snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
    }

    snake.unshift(newHead);
}

// Start the game for the first time
startGame();