const colorPicker = document.getElementById("colorPicker");
const canvasColor = document.getElementById("canvasColor");
const canvas = document.getElementById("myCanvas");
const clearButton = document.getElementById("clearButton");
const saveButton = document.getElementById("saveButton");
const fontSizePicker = document.getElementById("fontSizePicker");
const retrieveButton = document.getElementById("retrieveButton");

const ctx = canvas.getContext("2d");

colorPicker.addEventListener("change", (event) => {
  ctx.fillStyle = event.target.value;
  ctx.strokeStyle = event.target.value;
});

canvasColor.addEventListener("change", (event) => {
  ctx.fillStyle = event.target.value;
  ctx.fillRect(0, 0, 800, 500);
});

canvas.addEventListener("mousedown", (event) => {
  isDrawing = true;
  lastX = event.offsetX;
  lastY = event.offsetY;
});

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

canvasColor.addEventListener("change", (e) => {
  ctx.fillStyle = e.target.value;
  ctx.fillRect(0, 0, 800, 500);
});

fontSizePicker.addEventListener("change", (e) => {
  ctx.lineWidth = e.target.value;
});

clearButton.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
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

//touch events
canvas.addEventListener("touchstart", (event) => {
  isDrawing = true;
  let rect = canvas.getBoundingClientRect();
  let scaleX = canvas.width / rect.width;
  let scaleY = canvas.height / rect.height;
  lastX = (event.touches[0].clientX - rect.left) * scaleX;
  lastY = (event.touches[0].clientY - rect.top) * scaleY;
});

canvas.addEventListener("touchmove", (event) => {
  if (isDrawing) {
    let touch = event.touches[0];
    let rect = canvas.getBoundingClientRect();
    let scaleX = canvas.width / rect.width;
    let scaleY = canvas.height / rect.height;
    let x = (touch.clientX - rect.left) * scaleX;
    let y = (touch.clientY - rect.top) * scaleY;

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
