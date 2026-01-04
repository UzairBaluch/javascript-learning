// DOM ELEMS FOR MANUPILATION AND FUNCTIONALTY
const statusGame = document.querySelector(".status");
const cells = document.querySelectorAll(".cell");
const resetBtn = document.querySelector(".reset-btn");
// variable for tracking current player
let currentPlayer = "X";
// variable for tracking game active or not
let isGameOn = true;
// array of empty strings for board state
let board = ["", "", "", "", "", "", "", "", ""];

// a loop for adding event listner on each cell
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    // validation if game is active or not and checking for which cell is clicked
    if (isGameOn === true && board[cell.dataset.index] === "") {
      // getting the index and save in variable
      const index = cell.dataset.index;
      // Put the current player's mark into the cell so it shows on screen.
      cell.textContent = currentPlayer;
      //update the board array at that index with the current player's mark.
      board[index] = currentPlayer;
      //  Add the 'taken' class to the cell.
      cell.classList.add("taken");
      //add the 'x' or 'o' class for coloring
      if (currentPlayer === "X") {
        cell.classList.add("x");
      } else {
        cell.classList.add("o");
      }
      // call function to check for winner and draw
      checkWinner();
      checkDraw();
      // If currentPlayer is "X", change it to "O"
      //If currentPlayer is "O", change it to "X"
      if (currentPlayer === "X") {
        currentPlayer = "O";
      } else {
        currentPlayer = "X";
    }
    if (isGameOn) {
          //upadte the status to who's turn is
        statusGame.textContent = `Player ${currentPlayer}'s Turn`;
      }
    }
  });
});
// a function to check for winner
function checkWinner() {
  // an array of all posible winning combinations
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
  // a loop that goes through each combination in the winningCombo array.
  winningCombo.forEach((cell) => {
    // checking for all three condiations
    if (
      board[cell[0]] === board[cell[1]] &&
      board[cell[1]] === board[cell[2]] &&
      board[cell[0]] !== ""
    ) {
      // pausing the game
      isGameOn = false;
      // updating the status to winner
      statusGame.textContent = `The Winner is ${board[cell[0]]}`;
    }
  });
}
// function to check if the game is a draw
function checkDraw() {
  // checking if board includes any empty string AND GAME IS STILL ACTIVE
  if (!board.includes("") && isGameOn === true) {
    isGameOn = false;
    statusGame.textContent = "It's a Draw";
  }
}
// a function that Clear all cells (textContent back to empty)
//Remove all classes ('taken', 'x', 'o') from cells
//Reset the board array to all empty strings
//Set currentPlayer back to "X"
//Set isGameOn back to true
//Update status to "Player X's Turn"
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
