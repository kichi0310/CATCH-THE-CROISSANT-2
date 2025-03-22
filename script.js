let ctx, canvas;
let croissants = [];
let score = 0;
let timeLeft = 45;
let gameInterval, timerInterval;
let phoneNumber = "";
let playCount = 0;

const normalCroissant = new Image();
normalCroissant.src = 'assets/croissant.png';

const goldCroissant = new Image();
goldCroissant.src = 'assets/gold-croissant.png';

const catchSound = new Audio('assets/catch.mp3');
const rewardSound = new Audio('assets/reward.mp3');

function startGame() {
    phoneNumber = document.getElementById('phoneInput').value.trim();
    if (!phoneNumber || phoneNumber.length < 8) {
        alert("Vui lòng nhập số điện thoại hợp lệ!");
        return;
    }

    playCount++;
    if (playCount > 2) {
        alert("Bạn đã hết lượt chơi!");
        return;
    }

    document.getElementById('login-container').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    document.getElementById('popup-container').style.display = 'none';

    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');

    // Reset game variables
    score = 0;
    timeLeft = 45;
    croissants = [];

    document.getElementById('score').innerText = `Điểm: ${score}`;
    document.getElementById('timer').innerText = `Thời gian: ${timeLeft}`;

    // Bắt sự kiện click để bắt bánh
    canvas.addEventListener('click', handleClick);

    // Bắt đầu game loop
    gameInterval = setInterval(gameLoop, 30);
    timerInterval = setInterval(updateTimer, 1000);
}

function handleClick(e) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    croissants.forEach((c, index) => {
        if (
            mouseX >= c.x &&
            mouseX <= c.x + 50 &&
            mouseY >= c.y &&
            mouseY <= c.y + 50
        ) {
            score += c.type === "gold" ? 50 : 5;
            document.getElementById('score').innerText = `Điểm: ${score}`;
            catchSound.play();

            if (c.type === "gold") {
                rewardSound.play();
                alert("🎁 Bạn bắt được Gold Croissant! Nhận ngay quà bất ngờ!");
            }

            croissants.splice(index, 1);
        }
    });
}

function updateTimer() {
    timeLeft--;
    document.getElementById('timer').innerText = `Thời gian: ${timeLeft}`;

    if (timeLeft <= 0) {
        endGame();
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Random spawn bánh
    if (Math.random() < 0.05) {
        spawnCroissant();
    }

    // Vẽ từng cái bánh rơi
    croissants.forEach((c, index) => {
        c.y += c.speed;
        if (c.y > canvas.height) {
            croissants.splice(index, 1);
        } else {
            ctx.drawImage(
                c.type === "gold" ? goldCroissant : normalCroissant,
                c.x,
                c.y,
                50,
                50
            );
        }
    });
}

function spawnCroissant() {
    const isGold = Math.random() < 1 / 21;
    croissants.push({
        x: Math.random() * (canvas.width - 50),
        y: -50,
        speed: 4 + Math.random() * 2,
        type: isGold ? "gold" : "normal"
    });
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(timerInterval);

    canvas.removeEventListener('click', handleClick);

    document.getElementById('popup-container').style.display = 'block';

    let message = `Bạn đạt ${score} điểm!<br><br>`;

    if (score >= 350) {
        message += "🥤 Tặng 1 ly Cà phê muối hoặc Matcha Latte miễn phí<br>";
    } else if (score >= 300) {
        message += "🏅 Nhận huy hiệu 'Thợ săn Croissant' + vinh danh trên fanpage<br>";
    } else if (score >= 200) {
        message += "🎉 Giảm 10% hóa đơn từ 150k trở lên<br>";
    } else {
        message += "Cố gắng lần sau nhé!";
    }

    message += "<br>➡️ Quét mã QR nhận quà tại cửa hàng Crème & Crust";
    document.getElementById('popup-message').innerHTML = message;

    // Sau này có thể thêm code gửi dữ liệu Google Sheets ở đây
}

function restartGame() {
    document.getElementById('popup-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'block';
}


