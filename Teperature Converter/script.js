
// targeting the elems
let celsiusInput = document.getElementById("celsiusInput");
let celsiusBtn = document.getElementById("celsiusBtn");
let fahrenheitResult = document.getElementById("fahrenheitResult");
let fahrenheitInput = document.getElementById("fahrenheitInput");
let fahrenheitBtn = document.getElementById("fahrenheitBtn");
let celsiusResult = document.getElementById("celsiusResult");
// converting the values and showing it to ui
celsiusBtn.addEventListener("click", () => {
  const result = (celsiusInput.value * 9) / 5 + 32; // tracting var and formula

  fahrenheitResult.textContent = result; // updating to ui
});

// converting the values and showing it to ui
fahrenheitBtn.addEventListener("click", () => {
  const result = ((fahrenheitInput.value - 32) * 5) / 9; // tracting var and formula

  celsiusResult.textContent = result; // updating to ui
});
