// ============================================
// EXPENSE TRACKER
// ============================================

// DOM ELEMENTS - Get input fields, buttons, and display containers
const description = document.getElementById("description");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const addBtn = document.getElementById("addBtn");
const filterCategory = document.getElementById("filterCategory");
const expensesList = document.getElementById("expensesList");
const totalAmount = document.querySelector(".total-amount");

// STATE VARIABLE - Store all expenses
let expenses = [];

// LOAD SAVED EXPENSES - Retrieve expenses from localStorage on page load
let savedExpenses = localStorage.getItem("expenses");
if (savedExpenses !== null) {
  expenses = JSON.parse(savedExpenses);
}

// DISPLAY EXPENSES - Render expense list to the screen
function displayExpenses(expensesToShow = expenses) {
  expensesList.innerHTML = "";

  expensesToShow.forEach((expense) => {
    expensesList.innerHTML += `
      <div class="expense-item">
        <div class="expense-info"> 
          <div class="expense-description">${expense.description}</div> 
          <div class="expense-category">${expense.category}</div>
        </div>  
        <div class="expense-amount">$${expense.amount}</div>
        <button class="delete-btn" data-id="${expense.id}">Delete</button>
      </div>`;
  });
}

// ADD EXPENSE - Create new expense and save to localStorage
addBtn.addEventListener("click", () => {
  let desc = description.value;
  let amt = Number(amount.value);
  let ctg = category.value;

  // Validate inputs
  if (desc === "") {
    alert("Description is required");
    return;
  }
  if (amt === "" || amt <= 0) {
    alert("Valid amount is required");
    return;
  }
  if (ctg === "") {
    alert("Category is required");
    return;
  }

  // Create expense object
  let expenseObj = {
    id: Date.now(),
    description: desc,
    amount: amt,
    category: ctg,
  };

  // Add to array and save
  expenses.push(expenseObj);
  localStorage.setItem("expenses", JSON.stringify(expenses));

  // Clear inputs
  description.value = "";
  amount.value = "";
  category.value = "";

  // Update display
  displayExpenses();
  calculateTotal();
});

// CALCULATE TOTAL - Sum all expense amounts
function calculateTotal() {
  const total = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  totalAmount.textContent = `$${total.toFixed(2)}`;
}

// DELETE EXPENSE - Remove expense when delete button clicked
expensesList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const expenseId = Number(e.target.dataset.id);

    // Filter out deleted expense
    expenses = expenses.filter((expense) => expense.id !== expenseId);

    // Save and update display
    localStorage.setItem("expenses", JSON.stringify(expenses));
    displayExpenses();
    calculateTotal();
  }
});

// FILTER BY CATEGORY - Show expenses for selected category
filterCategory.addEventListener("change", () => {
  const selectedCategory = filterCategory.value;

  if (selectedCategory === "All") {
    displayExpenses();
  } else {
    const filtered = expenses.filter(
      (expense) => expense.category === selectedCategory
    );
    displayExpenses(filtered);
  }

  calculateTotal();
});

// INITIAL RENDER - Display expenses and total on page load
displayExpenses();
calculateTotal();
