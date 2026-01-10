// ============================================
// TIP CALCULATOR
// ============================================

// DOM ELEMENTS - Get input fields, button, and result displays
let btnCLick = document.getElementById("calculateBtn");
let billAmount = document.getElementById("billAmount");
let tipPercentage = document.getElementById("tipPercentage");
let tipAmountInput = document.getElementById("tipAmount");
let totalAmountInput = document.getElementById("totalAmount");
let totalAmount;

// CALCULATE TIP - Compute tip and total when button clicked
btnCLick.addEventListener("click", () => {
  let billAmountValue = parseFloat(billAmount.value.trim());
  let tipPercentageValue = parseFloat(tipPercentage.value.trim());

  // Validate inputs
  if (billAmountValue > 0 && tipPercentageValue > 0) {
    // Calculate tip and total
    let tipAmount = (billAmountValue * tipPercentageValue) / 100;
    totalAmount = tipAmount + billAmountValue;

    // Display results as currency
    tipAmountInput.textContent = "$" + tipAmount.toFixed(2);
    totalAmountInput.textContent = "$" + totalAmount.toFixed(2);
  } else {
    alert("Please enter valid amounts");
  }
});
