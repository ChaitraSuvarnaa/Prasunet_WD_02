// script.js
let startTime;
let elapsedTime = 0;
let intervalId;
let isRunning = false;

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function updateDisplay(time) {
    const date = new Date(time);
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(Math.floor(date.getMilliseconds() / 10)).padStart(2, '0');
    display.textContent = `${minutes}:${seconds}:${milliseconds}`;
}

function startPause() {
    if (isRunning) {
        clearInterval(intervalId);
        elapsedTime += Date.now() - startTime;
        startPauseBtn.textContent = 'Start';
        startPauseBtn.classList.remove('pause');
        startPauseBtn.classList.add('start');
    } else {
        startTime = Date.now();
        intervalId = setInterval(() => {
            updateDisplay(elapsedTime + (Date.now() - startTime));
        }, 10);
        startPauseBtn.textContent = 'Pause';
        startPauseBtn.classList.remove('start');
        startPauseBtn.classList.add('pause');
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(intervalId);
    isRunning = false;
    startTime = 0;
    elapsedTime = 0;
    updateDisplay(0);
    startPauseBtn.textContent = 'Start';
    startPauseBtn.classList.remove('pause');
    startPauseBtn.classList.add('start');
    laps.innerHTML = '';
}

function lap() {
    if (isRunning) {
        const lapTime = elapsedTime + (Date.now() - startTime);
        const lapElement = document.createElement('div');
        lapElement.classList.add('lap');
        lapElement.textContent = display.textContent;
        laps.appendChild(lapElement);
    }
}

startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

updateDisplay(0);
