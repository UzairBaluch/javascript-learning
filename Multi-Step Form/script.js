// ============================================
// STEP 1: GET ALL DOM ELEMENTS
// ============================================
// Get the form element
// Get all form step divs (use querySelectorAll with data-step attribute)
const multiStepForm = document.getElementById("multiStepForm");
const formStep = document.querySelectorAll(".form-step");
const buttonGroup = document.querySelectorAll(".button-group");
// Get all step indicator circles
const stepIndicator = document.querySelectorAll(".step-indicator");
// Get the progress bar
const progressBar = document.getElementById("progressBar");
// Get all input fields (fullName, email, phone, address, city, postalCode)
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const address = document.getElementById("address");
const city = document.getElementById("city");
const postalCode = document.getElementById("postalCode");
// Get all error message spans
const errorMessage = document.querySelectorAll(".error-message");
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const addressError = document.getElementById("addressError");
const cityError = document.getElementById("cityError");
const postalError = document.getElementById("postalError");
// Get all buttons (prevBtn, nextBtn, submitBtn)
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
// Get summary div and success message div
const summary = document.getElementById("summary");
const successMessage = document.getElementById("successMessage");
// ============================================
// STEP 2: CREATE STATE VARIABLES
// ============================================
// Create a variable to track current step (starts at 1)
let steps = 1;

// ============================================
// STEP 3: VALIDATION FUNCTIONS
// ============================================

// Function: validateName(name)
// - Check if name is not empty
// - Check if name has at least 2 characters
// - Return true if valid, false if not
function validateName(name) {
  if (name.trim() !== "" && name.trim().length >= 2) {
    return true;
  } else {
    return false;
  }
}
// Function: validateEmail(email)
// - Check if email is not empty
// - Check if email contains "@" and "."
// - Check if "@" comes before "."
// - Return true if valid, false if not

function validateEmail(email) {
  if (
    email.trim() !== "" &&
    email.includes("@") &&
    email.includes(".") &&
    email.indexOf("@") < email.indexOf(".")
  ) {
    return true;
  } else {
    return false;
  }
}
// Function: validatePhone(phone)
// - Check if phone is not empty
// - Remove all non-digit characters for checking
// - Check if it has at least 10 digits
// - Return true if valid, false if not
function validatePhone(phone) {
  const digitsOnly = phone.replace(/[^0-9]/g, "");
  if (digitsOnly !== "" && digitsOnly.length >= 10) {
    return true;
  } else {
    return false;
  }
}

// Function: validateField(field)
// - Just check if field is not empty
// - Return true if valid, false if not
function validateField(field) {
  if (field.trim() !== "") {
    return true;
  } else {
    return false;
  }
}
// ============================================
// STEP 4: SHOW/HIDE ERROR MESSAGES
// ============================================

// Function: showError(input, errorElement)
// - Add "error" class to input
// - Add "show" class to error message
// - Make error message visible
function showError(input, errorElement) {
  input.classList.add("error");
  errorElement.classList.add("show");
}
// Function: hideError(input, errorElement)
// - Remove "error" class from input
// - Remove "show" class from error message
// - Hide error message
function hideError(input, errorElement) {
  input.classList.remove("error");
  errorElement.classList.remove("show");
}
// ============================================
// STEP 5: VALIDATE EACH STEP
// ============================================

// Function: validateStep(step)
// This function validates all fields in the current step
// - If step is 1: validate name, email, phone
// - If step is 2: validate address, city, postal code
// - For each field:
//   - Get the field value
//   - Run the appropriate validation function
//   - If invalid: show error, set isValid to false
//   - If valid: hide error
// - Return true if all fields valid, false if any invalid
function validateStep(step) {
  let isValid = true; // Start assuming everything is valid

  if (step === 1) {
    // Validate fullName
    if (validateName(fullName.value)) {
      hideError(fullName, nameError);
    } else {
      showError(fullName, nameError);
      isValid = false;
    }

    // Validate email
    if (validateEmail(email.value)) {
      hideError(email, emailError);
    } else {
      showError(email, emailError);
      isValid = false;
    }

    // Validate phone
    if (validatePhone(phone.value)) {
      hideError(phone, phoneError);
    } else {
      showError(phone, phoneError);
      isValid = false;
    }
  } else if (step === 2) {
    // Validate address
    // (same pattern with validateField)
    if (validateField(address.value)) {
      hideError(address, addressError);
    } else {
      showError(address, addressError);
      isValid = false;
    }
    // Validate city
    // (same pattern with validateField)
    if (validateField(city.value)) {
      hideError(city, cityError);
    } else {
      showError(city, cityError);
      isValid = false;
    }
    // Validate postalCode
    // (same pattern with validateField)
    if (validateField(postalCode.value)) {
      hideError(postalCode, postalError);
    } else {
      showError(postalCode, postalError);
      isValid = false;
    }
  }

  return isValid;
}
// ============================================
// STEP 6: UPDATE UI FOR CURRENT STEP
// ============================================

// Function: updateStepUI()
// This function shows the correct step and updates visual indicators
// - Hide all form steps
// - Show the current step (add "active" class)
// - Update step indicators (circles):
//   - Mark completed steps with "completed" class
//   - Mark current step with "active" class
//   - Remove classes from future steps
// - Update progress bar (change class to "step-1", "step-2", or "step-3")
// - Show/hide buttons based on current step:
//   - Step 1: Hide prev, show next, hide submit
//   - Step 2: Show prev, show next, hide submit
//   - Step 3: Show prev, hide next, show submit

function updateStepUI() {
  formStep.forEach((step) => {
    step.classList.remove("active");
    formStep[steps - 1].classList.add("active");
  });
  stepIndicator.forEach((circle) => {
    circle.classList.remove("active");
    circle.classList.remove("completed");
    let circleNumber = Number(circle.dataset.step);
    if (circleNumber < steps) {
      circle.classList.add("completed");
    } else if (circleNumber === steps) {
      circle.classList.add("active");
    } else {
    }
  });
  progressBar.classList.remove("class1", "class2", "class3");
  if (steps === 1) {
    progressBar.classList.add("step-1");
  } else if (steps === 2) {
    progressBar.classList.add("step-2");
  } else {
    progressBar.classList.add("step-3");
  }
  if (steps === 1) {
    prevBtn.style.display = "none";
    nextBtn.style.display = "block";
    submitBtn.style.display = "none";
  } else if (steps === 2) {
    prevBtn.style.display = "block";
    nextBtn.style.display = "block";
    submitBtn.style.display = "none";
  } else {
    prevBtn.style.display = "block";
    nextBtn.style.display = "none";
    submitBtn.style.display = "block";
  }
}

// ============================================
// STEP 7: NAVIGATION FUNCTIONS
// ============================================

// Function: goToNextStep()
// - Validate current step first
// - If validation passes:
//   - Increase currentStep by 1
//   - If now on step 3: generate summary
//   - Update the UI

function goToNextStep() {
  let returnValue = validateStep(steps);
  if (returnValue !== false) {
    steps++;
    if (steps === 3) {
      generateSummary();
    }
    updateStepUI();
  }
}

// Function: goToPrevStep()
// - Decrease currentStep by 1
// - Update the UI
function goToPrevStep() {
  steps--;
  updateStepUI();
}

// ============================================
// STEP 8: GENERATE SUMMARY
// ============================================

// Function: generateSummary()
// - Get all input values
// - Create HTML string with all the data in summary format:
//   - Full Name: [value]
//   - Email: [value]
//   - Phone: [value]
//   - Address: [value]
//   - City: [value]
//   - Postal Code: [value]
// - Use the .summary-item, .summary-label, .summary-value classes
// - Put the HTML into the summary div
function generateSummary() {
  let inputFullName = fullName.value;
  let inputEmail = email.value;
  let inputPhone = phone.value;
  let inputAdress = address.value;
  let inputCity = city.value;
  let inputPostal = postalCode.value;
  let htmlString = `
    <div class="summary-item">
        <span class="summary-label">Full Name:</span>
        <span class="summary-value">${inputFullName}</span>
    </div>
     <div class="summary-item">
        <span class="summary-label">Email:</span>
        <span class="summary-value">${inputEmail}</span>
    </div>
     <div class="summary-item">
        <span class="summary-label">Phone:</span>
        <span class="summary-value">${inputPhone}</span>
    </div>
     <div class="summary-item">
        <span class="summary-label">Address:</span>
        <span class="summary-value">${inputAdress}</span>
    </div>
     <div class="summary-item">
        <span class="summary-label">City:</span>
        <span class="summary-value">${inputCity}</span>
    </div>
     <div class="summary-item">
        <span class="summary-label">Postal Code:</span>
        <span class="summary-value">${inputPostal}</span>
    </div> 
    `;
  summary.innerHTML = htmlString;
}
// ============================================
// STEP 9: FORM SUBMISSION
// ============================================

// Function: handleSubmit()
// - Hide the form
// - Hide the button group
// - Show the success message
// - Optional: console.log all the form data
function handleSubmit() {
  multiStepForm.style.display = "none";
  buttonGroup.forEach((btn) => {
    btn.style.display = "none";
  });
  successMessage.classList.add("show");
}

// ============================================
// STEP 10: EVENT LISTENERS
// ============================================

// Add click listener to Next button
// - Calls goToNextStep()
nextBtn.addEventListener("click", goToNextStep);
// Add click listener to Previous button
// - Calls goToPrevStep()
prevBtn.addEventListener("click", goToPrevStep);

// Add click listener to Submit button
// - Calls handleSubmit()
submitBtn.addEventListener("click", handleSubmit);
// ============================================
// STEP 11: INITIALIZE
// ============================================

// Call updateStepUI() to show the first step when page loads
updateStepUI();
