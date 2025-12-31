// Select all accordion header buttons to add click functionality
const accordionHeaders = document.querySelectorAll(".accordion-header");

// Loop through each header and attach click event listener
accordionHeaders.forEach((menu) => {
  // When header is clicked, toggle accordion section open/closed
  menu.addEventListener("click", () => {
    // Get the content div that comes right after the clicked header (nextElementSibling)
    const content = menu.nextElementSibling;
    
    // Close all accordion items first by removing 'active' class from headers and content
    // This ensures only one section is open at a time (professional accordion behavior)
    accordionHeaders.forEach((header) => {
      header.classList.remove("active");
      header.nextElementSibling.classList.remove("active");
    });

    // Toggle 'active' class on clicked item - opens if closed, closes if already open
    menu.classList.toggle("active");
    content.classList.toggle("active");
  });
});