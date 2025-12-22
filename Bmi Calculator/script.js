
// Targeting Elems
let weight = document.getElementById("weight");
let height = document.getElementById("height");
let calculateBtn = document.getElementById("calculateBtn");
let result = document.getElementById("result");
let bmiValue = document.getElementById("bmiValue");
let bmiCategory = document.getElementById("bmiCategory");
 // Working on button and functionalty to calculate and show it to ui
calculateBtn.addEventListener("click", () => {
  const bmiCalculation = (weight.value / (height.value * height.value)).toFixed(
    2
  );
  // checking for category validation
  if (bmiCalculation < 18.5) {
    bmiCategory.textContent = "Underweight";
  } else if (bmiCalculation < 25) {
    bmiCategory.textContent = "Normal weight";
  } else if (bmiCalculation < 30) {
    bmiCategory.textContent = "Overweight";
  } else {
    bmiCategory.textContent = "Obese";
  }
  bmiValue.textContent = bmiCalculation;
});
