const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");
const doneList = document.querySelector(".js-doneList");

const TODOS_LS = "toDos";
const DONE_LS = "done";

let toDos = [];
let done = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);

  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}
function doneToDo(event) {
  paintDone(event);
  deleteToDo(event);
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
function saveDone() {
  localStorage.setItem(DONE_LS, JSON.stringify(done));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const doneBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  doneBtn.innerText = "✔️";
  doneBtn.addEventListener("click", doneToDo(text));
  span.innerText = text;
  li.id = newId;
  li.appendChild(delBtn);
  li.appendChild(doneBtn);
  li.appendChild(span);
  toDoList.appendChild(li);

  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function paintDone(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const backBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = done.length + 1;
  span.innerText = text;
  delBtn.innerText = "❌";
  backBtn.innerText = "◀️";
  li.appendChild(delBtn);
  li.appendChild(backBtn);
  li.appendChild(span);
  doneList.appendChild(li);

  const doneObj = {
    text: text,
    id: newId,
  };
  done.push(doneObj);
  saveDone();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}
init();
