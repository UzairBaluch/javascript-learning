// ============================================
// TYPING SPEED TEST - ADVANCED PROJECT #24
// ============================================

// SAMPLE TEXTS ARRAY
// Create array with 5 different sample texts for users to type
let sampleTexts = [
  "The quick brown fox jumps over the lazy dog",
  "Practice makes perfect when learning to code",
  "JavaScript is a powerful programming language",
  "Coding every day builds strong developer skills",
  "Consistency is more important than perfection",
];

// DOM ELEMENTS
// Get all elements: textDisplay, typingInput, timer, resetBtn, statsContainer, wpmValue, accuracyValue, timeValue
const wpmValue = document.getElementById("wpmValue");
const accuracyValue = document.getElementById("accuracyValue");
const timeValue = document.getElementById("timeValue");
const textDisplay = document.getElementById("textDisplay");
const typingInput = document.getElementById("typingInput");
const timer = document.getElementById("timer");
const resetBtn = document.getElementById("resetBtn");
const statsContainer = document.getElementById("statsContainer");

// STATE VARIABLES
// currentText - stores the current sample text being used
// startTime - stores when typing started (null initially)
// timerInterval - stores setInterval ID for timer
// isTestComplete - tracks if test is finished (false initially)
// totalCharactersTyped - count of characters typed (including wrong ones)
let currentText;
let startTime = null;
let timerInterval;
let isTestComplete = false;
let totalCharactersTyped = 0;

// FUNCTION: selectRandomText()
// Select random text from sampleTexts array
// Store it in currentText variable
// Return the selected text
function selectRandomText() {
  let randomNum = Math.floor(Math.random() * sampleTexts.length);
  currentText = sampleTexts[randomNum];
  return currentText;
}

// FUNCTION: displayText()
// Take currentText string
// Split into individual characters
// For each character, create a <span> with that character inside
// Add all spans to textDisplay
// This allows us to highlight each character later
function displayText() {
  const splitText = currentText.split("");
  splitText.forEach((char) => {
    let span = document.createElement("span");
    span.textContent = char;
    textDisplay.appendChild(span);
  });
}

// FUNCTION: startTimer()
// Check if timer already started (startTime is not null), if yes, return
// Set startTime to current time (Date.now())
// Use setInterval to update timer display every 100ms (0.1 second)
// Calculate elapsed time: (Date.now() - startTime) / 1000
// Update timer element with elapsed time in seconds (1 decimal)
// Store interval ID in timerInterval variable
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

// FUNCTION: stopTimer()
// Use clearInterval to stop the timer
// Return the final elapsed time in seconds
function stopTimer() {
  clearInterval(timerInterval);
  let elapsed = (Date.now() - startTime) / 1000;
  return elapsed;
}

// FUNCTION: calculateWPM(characters, timeInSeconds)
// WPM = (characters / 5) / (timeInSeconds / 60)
// Why divide by 5? Standard word = 5 characters
// Why divide by 60? Convert seconds to minutes
// Round to whole number and return
function calculateWPM(characters, timeInSeconds) {
  const WPM = Math.round(characters / 5 / (timeInSeconds / 60));
  return WPM;
}

// FUNCTION: calculateAccuracy(correctChars, totalChars)
// Accuracy = (correctChars / totalChars) * 100
// Round to 1 decimal place
// Return percentage
function calculateAccuracy(correctChars, totalChars) {
  let Accuracy = (correctChars / totalChars) * 100;
  let percentage = Accuracy.toFixed(1);
  return percentage;
}

// FUNCTION: showResults(wpm, accuracy, time)
// Show statsContainer (add 'show' class)
// Update wpmValue, accuracyValue, timeValue elements
// Disable typingInput (set disabled = true)
function showResults(wpm, accuracy, time) {
  statsContainer.classList.add("show");
  wpmValue.textContent = wpm;
  accuracyValue.textContent = accuracy + "%";
  timeValue.textContent = time + "s";
  typingInput.disabled = true;
}

// FUNCTION: resetTest()
// Hide statsContainer (remove 'show' class)
// Clear timer display (set to "Time: 0s")
// Clear typingInput value
// Enable typingInput
// Stop timer if running (clearInterval)
// Reset all state variables (startTime = null, isTestComplete = false, totalCharactersTyped = 0)
// Select new random text
// Display the new text
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

// EVENT LISTENER: typingInput - 'input' event
// Get the typed text from typingInput.value
// Start timer if not started yet (call startTimer on first character)
// Get all character spans from textDisplay
// Loop through each span and compare with typed text
// For each character position (index):
//   - If typed character matches: add 'correct' class, remove 'incorrect'
//   - If typed character wrong: add 'incorrect' class, remove 'correct'
//   - If not typed yet: remove both classes
//   - Add 'current' class to the next character to be typed
// Track totalCharactersTyped
// Check if test complete: if typed.length === currentText.length
//   - Stop timer and get final time
//   - Count correct characters (spans with 'correct' class)
//   - Calculate WPM
//   - Calculate accuracy
//   - Show results
//   - Set isTestComplete = true
typingInput.addEventListener("input", () => {
  let valueInput = typingInput.value;
  startTimer();
  const spans = document.querySelectorAll("span");
  spans.forEach((element, index) => {
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
    if (index === valueInput.length) {
      element.classList.add("current");
    } else {
      element.classList.remove("current");
    }
  });
  totalCharactersTyped = valueInput.length;
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

// EVENT LISTENER: resetBtn - 'click' event
// Call resetTest function
resetBtn.addEventListener("click", resetTest);
// INITIALIZATION
// When page loads:
// Call resetTest to set up first test
resetTest();
