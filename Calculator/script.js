// Select all calculator button groups and display element
const number = document.querySelectorAll(".number");
const operator = document.querySelectorAll(".operator");
const isclear = document.querySelectorAll(".clear");
const isdecimal = document.querySelectorAll(".decimal");
const equals = document.querySelectorAll(".equals");
const display = document.getElementById("display");

// Store calculator state - first number, operator, and reset flag
let num = null;  // First number in calculation
let opt = null;  // Selected operator (+, -, ×, ÷)
let value = 0;   // Not currently used
let shouldReset = false;  // Flag to reset display on next number

// Handle number button clicks (0-9)
number.forEach((item) => {
  item.addEventListener("click", () => {
    // If display already has an operator, append number to build full expression (e.g., "15+5")
    if (
      display.textContent.includes("+") ||
      display.textContent.includes("−") ||
      display.textContent.includes("×") ||
      display.textContent.includes("÷")
    ) {
      display.textContent = display.textContent + item.textContent;
    } 
    // If display shows "0" or we just clicked an operator, replace display
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

// Handle operator button clicks (+, -, ×, ÷)
operator.forEach((item) => {
  item.addEventListener("click", () => {
    num = Number(display.textContent);  // Store first number
    opt = item.textContent;  // Store operator
    shouldReset = true;  // Next number should reset display
    display.textContent = display.textContent + opt;  // Show operator on display
    console.log("num:", num);
  });
});

// Handle clear button (AC) - reset calculator to initial state
isclear.forEach((item) => {
  item.addEventListener("click", () => {
    num = null;
    opt = null;
    value = 0;
    shouldReset = false;
    display.textContent = "0";
  });
});

// Handle decimal button - add decimal point (only one per number)
isdecimal.forEach((item) => {
  item.addEventListener("click", () => {
    // Only add decimal if there isn't one already
    if (!display.textContent.includes(".")) {
      display.textContent = display.textContent + ".";
    }
  });
});

// Handle equals button - perform the calculation
equals.forEach((item) => {
  item.addEventListener("click", () => {
    let result;
    // Extract second number from display (e.g., get "5" from "15+5")
    let operatorIndex = display.textContent.indexOf(opt);
    let num2 = Number(display.textContent.substring(operatorIndex + 1));
    
    // Perform calculation based on operator
    if (opt === "+") {
      result = num + num2;
    } else if (opt === "−") {
      result = num - num2;
    } else if (opt === "×") {
      result = num * num2;
    } else {
      result = num / num2;
    }
    
    // Show result on display
    display.textContent = result;
  });
});