let phone = '';
let playCount = 0;
let score = 0;

const startBtn = document.getElementById('start-btn');
const phoneInput = document.getElementById('phone');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const popup = document.getElementById('popup');
const rewardText = document.getElementById('reward-text');

startBtn.addEventListener('click', () => {
  phone = phoneInput.value.trim();
  if (!phone) {
    alert('Vui lòng nhập số điện thoại!');
    return;
  }

  if (playCount >= 2) {
    alert('Bạn đã hết lượt chơi!');
    return;
  }

  playCount++;
  document.getElementById('login-container').style.display = 'none';
  canvas.style.display = 'block';
  startGame();
});

function startGame() {
  score = 0;
  // Placeholder croissant image
  const croissant = new Image();
  croissant.src = 'assets/croissant.png';

  let y = 0;
  const interval = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    y += 5;
    ctx.drawImage(croissant, 200, y, 50, 50);

    if (y > canvas.height) {
      clearInterval(interval);
      endGame();
    }
  }, 100);
}

function endGame() {
  // Fake score logic
  score = Math.floor(Math.random() * 400);

  let message = '';
  if (score >= 350) {
    message = `🥤 Tặng 1 ly Cà phê muối hoặc Matcha Latte miễn phí! (${score} điểm)`;
  } else if (score >= 300) {
    message = `🎉 Giảm 10% hóa đơn từ 150k trở lên! (${score} điểm)`;
  } else {
    message = `Cảm ơn bạn đã tham gia! (${score} điểm)`;
  }

  rewardText.innerText = message;
  popup.style.display = 'block';

  // You can add Google Sheets logging here!
}




