// ============================================
// IMAGE SLIDER
// ============================================

// DOM ELEMENTS - Get slides, buttons, dots, and container
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const dots = document.querySelectorAll(".dot");
const sliderContainer = document.querySelector(".slider-container");

// STATE VARIABLE - Track current slide index
let currentImage = 0;

// SHOW SLIDE - Update active classes for current slide and dot
function showSlide() {
  // Remove active class from all slides and dots
  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  // Add active class to current slide and dot
  slides[currentImage].classList.add("active");
  dots[currentImage].classList.add("active");
}

// NEXT BUTTON - Move to next slide (loop back to start if at end)
nextBtn.addEventListener("click", () => {
  currentImage = currentImage === slides.length - 1 ? 0 : currentImage + 1;
  showSlide();
});

// PREVIOUS BUTTON - Move to previous slide (loop to end if at start)
prevBtn.addEventListener("click", () => {
  currentImage = currentImage === 0 ? slides.length - 1 : currentImage - 1;
  showSlide();
});

// DOT NAVIGATION - Jump to specific slide when dot clicked
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentImage = index;
    showSlide();
  });
});

// AUTO PLAY - Automatically advance slides every 3 seconds
let autoPlay = setInterval(() => {
  currentImage = currentImage === slides.length - 1 ? 0 : currentImage + 1;
  showSlide();
}, 3000);

// PAUSE ON HOVER - Stop auto play when mouse enters slider
sliderContainer.addEventListener("mouseenter", () => {
  clearInterval(autoPlay);
});

// RESUME ON LEAVE - Restart auto play when mouse leaves slider
sliderContainer.addEventListener("mouseleave", () => {
  autoPlay = setInterval(() => {
    currentImage = currentImage === slides.length - 1 ? 0 : currentImage + 1;
    showSlide();
  }, 3000);
});
