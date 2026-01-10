// ============================================
// QUIZ APP
// ============================================

// QUIZ DATA - Array of JavaScript questions with multiple choice options
const quizData = [
  {
    question: "What does DOM stand for?",
    options: [
      "Document Object Model",
      "Data Object Model",
      "Digital Object Model",
      "Display Object Model",
    ],
    correctAnswer: 0,
  },
  {
    question: "Which keyword is used to declare a constant in JavaScript?",
    options: ["var", "let", "const", "static"],
    correctAnswer: 2,
  },
  {
    question: "Which method converts a JSON string into a JavaScript object?",
    options: [
      "JSON.stringify()",
      "JSON.parse()",
      "JSON.convert()",
      "JSON.object()",
    ],
    correctAnswer: 1,
  },
  {
    question: "Which operator checks both value and type?",
    options: ["==", "=", "===", "!="],
    correctAnswer: 2,
  },
  {
    question: "What is the result of `typeof null`?",
    options: ["null", "object", "undefined", "number"],
    correctAnswer: 1,
  },
  {
    question: "Which function runs code after a delay?",
    options: ["setInterval()", "setTimeout()", "delay()", "wait()"],
    correctAnswer: 1,
  },
  {
    question: "Which array method adds an item to the end?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    correctAnswer: 0,
  },
  {
    question: "Which array method removes the last element?",
    options: ["push()", "shift()", "pop()", "slice()"],
    correctAnswer: 2,
  },
  {
    question: "Which keyword is used to create a class?",
    options: ["object", "function", "class", "prototype"],
    correctAnswer: 2,
  },
  {
    question: "What does NaN stand for?",
    options: [
      "No assigned Number",
      "Not a Name",
      "Not a Number",
      "Negative Number",
    ],
    correctAnswer: 2,
  },
  {
    question: "Which method selects an element by ID?",
    options: [
      "querySelectorAll()",
      "getElementsByClassName()",
      "getElementById()",
      "getElementsByTagName()",
    ],
    correctAnswer: 2,
  },
  {
    question: "Which loop is guaranteed to run at least once?",
    options: ["for", "while", "do...while", "foreach"],
    correctAnswer: 2,
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["<!-- -->", "//", "#", "**"],
    correctAnswer: 1,
  },
  {
    question: "What does `Array.isArray()` do?",
    options: [
      "Creates an array",
      "Checks if a value is an array",
      "Converts to array",
      "Counts array items",
    ],
    correctAnswer: 1,
  },
  {
    question: "Which keyword refers to the current object?",
    options: ["this", "self", "object", "current"],
    correctAnswer: 0,
  },
  {
    question: "Which method joins array elements into a string?",
    options: ["join()", "concat()", "combine()", "merge()"],
    correctAnswer: 0,
  },
  {
    question: "What does `event.preventDefault()` do?",
    options: [
      "Stops event bubbling",
      "Cancels default browser behavior",
      "Refreshes page",
      "Removes event listener",
    ],
    correctAnswer: 1,
  },
  {
    question: "Which operator is used for logical AND?",
    options: ["&&", "||", "!", "&"],
    correctAnswer: 0,
  },
  {
    question: "Which method removes whitespace from both ends of a string?",
    options: ["trim()", "cut()", "slice()", "clean()"],
    correctAnswer: 0,
  },
  {
    question: "Which statement is used to handle errors?",
    options: ["if...else", "try...catch", "switch", "throw"],
    correctAnswer: 1,
  },
];

// STATE VARIABLES - Track quiz progress and user answers
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

// DOM ELEMENTS - Get quiz container, question display, options, and buttons
let quizContainer = document.getElementById("quiz-container");
let currentQuestion = document.getElementById("current-question");
let totalQuestions = document.getElementById("total-questions");
let questionText = document.getElementById("question-text");
let optionsContainer = document.getElementById("options-container");
let nextBtn = document.getElementById("next-btn");
let resultContainer = document.getElementById("result-container");
let scoreText = document.getElementById("score-text");
let restartBtn = document.getElementById("restart-btn");

// LOAD QUESTION - Display current question with options
function loadQuestion() {
  const currentQuiz = quizData[currentQuestionIndex];

  questionText.textContent = currentQuiz.question;
  currentQuestion.textContent = currentQuestionIndex + 1;
  totalQuestions.textContent = quizData.length;

  optionsContainer.innerHTML = "";

  currentQuiz.options.forEach((option, index) => {
    const optionBtn = document.createElement("button");
    optionBtn.className = "option-btn";
    optionBtn.textContent = option;
    optionsContainer.appendChild(optionBtn);

    optionBtn.addEventListener("click", () => {
      selectedAnswer = index;

      const allButtons = document.querySelectorAll(".option-btn");
      allButtons.forEach((btn) => btn.classList.remove("selected"));

      optionBtn.classList.add("selected");
      nextBtn.disabled = false;
    });
  });
}

// HANDLE NEXT - Check answer and move to next question or show results
function handleNext() {
  const currentQuiz = quizData[currentQuestionIndex];

  if (currentQuiz.correctAnswer === selectedAnswer) {
    score++;
  }

  selectedAnswer = null;
  currentQuestionIndex++;

  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
    nextBtn.disabled = true;
  } else {
    showResults();
  }
}

// SHOW RESULTS - Display final score
function showResults() {
  quizContainer.style.display = "none";
  resultContainer.style.display = "block";
  scoreText.textContent = "Your Score: " + score + "/" + quizData.length;
}

// RESTART QUIZ - Reset all variables and start over
function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  selectedAnswer = null;
  quizContainer.style.display = "block";
  resultContainer.style.display = "none";
  loadQuestion();
}

// EVENT LISTENERS - Attach button click handlers
nextBtn.addEventListener("click", handleNext);
restartBtn.addEventListener("click", restartQuiz);

// INITIALIZE - Load first question on page load
loadQuestion();
