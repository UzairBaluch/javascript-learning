// ============================================
// SEARCH WITH DEBOUNCING
// ============================================

// USER DATA - Sample database of 20 users
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

// DOM ELEMENTS - Get search input, stats, and user list
const searchInput = document.getElementById("searchInput");
const totalUsers = document.getElementById("totalUsers");
const filteredCount = document.getElementById("filteredCount");
const searchCalls = document.getElementById("searchCalls");
const userList = document.getElementById("userList");

// STATE VARIABLES - Track search function calls and timeout
let searchFunc = 0;
let timeOut;

// DISPLAY USERS - Render filtered users to the screen
function displayUsers(usersToShow) {
  userList.innerHTML = "";

  // Show empty state if no results
  if (usersToShow.length === 0) {
    userList.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">😔</div>
        <p>No users found</p>
      </div>`;
    filteredCount.textContent = 0;
    return;
  }

  // Create user card for each user
  usersToShow.forEach((user) => {
    let firstLetter = user.name.charAt(0);
    let listItem = document.createElement("li");
    listItem.classList.add("user-item");
    listItem.innerHTML = `
      <div class="user-avatar">${firstLetter}</div>
      <div class="user-info">
        <div class="user-name">${user.name}</div>
        <div class="user-email">${user.email}</div>
      </div>`;
    userList.appendChild(listItem);
  });

  filteredCount.textContent = usersToShow.length;
}

// FILTER USERS - Search users by name or email
function filterUsers(searchTerm) {
  // Track number of search calls for performance monitoring
  searchFunc++;
  searchCalls.textContent = searchFunc;

  let lowerSearch = searchTerm.toLowerCase();

  // Show all users if search is empty
  if (lowerSearch.length === 0) {
    return users;
  }

  // Filter users by name or email (case-insensitive)
  return users.filter((user) => {
    return (
      user.name.toLowerCase().includes(lowerSearch) ||
      user.email.toLowerCase().includes(lowerSearch)
    );
  });
}

// HANDLE SEARCH - Main search function called after debounce delay
function handleSearch() {
  let searchValue = searchInput.value;
  let filteredUsers = filterUsers(searchValue);
  displayUsers(filteredUsers);
}

// DEBOUNCE - Delay function execution until user stops typing
function debounce(func, delay) {
  return function () {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      func();
    }, delay);
  };
}

// DEBOUNCED SEARCH - Create debounced version with 500ms delay
let debouncedSearch = debounce(handleSearch, 500);

// SEARCH INPUT EVENT LISTENER - Call debounced search on input
searchInput.addEventListener("input", debouncedSearch);

// INITIAL LOAD - Display all users on page load
displayUsers(users);
