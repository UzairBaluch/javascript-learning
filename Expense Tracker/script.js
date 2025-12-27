// grab elements for manupilation
const description = document.getElementById("description");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const addBtn = document.getElementById("addBtn");
const filterCategory = document.getElementById("filterCategory");
const expensesList = document.getElementById("expensesList");
const totalAmount = document.querySelector(".total-amount");
// an empty arrray for epenses
let expenses = [];
// getting saved data from localstorage
let checkingSavedData = localStorage.getItem("expenses");
// validtion if there is any saved data if found the parse it back to array from
if (checkingSavedData !== null) {
  expenses = JSON.parse(checkingSavedData);
}
// a function to display expenses
function displayExpenses(expensesToShow = expenses) {
  // seting the conatiner to empty
  expensesList.innerHTML = "";
  // a loop to create new elems
  expensesToShow.forEach((e) => {
    expensesList.innerHTML += `<div class="expense-item">

    <div class="expense-info"> 
    <div class="expense-description"> 
    ${e.description}
    </div> 
     <div class="expense-category"> 
    ${e.category}
    </div>
    </div>  
    
    <div class="expense-amount">
    $${e.amount} </div>
    <button class="delete-btn" data-id="${e.id}"> Delete
     </button>

    </div>`;
  });
}
// adding functnality to button
addBtn.addEventListener("click", () => {
  // getting from inputs
  let desc = description.value;
  let amt = Number(amount.value);
  let ctg = category.value;
  // validtion if they are empty or not with an alert
  if (desc === "") {
    alert("description is empty");
    return;
  }
  if (amt === "") {
    alert("amount is empty");
    return;
  }
  if (ctg === "") {
    alert("category is empty");
    return;
  }
  // an object structer
  let expenseObj = {
    id: Date.now(),
    description: desc,
    amount: amt,
    category: ctg,
  };
  // adding to array
  expenses.push(expenseObj);
  // saving in localstorage after conversion
  localStorage.setItem("expenses", JSON.stringify(expenses));
  // seting inputs empty for new ones
  description.value = "";
  amount.value = "";
  category.value = "";
  // calling the func
  displayExpenses();
  calculateTotal();
});

// a function to calculate
function calculateTotal() {
  //  Calculate reduce returns a single number
  const total = expenses.reduce((total, expense) => {
    return total + expense.amount;
  }, 0);

  //  update it AFTER reduce is done OUTSIDE of it
  totalAmount.textContent = `$${total.toFixed(2)}`;
}
// adding functnality to button
expensesList.addEventListener("click", (e) => {
  // validation which button is clicked
  if (e.target.classList.contains("delete-btn")) {
    // conver into number assign to var
    const expenseId = Number(e.target.dataset.id);
    // filtering the clicked elem
    expenses = expenses.filter((expense) => expense.id !== expenseId);
    // saving in localstorage after conversion
    localStorage.setItem("expenses", JSON.stringify(expenses));
    // calling the func
    displayExpenses();
    calculateTotal();
  }
});
// adding functnality to category
filterCategory.addEventListener("change", () => {
  // select the category vaalue from input
  const selectedCategory = filterCategory.value;
  // valdation to the if all are slected
  if (selectedCategory === "All") {
    displayExpenses();  // Shows all expenses
  } else {
    // filtring the selected ones
    const filtered = expenses.filter(expense => expense.category === selectedCategory);
    displayExpenses(filtered);  // Shows only matching category
  }
});
// calling the func
displayExpenses();
calculateTotal();
