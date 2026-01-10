// ============================================
// BMI CALCULATOR
// ============================================

// DOM ELEMENTS - Get input fields, button, and result display areas
let weight = document.getElementById("weight");
let height = document.getElementById("height");
let calculateBtn = document.getElementById("calculateBtn");
let result = document.getElementById("result");
let bmiValue = document.getElementById("bmiValue");
let bmiCategory = document.getElementById("bmiCategory");

// CALCULATE BMI - Listen for button click to calculate and display BMI
calculateBtn.addEventListener("click", () => {
  // Calculate BMI using formula: weight / (height * height), rounded to 2 decimals
  const bmiCalculation = (weight.value / (height.value * height.value)).toFixed(
    2
  );

  // Determine BMI category based on standard ranges
  if (bmiCalculation < 18.5) {
    bmiCategory.textContent = "Underweight";
  } else if (bmiCalculation < 25) {
    bmiCategory.textContent = "Normal weight";
  } else if (bmiCalculation < 30) {
    bmiCategory.textContent = "Overweight";
  } else {
    bmiCategory.textContent = "Obese";
  }

  // Display calculated BMI value
  bmiValue.textContent = bmiCalculation;
});
