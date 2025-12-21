// Array of CSS color names
const colors = [
  "red", "blue", "green", "yellow", "orange", "purple", "pink", 
  "brown", "black", "white", "gray", "cyan", "magenta", "coral", 
  "tomato", "skyblue", "lime", "gold", "navy", "teal"
];

// Select DOM elements
const flipBtn = document.getElementById("flipBtn");
const colorName = document.getElementById("colorName");
const bodyElement = document.body;

// Change color on button click
flipBtn.addEventListener("click", () => {
  // Generate random index
  const randomNumber = Math.floor(Math.random() * colors.length);
  
  // Update display and background
  colorName.textContent = colors[randomNumber];
  bodyElement.style.backgroundColor = colors[randomNumber];
});