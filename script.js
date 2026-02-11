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
    
    // Check milestone
    checkMilestone();
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
    particle.textContent = "⭐"; // can be any symbol
    particlesContainer.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 1000);
}

// ===== MILESTONE POPUPS =====
function checkMilestone() {
    if (size % 100 === 0) { // every 100 size
        milestonePopup.textContent = `Milestone reached! Size: ${size}`;
        milestonePopup.style.opacity = 1;
        setTimeout(() => milestonePopup.style.opacity = 0, 2000);
    }
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
