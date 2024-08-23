const $circle = document.querySelector('#circle');
const $score = document.querySelector('#score');
const $upgradeBtn = document.querySelector('#upgrade-btn');
let pointsPerClick = 1;

function start() {
  setScore(getScore());
  setImage();
}

function setScore(score) {
  localStorage.setItem('score', score);
  $score.textContent = score;
}

function setImage() {
  const score = getScore();

  if (score >= 9000) {
    $circle.setAttribute('src', './assets/ultimate_legendary_reward.gif'); // Изображение за 9000 очков
  } else if (score >= 7000) {
    $circle.setAttribute('src', './assets/legendary_reward.png'); // Изображение за 7000 очков
  } else if (score >= 5000) {
    $circle.setAttribute('src', './assets/ultimate_reward.png'); // Изображение за 5000 очков
  } else if (score >= 3700) {
    $circle.setAttribute('src', './assets/super_reward.png'); // Изображение за 3700 очков
  } else if (score >= 2600) {
    $circle.setAttribute('src', './assets/elite_reward.png'); // Изображение за 2600 очков
  } else if (score >= 1700) {
    $circle.setAttribute('src', './assets/high_reward.png'); // Изображение за 1700 очков
  } else if (score >= 1000) {
    $circle.setAttribute('src', './assets/platinum_coin.png'); // Изображение за 1000 очков
  } else if (score >= 840) {
    $circle.setAttribute('src', './assets/gold_coin.png'); // Изображение за 840 очков
  } else if (score >= 704) {
    $circle.setAttribute('src', './assets/silver_coin.png'); // Изображение за 704 очков
  } else if (score >= 617) {
    $circle.setAttribute('src', './assets/bronze_coin.png'); // Изображение за 617 очков
  } else if (score >= 560) {
    $circle.setAttribute('src', './assets/dcoin.png'); // Изображение за 560 очков
  } else if (score >= 480) {
    $circle.setAttribute('src', './assets/cat.png'); // Изображение за 480 очков
  } else if (score >= 320) {
    $circle.setAttribute('src', './assets/catcoins.png'); // Изображение за 320 очков
  } else if (score >= 200) {
    $circle.setAttribute('src', './assets/dragon.png'); // Изображение за 200 очков
  } else if (score >= 100) {
    $circle.setAttribute('src', './assets/phoenix.png'); // Изображение за 100 очков
  } else if (score >= 50) {
    $circle.setAttribute('src', './assets/lizzard.png'); // Изображение за 50 очков
  }
}

function getScore() {
  return Number(localStorage.getItem('score')) ?? 0;
}

function addPoints() {
  setScore(getScore() + pointsPerClick);
  setImage();
}

$circle.addEventListener('click', (event) => {
  const rect = $circle.getBoundingClientRect();

  const offfsetX = event.clientX - rect.left - rect.width / 2;
  const offfsetY = event.clientY - rect.top - rect.height / 2;

  const DEG = 40;

  const tiltX = (offfsetY / rect.height) * DEG;
  const tiltY = (offfsetX / rect.width) * -DEG;

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
    $upgradeBtn.remove(); // Убираем кнопку после улучшения
  } else {
    alert('Недостаточно очков для улучшения!');
  }
});

start();

