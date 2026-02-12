/* ===== BODY & BACKGROUND ===== */
body {
  font-family: 'Comic Sans MS', 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  text-align: center;
  background-color: #ffffff; /* white background for empty areas */
  background-image: url('DAY.png'), url('NIGHT.png');
  background-repeat: no-repeat, no-repeat;
  background-position: left top, left top;
  background-size: auto, auto; /* keep natural size */
  transition: background 2s ease;
}

/* ===== HEADINGS ===== */
h1 {
  font-size: 48px;
  margin-bottom: 20px;
  color: #d2691e;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
}

/* ===== BLOB ===== */
#blob-container {
  position: absolute;
  left: 50%;
  bottom: 20px; /* adjust to match ground in background */
  transform: translateX(-50%);
}

#blob-btn {
  width: 300px;
  height: auto;
  object-fit: contain;
  cursor: pointer;
  filter: drop-shadow(0 5px 10px rgba(0,0,0,0.5));
  transition: transform 0.2s ease;
}

/* Jump animation */
@keyframes jump {
  0% { transform: translateY(0) scale(1); }
  30% { transform: translateY(-50px) scale(1.2); }
  60% { transform: translateY(0) scale(1); }
  100% { transform: translateY(0) scale(1); }
}
#blob-btn.jump { animation: jump 0.4s ease; }

/* Shake animation */
@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
}
#blob-btn.shake { animation: shake 0.3s ease; }

/* ===== BUTTONS ===== */
button {
  padding: 15px 25px;
  font-size: 20px;
  cursor: pointer;
  margin: 10px 0;
  border-radius: 12px;
  border: none;
  background: linear-gradient(to bottom, #ffcc66, #ffb84d);
  box-shadow: 0 5px #cc9933;
  transition: all 0.2s ease;
}

button:hover { transform: scale(1.05); box-shadow: 0 8px #cc9933; }
button:active { transform: scale(0.95); box-shadow: 0 3px #cc9933; }

/* ===== UPGRADE CONTAINER ===== */
#upgrade-container {
  position: absolute;
  bottom: 150px; /* above the blob */
  left: 50%;
  transform: translateX(-50%);
  margin-top: 30px;
  padding: 20px;
  border-radius: 15px;
  background-color: #fff3e6;
  border: 2px solid #f0c27b;
  box-shadow: 4px 4px 10px rgba(0,0,0,0.2);
  width: 300px;
}

#upgrade-container h2 { margin-bottom: 15px; color: #d2691e; }
#cps-display, #upgrade-cost { font-weight: bold; color: #8b4513; }

/* Milestone popup */
#milestone-popup {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #ffeb99;
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: bold;
  font-size: 20px;
  color: #8b4513;
  opacity: 0;
  transition: opacity 0.5s;
  pointer-events: none;
}
