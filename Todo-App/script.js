const todoInput = document.getElementById("todoInput");
const btnSubmit = document.getElementById("addBtn");
const displayTodo = document.getElementById("todoList");

btnSubmit.addEventListener("click", () => {
  const val = todoInput.value.trim();
  if (val === "") {
    return;
  }

  const newLi = document.createElement("li");
  const addBtn = document.createElement("button");
  addBtn.addEventListener("click", () => {
    newLi.classList.toggle("completed");
  });
  addBtn.textContent = "✓";
  const dltBtn = document.createElement("button");
  dltBtn.addEventListener("click", () => {
    newLi.remove();
  });
  dltBtn.textContent = "✗";
  newLi.textContent = val;
  newLi.appendChild(addBtn);
  newLi.appendChild(dltBtn);
  displayTodo.appendChild(newLi);
  todoInput.value = "";
});
