// ============================================
// PROJECT #29: DATA TABLE SORT/FILTER
// Skills: Array methods, sorting algorithms, filtering, DOM manipulation
// ============================================

// ============================================
// EMPLOYEE DATA
// ============================================
// Array of employee objects with id, name, department, position, salary
let employees = [
  {
    id: 1,
    name: "John Doe",
    department: "Sales",
    position: "Sales Representative",
    salary: 50000,
  },
  {
    id: 2,
    name: "Jane Smith",
    department: "Marketing",
    position: "Marketing Manager",
    salary: 60000,
  },
  {
    id: 3,
    name: "Bob Johnson",
    department: "IT",
    position: "IT Specialist",
    salary: 55000,
  },
  {
    id: 4,
    name: "Alice Davis",
    department: "HR",
    position: "HR Manager",
    salary: 58000,
  },
  {
    id: 5,
    name: "Charlie Brown",
    department: "Sales",
    position: "Sales Representative",
    salary: 52000,
  },
  {
    id: 6,
    name: "Eve Green",
    department: "Marketing",
    position: "Marketing Manager",
    salary: 59000,
  },
  {
    id: 7,
    name: "Frank White",
    department: "IT",
    position: "IT Specialist",
    salary: 56000,
  },
  {
    id: 8,
    name: "Grace Black",
    department: "HR",
    position: "HR Manager",
    salary: 57000,
  },
  {
    id: 9,
    name: "Hank Green",
    department: "Sales",
    position: "Sales Representative",
    salary: 53000,
  },
  {
    id: 10,
    name: "Ivy Blue",
    department: "Marketing",
    position: "Marketing Manager",
    salary: 58000,
  },
  {
    id: 11,
    name: "Jack White",
    department: "IT",
    position: "IT Specialist",
    salary: 54000,
  },
  {
    id: 12,
    name: "Kate Black",
    department: "HR",
    position: "HR Manager",
    salary: 56000,
  },
  {
    id: 13,
    name: "Liam Green",
    department: "Sales",
    position: "Sales Representative",
    salary: 52000,
  },
  {
    id: 14,
    name: "Mia Blue",
    department: "Marketing",
    position: "Marketing Manager",
    salary: 58000,
  },
  {
    id: 15,
    name: "Noah White",
    department: "IT",
    position: "IT Specialist",
    salary: 55000,
  },
];

// ============================================
// STATE VARIABLES
// ============================================
// Track current sort column (name, department, salary)
// Track sort direction (ascending or descending)
// Store filtered results
let currentSortColumn;
let sortDirection;
let filteredResults;

// ============================================
// DOM ELEMENTS
// ============================================
// Get search input
// Get table body
// Get all sort buttons
// Get stats elements (visibleCount, totalCount)
const searchInput = document.getElementById("searchInput");
const dataTable = document.getElementById("dataTable");
const tableBody = document.getElementById("tableBody");
const stats = document.getElementById("stats");
const visibleCount = document.getElementById("visibleCount");
const totalCount = document.getElementById("totalCount");
const sortbtn = document.querySelectorAll(".sort-btn");
// ============================================
// RENDER TABLE FUNCTION
// ============================================
// Clear table body first
// Loop through data array
// For each employee:
// Create table row
// Add cells for: id, name, department, position, salary
// Format salary with $ and commas
// Append row to tbody
// If no data, show "No employees found" message
// Update stats (visible count, total count)
// ============================================
// RENDER TABLE FUNCTION
// ============================================
function renderTable(dataArray) {
  tableBody.innerHTML = "";

  if (dataArray.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5" class="no-results">No employees found</td></tr>`;
    return;
  }

  dataArray.forEach((employee) => {
    let rowHtml = `<tr>
    <td>${employee.id} </td>
      <td>${employee.name} </td>
        <td>${employee.department} </td>
          <td>${employee.position} </td>
            <td>$${employee.salary.toLocaleString("en-US")} </td>
    </tr>`;
    tableBody.innerHTML += rowHtml;
  });
  visibleCount.textContent = dataArray.length;
  totalCount.textContent = employees.length;
}

// ============================================
// SEARCH FILTER
// ============================================

// STEP 1: Listen for input event on searchInput
searchInput.addEventListener("input", (event) => {
  // STEP 2: Get search term (lowercase for case-insensitive)
  let searchTerm = event.target.value.toLowerCase();
  // STEP 3: Filter employees array:
  // Use .filter() method
  // Check if search term exists in:
  // name.toLowerCase() OR
  // department.toLowerCase() OR
  // position.toLowerCase()
  // Use .includes() to check if search term is in each field
  let filteredResult = employees.filter((employee) => {
    if (
      employee.name.toLowerCase().includes(searchTerm) ||
      employee.department.toLowerCase().includes(searchTerm) ||
      employee.position.toLowerCase().includes(searchTerm)
    ) {
      return true;
    }
  });
  // STEP 4: Call renderTable with filtered results
  renderTable(filteredResult);
});

// ============================================
// SORT FUNCTIONALITY
// ============================================

// STEP 1: Add click listener to each sort button (loop through sortbtn)
sortbtn.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    // STEP 2: Get which column to sort by (from data-sort attribute)
    let colName = event.target.dataset.sort;
    // STEP 3: Check if clicking same button (compare with currentSortColumn)
    // If same button: toggle sortDirection (ascending ↔ descending)
    // If different button: set sortDirection to ascending
    if (colName === currentSortColumn) {
      sortDirection = sortDirection === "asc" ? "desc" : "asc";
    } else {
      sortDirection = "asc";
    }
    // STEP 4: Update currentSortColumn to the new column
    currentSortColumn = colName;
    // STEP 5: Sort the employees array
    // Use .sort() method
    // For strings (name, department, position): compare with < and >
    // For numbers (salary): subtract (a.salary - b.salary)
    // Apply direction (reverse if descending)
    let result;
    let sortedEmployees = employees.sort((a, b) => {
      if (colName === "salary") {
        result = a.salary - b.salary;
        if (sortDirection === "desc") {
          result = result * -1;
        }
        return result;
      } else if (a[colName] < b[colName]) {
        result = -1;
      } else {
        result = 1;
      }
      if (sortDirection === "desc") {
        result = result * -1;
      }
      return result;
    });
    // STEP 6: Remove 'active' class from all buttons
    sortbtn.forEach((btn) => {
      btn.classList.remove("active");
    });
    // STEP 7: Add 'active' class to clicked button
    btn.classList.add("active");
    // STEP 8: Re-render table with sorted data
    renderTable(sortedEmployees);
  });
});

// ============================================
// INITIAL RENDER
// ============================================
// Display all employees on page load
renderTable(employees);
