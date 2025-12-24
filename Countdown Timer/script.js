// ===== DOM ELEMENTS =====
// Grab all elements needed for the countdown timer
const display = document.getElementById("display");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

// ===== TRACKING VARIABLES =====
let intervalID = null; // Stores the interval ID to control countdown
let totalTime = 0; // Stores initial countdown time in seconds
let remainingTime = 0; // Tracks remaining time in seconds

// ===== UPDATE DISPLAY FUNCTION =====
// Converts remaining seconds to HH:MM:SS format and updates the display
function updateDisplay() {
  // Calculate hours, minutes, and seconds from total seconds
  let hrs = Math.floor(remainingTime / 3600);
  let mins = Math.floor((remainingTime % 3600) / 60);
  let secs = remainingTime % 60;

  // Add leading zeros for single digits (e.g., 5 becomes "05")
  hrs = hrs.toString().padStart(2, "0");
  mins = mins.toString().padStart(2, "0");
  secs = secs.toString().padStart(2, "0");

  // Update the display with formatted time
  display.textContent = hrs + ":" + mins + ":" + secs;
}

// ===== START COUNTDOWN FUNCTION =====
// Starts the countdown timer with user input values
function startFunc() {
  // Prevent starting multiple countdowns simultaneously
  if (intervalID !== null) {
    return;
  }

  // Get input values and convert to numbers
  let hourTime = Number(hours.value);
  let minutesTime = Number(minutes.value);
  let secondsTime = Number(seconds.value);

  // Convert all time to total seconds
  totalTime = hourTime * 3600 + minutesTime * 60 + secondsTime;
  remainingTime = totalTime;

  // Validate that user entered a valid time
  if (totalTime === 0) {
    alert("invalid input");
    return;
  }

  // Start countdown - decrease time every second
  intervalID = setInterval(() => {
    remainingTime--; // Decrease by 1 second
    updateDisplay(); // Update the display

    // Check if countdown finished
    if (remainingTime === 0) {
      clearInterval(intervalID); // Stop the countdown
      intervalID = null; // Reset interval ID for next use
      alert("Time up");
    }
  }, 1000);

  // Disable inputs while countdown is running
  hours.disabled = true;
  minutes.disabled = true;
  seconds.disabled = true;
}

// ===== RESET FUNCTION =====
// Stops countdown and resets everything to default
function resetFunc() {
  clearInterval(intervalID); // Stop the countdown
  intervalID = null; // Reset interval ID

  // Re-enable input fields
  hours.disabled = false;
  minutes.disabled = false;
  seconds.disabled = false;

  // Reset all variables to default
  remainingTime = 0;
  totalTime = 0;

  // Reset display to zero
  display.textContent = "00:00:00";
}

// ===== EVENT LISTENERS =====
// Attach click events to buttons
startBtn.addEventListener("click", startFunc);
resetBtn.addEventListener("click", resetFunc);
