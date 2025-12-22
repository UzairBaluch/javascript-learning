// grabing elements for using in js
let decrease = document.getElementById("decrease");
let increase = document.getElementById("increase");
let reset = document.getElementById("reset");
let count = document.getElementById("count");

// var for track the count and for updating in ui
let num = 0;
// a function adding + 1 on count
increase.addEventListener("click", () => {
  num++;
  count.textContent = num; // showing count on ui
});
// a function adding - 1 on count
decrease.addEventListener("click", () => {
  num--;
  count.textContent = num; // showing count on ui
});
// a function reset  count
reset.addEventListener("click", () => {
  num = 0;
  count.textContent = num; // showing count on ui
});
