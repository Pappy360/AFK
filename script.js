// ===== COOKIE CLICKER CORE =====
let cookies = 0;
let cookiesPerSecond = 0;

// DOM elements
const cookieBtn = document.getElementById('cookie-btn');
const cookieCounter = document.getElementById('cookie-counter');
const upgradeBtn = document.getElementById('upgrade-btn');
const upgradeCostDisplay = document.getElementById('upgrade-cost');
const cpsDisplay = document.getElementById('cps-display');

// Initial upgrade cost
let upgradeCost = 10;

// Click to get cookies
cookieBtn.addEventListener('click', () => {
    cookies++;
    updateCounter();

    // Trigger jump animation
    cookieBtn.classList.add('jump');
    setTimeout(() => cookieBtn.classList.remove('jump'), 400);
});

// Update counter display
function updateCounter() {
    cookieCounter.textContent = cookies;
}

// Auto-increment cookies per second
setInterval(() => {
    cookies += cookiesPerSecond;
    updateCounter();
}, 1000);

// Upgrade button functionality
upgradeBtn.addEventListener('click', () => {
    if (cookies >= upgradeCost) {
        cookies -= upgradeCost;          
        cookiesPerSecond += 1;           
        upgradeCost = Math.floor(upgradeCost * 1.5); 
        updateCounter();
        updateUpgradeDisplay();
    } else {
        alert("Not enough cookies!");
    }
});

// Update CPS and upgrade cost display
function updateUpgradeDisplay() {
    upgradeCostDisplay.textContent = upgradeCost;
    cpsDisplay.textContent = cookiesPerSecond;
}

// ===== LOCAL STORAGE =====

// Load saved data
window.addEventListener('load', () => {
    const savedCookies = localStorage.getItem('cookies');
    const savedCPS = localStorage.getItem('cookiesPerSecond');
    const savedUpgradeCost = localStorage.getItem('upgradeCost');

    if (savedCookies) cookies = parseInt(savedCookies);
    if (savedCPS) cookiesPerSecond = parseInt(savedCPS);
    if (savedUpgradeCost) upgradeCost = parseInt(savedUpgradeCost);

    updateCounter();
    updateUpgradeDisplay();
});

// Save data every 5 seconds
setInterval(() => {
    localStorage.setItem('cookies', cookies);
    localStorage.setItem('cookiesPerSecond', cookiesPerSecond);
    localStorage.setItem('upgradeCost', upgradeCost);
}, 5000);

// Save on page unload
window.addEventListener('beforeunload', () => {
    localStorage.setItem('cookies', cookies);
    localStorage.setItem('cookiesPerSecond', cookiesPerSecond);
    localStorage.setItem('upgradeCost', upgradeCost);
});
