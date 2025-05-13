const kelly = document.getElementById("kelly");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");
const gameOverDisplay = document.getElementById("gameOver");
const finalScore = document.getElementById("finalScore");
const restartButton = document.getElementById("restartButton");
const jumpSound = document.getElementById("jumpSound");
const gameoverSound = document.getElementById("gameoverSound");

let score = 0;
let gameRunning = false;
let scoreInterval;
let collisionInterval;

document.addEventListener("keydown", function (event) {
  if ((event.code === "Space" || event.code === "ArrowUp")) {
    if (!gameRunning) startGame();
    jump();
  }
});

function handleTouchJump() {
  if (!gameRunning) startGame();
  jump();
}

function jump() {
  if (!kelly.classList.contains("jump")) {
    kelly.classList.add("jump");
    jumpSound.play();

    setTimeout(() => {
      kelly.classList.remove("jump");
    }, 600);
  }
}

function checkCollision() {
  const kellyBox = kelly.getBoundingClientRect();
  const obsBox = obstacle.getBoundingClientRect();

  const kellyCenterX = kellyBox.left + kellyBox.width / 2;
  const kellyCenterY = kellyBox.top + kellyBox.height / 2;
  const kellyHitbox = {
    left: kellyCenterX - 20,
    right: kellyCenterX + 20,
    top: kellyCenterY - 35,
    bottom: kellyCenterY + 35,
  };

  const obstacleCenterX = obsBox.left + obsBox.width / 2;
  const obstacleCenterY = obsBox.top + obsBox.height / 2;
  const obstacleHitbox = {
    left: obstacleCenterX - 20,
    right: obstacleCenterX + 20,
    top: obstacleCenterY - 30,
    bottom: obstacleCenterY + 30,
  };

  if (
    kellyHitbox.right > obstacleHitbox.left &&
    kellyHitbox.left < obstacleHitbox.right &&
    kellyHitbox.bottom > obstacleHitbox.top &&
    kellyHitbox.top < obstacleHitbox.bottom
  ) {
    gameOver();
  }
}

function startGame() {
  gameRunning = true;
  score = 0;
  scoreDisplay.textContent = "" + score;
  kelly.classList.remove("paused");
  obstacle.style.animationPlayState = "running";
  gameOverDisplay.style.display = "none";

  startScoring();
  collisionInterval = setInterval(() => {
    if (gameRunning) checkCollision();
  }, 50);
}

function startScoring() {
  scoreInterval = setInterval(() => {
    if (gameRunning) {
      score++;
      scoreDisplay.textContent = "" + score;
    }
  }, 100);
}

function gameOver() {
  gameRunning = false;
  obstacle.style.animationPlayState = "paused";
  clearInterval(scoreInterval);
  clearInterval(collisionInterval);
  finalScore.textContent = `Score: ${score}`;
  gameOverDisplay.style.display = "block";
  gameoverSound.play();
}

function restartGame() {
  location.reload();
}

let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
  const now = new Date().getTime();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault();
  }
  lastTouchEnd = now;
}, false);

function checkOrientation() {
  const isPortrait = window.innerHeight > window.innerWidth;
  document.getElementById("rotateWarning").style.display = isPortrait ? "block" : "none";
}

window.addEventListener("load", checkOrientation);
window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);                        
