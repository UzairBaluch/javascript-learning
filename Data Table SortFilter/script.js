// ============================================
// DATA TABLE SORT/FILTER
// ============================================

// EMPLOYEE DATA - Array of employee objects
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

// STATE VARIABLES - Track current sort column and direction
let currentSortColumn;
let sortDirection;

// DOM ELEMENTS - Get search input, table body, sort buttons, and stats
const searchInput = document.getElementById("searchInput");
const tableBody = document.getElementById("tableBody");
const visibleCount = document.getElementById("visibleCount");
const totalCount = document.getElementById("totalCount");
const sortbtn = document.querySelectorAll(".sort-btn");

// RENDER TABLE - Display employees in table with formatted data
function renderTable(dataArray) {
  tableBody.innerHTML = "";

  // Show empty message if no employees match
  if (dataArray.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5" class="no-results">No employees found</td></tr>`;
    return;
  }

  // Create table row for each employee
  dataArray.forEach((employee) => {
    let rowHtml = `<tr>
      <td>${employee.id}</td>
      <td>${employee.name}</td>
      <td>${employee.department}</td>
      <td>${employee.position}</td>
      <td>$${employee.salary.toLocaleString("en-US")}</td>
    </tr>`;
    tableBody.innerHTML += rowHtml;
  });

  // Update stats showing visible vs total employees
  visibleCount.textContent = dataArray.length;
  totalCount.textContent = employees.length;
}

// SEARCH FILTER - Filter employees by name, department, or position
searchInput.addEventListener("input", (event) => {
  let searchTerm = event.target.value.toLowerCase();

  // Filter employees based on search term (case-insensitive)
  let filteredResult = employees.filter((employee) => {
    return (
      employee.name.toLowerCase().includes(searchTerm) ||
      employee.department.toLowerCase().includes(searchTerm) ||
      employee.position.toLowerCase().includes(searchTerm)
    );
  });

  renderTable(filteredResult);
});

// SORT FUNCTIONALITY - Sort table by clicked column
sortbtn.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    let colName = event.target.dataset.sort;

    // Toggle sort direction if same column, reset to ascending if different
    if (colName === currentSortColumn) {
      sortDirection = sortDirection === "asc" ? "desc" : "asc";
    } else {
      sortDirection = "asc";
    }
    currentSortColumn = colName;

    // Sort employees array
    let sortedEmployees = employees.sort((a, b) => {
      let result;

      // Number sorting for salary
      if (colName === "salary") {
        result = a.salary - b.salary;
      }
      // String sorting for name, department, position
      else {
        result = a[colName] < b[colName] ? -1 : 1;
      }

      // Reverse if descending order
      if (sortDirection === "desc") {
        result = result * -1;
      }

      return result;
    });

    // Update active button styling
    sortbtn.forEach((btn) => btn.classList.remove("active"));
    btn.classList.add("active");

    renderTable(sortedEmployees);
  });
});

// INITIAL RENDER - Display all employees on page load
renderTable(employees);
