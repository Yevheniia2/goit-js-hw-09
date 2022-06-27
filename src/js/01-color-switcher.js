const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let timerId = null;

stopBtn.setAttribute("disabled", true);
startBtn.addEventListener('click', onStartBtnChangeBgColor);
stopBtn.addEventListener('click', onStopBtnChangeBgColor);

function onStartBtnChangeBgColor() {
    timerId = setInterval(() => {
    body.style = `background-color: ${getRandomHexColor()}`;
    }, 1000);
    startBtn.setAttribute("disabled", true);
    stopBtn.removeAttribute("disabled");
}

function onStopBtnChangeBgColor() {
    clearInterval(timerId);
    stopBtn.setAttribute("disabled", true);
    startBtn.removeAttribute("disabled");
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}