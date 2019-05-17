//Get canvas and context
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//Snake object
var Snake = {
    x: 30,
    y: 0,
    dx: 10,
    dy: 0,
    width: 10, 
    height: 10,
    right: true,
    left: false,
    up: false,
    down: false,
    length: 3,
    tail: [[20, 0], [10, 0], [0, 0]],
    color: "white"
};

//Food object
var Food = {
    x: 220,
    y: 110,
    width: 10,
    height: 10,
    color: "red",
    newLocation: function() {
        this.x = Math.ceil((Math.floor(Math.random() * 470)) / 10) * 10;
        this.y = Math.ceil((Math.floor(Math.random() * 310)) / 10) * 10;
        for (var i = 0; i < Snake.length; i++) {
            while (this.x == Snake.tail[i][0] && this.y == Snake.tail[i][1]) {
                this.x = Math.ceil((Math.floor(Math.random() * 470)) / 10) * 10;
                this.y = Math.ceil((Math.floor(Math.random() * 310)) / 10) * 10;
            }
        }
    }
};

//Draw snake
function drawSnake() {
    //Draw the head
    ctx.beginPath();
    ctx.fillStyle = Snake.color;
    ctx.rect(Snake.x, Snake.y, Snake.width, Snake.height);
    ctx.fill();
    ctx.strokeStyle = "grey";
    ctx.stroke();
    ctx.closePath();

    //Draw the tail
    for (var i = 0; i < Snake.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = Snake.color;
        ctx.rect(Snake.tail[i][0], Snake.tail[i][1], Snake.width, Snake.height);
        ctx.fill();
        ctx.strokeStyle = "#grey";
        ctx.stroke();
        ctx.closePath();
    }

    //Move the snakes tail
    for (var i = Snake.length; i > 1; i--) {
        Snake.tail[i - 1] = Snake.tail[i - 2];
    }
    Snake.tail[0] = [Snake.x, Snake.y];

}

//Draw food
function drawFood() {
    ctx.beginPath();
    ctx.fillStyle = Food.color;
    ctx.rect(Food.x, Food.y, Food.width, Food.height);
    ctx.fill();
    ctx.strokeStyle = "grey";
    ctx.stroke();
    ctx.closePath();
}

//Lengthen snake after food has been eaten
function addLength() {
    var xandy = Snake.tail[Snake.length - 1]
    var x = xandy[0];
    var y = xandy[1];
    Snake.tail.push([x, y]);
    Snake.length++;
}

//Reset the game after a game over
function reset() {
    Snake.x = 30;
    Snake.y = 0;
    Snake.dx = 10;
    Snake.dy = 0;
    Snake.right = true;
    Snake.left = false;
    Snake.up = false;
    Snake.down = false;
    Snake.length = 3;
    Snake.tail = [[20, 0], [10, 0], [0, 0]];

    Food.x = 220;
    Food.y = 10;
}

//Controls
document.addEventListener("keydown", keyDownHandler, false);
function keyDownHandler(e) {
    if(e.keyCode == 38) {
        if (!(Snake.down)) {
            Snake.up = true;
            Snake.down = false;
            Snake.left = false;
            Snake.right = false;
        }
    }
    if(e.keyCode == 40) {
        if (!(Snake.up)) {
            Snake.up = false;
            Snake.down = true;
            Snake.left = false;
            Snake.right = false;
        }
    }
    if(e.keyCode == 37) {
        if (!(Snake.right)) {
            Snake.up = false;
            Snake.down = false;
            Snake.left = true;
            Snake.right = false;
        }
    }
    if(e.keyCode == 39) {
        if (!(Snake.left)) {
            Snake.up = false;
            Snake.down = false;
            Snake.left = false;
            Snake.right = true;
        }
    }
}

//Main game loop
var gameLoop = setInterval(function() {
    //Determine which direction to move the snake
    if (Snake.up) {
        Snake.dy = -10;
        Snake.dx = 0;
    }
    if (Snake.down) {
        Snake.dy = 10;
        Snake.dx = 0;
    }
    if (Snake.left) {
        Snake.dy = 0;
        Snake.dx = -10;
    }
    if (Snake.right) {
        Snake.dy = 0;
        Snake.dx = 10;
    }

    //Check if the snake has eaten the food
    if ((Snake.x == Food.x) && (Snake.y == Food.y)) {
        addLength();
        Food.newLocation();
    }

    //Clear screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Draw elements onto screen
    drawFood();
    drawSnake();

    //Accelerate the snake
    Snake.x += Snake.dx;
    Snake.y += Snake.dy;

    //Check if the snake is touching the edges of the screen
    if (Snake.x < 0 || Snake.x > canvas.width) {
        reset();
    }
    if (Snake.y < 0 || Snake.y > canvas.height) {
        reset();
    }

    //Check if the snake is touching itself
    for (var i = 0; i < Snake.length; i++) {
        if (Snake.x == Snake.tail[i][0] && Snake.y == Snake.tail[i][1]) {
            reset();
        }
    }


}, 75);




