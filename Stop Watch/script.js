// ============================================
// STOPWATCH
// ============================================

// DOM ELEMENTS - Get display and control buttons
let display = document.getElementById("display");
let startBtn = document.getElementById("start-btn");
let pauseBtn = document.getElementById("pause-btn");
let resetBtn = document.getElementById("reset-btn");

// STATE VARIABLES - Track elapsed time and timer state
let seconds = 0;
let isRunning = false;
let intervalId = null;

// FORMAT TIME - Convert seconds to HH:MM:SS format with leading zeros
function formatTime(seconds) {
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  let secs = seconds % 60;

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (secs < 10) {
    secs = "0" + secs;
  }

  return hours + ":" + minutes + ":" + secs;
}

// START TIMER - Begin counting and update display every second
function startTimer() {
  intervalId = setInterval(function () {
    seconds++;
    display.textContent = formatTime(seconds);
  }, 1000);

  pauseBtn.disabled = false;
  startBtn.disabled = true;
}

// PAUSE TIMER - Stop counting
function pauseTimer() {
  clearInterval(intervalId);
  pauseBtn.disabled = true;
  startBtn.disabled = false;
}

// RESET TIMER - Stop timer and reset to zero
function resetTimer() {
  pauseTimer();
  seconds = 0;
  display.textContent = formatTime(seconds);
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

// EVENT LISTENERS - Attach button click handlers
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
