// ============================================
// PASSWORD GENERATOR
// ============================================

// CHARACTER SETS - Available characters for password generation
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

// DOM ELEMENTS - Get password display, controls, and options
let passwordOutput = document.getElementById("passwordOutput");
let copyBtn = document.getElementById("copyBtn");
let lengthInput = document.getElementById("lengthInput");
let uppercaseCheck = document.getElementById("uppercaseCheck");
let lowercaseCheck = document.getElementById("lowercaseCheck");
let numbersCheck = document.getElementById("numbersCheck");
let symbolsCheck = document.getElementById("symbolsCheck");
let generateBtn = document.getElementById("generateBtn");
let strengthIndicator = document.getElementById("strengthIndicator");

// GENERATE PASSWORD - Create random password based on selected options
function generatePassword() {
  let passwordLength = lengthInput.value;

  // Validate at least one character type is selected
  if (
    !uppercaseCheck.checked &&
    !lowercaseCheck.checked &&
    !numbersCheck.checked &&
    !symbolsCheck.checked
  ) {
    alert("Please select at least one character type");
    return;
  }

  // Build character pool based on selected options
  let allowedChars = "";
  if (uppercaseCheck.checked) allowedChars += uppercase;
  if (lowercaseCheck.checked) allowedChars += lowercase;
  if (numbersCheck.checked) allowedChars += numbers;
  if (symbolsCheck.checked) allowedChars += symbols;

  // Generate password by randomly selecting characters
  let password = "";
  for (let i = 0; i < passwordLength; i++) {
    let randomIndex = Math.floor(Math.random() * allowedChars.length);
    password += allowedChars[randomIndex];
  }

  // Display generated password
  passwordOutput.textContent = password;
}

// COPY PASSWORD - Copy generated password to clipboard
async function copyPassword() {
  let password = passwordOutput.textContent;

  // Validate password exists
  if (password === "" || password === "Click Generate to create password") {
    alert("No password to copy");
    return;
  }

  // Copy to clipboard
  await navigator.clipboard.writeText(password);

  // Show feedback
  copyBtn.textContent = "Copied!";
  setTimeout(() => {
    copyBtn.textContent = "Copy";
  }, 2000);
}

// EVENT LISTENERS - Attach button click handlers
generateBtn.addEventListener("click", generatePassword);
copyBtn.addEventListener("click", copyPassword);
