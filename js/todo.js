const toDoForm = document.querySelector("#todo-form");
const toDoInput = toDoForm.querySelector("#todo-form input");
const toDoList = document.querySelector("#todo-list");

let toDos = [];
// This is an array for local storage - the to-dos will saved in this array
// declared as let cuz it'll be updated in the saving process.

const TODOS_KEY = "todos";

// 1. if the user write to-dos, it should be shown to the screen.
// a. I need the list element to contain to-dos.

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}
// function that saves todo array to the localstorage.

function deleteToDo(event) {
  const li = event.target.parentElement;
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  // toDo array를 업데이트 해 줌 - 아이디가 다른 것들만 남기고 저장
  li.remove();
  // 버튼의 parent element로 찾아가서 없애 줌
  saveToDos(toDos);
  // saving the new todo array to the local storage
}

function handleSubmit(e) {
  e.preventDefault();
  const newToDo = toDoInput.value;
  // copying the input value to a variable - 원본 값에는 영향 없음
  toDoInput.value = "";
  // 다음 값을 입력할 수 있게 값 초기화
  const newToDoObj = {
    text: newToDo,
    id: Date.now(),
  };
  // to identify the todo list by id (id = random number)
  toDos.push(newToDoObj);
  // saving the new todo list into the object
  paintToDo(newToDoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleSubmit);

function paintToDo(newToDo) {
  const li = document.createElement("li");
  li.id = newToDo.id;
  // setting the id of newtodo
  const span = document.createElement("span");
  const button = document.createElement("button");
  // ul이랑 span, button을 생성해 줌

  span.innerText = newToDo.text;
  // span에 newtodo를 보이게 해 줌

  button.innerText = "X";
  button.addEventListener("click", deleteToDo);
  // 버튼을 누르면 todo가 삭제되게끔

  li.appendChild(span);
  li.appendChild(button);
  // ul 밑에 todo text랑 버튼을 붙여 줌
  // don't know why but appendchild should be executed at the last of the code
  toDoList.appendChild(li);
  // html에 이미 생성되어 있는 ul에 element 넣어주기
}

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(localStorage.getItem(TODOS_KEY));
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
