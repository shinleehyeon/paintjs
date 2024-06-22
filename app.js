const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#000000";
ctx.fillStyle = "#000000";
ctx.lineWidth = 2.5;
ctx.lineCap = "round"; // 라인의 끝 모양을 둥글게 설정

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    if (!painting) {
        ctx.moveTo(x, y);
        ctx.beginPath();
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleClearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function handleEraserClick() {
    ctx.strokeStyle = "#ffffff";
}

function handleCustomColorClick() {
    const colorPicker = document.getElementById("colorPicker");
    colorPicker.click();
}

function handleColorPickerChange(event) {
    const color = event.target.value;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "paint.png";
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
}

const colors = document.getElementsByClassName("jsColor");
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

const range = document.getElementById("jsRange");
if (range) {
    range.addEventListener("input", handleRangeChange);
}

const clearBtn = document.getElementById("jsClear");
if (clearBtn) {
    clearBtn.addEventListener("click", handleClearCanvas);
}

const mode = document.getElementById("jsMode");
if (mode) {
    mode.addEventListener("click", handleModeClick);
}

const eraser = document.getElementById("jsEraser");
if (eraser) {
    eraser.addEventListener("click", handleEraserClick);
}

const customColorBtn = document.getElementById("jsCustomColor");
if (customColorBtn) {
    customColorBtn.addEventListener("click", handleCustomColorClick);
}

const colorPicker = document.getElementById("colorPicker");
if (colorPicker) {
    colorPicker.addEventListener("input", handleColorPickerChange);
}

const saveBtn = document.getElementById("jsSave");
if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}
