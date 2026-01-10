// ============================================
// TYPING SPEED TEST
// ============================================

// SAMPLE TEXTS - Array of typing practice texts
let sampleTexts = [
  "The quick brown fox jumps over the lazy dog",
  "Practice makes perfect when learning to code",
  "JavaScript is a powerful programming language",
  "Coding every day builds strong developer skills",
  "Consistency is more important than perfection",
];

// DOM ELEMENTS - Get text display, input, timer, and stats
const wpmValue = document.getElementById("wpmValue");
const accuracyValue = document.getElementById("accuracyValue");
const timeValue = document.getElementById("timeValue");
const textDisplay = document.getElementById("textDisplay");
const typingInput = document.getElementById("typingInput");
const timer = document.getElementById("timer");
const resetBtn = document.getElementById("resetBtn");
const statsContainer = document.getElementById("statsContainer");

// STATE VARIABLES - Track test progress and timing
let currentText;
let startTime = null;
let timerInterval;
let isTestComplete = false;
let totalCharactersTyped = 0;

// SELECT RANDOM TEXT - Pick random text from samples array
function selectRandomText() {
  let randomNum = Math.floor(Math.random() * sampleTexts.length);
  currentText = sampleTexts[randomNum];
  return currentText;
}

// DISPLAY TEXT - Render text as individual character spans
function displayText() {
  const splitText = currentText.split("");
  splitText.forEach((char) => {
    let span = document.createElement("span");
    span.textContent = char;
    textDisplay.appendChild(span);
  });
}

// START TIMER - Begin tracking elapsed time
function startTimer() {
  if (startTime !== null) {
    return;
  }
  startTime = Date.now();
  timerInterval = setInterval(() => {
    let elapsed = (Date.now() - startTime) / 1000;
    timer.textContent = `Time: ${elapsed.toFixed(1)}s`;
  }, 100);
}

// STOP TIMER - End timing and return elapsed seconds
function stopTimer() {
  clearInterval(timerInterval);
  let elapsed = (Date.now() - startTime) / 1000;
  return elapsed;
}

// CALCULATE WPM - Words per minute (5 chars = 1 word)
function calculateWPM(characters, timeInSeconds) {
  const WPM = Math.round(characters / 5 / (timeInSeconds / 60));
  return WPM;
}

// CALCULATE ACCURACY - Percentage of correct characters
function calculateAccuracy(correctChars, totalChars) {
  let Accuracy = (correctChars / totalChars) * 100;
  let percentage = Accuracy.toFixed(1);
  return percentage;
}

// SHOW RESULTS - Display final stats
function showResults(wpm, accuracy, time) {
  statsContainer.classList.add("show");
  wpmValue.textContent = wpm;
  accuracyValue.textContent = accuracy + "%";
  timeValue.textContent = time + "s";
  typingInput.disabled = true;
}

// RESET TEST - Clear and restart typing test
function resetTest() {
  statsContainer.classList.remove("show");
  timer.textContent = "Time: 0s";
  typingInput.value = "";
  typingInput.disabled = false;
  clearInterval(timerInterval);
  startTime = null;
  isTestComplete = false;
  totalCharactersTyped = 0;
  textDisplay.innerHTML = "";
  selectRandomText();
  displayText();
}

// TYPING INPUT HANDLER - Track typing and highlight characters
typingInput.addEventListener("input", () => {
  let valueInput = typingInput.value;
  startTimer();

  const spans = document.querySelectorAll("span");
  spans.forEach((element, index) => {
    // Mark correct, incorrect, or untyped characters
    if (valueInput[index] === currentText[index]) {
      element.classList.add("correct");
      element.classList.remove("incorrect");
    } else if (valueInput[index]) {
      element.classList.add("incorrect");
      element.classList.remove("correct");
    } else {
      element.classList.remove("correct");
      element.classList.remove("incorrect");
    }

    // Highlight next character to type
    if (index === valueInput.length) {
      element.classList.add("current");
    } else {
      element.classList.remove("current");
    }
  });

  totalCharactersTyped = valueInput.length;

  // Check if test complete
  if (totalCharactersTyped === currentText.length) {
    let returnedTime = stopTimer();
    const spans = document.querySelectorAll(".correct");
    let count = spans.length;
    let wpm = calculateWPM(count, returnedTime);
    let result = calculateAccuracy(count, totalCharactersTyped);
    showResults(wpm, result, returnedTime);
    isTestComplete = true;
  }
});

// RESET BUTTON - Restart test
resetBtn.addEventListener("click", resetTest);

// INITIALIZE - Set up first test on page load
resetTest();
