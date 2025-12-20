// Select input field, add button, and todo list container
const todoInput = document.getElementById("todoInput");
const btnSubmit = document.getElementById("addBtn");
const displayTodo = document.getElementById("todoList");

// Handle add button click - create new todo item
btnSubmit.addEventListener("click", () => {
  // Get input value and remove extra spaces
  const val = todoInput.value.trim();
  
  // Don't add empty todos
  if (val === "") {
    return;
  }

  // Create new list item for the todo
  const newLi = document.createElement("li");
  
  // Create complete button (✓)
  const addBtn = document.createElement("button");
  addBtn.addEventListener("click", () => {
    // Toggle completed class to mark todo as done
    newLi.classList.toggle("completed");
  });
  addBtn.textContent = "✓";
  
  // Create delete button (✗)
  const dltBtn = document.createElement("button");
  dltBtn.addEventListener("click", () => {
    // Remove todo from list
    newLi.remove();
  });
  dltBtn.textContent = "✗";
  
  // Add todo text and buttons to list item
  newLi.textContent = val;
  newLi.appendChild(addBtn);
  newLi.appendChild(dltBtn);
  
  // Add list item to todo list
  displayTodo.appendChild(newLi);
  
  // Clear input field for next todo
  todoInput.value = "";
});