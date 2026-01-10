// ============================================
// DRAWING APP
// ============================================

// DOM ELEMENTS - Get canvas, controls, and display elements
const colorPicker = document.getElementById("colorPicker");
const brushSize = document.getElementById("brushSize");
const brushSizeDisplay = document.getElementById("brushSizeDisplay");
const clearBtn = document.getElementById("clearBtn");
const canvas = document.getElementById("canvas");

// CANVAS CONTEXT - Get 2D drawing context
const ctx = canvas.getContext("2d");

// STATE VARIABLE - Track whether user is currently drawing
let isDrawing = false;

// UPDATE BRUSH SIZE DISPLAY - Show current brush size value
function updateBrushDisplay() {
  brushSizeDisplay.textContent = brushSize.value;
}

// START DRAWING - Begin drawing when mouse is pressed down
function startDrawing(e) {
  isDrawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

// DRAW - Continue drawing while mouse moves
function draw(e) {
  if (!isDrawing) return;

  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

// STOP DRAWING - End drawing when mouse is released or leaves canvas
function stopDraw() {
  isDrawing = false;
}

// CLEAR CANVAS - Remove all drawings from canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// CANVAS EVENT LISTENERS - Handle mouse interactions for drawing
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDraw);
canvas.addEventListener("mouseout", stopDraw);

// TOOL EVENT LISTENERS - Update brush color and size
colorPicker.addEventListener("input", () => {
  ctx.strokeStyle = colorPicker.value;
});

brushSize.addEventListener("input", () => {
  ctx.lineWidth = brushSize.value;
  updateBrushDisplay();
});

clearBtn.addEventListener("click", clearCanvas);

// INITIALIZE - Set initial brush display and line style
updateBrushDisplay();
ctx.lineCap = "round";
ctx.lineJoin = "round";
