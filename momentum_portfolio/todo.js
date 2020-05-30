const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");
const doneList = document.querySelector(".js-doneList");

const TODOS_LS = "toDos";
const DONE_LS = "done";

let toDos = [];
let dones = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode.parentNode;
  toDoList.removeChild(li);

  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== li.id;
  });
  toDos = cleanToDos;
  saveToDos();
}

function completeToDo(event) {
  const btn = event.target;
  const li = btn.parentNode.parentNode;
  const text = li.querySelector("div").innerText;
  paintDone(text);
}

function deleteDone(event) {
  const btn = event.target;
  const li = btn.parentNode.parentNode;
  doneList.removeChild(li);

  const cleanDones = dones.filter(function (done) {
    return done.id !== li.id;
  });
  dones = cleanDones;
  saveDones();
}

function backDone(event) {
  const btn = event.target;
  const li = btn.parentNode.parentNode;
  doneList.removeChild(li);
  const text = li.querySelector("div").innerText;
  const cleanDone = dones.filter(function (done) {
    return done.id !== li.id;
  });
  dones = cleanDone;
  saveDones();
  paintToDo(text);
}

//todo 로컬저장소에 저장하기
function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
function saveDones() {
  localStorage.setItem(DONE_LS, JSON.stringify(dones));
}

//todo화면 목록에 표시 함수
function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const doneBtn = document.createElement("button");
  const div = document.createElement("div");
  const newId = String(Date.now());
  div.innerText = text;
  delBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
  delBtn.addEventListener("click", deleteToDo);
  doneBtn.innerHTML = '<i class="fas fa-hand-peace"></i>';
  doneBtn.addEventListener("click", completeToDo);
  doneBtn.addEventListener("click", deleteToDo);
  li.id = newId;
  li.appendChild(div);
  li.appendChild(delBtn);
  li.appendChild(doneBtn);
  toDoList.appendChild(li);

  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos();
}
//done화면 목록에 표시 함수
function paintDone(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const backBtn = document.createElement("button");
  const div = document.createElement("div");
  const newId = String(Date.now());
  delBtn.addEventListener("click", deleteDone);
  delBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
  backBtn.addEventListener("click", backDone);
  backBtn.innerHTML = '<i class="fas fa-undo-alt"></i>';
  div.innerText = text;
  li.id = newId;
  li.appendChild(div);
  li.appendChild(delBtn);
  li.appendChild(backBtn);
  doneList.appendChild(li);

  const doneObj = {
    text: text,
    id: newId,
  };
  dones.push(doneObj);
  saveDones();
}

//todo로컬 저장소에서 읽어오기
function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}
//done로컬 저장소에서 읽어오기
function loadDones() {
  const loadedDones = localStorage.getItem(DONE_LS);
  if (loadedDones !== null) {
    const parsedDones = JSON.parse(loadedDones);
    parsedDones.forEach(function (done) {
      paintDone(done.text);
    });
  }
}
//입력 후 처리 함수
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}
function init() {
  loadToDos();
  loadDones();
  toDoForm.addEventListener("submit", handleSubmit);
}
init();
