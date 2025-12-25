// Character sets for password generation
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
// Grab all elements needed for the Password Generator
let passwordOutput = document.getElementById("passwordOutput");
let copyBtn = document.getElementById("copyBtn");
let lengthInput = document.getElementById("lengthInput");
let uppercaseCheck = document.getElementById("uppercaseCheck");
let lowercaseCheck = document.getElementById("lowercaseCheck");
let numbersCheck = document.getElementById("numbersCheck");
let symbolsCheck = document.getElementById("symbolsCheck");
let generateBtn = document.getElementById("generateBtn");
let strengthIndicator = document.getElementById("strengthIndicator");


// a function to generate passowrd
function generatePassword() {
  // getting the value from input
  let inputValue = lengthInput.value;
  // validation if all checkBoxes are checked or not
  if (
    !uppercaseCheck.checked &&
    !lowercaseCheck.checked &&
    !numbersCheck.checked &&
    !symbolsCheck.checked
  ) {
    // alert to show that atleast one box should be checked
    alert("Please Check Atleast One Box");
    return;
  }
  // a empty string for adding chars after validation
  let allowedChars = "";
  // validation if a box is checked so we cann add that chars to password
  if (uppercaseCheck.checked) {
    // adding the chekced char to password after the true result from checked box
    allowedChars += uppercase;
  }
  // validation if a box is checked so we cann add that chars to password
  if (lowercaseCheck.checked) {
    // adding the chekced char to password after the true result from checked box
    allowedChars += lowercase;
  }
  // validation if a box is checked so we cann add that chars to password
  if (numbersCheck.checked) {
    // adding the chekced char to password after the true result from checked box
    allowedChars += numbers;
  }
  // validation if a box is checked so we cann add that chars to password
  if (symbolsCheck.checked) {
    // adding the chekced char to password after the true result from checked box
    allowedChars += symbols;
  }
  // Create empty password string
  let password = "";
  // Loop to build the password character by character
  for (let i = 0; i < inputValue; i++) {
    //Generate a random index number between 0 and allowedChars.length - 1
    let randomIndex = Math.floor(Math.random() * allowedChars.length);
    // Get the character at the random index position
    let randomChar = allowedChars[randomIndex];
    // adding to password
    password += randomChar;
  }
  // showing the genrated password to user
  passwordOutput.textContent = password;
}
// a eventListner for button to listen and call the functhion
generateBtn.addEventListener("click", generatePassword);
// a async funtcion to copy the value 
async function copyPassword() {
    let copyValue =   passwordOutput.textContent
     // Validation
    if (copyValue === "" || copyValue === "Click Generate to create password") {
        alert("The Value is Empty");
        return;
    }
    
    // Copy to clipboard  wait for this to finish
    await navigator.clipboard.writeText(copyValue)
    // changing the button to show its copied
    copyBtn.textContent = "Copied"
    // a settimeout so get back the prevoius button text after timer
    setTimeout(function() {
    copyBtn.textContent = "Copy"
}, 2000);
}
// a eventListner for button to listen and call the functhion
copyBtn.addEventListener('click',copyPassword )