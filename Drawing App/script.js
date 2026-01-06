// SELECT ALL ELEMENTS for manupilation and adding functionalty
const colorPicker = document.getElementById("colorPicker");
const brushSize = document.getElementById("brushSize");
const brushSizeDisplay = document.getElementById("brushSizeDisplay");
const clearBtn = document.getElementById("clearBtn");
const canvas = document.getElementById("canvas");

// GET CANVAS CONTEXT (2D drawing context)

// VARIABLES TO TRACK DRAWING STATE
const ctx = canvas.getContext("2d");
let isDrawing = false;

// FUNCTION: UPDATE BRUSH SIZE DISPLAY getting value from brushSize updating it into brushSizeDisplay
function updateBrushDisplay() {
  brushSizeDisplay.textContent = brushSize.value;
}

// FUNCTION: START DRAWING (when mouse is pressed down)
// set drwing to true
// a built in method beginPath that starts a new line
// a built in method moveTo move the pen position to x or y
function startDrawing(e) {
  isDrawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

// FUNCTION: DRAW (when mouse moves while pressed)
// check if not drawing return
// draw a line to the current mouse position)
// show the line on canvas
// start fresh for the next segment
function draw(e) {
  if (!isDrawing) {
    return;
  }
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

// FUNCTION: STOP DRAWING (when mouse is released or leaves canvas)
// set drwing to false
function stopDraw() {
  isDrawing = false;
}
// FUNCTION: CLEAR CANVAS
// a function that clears the entire canvas when the clear button is clicked
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// EVENT LISTENERS FOR CANVAS
// EVENT LISTENERS when mouse is pressed
// EVENT LISTENERS when mouse moves
// EVENT LISTENERS when mouse is released
// EVENT LISTENERS when mouse leaves canvas area
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDraw);
canvas.addEventListener("mouseout", stopDraw);

// EVENT LISTENERS FOR TOOLS
colorPicker.addEventListener("input", () => {
  ctx.strokeStyle = colorPicker.value;
});
brushSize.addEventListener("input", () => {
  ctx.lineWidth = brushSize.value;
  updateBrushDisplay();
});
clearBtn.addEventListener("click", clearCanvas);

// INITIALIZE BRUSH SIZE DISPLAY
updateBrushDisplay();
ctx.lineCap = "round";
ctx.lineJoin = "round";
