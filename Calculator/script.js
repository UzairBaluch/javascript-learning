// ============================================
// CALCULATOR
// ============================================

// DOM ELEMENTS - Get all calculator buttons and display
const number = document.querySelectorAll(".number");
const operator = document.querySelectorAll(".operator");
const isclear = document.querySelectorAll(".clear");
const isdecimal = document.querySelectorAll(".decimal");
const equals = document.querySelectorAll(".equals");
const display = document.getElementById("display");

// STATE VARIABLES - Track calculator state across button clicks
let num = null; // First number in calculation
let opt = null; // Selected operator (+, -, ×, ÷)
let shouldReset = false; // Flag to reset display on next number input

// NUMBER BUTTONS (0-9) - Handle digit input
number.forEach((item) => {
  item.addEventListener("click", () => {
    // If operator already displayed, append number to build expression (e.g., "15+5")
    if (
      display.textContent.includes("+") ||
      display.textContent.includes("−") ||
      display.textContent.includes("×") ||
      display.textContent.includes("÷")
    ) {
      display.textContent = display.textContent + item.textContent;
    }
    // If display shows "0" or reset flag is set, replace display with new number
    else if (display.textContent === "0" || shouldReset === true) {
      display.textContent = item.textContent;
      shouldReset = false;
    }
    // Otherwise, append number to existing display
    else {
      display.textContent = display.textContent + item.textContent;
    }
  });
});

// OPERATOR BUTTONS (+, -, ×, ÷) - Handle operator selection
operator.forEach((item) => {
  item.addEventListener("click", () => {
    num = Number(display.textContent); // Store first number
    opt = item.textContent; // Store operator
    shouldReset = true; // Flag to reset on next number
    display.textContent = display.textContent + opt; // Show operator on display
  });
});

// CLEAR BUTTON (AC) - Reset calculator to initial state
isclear.forEach((item) => {
  item.addEventListener("click", () => {
    num = null;
    opt = null;
    shouldReset = false;
    display.textContent = "0";
  });
});

// DECIMAL BUTTON - Add decimal point if not already present
isdecimal.forEach((item) => {
  item.addEventListener("click", () => {
    if (!display.textContent.includes(".")) {
      display.textContent = display.textContent + ".";
    }
  });
});

// EQUALS BUTTON - Perform calculation and display result
equals.forEach((item) => {
  item.addEventListener("click", () => {
    // Extract second number from display (e.g., get "5" from "15+5")
    let operatorIndex = display.textContent.indexOf(opt);
    let num2 = Number(display.textContent.substring(operatorIndex + 1));

    let result;

    // Perform calculation based on selected operator
    if (opt === "+") {
      result = num + num2;
    } else if (opt === "−") {
      result = num - num2;
    } else if (opt === "×") {
      result = num * num2;
    } else if (opt === "÷") {
      result = num / num2;
    }

    // Display result
    display.textContent = result;
  });
});
