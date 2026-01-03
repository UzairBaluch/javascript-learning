// VARIABLES:
// - moves (number of attempts)
// - matches (number of pairs found)
// - firstCard (store first flipped card)
// - secondCard (store second flipped card)
// - lockBoard (prevent clicking during animations)

// - emojis array (8 emojis, 2 of each)
let moves = 0;
let matches = 0;
let firstCard = null;
let secondCard = null;
let lockBoard = false;
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

// DOM elements
const gameBoard = document.getElementById("gameBoard");
const movesDisplay = document.getElementById("moves");
const matchesDisplay = document.getElementById("matches");
const resetBtn = document.getElementById("resetBtn");
const winMessage = document.getElementById("winMessage");
const finalMoves = document.getElementById("finalMoves");

// FUNCTIONS:
// 1. shuffle(array) - randomize the emoji array
function shuffle(array) {
  // Loop backwards through the array (from last index to first)
  for (let i = array.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i
    // Math.random() gives 0 to 0.999...
    // Multiply by (i + 1) to get 0 to i
    // Math.floor() to make it a whole number
    let randomIndex = Math.floor(Math.random() * (i + 1));

    // Swap array[i] with array[randomIndex]
    // Use a temp variable to store one value while swapping
    let temp = array[i];
    array[i] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}
// 2. createBoard() - create 16 card elements
function createBoard() {
  // Step 1: Shuffle the emojis array
  let result = shuffle(emojis);
  // Step 2: Clear the game board (remove all previous cards)
  // Hint: set gameBoard.innerHTML to empty string
  gameBoard.innerHTML = "";
  // Step 3: Loop through each emoji in shuffled array
  result.forEach((e) => {
    // Step 4: Create the main card container (div with class "card")
    const card = document.createElement("div");
    card.className = "card";
    // Step 5: Create the front of card (div with class "card-front")
    const frontCard = document.createElement("div");
    frontCard.className = "card-front";
    // Step 6: Put the emoji inside card front
    frontCard.textContent = e;
    // Step 7: Create the back of card (div with class "card-back")
    const backCard = document.createElement("div");
    backCard.className = "card-back";
    // Step 8: Put "?" inside card back
    backCard.textContent = "?";
    // Step 9: Attach front and back to the main card
    card.appendChild(frontCard);
    card.appendChild(backCard);
    // Step 10: Add click event listener to card (call flipCard)
    card.addEventListener("click", flipCard);
    // Step 11: Add the finished card to game board
    gameBoard.appendChild(card);
  });
}
// 3. flipCard() - handle card click
function flipCard() {
  // Step 1: Check if board is locked (can't click during animation)
  // If lockBoard is true, return (stop the function)
  if (lockBoard === true) {
    return;
  }
  // Step 2: Check if this card is already flipped
  // If this card has 'flipped' class, return (stop the function)
  if (this.classList.contains("flipped")) {
    return;
  }
  // Step 3: Check if this is the same card clicked twice
  // If this card is the same as firstCard, return
  // Hint: use this === firstCard
  if (this === firstCard) {
    return;
  }
  // Step 4: Add 'flipped' class to show the emoji
  this.classList.add("flipped");
  // Step 5: Check if this is the first or second card
  // If firstCard is null (empty), this is the FIRST card
  if (firstCard === null) {
    // Store this card in firstCard
    firstCard = this;
    // Otherwise, this is the SECOND card
  } else {
    // Store this card in secondCard
    secondCard = this;
    // Increase moves counter by 1
    moves++;
    // Update moves display
    movesDisplay.textContent = moves;
    // Check if cards match (call checkMatch function)
    checkMatch();
  }
}
// 4. checkMatch() - check if 2 cards match
function checkMatch() {
  // Step 1: Get emoji from firstCard
  // Hint: firstCard.querySelector('.card-front').textContent
  let emoji1 = firstCard.querySelector(".card-front").textContent;

  // Step 2: Get emoji from secondCard
  // Hint: secondCard.querySelector('.card-front').textContent
  let emoji2 = secondCard.querySelector(".card-front").textContent;

  // Step 3: Do they match?
  if (emoji1 === emoji2) {
    // MATCH! ✅
    // Add 'matched' class to both cards
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    // Increase matches counter
    matches++;
    // Update matches display
    matchesDisplay.textContent = matches;
    // Check if all 8 pairs found (win condition!)
    // If matches === 8, show win message
    if (matches === 8) {
      winMessage.classList.add("show");
      finalMoves.textContent = moves;
    }
    // Reset firstCard and secondCard to null
    firstCard = null;
    secondCard = null;
  } else {
    // NO MATCH! ❌
    // Lock the board (set lockBoard to true)
    lockBoard = true;
    // Wait 1 second, then flip both cards back
    // Use setTimeout with 1000ms delay
    setTimeout(() => {
      //   - Remove 'flipped' class from both cards
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      //   - Reset firstCard and secondCard to null
      firstCard = null;
      secondCard = null;
      //   - Unlock board (set lockBoard to false)
      lockBoard = false;
    }, 1000);
  }
}
// 5. resetBoard() - reset firstCard, secondCard, lockBoard
function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}
// 6. resetGame() - restart everything
function resetGame() {
  //Reset moves counter to 0
  moves = 0;
  //Reset matches counter to 0
  matches = 0;
  //Update moves display to show 0
  movesDisplay.textContent = 0;
  //Update matches display to show 0
  matchesDisplay.textContent = 0;
  //Reset firstCard, secondCard to null
  firstCard = null;
  secondCard = null;
  //Unlock board(lockBoard = false)
  lockBoard = false;
  //Hide win message(remove 'show' class)
  winMessage.classList.remove("show");
  //Create new shuffled board(call createBoard())
  createBoard();
}

// EVENT LISTENERS:
// - Click on each card → flipCard()
// - Click reset button → resetGame()
resetBtn.addEventListener("click", resetGame);
// Initialize game when page loads
createBoard();
