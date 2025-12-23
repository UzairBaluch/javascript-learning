// Get references to all HTML elements we need to manipulate
let display = document.getElementById("display");
let startBtn = document.getElementById("start-btn");
let pauseBtn = document.getElementById("pause-btn");
let resetBtn = document.getElementById("reset-btn");
// Var for tracking the seconds and is time runnig or not and setinerval
let seconds = 0;
let isRunning = false;
let intervalId = null;

// a function that take seconds as paramter calculate time and add 0 to time and return a formated time
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
// a function that increse time by 1 update it ui and enable puse btn and disable start btn
function startTimer() {
  intervalId = setInterval(function () {
    seconds++;
    display.textContent = formatTime(seconds);
  }, 1000);
  pauseBtn.disabled = false;
  startBtn.disabled = true;
}
// on click and calling function
startBtn.addEventListener("click", startTimer);
// a function that clear setinterval enable start btn and disbale puse btn
function pauseTimer() {
  clearInterval(intervalId);
  pauseBtn.disabled = true;
  startBtn.disabled = false;
}
// on click and calling function
pauseBtn.addEventListener("click", pauseTimer);
// a function that call pouse timer function and set var to 0 update ui enable start btn disable pause btn
function resetTimer() {
  pauseTimer();
  seconds = 0;
  display.textContent = formatTime(seconds);
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}
// on click and calling function
resetBtn.addEventListener('click',resetTimer)