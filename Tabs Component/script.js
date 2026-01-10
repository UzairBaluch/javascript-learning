// ============================================
// TABS COMPONENT
// ============================================

// DOM ELEMENTS - Get all tab buttons and content panels
const tabs = document.querySelectorAll(".tab");
const content = document.querySelectorAll(".content");

// TAB SWITCHING - Handle tab clicks and show corresponding content
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    // Remove active class from all tabs
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });

    // Add active class to clicked tab
    tab.classList.add("active");

    // Remove active class from all content panels
    content.forEach((con) => {
      con.classList.remove("active");
    });

    // Show content panel matching clicked tab index
    content[index].classList.add("active");
  });
});
