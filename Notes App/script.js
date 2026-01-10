// ============================================
// NOTES APP
// ============================================

// DOM ELEMENTS - Get form, inputs, button, and notes container
const formTitle = document.getElementById("form-title");
const noteTitle = document.getElementById("note-title");
const noteContent = document.getElementById("note-content");
const saveBtn = document.getElementById("save-btn");
const notesContainer = document.getElementById("notes-container");

// STATE VARIABLES - Store all notes and track editing
let notes = [];
let editingId = null;

// SAVE TO LOCALSTORAGE - Store notes array
function saveToLocalStorage() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// LOAD FROM LOCALSTORAGE - Retrieve saved notes
function loadFromLocalStorage() {
  let savedNotes = localStorage.getItem("notes");
  return savedNotes ? JSON.parse(savedNotes) : [];
}

// DISPLAY NOTES - Render all notes to the screen
function displayNotes() {
  notesContainer.innerHTML = "";

  // Show empty state if no notes
  if (notes.length === 0) {
    notesContainer.innerHTML =
      "<p class='empty-state'>📝 No notes yet. Add your first note!</p>";
    return;
  }

  // Create note card for each note
  notes.forEach((note) => {
    let noteCard = document.createElement("div");
    noteCard.classList.add("note-card");
    noteCard.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <div class="note-buttons">
        <button class="edit-btn" data-id="${note.id}">Edit</button>
        <button class="delete-btn" data-id="${note.id}">Delete</button>
      </div>
    `;
    notesContainer.appendChild(noteCard);
  });
}

// ADD OR UPDATE NOTE - Create new note or update existing one
function addOrUpdateNote() {
  let title = noteTitle.value;
  let content = noteContent.value;

  // Validate inputs
  if (title.trim() === "" || content.trim() === "") {
    alert("Please fill in both title and content!");
    return;
  }

  if (editingId !== null) {
    // Update existing note
    let noteToEdit = notes.find((note) => note.id === editingId);
    noteToEdit.title = title;
    noteToEdit.content = content;
    editingId = null;

    // Reset form UI
    formTitle.textContent = "Add New Note";
    saveBtn.textContent = "Save Note";
  } else {
    // Create new note
    let newNote = {
      id: Date.now(),
      title: title,
      content: content,
    };
    notes.push(newNote);
  }

  // Save and update display
  saveToLocalStorage();
  displayNotes();

  // Clear inputs
  noteTitle.value = "";
  noteContent.value = "";
}

// EDIT NOTE - Populate form with note data for editing
function editNote(id) {
  let noteToEdit = notes.find((note) => note.id === id);

  // Fill form with note data
  noteTitle.value = noteToEdit.title;
  noteContent.value = noteToEdit.content;

  // Update form UI
  formTitle.textContent = "Edit Note";
  saveBtn.textContent = "Update Note";
  editingId = noteToEdit.id;
}

// DELETE NOTE - Remove note from array
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveToLocalStorage();
  displayNotes();
}

// SAVE BUTTON - Add or update note
saveBtn.addEventListener("click", addOrUpdateNote);

// NOTE ACTIONS - Handle edit and delete button clicks
notesContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-btn")) {
    let noteId = Number(e.target.dataset.id);
    editNote(noteId);
  }

  if (e.target.classList.contains("delete-btn")) {
    let noteId = Number(e.target.dataset.id);
    deleteNote(noteId);
  }
});

// INITIAL LOAD - Load saved notes and display
notes = loadFromLocalStorage();
displayNotes();
