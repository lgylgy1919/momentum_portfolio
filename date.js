const dateContainer = document.querySelector(".js-date"),
dateTitle = dateContainer.querySelector("h1");

function getDate(){
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    dateTitle.innerText =`${year}.${month+1 < 10 ? `0${month+1}`:`${month+1}`}.${day<10?`0${day}`:day}`; 

}

function init(){
    getDate()
}

init()