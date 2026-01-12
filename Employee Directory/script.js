// ==========================================
// PROJECT 31: EMPLOYEE DIRECTORY WITH SEARCH
// ==========================================
// Features: Real-time search, department filtering, dynamic display
// Built by: Uzair | Date: January 13, 2026
// Learning Focus: Array filtering, event handling, reusable functions
// ==========================================

// ==========================================
// DATA: Employee Information
// ==========================================
// Array of objects - each employee has name, department, and email
// Using objects because we need MULTIPLE properties per employee
const employees = [
  {
    name: "Ahmed Al-Rashid",
    department: "Sales",
    email: "ahmed@company.com",
  },
  {
    name: "Mehwish Hayat",
    department: "CEO",
    email: "mehwish@company.com",
  },
  {
    name: "Arooj Imran",
    department: "CTO",
    email: "arooj@company.com",
  },
  {
    name: "Iqra Yasir",
    department: "Sales",
    email: "iqra@company.com",
  },
  {
    name: "Bisma Sheikh",
    department: "Marketing",
    email: "bisma@company.com",
  },
  {
    name: "Tabsum Bilal",
    department: "HR",
    email: "tabsum@company.com",
  },
  {
    name: "Fatima Ameen",
    department: "IT",
    email: "fatima@company.com",
  },
  {
    name: "Anum Ali",
    department: "Sales",
    email: "anum@company.com",
  },
  {
    name: "Amna Qadir",
    department: "Marketing",
    email: "amna@company.com",
  },
  {
    name: "Ayesha Usman",
    department: "HR",
    email: "ayesha@company.com",
  },
];

// ==========================================
// DOM ELEMENTS: Get references to HTML elements
// ==========================================
// Search box - listens for typing (input event)
const searchInput = document.getElementById("searchInput");

// Department dropdown - listens for selection change (change event)
const departmentFilter = document.querySelector(".filter-dropdown");

// Container where employee cards will be displayed
const employeeList = document.getElementById("employeeList");

// ==========================================
// FUNCTION: Display Employees
// ==========================================
// Purpose: Takes an array of employees and displays them as cards
// Parameter: employees - can be full array OR filtered array
// Used by: Initial load AND after filtering
function displayEmployee(employees) {
  // Step 1: Clear old employee cards (set to empty)
  employeeList.innerHTML = "";

  // Step 2: Loop through each employee in the array
  employees.forEach((employee) => {
    // Create parent card element
    let card = document.createElement("div");
    card.classList.add("employee-card"); // Add styling class

    // Create name element
    let nameDiv = document.createElement("div");
    nameDiv.classList.add("employee-name"); // Add styling class
    nameDiv.textContent = employee.name; // Set the employee's name

    // Create department element
    let deptDiv = document.createElement("div");
    deptDiv.classList.add("employee-department"); // Add styling class
    deptDiv.textContent = employee.department; // Set the employee's department

    // Create email element
    let emailDiv = document.createElement("div");
    emailDiv.classList.add("employee-email"); // Add styling class
    emailDiv.textContent = employee.email; // Set the employee's email

    // Step 3: Add all child elements (name, dept, email) to the card
    card.append(nameDiv, deptDiv, emailDiv);

    // Step 4: Add the complete card to the employee list container
    employeeList.appendChild(card);
  });
}

// ==========================================
// FUNCTION: Filter Employees
// ==========================================
// Purpose: Filter employees based on search text AND department selection
// Called by: Both search input AND department dropdown
// This is a REUSABLE function (DRY principle - Don't Repeat Yourself!)
function filterEmploye() {
  // Get current search value and convert to lowercase for case-insensitive search
  const searchValue = searchInput.value.toLowerCase();

  // Get current department selection (could be "all" or specific department)
  const departmentValue = departmentFilter.value;

  // Filter the employees array based on TWO conditions:
  // 1. Name must INCLUDE the search text (partial match, case-insensitive)
  // 2. Department must be "all" OR match the selected department
  // Logic: name matches AND (department is "all" OR department matches)
  let filteredEmployees = employees.filter((employee) => {
    return (
      employee.name.toLowerCase().includes(searchValue) && // Name contains search
      (departmentValue === "all" || employee.department === departmentValue) // Dept matches
    );
  });

  // Display the filtered results
  displayEmployee(filteredEmployees);

  // Debug: Log values to console (can be removed in production)
  console.log("Search:", searchValue);
  console.log("Department:", departmentValue);
  console.log("Filtered:", filteredEmployees);
}

// ==========================================
// EVENT LISTENERS: Detect user actions
// ==========================================
// Listen for typing in search box - fires on every keystroke
// Uses "input" event for real-time search (better than "keyup")
searchInput.addEventListener("input", filterEmploye);

// Listen for dropdown selection change
// Uses "change" event because dropdown only changes on selection
departmentFilter.addEventListener("change", filterEmploye);

// ==========================================
// INITIALIZATION: Display all employees when page loads
// ==========================================
displayEmployee(employees);

// ==========================================
// KEY LEARNINGS FROM THIS PROJECT:
// ==========================================
// 1. Array of objects for multiple properties per item
// 2. .filter() for creating filtered arrays
// 3. .includes() for partial string matching
// 4. .toLowerCase() for case-insensitive comparison
// 5. Combining conditions with && (AND) and || (OR)
// 6. Creating reusable functions (DRY principle)
// 7. Different events: "input" vs "change"
// 8. createElement pattern with nested elements
// 9. Clearing container before adding new content
// 10. Real-time filtering (updates as user types!)
// ==========================================
