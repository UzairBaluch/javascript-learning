// ============================================
// COUNTDOWN TIMER
// ============================================

// DOM ELEMENTS - Get display, input fields, and control buttons
const display = document.getElementById("display");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

// STATE VARIABLES - Track timer state
let intervalID = null; // Stores interval ID to control countdown
let totalTime = 0; // Initial countdown time in seconds
let remainingTime = 0; // Current remaining time in seconds

// UPDATE DISPLAY - Convert seconds to HH:MM:SS format and show on screen
function updateDisplay() {
  // Calculate hours, minutes, and seconds from remaining time
  let hrs = Math.floor(remainingTime / 3600);
  let mins = Math.floor((remainingTime % 3600) / 60);
  let secs = remainingTime % 60;

  // Add leading zeros for single digits (e.g., 5 becomes "05")
  hrs = hrs.toString().padStart(2, "0");
  mins = mins.toString().padStart(2, "0");
  secs = secs.toString().padStart(2, "0");

  // Update display with formatted time
  display.textContent = hrs + ":" + mins + ":" + secs;
}

// START COUNTDOWN - Begin timer with user input values
function startFunc() {
  // Prevent multiple countdowns running simultaneously
  if (intervalID !== null) {
    return;
  }

  // Get input values and convert to total seconds
  let hourTime = Number(hours.value);
  let minutesTime = Number(minutes.value);
  let secondsTime = Number(seconds.value);
  totalTime = hourTime * 3600 + minutesTime * 60 + secondsTime;
  remainingTime = totalTime;

  // Validate user input
  if (totalTime === 0) {
    alert("Invalid input");
    return;
  }

  // Start countdown - decrease time every second
  intervalID = setInterval(() => {
    remainingTime--;
    updateDisplay();

    // Check if countdown finished
    if (remainingTime === 0) {
      clearInterval(intervalID);
      intervalID = null;
      alert("Time up!");
    }
  }, 1000);

  // Disable inputs while countdown is running
  hours.disabled = true;
  minutes.disabled = true;
  seconds.disabled = true;
}

// RESET TIMER - Stop countdown and restore to initial state
function resetFunc() {
  clearInterval(intervalID);
  intervalID = null;

  // Re-enable input fields
  hours.disabled = false;
  minutes.disabled = false;
  seconds.disabled = false;

  // Reset all variables
  remainingTime = 0;
  totalTime = 0;

  // Reset display
  display.textContent = "00:00:00";
}

// EVENT LISTENERS - Attach button click handlers
startBtn.addEventListener("click", startFunc);
resetBtn.addEventListener("click", resetFunc);
