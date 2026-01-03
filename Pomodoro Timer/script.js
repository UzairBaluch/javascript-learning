// - timeLeft: stores number of SECONDS remaining (starts at 1500 for work mode)
// - currentMode: stores STRING of which mode ('work', 'short', or 'long')
// - isRunning: stores TRUE/FALSE - is timer currently counting down?
// - sessionCount: stores NUMBER of completed work sessions (starts at 0)
// - timerInterval: stores the setInterval ID so we can STOP it with clearInterval()

let timeLeft = 1500;
let currentMode = null;
let isRunning = false;
let sessionCount = 0;
let timerInterval;

// ===== DOM ELEMENTS FOR MANUPILATON AND ADDING FUNCTIONALTY =====
// - Timer for tracking the time
// - start btn for starting the time
// - pause btn  for pausing the time
// - reset btn for reseting the time
// - sessionCount for count sessions
// - timer-modes for time modes
const timerModes = document.querySelectorAll(".mode-btn");
const timer = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const sessionCountElem = document.getElementById("sessionCount");

// ===== FUNCTIONS I NEED =====
// 1. startTimer() -
//    - set isRunning to true
//    - start setInterval that calls tick() every 1000ms (1 second)
//    - hide start button, show pause button

function startTimer() {
  // set isRunning to true
  isRunning = true;
  // start setInterval that calls tick() every 1000ms (1 second)
  timerInterval = setInterval(tick, 1000); // Calls tick() every 1 second
  // hide start button, show pause button
  startBtn.style.display = "none";
  pauseBtn.style.display = "block";
}
// 2. pauseTimer()
//    - set isRunning to false
//    - stop setInterval
//    - hide puse button, show start button

function pauseTimer() {
  // set isRunning to false
  isRunning = false;
  // stop setInterval
  clearInterval(timerInterval);
  // hide puse button, show start button
  startBtn.style.display = "block";
  pauseBtn.style.display = "none";
}

// 3. resetTimer()
//    - set isRunning to false
//    - clearInterval setInterval
//    - set timeLeft back to starting time for current mode
//    - hide pause button, show start button
//    - update display

function resetTimer() {
  // set isRunning to false
  isRunning = false;
  // clearInterval setInterval
  clearInterval(timerInterval);
  // set timeLeft back to starting time for current mode
  if (currentMode === "work") {
    timeLeft = 1500;
  } else if (currentMode === "long") {
    timeLeft = 900;
  } else {
    timeLeft = 300;
  }
  //hide pause button, show start button
  startBtn.style.display = "block";
  pauseBtn.style.display = "none";
  //update display
  updateDisplay();
}
// 4. updateDisplay() -
//    - convert timeLeft (in seconds) to MM:SS format
//    - show it in timer display element
function updateDisplay() {
  // 1. Calculate minutes from timeLeft
  let minutes = Math.floor(timeLeft / 60);
  // 2. Calculate seconds from timeLeft
  let seconds = timeLeft % 60;
  // 3. Format both with leading zeros
  let formattedMinutes = minutes.toString().padStart(2, "0");
  let formattedSeconds = seconds.toString().padStart(2, "0");
  // 4. Display in timer element as "MM:SS"
  timer.textContent = formattedMinutes + ":" + formattedSeconds;
}

function switchMode(event) {
  // 1. Get which mode was clicked (event.target.dataset.mode)
  let getMode = event.target.dataset.mode;

  // 2. Update currentMode variable
  currentMode = getMode;
  // 3. Set timeLeft based on mode (work=1500, short=300, long=900)
  if (getMode === "work") {
    timeLeft = 1500;
  }
  if (getMode === "long") {
    timeLeft = 900;
  }
  if (getMode === "short") {
    timeLeft = 300;
  }
  // 4. Remove 'active' class from all buttons
  timerModes.forEach((mode) => {
    mode.classList.remove("active");
  });
  // 5. Add 'active' class to clicked button
  event.target.classList.add("active");
  // 6. Call updateDisplay()
  updateDisplay();
}

// 6. tick()
//    - countdown the timer by 1 SECOND
//    - subtract 1 from timeLeft
//    - update display
//    - if timeLeft reaches 0, stop timer and maybe increase session count
function tick() {
  timeLeft = timeLeft - 1;
  updateDisplay();
if (timeLeft <= 0) {
    pauseTimer()
    if (currentMode === "work") {
        sessionCount++
       sessionCountElem.textContent =  sessionCount
      
    }
}
}

// ===== EVENT LISTENERS I NEED =====
// - Click on start button → call startTimer()
startBtn.addEventListener('click', startTimer)
// - Click on pause button → call pauseTimer()
pauseBtn.addEventListener('click',pauseTimer)
// - Click on reset button → call resetTimer()
resetBtn.addEventListener('click',resetTimer)
// - Click on mode buttons → call switchMode()
timerModes.forEach((mode)=>{
mode.addEventListener('click',switchMode)
})