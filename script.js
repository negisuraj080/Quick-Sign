const colorPicker = document.getElementById("colorPicker");
const canvasColor = document.getElementById("canvasColor");
const canvas = document.getElementById("myCanvas");
const clearButton = document.getElementById("clearButton");
const saveButton = document.getElementById("saveButton");
const fontSizePicker = document.getElementById("fontSizePicker");
const retrieveButton = document.getElementById("retrieveButton");

const ctx = canvas.getContext("2d");

function canvasBgWhite() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 800, 500);
}

canvasBgWhite();

colorPicker.addEventListener("change", (event) => {
  ctx.fillStyle = event.target.value;
  ctx.strokeStyle = event.target.value;
});

canvasColor.addEventListener("change", (event) => {
  ctx.fillStyle = event.target.value;
  console.log(event.target.value);
  ctx.fillRect(0, 0, 800, 500);
});

canvas.addEventListener("mousedown", (event) => {
  isDrawing = true;
  lastX = event.offsetX;
  lastY = event.offsetY;
});

isDrawing = false;
canvas.addEventListener("mousemove", (event) => {
  if (isDrawing) {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();

    lastX = event.offsetX;
    lastY = event.offsetY;
  }
});

canvas.addEventListener("mouseup", () => {
  isDrawing = false;
});


fontSizePicker.addEventListener("change", (e) => {
  ctx.lineWidth = e.target.value;
});

clearButton.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvasBgWhite();
});

saveButton.addEventListener("click", () => {
  localStorage.setItem("canvasContents", canvas.toDataURL());

  let link = document.createElement("a");

  link.download = "my-canvas.png";

  link.href = canvas.toDataURL();

  link.click();
});

retrieveButton.addEventListener("click", () => {
  let savedCanvas = localStorage.getItem("canvasContents");

  if (savedCanvas) {
    let img = new Image();
    img.src = savedCanvas;
    ctx.drawImage(img, 0, 0);
  }
});


// Consolidated touch event listeners
canvas.addEventListener("touchstart", (event) => {
  isDrawing = true;
  let rect = canvas.getBoundingClientRect();
  let offsetX = rect.left + window.pageXOffset;
  let offsetY = rect.top + window.pageYOffset;
  lastX = event.touches[0].clientX - offsetX;
  lastY = event.touches[0].clientY - offsetY;
});

canvas.addEventListener("touchmove", (event) => {
  if (isDrawing) {
    let touch = event.touches[0];
    let rect = canvas.getBoundingClientRect();
    let offsetX = rect.left + window.pageXOffset;
    let offsetY = rect.top + window.pageYOffset;
    let x = touch.clientX - offsetX;
    let y = touch.clientY - offsetY;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();

    lastX = x;
    lastY = y;
  }
});

canvas.addEventListener("touchend", () => {
  isDrawing = false;
});
