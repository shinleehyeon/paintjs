const canvas = document.getElementById("jsCanvas");  // 캔버스 요소 가져오기
const ctx = canvas.getContext("2d");  // 2D 그래픽 컨텍스트 가져오기

canvas.width = 700;  // 캔버스 너비 설정
canvas.height = 700;  // 캔버스 높이 설정

ctx.strokeStyle = "#000000";  // 선 색상 설정
ctx.fillStyle = "#000000";  // 채우기 색상 설정
ctx.lineWidth = 2.5;  // 선 두께 설정
ctx.lineCap = "round";  // 선 끝 모양 설정

let painting = false;  // 그림 그리는 중인지 여부
let filling = false;  // 채우기 모드인지 여부

// 그리기 시작 및 종료 함수
function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

// 마우스 이동 이벤트 처리 함수
function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    if (!painting) {
        ctx.moveTo(x, y);  // 그리기 시작 위치 설정
        ctx.beginPath();  // 경로 시작
    } else {
        ctx.lineTo(x, y);  // 현재 위치까지 선 그리기
        ctx.stroke();  // 선 그리기
    }
}

// 캔버스 클릭 이벤트 처리 함수
function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);  // 채우기 모드일 때 전체 캔버스 채우기
    }
}

// 색상 선택 처리 함수
function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;  // 선 색상 설정
    ctx.fillStyle = color;  // 채우기 색상 설정
}

// 선 두께 변경 처리 함수
function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;  // 선 두께 설정
}

// 그리기 모드 변경 처리 함수
function handleModeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = "채우기";  // 텍스트 변경
    } else {
        filling = true;
        mode.innerText = "그리기";  // 텍스트 변경
    }
}

// 캔버스 초기화 처리 함수
function handleClearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // 캔버스 지우기
}

// 지우개 모드 처리 함수
function handleEraserClick() {
    ctx.strokeStyle = "#ffffff";  // 흰색으로 선 색상 설정 (지우개 역할)
}

// 사용자 정의 색상 선택 버튼 클릭 처리 함수
function handleCustomColorClick() {
    const colorPicker = document.getElementById("colorPicker");
    colorPicker.click();  // input[type="color"] 엘리먼트 클릭 시 색상 선택 창 열림
}

// 색상 선택 창 변경 처리 함수
function handleColorPickerChange(event) {
    const color = event.target.value;
    ctx.strokeStyle = color;  // 선 색상 설정
    ctx.fillStyle = color;  // 채우기 색상 설정
}

// 저장 버튼 클릭 처리 함수
function handleSaveClick() {
    const image = canvas.toDataURL();  // 캔버스 이미지를 데이터 URL로 변환
    const link = document.createElement("a");
    link.href = image;
    link.download = "paint.png";  // 이미지 다운로드 설정
    link.click();  // 링크 클릭하여 다운로드 실행
}

// 캔버스 이벤트 리스너 설정
if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
}

// 색상 버튼 이벤트 리스너 설정
const colors = document.getElementsByClassName("jsColor");
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

// 선 두께 조절 이벤트 리스너 설정
const range = document.getElementById("jsRange");
if (range) {
    range.addEventListener("input", handleRangeChange);
}

// 초기화 버튼 이벤트 리스너 설정
const clearBtn = document.getElementById("jsClear");
if (clearBtn) {
    clearBtn.addEventListener("click", handleClearCanvas);
}

// 그리기 모드 변경 버튼 이벤트 리스너 설정
const mode = document.getElementById("jsMode");
if (mode) {
    mode.addEventListener("click", handleModeClick);
}

// 지우개 버튼 이벤트 리스너 설정
const eraser = document.getElementById("jsEraser");
if (eraser) {
    eraser.addEventListener("click", handleEraserClick);
}

// 사용자 정의 색상 선택 버튼 이벤트 리스너 설정
const customColorBtn = document.getElementById("jsCustomColor");
if (customColorBtn) {
    customColorBtn.addEventListener("click", handleCustomColorClick);
}

// 색상 선택 창 이벤트 리스너 설정
const colorPicker = document.getElementById("colorPicker");
if (colorPicker) {
    colorPicker.addEventListener("input", handleColorPickerChange);
}

// 저장 버튼 이벤트 리스너 설정
const saveBtn = document.getElementById("jsSave");
if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}
