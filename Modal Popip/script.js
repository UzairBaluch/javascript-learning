// grab elems for manupilation
const modalOverlay = document.querySelector(".modal-overlay");
const closeBtn = document.querySelector(".close-btn");
const openModalBtn = document.querySelector(".open-modal-btn");
// listing for events
openModalBtn.addEventListener("click", () => {
  // adding active class to modalOverlay  so popup open
  modalOverlay.classList.add("active");
  // Prevents scrolling
  document.body.classList.add('modal-open');
});
// listing for events
closeBtn.addEventListener("click", () => {
  // removing active class from modalOverlay so popup close
  modalOverlay.classList.remove("active");
  // Allows scrolling
  document.body.classList.remove('modal-open');
});
// listing for events with excat target to check where clicked
modalOverlay.addEventListener("click", (events) => {
  // validation if its clicked on modalOverlay if true so we can remove the active class
  if (events.target === modalOverlay) {
    // removing active class from modalOverlay so popup close
    modalOverlay.classList.remove("active");
    // Allows scrolling
    document.body.classList.remove('modal-open');
  }

});
// listing for events on entire document
document.addEventListener('keydown', (events) => {
    // validation if its clicked on Escape if true so we can remove the active class
   if (events.key === "Escape") {
     // removing active class from modalOverlay so popup close
      modalOverlay.classList.remove("active");
      // Allows scrolling
      document.body.classList.remove('modal-open');
   }
   
})