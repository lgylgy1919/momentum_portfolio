const clockContainer = document.querySelector(".js-clock ");
const clockTitle = clockContainer.querySelector("h1");

function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  clockTitle.innerText =
    (hours > 9 ? `${hours}` : `0${hours}`) +
    (minutes > 9 ? `:${minutes}` : `:0${minutes}`) +
    (seconds > 9 ? `:${seconds}` : `:0${seconds}`);

  /*
    `${hours < 10 ? `0${hours}` : hours}
    :${minutes < 10 ? `0${minutes}` : minutes}
    :${seconds < 10 ? `0${seconds}` : seconds}`;
*/
}

function init() {
  setInterval(getTime, 1000);
}

init();
