// Select all tabs and content  to add click functionality
const tabs = document.querySelectorAll(".tab");
const content = document.querySelectorAll(".content");
// Loop through each tab and attach click event listener index for matching which one is clicked
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    // a loop on each elem to remove 'active' class from tabs
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
    // add a active class on each elem
    tab.classList.add("active");
    // a loop on each elem to remove 'active' class from content
    content.forEach((con) => {
      con.classList.remove("active");
    });
    // add a active class on each elem that matches the index
    content[index].classList.add("active");
  });
});
