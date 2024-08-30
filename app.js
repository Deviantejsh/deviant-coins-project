const $circle = document.querySelector('#circle');
const $score = document.querySelector('#score');
const $upgradeBtn = document.querySelector('#upgrade-btn');
let pointsPerClick = 1;
const OFFLINE_POINT_INTERVAL = 10 * 60 * 1000; // 10 минут в миллисекундах
const POINTS_PER_OFFLINE_INTERVAL = 1; // Очки, присуждаемые каждые 10 минут оффлайн

function start() {
  checkOfflinePoints();
  setScore(getScore());
  setImage();
}

function setScore(score) {
  localStorage.setItem('score', score);
  $score.textContent = score;
}

function setImage() {
  const score = getScore();

  // Ваша существующая логика setImage...
  if (score >= 28000) {
    $circle.setAttribute('src', './assets/ultimate_lege_reward.gif');
  } else if (score >= 15000) {
    $circle.setAttribute('src', './assets/epic_reward.png');
  } else if (score >= 9000) {
    $circle.setAttribute('src', './assets/ultimate_epic_reward.png');
  } else if (score >= 7000) {
    $circle.setAttribute('src', './assets/legendary_reward.png');
  } else if (score >= 5000) {
    $circle.setAttribute('src', './assets/ultimate_reward.png');
  } else if (score >= 3700) {
    $circle.setAttribute('src', './assets/super_reward.png');
  } else if (score >= 2600) {
    $circle.setAttribute('src', './assets/elite_reward.png');
  } else if (score >= 1700) {
    $circle.setAttribute('src', './assets/high_reward.png');
  } else if (score >= 1000) {
    $circle.setAttribute('src', './assets/platinum_coin.png');
  } else if (score >= 840) {
    $circle.setAttribute('src', './assets/gold_coin.png');
  } else if (score >= 704) {
    $circle.setAttribute('src', './assets/silver_coin.png');
  } else if (score >= 617) {
    $circle.setAttribute('src', './assets/bronze_coin.png');
  } else if (score >= 560) {
    $circle.setAttribute('src', './assets/dcoin.png');
  } else if (score >= 480) {
    $circle.setAttribute('src', './assets/cat.png');
  } else if (score >= 320) {
    $circle.setAttribute('src', './assets/catcoins.png');
  } else if (score >= 200) {
    $circle.setAttribute('src', './assets/dragon.png');
  } else if (score >= 100) {
    $circle.setAttribute('src', './assets/phoenix.png');
  } else if (score >= 50) {
    $circle.setAttribute('src', './assets/lizzard.png');
  }
}

function getScore() {
  return Number(localStorage.getItem('score')) || 0;
}

function addPoints() {
  setScore(getScore() + pointsPerClick);
  setImage();
}

function saveLastActiveTime() {
  localStorage.setItem('lastActiveTime', Date.now());
}

function checkOfflinePoints() {
  const lastActiveTime = Number(localStorage.getItem('lastActiveTime')) || 0;
  const currentTime = Date.now();

  if (lastActiveTime) {
    const elapsedTime = currentTime - lastActiveTime;
    const offlinePoints = Math.floor(elapsedTime / OFFLINE_POINT_INTERVAL) * POINTS_PER_OFFLINE_INTERVAL;

    if (offlinePoints > 0) {
      alert(`Вы получили ${offlinePoints} очков за время отсутствия!`);
      setScore(getScore() + offlinePoints);
    }
  }

  // Обновляем время последней активности до текущего времени
  saveLastActiveTime();
}

$circle.addEventListener('click', (event) => {
  const rect = $circle.getBoundingClientRect();

  const offsetX = event.clientX - rect.left - rect.width / 2;
  const offsetY = event.clientY - rect.top - rect.height / 2;

  const DEG = 40;

  const tiltX = (offsetY / rect.height) * DEG;
  const tiltY = (offsetX / rect.width) * -DEG;

  $circle.style.setProperty('--tiltX', `${tiltX}deg`);
  $circle.style.setProperty('--tiltY', `${tiltY}deg`);

  setTimeout(() => {
    $circle.style.setProperty('--tiltX', `0deg`);
    $circle.style.setProperty('--tiltY', `0deg`);
  }, 300);

  const plusOne = document.createElement('div');
  plusOne.classList.add('plus-one');
  plusOne.textContent = `+${pointsPerClick}`;
  plusOne.style.left = `${event.clientX - rect.left}px`;
  plusOne.style.top = `${event.clientY - rect.top}px`;

  $circle.parentElement.appendChild(plusOne);

  addPoints();

  setTimeout(() => {
    plusOne.remove();
  }, 2000);
});

$upgradeBtn.addEventListener('click', () => {
  const score = getScore();
  const upgradeCost = 3200;

  if (score >= upgradeCost) {
    pointsPerClick = 100;
    setScore(score - upgradeCost);
    setImage();
    $upgradeBtn.remove(); // Удаляем кнопку улучшения после улучшения
  } else {
    alert('Недостаточно очков для улучшения! требуется 3200 Deviant Coins');
  }
});

// Сохраняем время последней активности, когда пользователь покидает страницу
window.addEventListener('beforeunload', saveLastActiveTime);

start();
