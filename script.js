let size = 0;
let cps = 0;
let upgradeCost = 10;

const blob = document.getElementById("blob-btn");
const sizeCounter = document.getElementById("size-counter");
const cpsDisplay = document.getElementById("cps-display");
const upgradeCostDisplay = document.getElementById("upgrade-cost");
const upgradeBtn = document.getElementById("upgrade-btn");

/* ===== CLICK BLOB ===== */
blob.addEventListener("click", () => {
  size++;
  updateUI();
});

/* ===== UPGRADE ===== */
upgradeBtn.addEventListener("click", () => {
  if (size >= upgradeCost) {
    size -= upgradeCost;
    cps++;
    upgradeCost = Math.floor(upgradeCost * 1.5);

    updateUI();
  }
});

/* ===== PASSIVE GROWTH ===== */
setInterval(() => {
  size += cps;
  updateUI();
}, 1000);

/* ===== UPDATE UI ===== */
function updateUI() {
  sizeCounter.textContent = size;
  cpsDisplay.textContent = cps;
  upgradeCostDisplay.textContent = upgradeCost;
}

