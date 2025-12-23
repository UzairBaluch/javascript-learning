// ============================================
// QUIZ DATA
// ============================================
// Array of quiz questions with options and correct answers
const quizData = [
    {
        question: "What does DOM stand for?",
        options: ["Document Object Model", "Data Object Model", "Digital Object Model", "Display Object Model"],
        correctAnswer: 0
    },
    {
        question: "Which keyword is used to declare a constant in JavaScript?",
        options: ["var", "let", "const", "static"],
        correctAnswer: 2
    },
    {
        question: "Which method converts a JSON string into a JavaScript object?",
        options: ["JSON.stringify()", "JSON.parse()", "JSON.convert()", "JSON.object()"],
        correctAnswer: 1
    },
    {
        question: "Which operator checks both value and type?",
        options: ["==", "=", "===", "!="],
        correctAnswer: 2
    },
    {
        question: "What is the result of `typeof null`?",
        options: ["null", "object", "undefined", "number"],
        correctAnswer: 1
    },
    {
        question: "Which function runs code after a delay?",
        options: ["setInterval()", "setTimeout()", "delay()", "wait()"],
        correctAnswer: 1
    },
    {
        question: "Which array method adds an item to the end?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        correctAnswer: 0
    },
    {
        question: "Which array method removes the last element?",
        options: ["push()", "shift()", "pop()", "slice()"],
        correctAnswer: 2
    },
    {
        question: "Which keyword is used to create a class?",
        options: ["object", "function", "class", "prototype"],
        correctAnswer: 2
    },
    {
        question: "What does NaN stand for?",
        options: ["No assigned Number", "Not a Name", "Not a Number", "Negative Number"],
        correctAnswer: 2
    },
    {
        question: "Which method selects an element by ID?",
        options: ["querySelectorAll()", "getElementsByClassName()", "getElementById()", "getElementsByTagName()"],
        correctAnswer: 2
    },
    {
        question: "Which loop is guaranteed to run at least once?",
        options: ["for", "while", "do...while", "foreach"],
        correctAnswer: 2
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        options: ["<!-- -->", "//", "#", "**"],
        correctAnswer: 1
    },
    {
        question: "What does `Array.isArray()` do?",
        options: ["Creates an array", "Checks if a value is an array", "Converts to array", "Counts array items"],
        correctAnswer: 1
    },
    {
        question: "Which keyword refers to the current object?",
        options: ["this", "self", "object", "current"],
        correctAnswer: 0
    },
    {
        question: "Which method joins array elements into a string?",
        options: ["join()", "concat()", "combine()", "merge()"],
        correctAnswer: 0
    },
    {
        question: "What does `event.preventDefault()` do?",
        options: ["Stops event bubbling", "Cancels default browser behavior", "Refreshes page", "Removes event listener"],
        correctAnswer: 1
    },
    {
        question: "Which operator is used for logical AND?",
        options: ["&&", "||", "!", "&"],
        correctAnswer: 0
    },
    {
        question: "Which method removes whitespace from both ends of a string?",
        options: ["trim()", "cut()", "slice()", "clean()"],
        correctAnswer: 0
    },
    {
        question: "Which statement is used to handle errors?",
        options: ["if...else", "try...catch", "switch", "throw"],
        correctAnswer: 1
    }
];

// ============================================
// STATE VARIABLES
// ============================================
// Track which question we're currently on (starts at 0 for first question)
let currentQuestionIndex = 0;

// Track user's score throughout the quiz
let score = 0;

// Store the index of the option the user selected (null = no selection yet)
let selectedAnswer = null;

// ============================================
// DOM ELEMENTS
// ============================================
// Get references to all HTML elements we need to manipulate
let quizContainer = document.getElementById("quiz-container");
let currentQuestion = document.getElementById("current-question");
let totalQuestions = document.getElementById("total-questions");
let questionText = document.getElementById("question-text");
let optionsContainer = document.getElementById("options-container");
let nextBtn = document.getElementById("next-btn");
let resultContainer = document.getElementById("result-container");
let scoreText = document.getElementById("score-text");
let restartBtn = document.getElementById("restart-btn");

// ============================================
// MAIN FUNCTIONS
// ============================================

/**
 * Loads and displays the current question with its options
 * - Shows question text and progress (e.g., "1/5")
 * - Dynamically creates option buttons
 * - Adds click handlers to track user selection
 */
function loadQuestion() {
    // Get the current question object from quizData
    const currentQuiz = quizData[currentQuestionIndex];
    
    // Display question text and progress
    questionText.textContent = currentQuiz.question;
    currentQuestion.textContent = currentQuestionIndex + 1; // Display as 1-based (not 0-based)
    totalQuestions.textContent = quizData.length;

    // Clear previous options before creating new ones
    optionsContainer.innerHTML = '';
    
    // Create a button for each option
    currentQuiz.options.forEach((option, index) => {
        const optionBtn = document.createElement("button");
        optionBtn.className = "option-btn";
        optionBtn.textContent = option;
        optionsContainer.appendChild(optionBtn);

        // Handle option selection
        optionBtn.addEventListener("click", () => {
            selectedAnswer = index; // Store which option was clicked
            
            // Remove 'selected' class from all buttons
            const allButtons = document.querySelectorAll(".option-btn");
            allButtons.forEach((btn) => btn.classList.remove("selected"));
            
            // Add 'selected' class to clicked button
            optionBtn.classList.add('selected');
            
            // Enable Next button once an option is selected
            nextBtn.disabled = false;
        });
    });
}

/**
 * Handles moving to the next question
 * - Checks if answer is correct and updates score
 * - Moves to next question or shows results if quiz is complete
 */
function handleNext() {
    const currentQuiz = quizData[currentQuestionIndex];
    
    // Check if user's answer is correct and increment score
    if (currentQuiz.correctAnswer === selectedAnswer) {
        score++;
    }
    
    // Reset selection for next question
    selectedAnswer = null;
    
    // Move to next question
    currentQuestionIndex++;
    
    // Check if there are more questions
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
        nextBtn.disabled = true; // Disable until user selects an option
    } else {
        showResults(); // Quiz complete - show final score
    }
}

/**
 * Displays the final quiz results
 * - Hides quiz container
 * - Shows results container with final score
 */
function showResults() {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";
    scoreText.textContent = "Your Score: " + score + "/" + quizData.length;
}

/**
 * Restarts the quiz from the beginning
 * - Resets all state variables to initial values
 * - Shows quiz container and hides results
 * - Loads first question
 */
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    quizContainer.style.display = "block";
    resultContainer.style.display = "none";
    loadQuestion();
}

// ============================================
// EVENT LISTENERS
// ============================================
nextBtn.addEventListener('click', handleNext);
restartBtn.addEventListener('click', restartQuiz);

// ============================================
// INITIALIZE
// ============================================
// Load the first question when page loads
loadQuestion();