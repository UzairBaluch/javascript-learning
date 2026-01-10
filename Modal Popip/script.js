// ============================================
// MODAL/POPUP
// ============================================

// DOM ELEMENTS - Get modal overlay, buttons, and controls
const modalOverlay = document.querySelector(".modal-overlay");
const closeBtn = document.querySelector(".close-btn");
const openModalBtn = document.querySelector(".open-modal-btn");

// OPEN MODAL - Show modal and prevent background scrolling
openModalBtn.addEventListener("click", () => {
  modalOverlay.classList.add("active");
  document.body.classList.add("modal-open");
});

// CLOSE BUTTON - Hide modal and restore scrolling
closeBtn.addEventListener("click", () => {
  modalOverlay.classList.remove("active");
  document.body.classList.remove("modal-open");
});

// CLICK OUTSIDE - Close modal when clicking on overlay background
modalOverlay.addEventListener("click", (event) => {
  if (event.target === modalOverlay) {
    modalOverlay.classList.remove("active");
    document.body.classList.remove("modal-open");
  }
});

// ESCAPE KEY - Close modal when Escape key is pressed
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    modalOverlay.classList.remove("active");
    document.body.classList.remove("modal-open");
  }
});
