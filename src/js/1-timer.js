// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      alert('Please choose a date in the future');
      document.getElementById('start-btn').disabled = true;
    } else {
      document.getElementById('start-btn').disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

document.getElementById('start-btn').addEventListener('click', startTimer);

let countdownInterval;

function startTimer() {
  const selectedDate = new Date(
    document.getElementById('datetime-picker').value
  );
  const currentDate = new Date();

  if (selectedDate <= currentDate) {
    alert('Please choose a date in the future');
    return;
  }

  document.getElementById('start-btn').disabled = true;
  document.getElementById('datetime-picker').disabled = true;

  const difference = selectedDate.getTime() - currentDate.getTime();

  countdownInterval = setInterval(() => {
    const timeLeft = convertMs(selectedDate.getTime() - new Date().getTime());

    document.getElementById('days').innerText = addLeadingZero(timeLeft.days);
    document.getElementById('hours').innerText = addLeadingZero(timeLeft.hours);
    document.getElementById('minutes').innerText = addLeadingZero(
      timeLeft.minutes
    );
    document.getElementById('seconds').innerText = addLeadingZero(
      timeLeft.seconds
    );

    if (
      timeLeft.days === 0 &&
      timeLeft.hours === 0 &&
      timeLeft.minutes === 0 &&
      timeLeft.seconds === 0
    ) {
      clearInterval(countdownInterval);
      alert('Countdown finished!');
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value < 10 ? '0' + value : value;
}
