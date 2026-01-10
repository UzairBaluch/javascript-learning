// ============================================
// COLOR FLIPPER
// ============================================

// COLOR ARRAY - Predefined list of CSS color names
const colors = [
  "red",
  "blue",
  "green",
  "yellow",
  "orange",
  "purple",
  "pink",
  "brown",
  "black",
  "white",
  "gray",
  "cyan",
  "magenta",
  "coral",
  "tomato",
  "skyblue",
  "lime",
  "gold",
  "navy",
  "teal",
];

// DOM ELEMENTS - Get button, color display, and body element
const flipBtn = document.getElementById("flipBtn");
const colorName = document.getElementById("colorName");
const bodyElement = document.body;

// FLIP COLOR - Generate random color on button click
flipBtn.addEventListener("click", () => {
  // Generate random index from colors array
  const randomNumber = Math.floor(Math.random() * colors.length);

  // Update color name display and apply background color
  colorName.textContent = colors[randomNumber];
  bodyElement.style.backgroundColor = colors[randomNumber];
});
