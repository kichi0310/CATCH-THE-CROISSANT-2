
const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const resultDisplay = document.getElementById('result');

let score = 0;
let timeLeft = 45;
let gameInterval;
let spawnInterval;

const catchSound = new Audio('assets/sounds/catch.mp3');
const rewardSound = new Audio('assets/sounds/reward.mp3');

function startGame() {
  score = 0;
  timeLeft = 45;
  scoreDisplay.textContent = score;
  timeDisplay.textContent = timeLeft;
  resultDisplay.classList.add('hidden');

  gameInterval = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);

  spawnInterval = setInterval(spawnCroissant, 800);
}

function spawnCroissant() {
  const croissant = document.createElement('img');
  croissant.src = Math.random() < 0.1 ? 'assets/images/gold-croissant.png' : 'assets/images/croissant.png';
  croissant.classList.add('croissant');
  croissant.style.left = Math.random() * (gameArea.clientWidth - 50) + 'px';
  croissant.style.top = '-60px';
  gameArea.appendChild(croissant);

  let fallSpeed = Math.random() * 2 + 2;

  const fall = setInterval(() => {
    const currentTop = parseFloat(croissant.style.top);
    if (currentTop > gameArea.clientHeight) {
      croissant.remove();
      clearInterval(fall);
    } else {
      croissant.style.top = currentTop + fallSpeed + 'px';
    }
  }, 20);

  croissant.onclick = () => {
    catchSound.currentTime = 0;
    catchSound.play();

    if (croissant.src.includes('gold-croissant.png')) {
      score += 10;
    } else {
      score += 5;
    }

    scoreDisplay.textContent = score;
    croissant.remove();
    clearInterval(fall);
  };
}

function endGame() {
  clearInterval(gameInterval);
  clearInterval(spawnInterval);
  gameArea.innerHTML = '';
  resultDisplay.classList.remove('hidden');
  rewardSound.play();

  if (score >= 200) {
    resultDisplay.innerHTML = `🎉 Great job! You scored ${score} points! <br>🥐 You win 10% OFF!`;
  } else {
    resultDisplay.innerHTML = `You scored ${score} points. <br>Try again to win!`;
  }
}

window.onload = startGame;
