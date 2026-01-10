// ============================================
// MULTI-STEP FORM WITH VALIDATION
// ============================================

// DOM ELEMENTS - Get form, steps, inputs, and controls
const multiStepForm = document.getElementById("multiStepForm");
const formStep = document.querySelectorAll(".form-step");
const buttonGroup = document.querySelectorAll(".button-group");
const stepIndicator = document.querySelectorAll(".step-indicator");
const progressBar = document.getElementById("progressBar");

// Input fields
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const address = document.getElementById("address");
const city = document.getElementById("city");
const postalCode = document.getElementById("postalCode");

// Error message elements
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const addressError = document.getElementById("addressError");
const cityError = document.getElementById("cityError");
const postalError = document.getElementById("postalError");

// Buttons
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");

// Summary and success message
const summary = document.getElementById("summary");
const successMessage = document.getElementById("successMessage");

// STATE VARIABLE - Track current step (1-3)
let steps = 1;

// VALIDATION FUNCTIONS - Verify input field data
function validateName(name) {
  return name.trim() !== "" && name.trim().length >= 2;
}

function validateEmail(email) {
  return (
    email.trim() !== "" &&
    email.includes("@") &&
    email.includes(".") &&
    email.indexOf("@") < email.indexOf(".")
  );
}

function validatePhone(phone) {
  const digitsOnly = phone.replace(/[^0-9]/g, "");
  return digitsOnly !== "" && digitsOnly.length >= 10;
}

function validateField(field) {
  return field.trim() !== "";
}

// ERROR DISPLAY - Show/hide error messages
function showError(input, errorElement) {
  input.classList.add("error");
  errorElement.classList.add("show");
}

function hideError(input, errorElement) {
  input.classList.remove("error");
  errorElement.classList.remove("show");
}

// VALIDATE STEP - Check all fields in current step
function validateStep(step) {
  let isValid = true;

  if (step === 1) {
    // Step 1: Personal information
    if (validateName(fullName.value)) {
      hideError(fullName, nameError);
    } else {
      showError(fullName, nameError);
      isValid = false;
    }

    if (validateEmail(email.value)) {
      hideError(email, emailError);
    } else {
      showError(email, emailError);
      isValid = false;
    }

    if (validatePhone(phone.value)) {
      hideError(phone, phoneError);
    } else {
      showError(phone, phoneError);
      isValid = false;
    }
  } else if (step === 2) {
    // Step 2: Address information
    if (validateField(address.value)) {
      hideError(address, addressError);
    } else {
      showError(address, addressError);
      isValid = false;
    }

    if (validateField(city.value)) {
      hideError(city, cityError);
    } else {
      showError(city, cityError);
      isValid = false;
    }

    if (validateField(postalCode.value)) {
      hideError(postalCode, postalError);
    } else {
      showError(postalCode, postalError);
      isValid = false;
    }
  }

  return isValid;
}

// UPDATE UI - Display correct step and update indicators
function updateStepUI() {
  // Show current step
  formStep.forEach((step, index) => {
    step.classList.remove("active");
    if (index === steps - 1) {
      step.classList.add("active");
    }
  });

  // Update step indicators
  stepIndicator.forEach((circle) => {
    circle.classList.remove("active", "completed");
    let circleNumber = Number(circle.dataset.step);

    if (circleNumber < steps) {
      circle.classList.add("completed");
    } else if (circleNumber === steps) {
      circle.classList.add("active");
    }
  });

  // Update progress bar
  progressBar.className = "progress-bar";
  progressBar.classList.add(`step-${steps}`);

  // Show/hide navigation buttons based on current step
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

// NAVIGATE TO NEXT STEP - Validate and move forward
function goToNextStep() {
  if (validateStep(steps)) {
    steps++;
    if (steps === 3) {
      generateSummary();
    }
    updateStepUI();
  }
}

// NAVIGATE TO PREVIOUS STEP - Move backward
function goToPrevStep() {
  steps--;
  updateStepUI();
}

// GENERATE SUMMARY - Display all entered data for review
function generateSummary() {
  let htmlString = `
    <div class="summary-item">
      <span class="summary-label">Full Name:</span>
      <span class="summary-value">${fullName.value}</span>
    </div>
    <div class="summary-item">
      <span class="summary-label">Email:</span>
      <span class="summary-value">${email.value}</span>
    </div>
    <div class="summary-item">
      <span class="summary-label">Phone:</span>
      <span class="summary-value">${phone.value}</span>
    </div>
    <div class="summary-item">
      <span class="summary-label">Address:</span>
      <span class="summary-value">${address.value}</span>
    </div>
    <div class="summary-item">
      <span class="summary-label">City:</span>
      <span class="summary-value">${city.value}</span>
    </div>
    <div class="summary-item">
      <span class="summary-label">Postal Code:</span>
      <span class="summary-value">${postalCode.value}</span>
    </div>
  `;
  summary.innerHTML = htmlString;
}

// HANDLE SUBMIT - Show success message
function handleSubmit() {
  multiStepForm.style.display = "none";
  buttonGroup.forEach((btn) => {
    btn.style.display = "none";
  });
  successMessage.classList.add("show");
}

// EVENT LISTENERS - Attach button click handlers
nextBtn.addEventListener("click", goToNextStep);
prevBtn.addEventListener("click", goToPrevStep);
submitBtn.addEventListener("click", handleSubmit);

// INITIALIZE - Show first step on page load
updateStepUI();
