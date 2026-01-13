// Step 1: Create empty expenses array to store all expenses
let expenseArr = [];

// Array of all available expense categories
const categories = [
  "Food",
  "Transport",
  "Entertainment",
  "Shopping",
  "Bills",
  "Other",
];

// Step 2: Get all DOM elements we need
const category = document.getElementById("category"); // Category dropdown
const amount = document.getElementById("amount"); // Amount input field
const description = document.getElementById("description"); // Description input field
const addBtn = document.getElementById("addBtn"); // Add expense button
const summaryList = document.getElementById("summaryList"); // Summary section container
const expensesList = document.getElementById("expensesList"); // All expenses list container

// Step 3: Add click event listener to the add button
addBtn.addEventListener("click", addExpense);

// Step 4: Function to add a new expense
function addExpense() {
  // Get values from input fields (convert amount to number to avoid string concatenation)
  let amountValue = Number(amount.value);
  let descValue = description.value;
  let catgValue = category.value;

  // Create expense object with all the data
  let expenseobj = {
    amount: amountValue,
    description: descValue,
    category: catgValue,
  };

  // Add the new expense to our array
  expenseArr.push(expenseobj);

  // Clear all input fields after adding
  amount.value = "";
  description.value = "";
  category.value = "";

  // Update the display to show new expense
  displayExpenses();
  displaySummary();
}

// Step 5: Function to display all expenses in a list
function displayExpenses() {
  // Clear the list before displaying to avoid duplicates
  expensesList.innerHTML = "";

  // Loop through each expense and create HTML for it
  expenseArr.forEach((expense) => {
    expensesList.innerHTML += `
        <div class="expense-item">
          <div class="expense-info">
            <span class="expense-category">${expense.category}</span>
            <div class="expense-description">${expense.description}</div>
          </div>
          <div class="expense-amount">$${expense.amount}</div>
        </div>`;
  });
}

// Step 6: Function to calculate and display category totals and grand total
function displaySummary() {
  // Clear summary section before displaying
  summaryList.innerHTML = "";

  // Loop through each category to calculate its total
  categories.forEach((category) => {
    // Filter expenses that belong to this category
    let filteredCategory = expenseArr.filter((expense) => {
      return expense.category === category;
    });

    // Calculate total amount for this category using reduce
    let result = filteredCategory.reduce((total, expense) => {
      return total + expense.amount;
    }, 0); // Start from 0

    // Display category name and its total
    summaryList.innerHTML += `<div class="category-total">
  <span class="category-name">${category}</span>
  <span class="category-amount">$${result}</span>
</div>`;
  });

  // Calculate grand total of ALL expenses
  let grandTotal = expenseArr.reduce((total, expense) => {
    return total + expense.amount;
  }, 0); // Start from 0

  // Display the grand total at the bottom
  summaryList.innerHTML += `<div class="grand-total">
  <span>Grand Total</span>
  <span>$${grandTotal}</span>
</div>`;
}
