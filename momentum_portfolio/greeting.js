const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";
const date = new Date();
const time = date.getHours();

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  if ((6 <= time) & (time < 12)) {
    greeting.innerText = `Good Morning ${text}!`;
  } else if ((12 <= time) & (time < 18)) {
    greeting.innerText = `Good Afternoon ${text}!`;
  } else if ((18 <= time) & (time < 22)) {
    greeting.innerText = `Good Evening ${text}!`;
  } else if ((22 <= time) & (time < 6)) {
    greeting.innerText = `Good Night ${text}!`;
  }
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}
init();
