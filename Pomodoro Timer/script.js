// ============================================
// POMODORO TIMER
// ============================================

// STATE VARIABLES - Track timer state and session progress
let timeLeft = 1500; // Time remaining in seconds (25 minutes)
let currentMode = "work"; // Current mode: work, short, or long break
let isRunning = false; // Is timer currently running
let sessionCount = 0; // Number of completed work sessions
let timerInterval; // Interval ID for timer countdown

// DOM ELEMENTS - Get timer display, buttons, and controls
const timerModes = document.querySelectorAll(".mode-btn");
const timer = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const sessionCountElem = document.getElementById("sessionCount");

// START TIMER - Begin countdown
function startTimer() {
  isRunning = true;
  timerInterval = setInterval(tick, 1000);
  startBtn.style.display = "none";
  pauseBtn.style.display = "block";
}

// PAUSE TIMER - Stop countdown
function pauseTimer() {
  isRunning = false;
  clearInterval(timerInterval);
  startBtn.style.display = "block";
  pauseBtn.style.display = "none";
}

// RESET TIMER - Return to starting time for current mode
function resetTimer() {
  isRunning = false;
  clearInterval(timerInterval);

  // Set time based on current mode
  if (currentMode === "work") {
    timeLeft = 1500; // 25 minutes
  } else if (currentMode === "long") {
    timeLeft = 900; // 15 minutes
  } else {
    timeLeft = 300; // 5 minutes
  }

  startBtn.style.display = "block";
  pauseBtn.style.display = "none";
  updateDisplay();
}

// UPDATE DISPLAY - Convert seconds to MM:SS format and show
function updateDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;

  let formattedMinutes = minutes.toString().padStart(2, "0");
  let formattedSeconds = seconds.toString().padStart(2, "0");

  timer.textContent = formattedMinutes + ":" + formattedSeconds;
}

// SWITCH MODE - Change between work and break modes
function switchMode(event) {
  let mode = event.target.dataset.mode;
  currentMode = mode;

  // Set time based on selected mode
  if (mode === "work") {
    timeLeft = 1500; // 25 minutes
  } else if (mode === "long") {
    timeLeft = 900; // 15 minutes
  } else if (mode === "short") {
    timeLeft = 300; // 5 minutes
  }

  // Update active button
  timerModes.forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");

  updateDisplay();
}

// TICK - Decrease time by 1 second and check if finished
function tick() {
  timeLeft--;
  updateDisplay();

  // Check if timer finished
  if (timeLeft <= 0) {
    pauseTimer();

    // Increment session count if work session completed
    if (currentMode === "work") {
      sessionCount++;
      sessionCountElem.textContent = sessionCount;
    }
  }
}

// EVENT LISTENERS - Attach button click handlers
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

timerModes.forEach((mode) => {
  mode.addEventListener("click", switchMode);
});

// INITIALIZE - Set initial display
updateDisplay();
