// ============================================
// PROJECT #28: SEARCH WITH DEBOUNCING
// By: Uzair | Date: January 9, 2026
// Job-Relevant: 9/10 - Performance optimization!
// ============================================

// Sample user database (20 users)
const users = [
  { id: 1, name: "Ahmad Hassan", email: "ahmad@email.com" },
  { id: 2, name: "Fatima Khan", email: "fatima@email.com" },
  { id: 3, name: "Ali Raza", email: "ali@email.com" },
  { id: 4, name: "Zainab Ahmed", email: "zainab@email.com" },
  { id: 5, name: "Omar Farooq", email: "omar@email.com" },
  { id: 6, name: "Ayesha Malik", email: "ayesha@email.com" },
  { id: 7, name: "Hassan Ali", email: "hassan@email.com" },
  { id: 8, name: "Maryam Siddiqui", email: "maryam@email.com" },
  { id: 9, name: "Ibrahim Hussain", email: "ibrahim@email.com" },
  { id: 10, name: "Amina Yousuf", email: "amina@email.com" },
  { id: 11, name: "Bilal Sheikh", email: "bilal@email.com" },
  { id: 12, name: "Hira Jamil", email: "hira@email.com" },
  { id: 13, name: "Kamran Akbar", email: "kamran@email.com" },
  { id: 14, name: "Sana Tariq", email: "sana@email.com" },
  { id: 15, name: "Asad Iqbal", email: "asad@email.com" },
  { id: 16, name: "Nida Abbas", email: "nida@email.com" },
  { id: 17, name: "Faisal Mahmood", email: "faisal@email.com" },
  { id: 18, name: "Rabia Nawaz", email: "rabia@email.com" },
  { id: 19, name: "Tariq Aziz", email: "tariq@email.com" },
  { id: 20, name: "Sara Khalid", email: "sara@email.com" },
];

// DOM ELEMENTS
const searchInput = document.getElementById("searchInput");
const totalUsers = document.getElementById("totalUsers");
const filteredCount = document.getElementById("filteredCount");
const searchCalls = document.getElementById("searchCalls");
const userList = document.getElementById("userList");

// STATE MANAGEMENT
let searchFunc = 0;
let timeOut;

// ============================================
// FUNCTION 1: displayUsers(usersToShow)
// ============================================
// This function displays the filtered users on the page
// Parameter: usersToShow - array of user objects to display

function displayUsers(usersToShow) {
  // STEP 1: Clear the existing user list
  // Set userList.innerHTML to empty string
  userList.innerHTML = "";

  // STEP 2: Check if the array is empty (no search results)
  // If usersToShow.length equals 0:
  //   - Set userList.innerHTML to a div with class "no-results"
  //   - Inside that div: add another div with class "no-results-icon" containing emoji 😔
  //   - Add a paragraph tag with text "No users found"
  //   - Update filteredCount.textContent to 0
  //   - Use return to exit the function early
  if (usersToShow.length === 0) {
    userList.innerHTML = `<div class="no-results">
    <div class="no-results-icon">😔</div>
    <p>No users found</p>
     </div>`;
    filteredCount.textContent = 0;
    return;
  }

  // STEP 3: Loop through all users in the usersToShow array
  // Use forEach() method on usersToShow array
  // For each user in the loop:

  usersToShow.forEach((user) => {
    // STEP 3A: Get the first letter of user's name
    // Use user.name.charAt(0) to get first character
    let firstLetter = user.name.charAt(0);
    // STEP 3B: Create a new list item element
    // Use document.createElement() to create "li" element
    let listItem = document.createElement("li");
    // STEP 3C: Add the "user-item" class to the list item
    // Use classList.add() method
    listItem.classList.add("user-item");
    // STEP 3D: Set the innerHTML of the list item
    // Use template literals with ${} for variables
    // Structure needed:
    // - A div with class "user-avatar" containing the first letter variable
    // - A div with class "user-info" containing:
    //   - A div with class "user-name" containing user.name
    //   - A div with class "user-email" containing user.email
    listItem.innerHTML = `
   <div class="user-avatar"> ${firstLetter} </div>
    <div class="user-info">
    <div class="user-name"> ${user.name} </div>
     <div class="user-email"> ${user.email} </div>
    </div>
   `;
    // STEP 3E: Append the list item to the userList
    // Use userList.appendChild() method
    userList.appendChild(listItem);
    // STEP 4: Update the filtered count statistic
    // Set filteredCount.textContent to usersToShow.length
  });
  filteredCount.textContent = usersToShow.length;
}

// ============================================
// FUNCTION 2: filterUsers(searchTerm)
// ============================================
// This function filters the users array based on search term
// Parameter: searchTerm - the text to search for
// Returns: filtered array of users

function filterUsers(searchTerm) {
  // STEP 1: Increment the search function call counter
  // Add 1 to searchFunc variable
  // Then update searchCalls.textContent with the new searchFunc value
  searchFunc++;
  searchCalls.textContent = searchFunc;
  // STEP 2: Convert search term to lowercase for case-insensitive search
  // Create a variable (like lowerSearch) and set it to searchTerm.toLowerCase()
  let lowerSearch = searchTerm.toLowerCase();
  // STEP 3: Handle empty search
  // If lowerSearch is empty string (length === 0 or just === ""):
  //   - Return the entire users array (show all users)
  if (lowerSearch.length === 0) {
    return users;
  }
  // STEP 4: Filter the users array
  // Use the filter() method on users array
  // Inside filter, for each user check if:
  //   - user.name.toLowerCase() includes the lowerSearch
  //   - OR (use ||) user.email.toLowerCase() includes the lowerSearch
  // The filter will return only matching users
  let filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(lowerSearch) ||
      user.email.toLowerCase().includes(lowerSearch)
    );
  });
  // STEP 5: Return the filtered array
  return filteredUsers;
}

// ============================================
// FUNCTION 3: handleSearch()
// ============================================
// This is the main search function that ties everything together
// It gets called AFTER the debounce delay

function handleSearch() {
  // STEP 1: Get the current value from the search input
  // Create a variable (like searchValue) and set it to searchInput.value
  let searchValue = searchInput.value;
  // STEP 2: Call filterUsers function with the search value
  // Store the returned filtered array in a variable (like filteredUsers)
  let filteredUsers = filterUsers(searchValue);
  // STEP 3: Call displayUsers function with the filtered array
  // Pass the filteredUsers variable to displayUsers()
  displayUsers(filteredUsers);
}

// ============================================
// FUNCTION 4: debounce(func, delay)
// ============================================
// THIS IS THE KEY CONCEPT! Creates a debounced version of any function
// Parameters:
//   - func: the function to debounce
//   - delay: how long to wait in milliseconds (we'll use 500)
// Returns: a new debounced function

function debounce(func, delay) {
  // STEP 1: Return a new function
  // This returned function is what will be called on every keystroke
  // Use: return function() { ... }
  return function () {
    // STEP 2: Clear any existing timeout
    // Use clearTimeout() on the timeOut variable
    // This cancels the previous timer when user types again
    clearTimeout(timeOut);
    // STEP 3: Set a new timeout
    // Use setTimeout() with the func and delay parameters
    // Store the setTimeout return value in timeOut variable
    // Inside setTimeout, call the func()
    // How this works:
    // - User types "j" → timeOut = setTimeout (wait 500ms)
    // - User types "a" → clearTimeout (cancel first), new setTimeout (wait 500ms)
    // - User types "v" → clearTimeout (cancel second), new setTimeout (wait 500ms)
    // - User stops typing → setTimeout completes → func() runs!
    timeOut = setTimeout(() => {
      func();
    }, delay);
  };
}

// ============================================
// EVENT LISTENERS
// ============================================

// STEP 1: Create a debounced version of handleSearch function
// Call debounce() function and pass:
//   - handleSearch as first argument
//   - 500 as second argument (500 milliseconds = 0.5 seconds)
// Store the returned function in a variable (like debouncedSearch)
let debouncedSearch = debounce(handleSearch, 500);
// STEP 2: Add event listener to search input
// Listen for "input" event on searchInput
// When input event fires, call the debouncedSearch function
searchInput.addEventListener("input", debouncedSearch);
// ============================================
// INITIAL LOAD
// ============================================

// Call displayUsers() function with the full users array
// This shows all 20 users when page first loads
displayUsers(users);
// ============================================
// END OF PROJECT #28
// Debouncing learned! Performance optimized! 🚀
// ============================================
