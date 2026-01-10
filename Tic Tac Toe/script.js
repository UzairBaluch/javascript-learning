// ============================================
// TIC TAC TOE
// ============================================

// DOM ELEMENTS - Get game status, cells, and reset button
const statusGame = document.querySelector(".status");
const cells = document.querySelectorAll(".cell");
const resetBtn = document.querySelector(".reset-btn");

// STATE VARIABLES - Track current player, game status, and board state
let currentPlayer = "X";
let isGameOn = true;
let board = ["", "", "", "", "", "", "", "", ""];

// CELL CLICK HANDLER - Handle player moves
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (isGameOn === true && board[cell.dataset.index] === "") {
      const index = cell.dataset.index;

      // Update cell display and board state
      cell.textContent = currentPlayer;
      board[index] = currentPlayer;
      cell.classList.add("taken");

      // Add player-specific styling
      if (currentPlayer === "X") {
        cell.classList.add("x");
      } else {
        cell.classList.add("o");
      }

      // Check for game end conditions
      checkWinner();
      checkDraw();

      // Switch player
      if (currentPlayer === "X") {
        currentPlayer = "O";
      } else {
        currentPlayer = "X";
      }

      // Update status if game still active
      if (isGameOn) {
        statusGame.textContent = `Player ${currentPlayer}'s Turn`;
      }
    }
  });
});

// CHECK WINNER - Evaluate all winning combinations
function checkWinner() {
  let winningCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  winningCombo.forEach((cell) => {
    if (
      board[cell[0]] === board[cell[1]] &&
      board[cell[1]] === board[cell[2]] &&
      board[cell[0]] !== ""
    ) {
      isGameOn = false;
      statusGame.textContent = `The Winner is ${board[cell[0]]}`;
    }
  });
}

// CHECK DRAW - Determine if board is full with no winner
function checkDraw() {
  if (!board.includes("") && isGameOn === true) {
    isGameOn = false;
    statusGame.textContent = "It's a Draw";
  }
}

// RESET GAME - Clear board and restart
resetBtn.addEventListener("click", () => {
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("taken", "x", "o");
  });

  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  isGameOn = true;
  statusGame.textContent = "Player X's Turn";
});
