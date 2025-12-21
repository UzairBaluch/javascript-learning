// Select DOM elements
let btnCLick = document.getElementById("calculateBtn");
let billAmount = document.getElementById("billAmount");
let tipPercentage = document.getElementById("tipPercentage");
let tipAmountInput = document.getElementById("tipAmount");
let totalAmountInput = document.getElementById("totalAmount");
let totalAmount;

// Calculate tip when button is clicked
btnCLick.addEventListener("click", () => {
  // Get input values and convert to numbers
  let billAmountValue = parseFloat(billAmount.value.trim());
  let tipPercentageValue = parseFloat(tipPercentage.value.trim());

  // Validate inputs are greater than 0
  if (billAmountValue > 0 && tipPercentageValue > 0) {
    // Calculate tip and total
    let tipAmount = (billAmountValue * tipPercentageValue) / 100;
    totalAmount = tipAmount + billAmountValue;

    // Display results formatted as currency
    tipAmountInput.textContent = "$" + tipAmount.toFixed(2);
    totalAmountInput.textContent = "$" + totalAmount.toFixed(2);
  } else {
    alert("Please enter valid amounts");
  }
});
