// ============================================
// MEMORY CARD GAME
// ============================================

// STATE VARIABLES - Track game progress and card flipping
let moves = 0;
let matches = 0;
let firstCard = null;
let secondCard = null;
let lockBoard = false;

// EMOJI DATA - 8 pairs of emojis for matching
const emojis = [
  "🐶",
  "🐱",
  "🦁",
  "🐼",
  "🐸",
  "🦊",
  "🐵",
  "🐷",
  "🐶",
  "🐱",
  "🦁",
  "🐼",
  "🐸",
  "🦊",
  "🐵",
  "🐷",
];

// DOM ELEMENTS - Get game board, displays, and controls
const gameBoard = document.getElementById("gameBoard");
const movesDisplay = document.getElementById("moves");
const matchesDisplay = document.getElementById("matches");
const resetBtn = document.getElementById("resetBtn");
const winMessage = document.getElementById("winMessage");
const finalMoves = document.getElementById("finalMoves");

// SHUFFLE ARRAY - Randomize emoji positions using Fisher-Yates algorithm
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}

// CREATE BOARD - Generate and display 16 shuffled cards
function createBoard() {
  let shuffledEmojis = shuffle(emojis);
  gameBoard.innerHTML = "";

  shuffledEmojis.forEach((emoji) => {
    const card = document.createElement("div");
    card.className = "card";

    const frontCard = document.createElement("div");
    frontCard.className = "card-front";
    frontCard.textContent = emoji;

    const backCard = document.createElement("div");
    backCard.className = "card-back";
    backCard.textContent = "?";

    card.appendChild(frontCard);
    card.appendChild(backCard);
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
}

// FLIP CARD - Handle card click and track first/second card
function flipCard() {
  // Prevent clicking during animation or on already flipped cards
  if (lockBoard || this.classList.contains("flipped") || this === firstCard) {
    return;
  }

  this.classList.add("flipped");

  // First card clicked
  if (firstCard === null) {
    firstCard = this;
  }
  // Second card clicked
  else {
    secondCard = this;
    moves++;
    movesDisplay.textContent = moves;
    checkMatch();
  }
}

// CHECK MATCH - Compare two flipped cards
function checkMatch() {
  let emoji1 = firstCard.querySelector(".card-front").textContent;
  let emoji2 = secondCard.querySelector(".card-front").textContent;

  if (emoji1 === emoji2) {
    // Cards match - mark as matched
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    matches++;
    matchesDisplay.textContent = matches;

    // Check for win condition (all 8 pairs found)
    if (matches === 8) {
      winMessage.classList.add("show");
      finalMoves.textContent = moves;
    }

    firstCard = null;
    secondCard = null;
  } else {
    // Cards don't match - flip back after delay
    lockBoard = true;

    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      firstCard = null;
      secondCard = null;
      lockBoard = false;
    }, 1000);
  }
}

// RESET GAME - Restart game with fresh board
function resetGame() {
  moves = 0;
  matches = 0;
  movesDisplay.textContent = 0;
  matchesDisplay.textContent = 0;
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  winMessage.classList.remove("show");
  createBoard();
}

// RESET BUTTON EVENT LISTENER
resetBtn.addEventListener("click", resetGame);

// INITIAL BOARD - Create game on page load
createBoard();
