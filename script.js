let balls = [];

let paddleX;
const paddleY = 510;
const paddleWidth = 130;
const paddleHeight = 15;

let score = 0;
let bestScore = 0;
let gameOver = false;
let lastBallTime = 0;

const maxBalls = 10000;
const newBallDelay = 45000;

function setup() {
 
  createCanvas(1000, 600);
  // idk what gititem does
  bestScore = getItem("bestScore");

 
  resetGame();
}

function draw() {
 
  background("teal");

 
  fill("green");
  noStroke();
  rect(100, 50, 800, 500, 40);
// i understand this
if (score > bestScore){
  score = bestScore;
  storeItem("bestScore", bestScore);
}
  
  noFill();
  stroke("white");
  strokeWeight(4);
  rect(100, 50, 800, 500, 40);

 // this keeps the mouse in green
  paddleX = constrain(
    mouseX,
    100 + paddleWidth / 2,
    900 - paddleWidth / 2
  );

 
  if (!gameOver) {
    updateBalls();

   //i dont understand this 
    if (
      millis() - lastBallTime >= newBallDelay &&
      balls.length < maxBalls
    ) {
      createBall();// this creates a new mall every time the game ends
      lastBallTime = millis();
    }

  // if the ball falls below the paddle you lose
    if (balls.length === 0) {
      gameOver = true;
    }
  }

 
  drawPaddle();
  drawBalls();
  drawScore();

// if you lose than it will say game over
  if (gameOver) {
    drawGameOver();
  }
}

function createBall() {
  // Randomly spawns ball going left or right at speed below
  const direction = random([-1, 1]);

 // im not sure but i belive these are the controls to make the ball speed up and choose when it does
  balls.push({
    x: random(250, 750),
    y: 200,
    speedX: random(2.2, 3) * direction,
    speedY: random(2.7, 3.3),
    size: random(21, 27)
  });
}

function updateBalls() {

  for (let i = balls.length - 1; i >= 0; i--) {
    const ball = balls[i];
    const radius = ball.size / 2;


    const currentSpeed = sqrt(
      ball.speedX * ball.speedX +
      ball.speedY * ball.speedY
    );

    
    if (currentSpeed < 12) {
      ball.speedX *= 1.0006;
      ball.speedY *= 1.0006;
    }

   
    ball.x += ball.speedX;
    ball.y += ball.speedY;


    if (ball.x - radius <= 100) {
      ball.x = 100 + radius;
      ball.speedX = abs(ball.speedX);
    }

  
    if (ball.x + radius >= 900) {
      ball.x = 900 - radius;
      ball.speedX = -abs(ball.speedX);
    }

    if (ball.y - radius <= 50) {
      ball.y = 50 + radius;
      ball.speedY = abs(ball.speedY);
    }

   
    checkPaddleCollision(ball);

 
    if (ball.y - radius > 550) {
      balls.splice(i, 1);
    }
  }
}

function checkPaddleCollision(ball) {
  const radius = ball.size / 2;


  const paddleLeft = paddleX - paddleWidth / 2;
  const paddleRight = paddleX + paddleWidth / 2;

  
  const hitsPaddle =
    ball.speedY > 0 &&
    ball.y + radius >= paddleY &&
    ball.y - radius <= paddleY + paddleHeight &&
    ball.x >= paddleLeft &&
    ball.x <= paddleRight;

  if (hitsPaddle) {
    
    const hitPosition =
      (ball.x - paddleX) / (paddleWidth / 2);

 
    const currentSpeed = sqrt(
      ball.speedX * ball.speedX +
      ball.speedY * ball.speedY
    );

   
    const fasterSpeed = min(currentSpeed * 1, 1000);

   
    ball.speedX = hitPosition * fasterSpeed * 1.1;

   
    ball.speedY = -sqrt(
      max(
        4,
        fasterSpeed * fasterSpeed -
          ball.speedX * ball.speedX
      )
    );


    ball.y = paddleY - radius;

   
    score++;

   
    bestScore = max(bestScore, score);
  }
}

function drawPaddle() {
  rectMode(CENTER);
  noStroke();

 
  fill("white");
  rect(
    paddleX,
    paddleY + paddleHeight / 2,
    paddleWidth,
    paddleHeight,
    10
  );

  

  rectMode(CORNER);
}

function drawBalls() {
  fill("white");
  noStroke();

  for (const ball of balls) {
    circle(ball.x, ball.y, ball.size);
  }
}

function drawScore() {
  fill("white");
  noStroke();
  textSize(20);
  textStyle(BOLD);

  
  textAlign(LEFT, TOP);
  text(`Score: ${score}`, 125, 75);

  
  textAlign(CENTER, TOP);
  text(`Balls: ${balls.length}`, width / 2, 75);

  
  textAlign(RIGHT, TOP);
  text(`Best: ${bestScore}`, 875, 75);
}

function drawGameOver() {
  
  fill(0, 170);
  noStroke();
  rect(100, 50, 800, 500, 40);

  
  fill("red");
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(
    125  );
  text("GAME OVER", width / 2, height / 3 - 25);

 
  textStyle(NORMAL);
  
  textSize(20);
  
  text(
    "Click to play again",
    
    width / 2,
    
    height / 2 + 150  )
}

function mousePressed() {
  // Restart the game when clicked
  if (gameOver) {
    resetGame();
  }
}

function resetGame() {
  // Remove all old balls
  balls = [];

  // Reset the score
  score = 0;

  // Start the game again
  gameOver = false;

  // Reset the ball timer
  lastBallTime = millis();

  // Create the first ball
  createBall();
}