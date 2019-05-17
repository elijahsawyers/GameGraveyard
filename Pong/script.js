//Get canvas and context
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//Scores
var player1Score = 0;
var player2Score = 0;

//Ball object 
var Ball = {
    x: canvas.width/2,
    y: canvas.height/2,
    radius: 5,
    dx: 2,
    dy: 2,
    color: "white"
};

//Paddle Objects 
var Paddle1 = {
    x: 15,
    y: (canvas.height - 75)/2,
    dx: 2,
    dy: 2,
    width: 8,
    height: 75,
    color: "white",
    upPressed: false,
    downPressed: false,
};

var Paddle2 = {
    x: canvas.width-8-15,
    y: (canvas.height - 75)/2,
    dx: 2,
    dy: 2,
    width: 8,
    height: 75,
    color: "white",
    upPressed: false,
    downPressed: false,
};

//Draw bouncing ball
function drawBall() {
    ctx.beginPath();
    ctx.fillStyle = Ball.color;
    ctx.arc(Ball.x, Ball.y, Ball.radius, 0, Math.PI*2);
    ctx.fill();
    ctx.closePath();
}

//Draw the paddles 
function drawPaddles() {
    ctx.beginPath();
    ctx.fillStyle = Paddle1.color;
    ctx.rect(Paddle1.x, Paddle1.y, Paddle1.width, Paddle1.height);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = Paddle2.color;
    ctx.rect(Paddle2.x, Paddle2.y, Paddle2.width, Paddle2.height);
    ctx.fill();
    ctx.closePath();
}

//Draw Scores
function drawScores() {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.font = "25px Arial";
    ctx.fillText(player1Score, canvas.width/4, 25);
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.font = "25px Arial";
    ctx.fillText(player2Score, (canvas.width/4)*3, 25);
    ctx.closePath();
}

//Draw line down the middle
function drawLines() {
    ctx.setLineDash([5, 3]);/*dashes are 5px and spaces are 3px*/
    ctx.beginPath();
    ctx.moveTo(canvas.width/2, 0);
    ctx.lineTo(canvas.width/2, canvas.height);
    ctx.strokeStyle = "white";
    ctx.stroke();
    ctx.closePath();
}

//Reset after a point has been scored
function reset() {
    Ball.y = canvas.height/2;
    Ball.x = canvas.width/2;
}

//Controls 
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keydown", keyDownHandler2, false);
document.addEventListener("keyup", keyUpHandler2, false);
function keyDownHandler(e) {
    if(e.keyCode == 87) {
        Paddle1.upPressed = true;
    }
    else if(e.keyCode == 83) {
        Paddle1.downPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 87) {
        Paddle1.upPressed = false;
    }
    else if(e.keyCode == 83) {
        Paddle1.downPressed = false;
    }
}

function keyDownHandler2(e) {
    if(e.keyCode == 38) {
        Paddle2.upPressed = true;
    }
    else if(e.keyCode == 40) {
        Paddle2.downPressed = true;
    }
}

function keyUpHandler2(e) {
    if(e.keyCode == 38) {
        Paddle2.upPressed = false;
    }
    else if(e.keyCode == 40) {
        Paddle2.downPressed = false;
    }
}

//main game loop
var gameLoop = setInterval(function() {

    //Moves the ball
    Ball.y += Ball.dy;
    Ball.x += Ball.dx;

    //Check if ball is colliding with top or bottom of canvas
    if (Ball.y + Ball.radius + Ball.dy > canvas.height || Ball.y - Ball.radius + Ball.dy < 0) {
        Ball.dy = -(Ball.dy);
    }

    //Check if ball is colliding with a paddle
    if ((Ball.y > Paddle1.y && Ball.y <= Paddle1.y + Paddle1.height) && Ball.x + Ball.dx < 0 + Paddle1.width + 15) {
        Ball.dx = -(Ball.dx);
    }
    if ((Ball.y > Paddle2.y && Ball.y <= Paddle2.y + Paddle2.height) && Ball.x + Ball.dx > canvas.width - Paddle2.width - 15) {
        Ball.dx = -(Ball.dx);
    }

    //Check if a player has scored
    if (Ball.x > canvas.width) {
        reset();
        player1Score++;
    }
    if (Ball.x < 0) {
        reset();
        player2Score++;
    }

    //Moves paddle 1
    if(Paddle1.upPressed && Paddle1.y >= 0) {
        Paddle1.y -= 1.75;
    }
    else if(Paddle1.downPressed && (Paddle1.y + Paddle1.height) <= canvas.height) {
        Paddle1.y += 1.75;
    }

    //Moves paddle 2
    if(Paddle2.upPressed && Paddle2.y >= 0) {
        Paddle2.y -= 1.75;
    }
    else if(Paddle2.downPressed && (Paddle2.y + Paddle2.height) <= canvas.height) {
        Paddle2.y += 1.75;
    }

    //Clear the screen before updating the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Draw all of the elements to the screen
    drawBall();
    drawPaddles();
    drawScores();
    drawLines();
}, 10);