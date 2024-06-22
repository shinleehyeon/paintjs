const canvas = document.getElementById("jsCanvas");  // ĵ���� ��� ��������
const ctx = canvas.getContext("2d");  // 2D �׷��� ���ؽ�Ʈ ��������

canvas.width = 700;  // ĵ���� �ʺ� ����
canvas.height = 700;  // ĵ���� ���� ����

ctx.strokeStyle = "#000000";  // �� ���� ����
ctx.fillStyle = "#000000";  // ä��� ���� ����
ctx.lineWidth = 2.5;  // �� �β� ����
ctx.lineCap = "round";  // �� �� ��� ����

let painting = false;  // �׸� �׸��� ������ ����
let filling = false;  // ä��� ������� ����

// �׸��� ���� �� ���� �Լ�
function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

// ���콺 �̵� �̺�Ʈ ó�� �Լ�
function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    if (!painting) {
        ctx.moveTo(x, y);  // �׸��� ���� ��ġ ����
        ctx.beginPath();  // ��� ����
    } else {
        ctx.lineTo(x, y);  // ���� ��ġ���� �� �׸���
        ctx.stroke();  // �� �׸���
    }
}

// ĵ���� Ŭ�� �̺�Ʈ ó�� �Լ�
function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);  // ä��� ����� �� ��ü ĵ���� ä���
    }
}

// ���� ���� ó�� �Լ�
function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;  // �� ���� ����
    ctx.fillStyle = color;  // ä��� ���� ����
}

// �� �β� ���� ó�� �Լ�
function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;  // �� �β� ����
}

// �׸��� ��� ���� ó�� �Լ�
function handleModeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = "ä���";  // �ؽ�Ʈ ����
    } else {
        filling = true;
        mode.innerText = "�׸���";  // �ؽ�Ʈ ����
    }
}

// ĵ���� �ʱ�ȭ ó�� �Լ�
function handleClearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // ĵ���� �����
}

// ���찳 ��� ó�� �Լ�
function handleEraserClick() {
    ctx.strokeStyle = "#ffffff";  // ������� �� ���� ���� (���찳 ����)
}

// ����� ���� ���� ���� ��ư Ŭ�� ó�� �Լ�
function handleCustomColorClick() {
    const colorPicker = document.getElementById("colorPicker");
    colorPicker.click();  // input[type="color"] ������Ʈ Ŭ�� �� ���� ���� â ����
}

// ���� ���� â ���� ó�� �Լ�
function handleColorPickerChange(event) {
    const color = event.target.value;
    ctx.strokeStyle = color;  // �� ���� ����
    ctx.fillStyle = color;  // ä��� ���� ����
}

// ���� ��ư Ŭ�� ó�� �Լ�
function handleSaveClick() {
    const image = canvas.toDataURL();  // ĵ���� �̹����� ������ URL�� ��ȯ
    const link = document.createElement("a");
    link.href = image;
    link.download = "paint.png";  // �̹��� �ٿ�ε� ����
    link.click();  // ��ũ Ŭ���Ͽ� �ٿ�ε� ����
}

// ĵ���� �̺�Ʈ ������ ����
if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
}

// ���� ��ư �̺�Ʈ ������ ����
const colors = document.getElementsByClassName("jsColor");
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

// �� �β� ���� �̺�Ʈ ������ ����
const range = document.getElementById("jsRange");
if (range) {
    range.addEventListener("input", handleRangeChange);
}

// �ʱ�ȭ ��ư �̺�Ʈ ������ ����
const clearBtn = document.getElementById("jsClear");
if (clearBtn) {
    clearBtn.addEventListener("click", handleClearCanvas);
}

// �׸��� ��� ���� ��ư �̺�Ʈ ������ ����
const mode = document.getElementById("jsMode");
if (mode) {
    mode.addEventListener("click", handleModeClick);
}

// ���찳 ��ư �̺�Ʈ ������ ����
const eraser = document.getElementById("jsEraser");
if (eraser) {
    eraser.addEventListener("click", handleEraserClick);
}

// ����� ���� ���� ���� ��ư �̺�Ʈ ������ ����
const customColorBtn = document.getElementById("jsCustomColor");
if (customColorBtn) {
    customColorBtn.addEventListener("click", handleCustomColorClick);
}

// ���� ���� â �̺�Ʈ ������ ����
const colorPicker = document.getElementById("colorPicker");
if (colorPicker) {
    colorPicker.addEventListener("input", handleColorPickerChange);
}

// ���� ��ư �̺�Ʈ ������ ����
const saveBtn = document.getElementById("jsSave");
if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}
