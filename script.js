// ===== Blob Images =====
const blobImages = {
  normal: "NORMAL.png",
  happy: "HAPPY.png",
  amazed: "AMAZED.png",
  sad: "SAD.png",
  sleepy: "SLEEPY.png"
};

// ===== DOM Elements =====
const blobBtn = document.getElementById('blob-btn');
const sizeCounter = document.getElementById('size-counter');
const upgradeBtn = document.getElementById('upgrade-btn');
const upgradeCostDisplay = document.getElementById('upgrade-cost');
const cpsDisplay = document.getElementById('cps-display');
const milestonePopup = document.getElementById('milestone-popup');
const bedBtn = document.getElementById('bed-btn');

// ===== Game Variables =====
let size = 0;
let sizePerSecond = 0;
let upgradeCost = 10;

// Mood & Sadness
let isSad = false;
let lastClickTime = Date.now();

// Day/Night
let isNight = false;
const CYCLE_DURATION = 20 * 60 * 1000; // 20 minutes
let cycleStartTime = Date.now();

// Night penalties
const SAD_CPS_MULTIPLIER = 0.5;
const NIGHT_CLICK_PENALTY = 5;

// Set default image
blobBtn.src = blobImages.normal;

// ===== Update Functions =====
function updateCounter() {
  sizeCounter.textContent = size;
}
function updateUpgradeDisplay() {
  upgradeCostDisplay.textContent = upgradeCost;
  cpsDisplay.textContent = sizePerSecond;
}

// ===== Blob Click =====
blobBtn.addEventListener('click', () => {
  const now = Date.now();
  lastClickTime = now;

  // If night, clicking loses size
  if (isNight) {
    size -= NIGHT_CLICK_PENALTY;
    showTemporaryEmotion('sad', 800);
  } else {
    size++;
    if (isSad) { isSad = false; blobBtn.src = blobImages.normal; }
  }

  updateCounter();

  // Jump animation
  blobBtn.classList.add('jump');
  setTimeout(() => blobBtn.classList.remove('jump'), 400);

  checkMilestone();
});

// ===== Upgrades =====
upgradeBtn.addEventListener('click', () => {
  if (size >= upgradeCost) {
    size -= upgradeCost;
    sizePerSecond += 1;
    upgradeCost = Math.floor(upgradeCost * 1.5);
    updateCounter();
    updateUpgradeDisplay();
    showTemporaryEmotion('amazed', 800);
  } else {
    alert("Not enough size!");
  }
});

// ===== Mood / Emotions =====
function showTemporaryEmotion(emotion, duration = 1000) {
  blobBtn.src = blobImages[emotion];
  blobBtn.classList.add('shake');
  setTimeout(() => {
    blobBtn.src = isNight ? blobImages.sleepy : blobImages.normal;
    blobBtn.classList.remove('shake');
  }, duration);
}

// SAD if neglected
setInterval(() => {
  if (!isSad && !isNight && Date.now() - lastClickTime > 5000) {
    isSad = true;
    blobBtn.src = blobImages.sad;
  }
}, 500);

// ===== Milestones =====
function checkMilestone() {
  if (size % 100 === 0 && size !== 0) {
    milestonePopup.textContent = `Milestone reached! Size: ${size}`;
    milestonePopup.style.opacity = 1;
    showTemporaryEmotion('happy', 1200);
    setTimeout(() => milestonePopup.style.opacity = 0, 2000);
  }
}

// ===== Day/Night Cycle =====
function updateDayNight() {
  const now = Date.now();
  const elapsed = (now - cycleStartTime) % CYCLE_DURATION;
  const newIsNight = elapsed > CYCLE_DURATION / 2;

  if (newIsNight !== isNight) {
    isNight = newIsNight;
    blobBtn.src = isNight ? blobImages.sleepy : blobImages.normal;

    // Update background with fade
    document.body.style.backgroundImage = `url('${isNight ? 'NIGHT.png' : 'DAY.png'}'), url('${isNight ? 'DAY.png' : 'NIGHT.png'}')`;
  }
}
setInterval(updateDayNight, 1000);

// ===== Auto CPS =====
setInterval(() => {
  const multiplier = isNight ? SAD_CPS_MULTIPLIER : 1;
  size += sizePerSecond * multiplier;
  updateCounter();
}, 1000);

// ===== Bed Button =====
bedBtn.addEventListener('click', () => {
  if (isNight) {
    // Skip to day
    const now = Date.now();
    cycleStartTime = now - (CYCLE_DURATION / 2) + 1000;
    isNight = false;
    blobBtn.src = blobImages.normal;
    document.body.style.backgroundImage = `url('DAY.png'), url('NIGHT.png')`;
  }
});

// ===== Local Storage =====
window.addEventListener('load', () => {
  const savedSize = localStorage.getItem('size');
  const savedSPS = localStorage.getItem('sizePerSecond');
  const savedUpgradeCost = localStorage.getItem('upgradeCost');
  const savedCycle = localStorage.getItem('cycleStartTime');
  const savedIsNight = localStorage.getItem('isNight');

  if (savedSize) size = parseInt(savedSize);
  if (savedSPS) sizePerSecond = parseInt(savedSPS);
  if (savedUpgradeCost) upgradeCost = parseInt(savedUpgradeCost);
  if (savedCycle) cycleStartTime = parseInt(savedCycle);
  if (savedIsNight) isNight = savedIsNight === 'true';

  updateCounter();
  updateUpgradeDisplay();
  blobBtn.src = isNight ? blobImages.sleepy : blobImages.normal;
});

// Auto-save
setInterval(() => {
  localStorage.setItem('size', size);
  localStorage.setItem('sizePerSecond', sizePerSecond);
  localStorage.setItem('upgradeCost', upgradeCost);
  localStorage.setItem('cycleStartTime', cycleStartTime);
  localStorage.setItem('isNight', isNight);
}, 5000);
