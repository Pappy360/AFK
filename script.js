let cookies = 0;

const cookieCount = document.getElementById("cookieCount");
const clickBtn = document.getElementById("clickBtn");

clickBtn.addEventListener("click", () => {
  cookies++;
  updateDisplay();
});

function updateDisplay() {
  cookieCount.textContent = cookies;
}
