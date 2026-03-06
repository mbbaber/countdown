// script.js

// Target: July 12, 2026, 00:00 in Boston (America/New_York)
const targetTimeZone = "America/New_York";
const targetDateLocal = "2026-07-12T00:00:00";

// Convert Boston local time to an actual Date in the user's browser
function getBostonTargetDate() {
  // Get the UTC milliseconds for that local Boston time
  const utcMillis = Date.parse(
    new Date(targetDateLocal + "Z").toLocaleString("en-US", {
      timeZone: targetTimeZone,
    })
  );

  // Fallback: if something went weird, just use plain Date constructor
  if (Number.isNaN(utcMillis)) {
    return new Date("2026-07-12T04:00:00Z"); // midnight Boston ≈ 04:00 UTC in July
  }

  return new Date(utcMillis);
}

const targetDate = getBostonTargetDate();

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const messageEl = document.getElementById("message");
const countdownEl = document.getElementById("countdown");

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate.getTime() - now;

  if (distance <= 0) {
    // Countdown finished
    daysEl.textContent = "0";
    hoursEl.textContent = "0";
    minutesEl.textContent = "0";
    secondsEl.textContent = "0";

    countdownEl.classList.add("hidden");
    messageEl.classList.remove("hidden");
    clearInterval(timerId);
    return;
  }

  const secondsTotal = Math.floor(distance / 1000);
  const days = Math.floor(secondsTotal / (60 * 60 * 24));
  const hours = Math.floor((secondsTotal % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((secondsTotal % (60 * 60)) / 60);
  const seconds = secondsTotal % 60;

  setNumber(daysEl, days);
  setNumber(hoursEl, hours);
  setNumber(minutesEl, minutes);
  setNumber(secondsEl, seconds);
}

// Simple animation when numbers change
function setNumber(element, newValue) {
  const oldValue = element.textContent;
  const formatted = String(newValue);

  if (oldValue !== formatted) {
    element.textContent = formatted;
    element.classList.remove("tick");
    void element.offsetWidth; // force reflow to restart animation
    element.classList.add("tick");
  }
}

const timerId = setInterval(updateCountdown, 1000);
updateCountdown();
