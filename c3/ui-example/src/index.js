let currentId = 1;
const todoList = [];
function onAdd(){
  const inputEl = document.querySelector('.todo .desc');
  const todo = { id: currentId, desc: inputEl.value };
  todoList.push(todo);
  currentId += 1;
  const elemList = document.querySelector('.todo .list');
  const liEl = makeTodoElement(todo);
  elemList.appendChild(liEl);
}

function makeTodoElement(todo) {
  const liEl = document.createElement('li');
  const spanEl = document.createElement('span');
  const buttonEl = document.createElement('button');
  spanEl.innerHTML = todo.desc;
  buttonEl.innerHTML = '삭제';
  buttonEl.dataset.id = todo.id;
  buttonEl.onclick = onDelete;
  liEl.appendChild(spanEl);
  liEl.appendChild(buttonEl);
  return liEl;
}

function onDelete(e) {
  const id = Number(e.target.dataset.id);
  const index = todoList.findIndex(item => item.id === id);
  if(index >= 0) {
    todoList.splice(index, 1);
    const elemList = document.querySelector('.todo .list');
    const liEl = e.target.parentNode;
    elemList.removeChild(liEl);
  }
}
function onSaveToServer() {
  // todoList 전송
}