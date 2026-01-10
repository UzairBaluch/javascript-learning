// ============================================
// COUNTER
// ============================================

// DOM ELEMENTS - Get buttons and display element
let decrease = document.getElementById("decrease");
let increase = document.getElementById("increase");
let reset = document.getElementById("reset");
let count = document.getElementById("count");

// STATE VARIABLE - Track current count value
let num = 0;

// INCREASE BUTTON - Add 1 to count
increase.addEventListener("click", () => {
  num++;
  count.textContent = num;
});

// DECREASE BUTTON - Subtract 1 from count
decrease.addEventListener("click", () => {
  num--;
  count.textContent = num;
});

// RESET BUTTON - Reset count to zero
reset.addEventListener("click", () => {
  num = 0;
  count.textContent = num;
});
