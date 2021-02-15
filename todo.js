const toDoForm = document.querySelector(".js-toDoForm"),
toDoInput = toDoForm.querySelector("input"),
toDoList = document.querySelector(".js-toDoList"),
doneList = document.querySelector(".js-doneList");

const TODOS_LS = "toDos"
let toDos = []
const DONES_LS = "dones"
let dones =[]

//삭제버튼 눌렸을때 처리하기
function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

//완료버튼 눌렀을때 처리하기
function completeToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveDones();
    paintToDo();
    paintDone();
}
//되돌아가기 버튼(done->todo) 처리하기
function backDone(){


}
//완료 후 최종 삭제하기 
function deleteDone(){

}

//localStorage에 저장하기
function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
//localStorage에 저장하기
function saveDones(){
    localStorage.setItem(DONES_LS, JSON.stringify(dones))
}


//loadTodo에서 가져온 항목들 화면에 표시하기
function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const comBtn = document.createElement("button");
    const span = document.createElement("span");
    
    const newId = toDos.length + 1;
    
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);

    comBtn.innerText = "O"
    comBtn.addEventListener("click", completeToDo)
    
    
    span.innerText = text;
    
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);

    const toDoObj = {
        text:text,
        id:newId
    };
    toDos.push(toDoObj);
    saveToDos()
}

//loadDone에서 가져온 항목들 화면에 표시하기
function paintDone(){
    const li = document.createElement("li");
    const backBtn = document.createElement("button")
    const delDoneBtn = document.createElement("button")
    

    backBtn.innerText = "back";
    backBtn.addEventListener("click",backDone)
    delDoneBtn.innerText ="delete";
    delDoneBtn.addEventListener("click",deleteDone)
}

//입력칸에 입력한 글자 처리하기

function handleSubmit(event){
    event.preventDefault();
    const currentValue= toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

//localStorage에서 todo목록 불러오기
function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        });
    }
}
//localStorage에서 done목록 불러오기
function loadDones(){
    const loadedDones = localStorage.getItem(DONES_LS);
    if (loadedDones !== null){
        const parsedDones = JSON.parse(loadedDones);x
        parsedDones.forEach(function(done){
            paintDone(done.text)
        })
    }
}


function init(){
    loadToDos();
    loadDones();
    toDoForm.addEventListener("submit", handleSubmit)
}

init()