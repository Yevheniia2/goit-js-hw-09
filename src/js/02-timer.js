import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const refs = {
    dateInput: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
};

refs.startBtn.addEventListener('click', onStartBtnClick);
let countTime = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
    if (selectedDates[0].getTime() - Date.now() <= 0) {
        Notify.failure('Please choose a date in the future');
        refs.startBtn.disabled = true;
    } else {
        refs.startBtn.disabled = false;
    }
    },
};

const flp = flatpickr(refs.dateInput, options);

function onStartBtnClick() {
    refs.startBtn.disabled = true;
    refs.dateInput.disabled = true;
    
    onCount();
}

function onCount() {
    countTime = setInterval(() => {
        const pick = flp.selectedDates[0] - Date.now();
        const conTime = convertMs(flp.selectedDates[0] - Date.now());
        setTime(conTime);
        console.log(pick);
        if(pick < 1000) {
            clearInterval(countTime);
            Notify.success('Timer countdown finished')
        }
    }, 1000);
}

function setTime({ days, hours, minutes, seconds }) {
    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}