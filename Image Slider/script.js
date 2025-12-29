// grab dom elems for manupilation
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const dots = document.querySelectorAll(".dot");
const sliderContainer = document.querySelector(".slider-container");
// tracking the current image
let currentImage = 0;
// a function to remove active classes from slides and dots add it to current image
function showSlide() {
  // Loop 1: Remove 'active' from all slides
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  // Loop 2: Remove 'active' from all dots
  dots.forEach((dot) => {
    dot.classList.remove("active");
  });

  // Add 'active' to current slide
  slides[currentImage].classList.add("active");

  // Add 'active' to current dot
  dots[currentImage].classList.add("active");
}
// listing for events
nextBtn.addEventListener("click", () => {
  // validtion if slides is ended so set it 0 else move to next slide
  if (slides.length - 1 === currentImage) {
    currentImage = 0;
  } else {
    currentImage++;
  }
  // calling function to update the classes
  showSlide();
});
// listing for events
prevBtn.addEventListener("click", () => {
  // validtion if current image 0 so move back else decearse by 1
  if (currentImage === 0) {
    currentImage = slides.length - 1;
  } else {
    currentImage--;
  }
  // calling function to update the classes
  showSlide();
});
// a loop to get each elem and its index
dots.forEach((dot, index) => {
  // listing for that event which dot is clicked
  dot.addEventListener("click", () => {
    // set the currant image to that index
    currentImage = index;
    // calling function to update the classes
    showSlide();
  });
});
// a auto play timer for slider to play
let autoPlay = setInterval(() => {
  // validtion if slides is ended so set it 0 else move to next slide
  if (slides.length - 1 === currentImage) {
    currentImage = 0;
  } else {
    currentImage++;
  }
  // calling function to update the classes
  showSlide();
}, 3000);
// listing for events on mouseenter to stop the slide
sliderContainer.addEventListener("mouseenter", () => {
    // stoping  slider 
  clearInterval(autoPlay);
});
// listing for events on mouseleave to start the slide
sliderContainer.addEventListener("mouseleave", () => {
  autoPlay = setInterval(() => {
    // validtion if slides is ended so set it 0 else move to next slide
    if (slides.length - 1 === currentImage) {
      currentImage = 0;
    } else {
      currentImage++;
    }
    // calling function to update the classes
    showSlide();
  }, 3000);
});
