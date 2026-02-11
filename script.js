// ===== SIZE CLICKER CORE =====
let size = 0;
let sizePerSecond = 0;

// DOM elements
const blobBtn = document.getElementById('blob-btn');
const sizeCounter = document.getElementById('size-counter');
const upgradeBtn = document.getElementById('upgrade-btn');
const upgradeCostDisplay = document.getElementById('upgrade-cost');
const cpsDisplay = document.getElementById('cps-display');
const particlesContainer = document.getElementById('particles');
const milestonePopup = document.getElementById('milestone-popup');

// Initial upgrade cost
let upgradeCost = 10;

// ===== CLICK BLOB =====
blobBtn.addEventListener('click', () => {
    size++;
    updateCounter();

    // Jump animation
    blobBtn.classList.add('jump');
    setTimeout(() => blobBtn.classList.remove('jump'), 400);

    // Particle effect
    createParticle();

    // Milestones
    checkMilestone();

    // Update blob emotion
    updateBlobEmotion();
});

// Update counter
function updateCounter() {
    sizeCounter.textContent = size;
}

// ===== AUTO-INCREMENT (CPS) =====
setInterval(() => {
    size += sizePerSecond;
    updateCounter();
}, 1000);

// ===== UPGRADES =====
upgradeBtn.addEventListener('click', () => {
    if (size >= upgradeCost) {
        size -= upgradeCost;
        sizePerSecond += 1;
        upgradeCost = Math.floor(upgradeCost * 1.5);
        updateCounter();
        updateUpgradeDisplay();

        // Show amazed emotion briefly
        showTemporaryEmotion('Amazed.png', 800);
    } else {
        alert("Not enough size!");
    }
});

function updateUpgradeDisplay() {
    upgradeCostDisplay.textContent = upgradeCost;
    cpsDisplay.textContent = sizePerSecond;
}

// ===== PARTICLE EFFECTS =====
function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * blobBtn.width + "px";
    particle.textContent = "⭐";
    particlesContainer.appendChild(particle);

    setTimeout(() => particle.remove(), 1000);
}

// ===== MILESTONE POPUPS =====
function checkMilestone() {
    if (size % 100 === 0 && size !== 0) {
        milestonePopup.textContent = `Milestone reached! Size: ${size}`;
        milestonePopup.style.opacity = 1;
        showTemporaryEmotion('Happy.png', 1200); // happy emotion
        setTimeout(() => milestonePopup.style.opacity = 0, 2000);
    }
}

// ===== BLOB EMOTIONS =====
function updateBlobEmotion() {
    // Random chance for Sus emotion
    if (Math.random() < 0.02) {
        showTemporaryEmotion('Sus.png', 1000);
    }
    // Scared on fast clicks (optional)
    // Else default to normal
}

function showTemporaryEmotion(src, duration = 1000) {
    blobBtn.src = src;
    blobBtn.classList.add('shake'); // add shake effect
    setTimeout(() => {
        blobBtn.src = 'Normal.png';
        blobBtn.classList.remove('shake');
    }, duration);
}

// ===== LOCAL STORAGE =====
window.addEventListener('load', () => {
    const savedSize = localStorage.getItem('size');
    const savedSPS = localStorage.getItem('sizePerSecond');
    const savedUpgradeCost = localStorage.getItem('upgradeCost');

    if (savedSize) size = parseInt(savedSize);
    if (savedSPS) sizePerSecond = parseInt(savedSPS);
    if (savedUpgradeCost) upgradeCost = parseInt(savedUpgradeCost);

    updateCounter();
    updateUpgradeDisplay();
});

// Save every 5 seconds
setInterval(() => {
    localStorage.setItem('size', size);
    localStorage.setItem('sizePerSecond', sizePerSecond);
    localStorage.setItem('upgradeCost', upgradeCost);
}, 5000);

// Save on page unload
window.addEventListener('beforeunload', () => {
    localStorage.setItem('size', size);
    localStorage.setItem('sizePerSecond', sizePerSecond);
    localStorage.setItem('upgradeCost', upgradeCost);
});
