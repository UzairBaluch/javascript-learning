// Grab DOM eleme
const formTitle = document.getElementById("form-title");
const noteTitle = document.getElementById("note-title");
const noteContent = document.getElementById("note-content");
const saveBtn = document.getElementById("save-btn");
const notesContainer = document.getElementById("notes-container");
// Global array to store all notes
let notes = [];
// global var for edit notes
let editingId = null

// Function to save notes array to localStorage
function saveToLocalStorage() {
  // Convert notes array to JSON string
  let notesItem = JSON.stringify(notes);
  // Save to localStorage with key 'notes'
  localStorage.setItem("notes", notesItem);
}
// Function to get notes data from localStorage
function loadFromLocalStorage() {
  // get notes data
  let notesItem = localStorage.getItem("notes");
  // validation to check its null or not
  if (notesItem === null) {
    return [];
  } else {
    // return the parse data
    return JSON.parse(notesItem);
  }
}
//Function to create notes
function displayNotes() {
  // set notes innerhtml to empty
  notesContainer.innerHTML = "";
  // validation if its empty to show a message
  if (notes.length === 0) {
    notesContainer.innerHTML =
      "<p class='empty-state'>📝 No notes yet. Add your first note!</p>";

    return;
  }
  // a foreach to create elems
  notes.forEach((note) => {
    let noteCard = document.createElement("div");
    // adding css class for style
    noteCard.classList.add("note-card");
    // create new elems with classname and id
    noteCard.innerHTML = `
    <h3>${note.title}</h3>
    <p>${note.content}</p>
    <div class="note-buttons">
        <button class="edit-btn" data-id="${note.id}">Edit</button>
<button class="delete-btn" data-id="${note.id}">Delete</button>
    </div>
`;
    // set to the ui
    notesContainer.appendChild(noteCard);
  });
}
// Function to add or update notes
function addOrUpdateNote() {
  // get values and store in var
  let title = noteTitle.value;
  let content = noteContent.value;
  // validation to check if they are empty to show an alert
  if (title.trim() === "" || content.trim() === "") {
    alert("Please fill in both title and content!");
    return;
  }
  // validation to check if ist not nll
  if (editingId !== null) {
    // finding the id
    let noteToEdit = notes.find((note) => note.id === editingId);
    // seting the title and content
    noteToEdit.title = title;
    noteToEdit.content = content;
    // set again to null
    editingId = null;
    // update to add new note & save note
    formTitle.textContent = "Add New Note";
    saveBtn.textContent = "Save Note";
  } else {
    // object to get unique id and set title to tilte and content to content
    let newNote = {
      id: Date.now(),
      title: title,
      content: content,
    };
    // add to notes array
    notes.push(newNote);
  }
  // call funcs
  saveToLocalStorage();
  displayNotes();
  // update to empty strings
  noteTitle.value = "";
  noteContent.value = "";
}

// a function to edit notes
function editNote(id) {
  // find the unique id store it in var
  let findTheNote = notes.find((note) => note.id === id);
  // set note Title and content to found title and content
  noteTitle.value = findTheNote.title;
  noteContent.value = findTheNote.content;
  // updateing the buttons
  formTitle.textContent = "Edit Note";
  saveBtn.textContent = "Update Note";
  // set editing id to found note id
  editingId = findTheNote.id;
}

// a function to delete notes
function deleteNote(id) {
  // filtering the note which wanna delete with id
  notes = notes.filter((note) => note.id !== id);
  // call funcs
  saveToLocalStorage();
  displayNotes();
}
// listen to save btuuton clicks and call the func
saveBtn.addEventListener("click", addOrUpdateNote);
// adding a eventlsitner to parent pass the arg e
notesContainer.addEventListener("click", (e) => {
    // validtion if the edit button is clicked
  if (e.target.classList.contains("edit-btn")) {
    // add the id to new var
    let noteId = Number(e.target.dataset.id);
    // call the func and pass the id num
    editNote(noteId)
  }
  // validtion if the delete button is clicked
  if (e.target.classList.contains("delete-btn")) {
      // add the id to new var
    let noteId = Number(e.target.dataset.id);
    // call the func and pass the id num
    deleteNote(noteId)
  }
});
// loading the notes from localstorage 
notes = loadFromLocalStorage()
// updateing to ui
displayNotes()