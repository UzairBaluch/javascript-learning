// ============================================
// TODO APP
// ============================================

// DOM ELEMENTS - Get input field, add button, and todo list container
const todoInput = document.getElementById("todoInput");
const btnSubmit = document.getElementById("addBtn");
const displayTodo = document.getElementById("todoList");

// ADD TODO - Create new todo item on button click
btnSubmit.addEventListener("click", () => {
  const val = todoInput.value.trim();

  // Prevent adding empty todos
  if (val === "") {
    return;
  }

  // Create list item
  const newLi = document.createElement("li");

  // Create complete button
  const addBtn = document.createElement("button");
  addBtn.addEventListener("click", () => {
    newLi.classList.toggle("completed");
  });
  addBtn.textContent = "✓";

  // Create delete button
  const dltBtn = document.createElement("button");
  dltBtn.addEventListener("click", () => {
    newLi.remove();
  });
  dltBtn.textContent = "✗";

  // Assemble todo item
  newLi.textContent = val;
  newLi.appendChild(addBtn);
  newLi.appendChild(dltBtn);

  // Add to list and clear input
  displayTodo.appendChild(newLi);
  todoInput.value = "";
});
