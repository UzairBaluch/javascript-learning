// ============================================
// TEMPERATURE CONVERTER
// ============================================

// DOM ELEMENTS - Get input fields, buttons, and result displays
let celsiusInput = document.getElementById("celsiusInput");
let celsiusBtn = document.getElementById("celsiusBtn");
let fahrenheitResult = document.getElementById("fahrenheitResult");
let fahrenheitInput = document.getElementById("fahrenheitInput");
let fahrenheitBtn = document.getElementById("fahrenheitBtn");
let celsiusResult = document.getElementById("celsiusResult");

// CELSIUS TO FAHRENHEIT - Convert and display result
celsiusBtn.addEventListener("click", () => {
  const result = (celsiusInput.value * 9) / 5 + 32;
  fahrenheitResult.textContent = result;
});

// FAHRENHEIT TO CELSIUS - Convert and display result
fahrenheitBtn.addEventListener("click", () => {
  const result = ((fahrenheitInput.value - 32) * 5) / 9;
  celsiusResult.textContent = result;
});
