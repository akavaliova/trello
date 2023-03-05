"use strict"

// Open and close modal window:
const statusTODO = "TODO";
const statusInProgress = "InProgress"
const statusDONE = "DONE";
const overlayWrap = document.getElementById("overlay");
const activeEditBtn = document.getElementById("trello__todo-active--editBtn");
const addTodoBtn = document.getElementById("trello__todo-active--addTodoBtn");
const modalCancelBtn = document.getElementById("modal-window__cancelBtn");
const modalConfirmBtn = document.getElementById("modal-window__confirmBtn");
const modalTitleInput = document.getElementById("modal-window__title");
const modaldescriptionInput = document.getElementById("modal-window__text");
const deleteAllBtn = document.getElementById("trello__todo-done--deleteAllBtn");



function init() {
    render();
}

function reset() {
    const todoWrap = document.getElementById('trello__todo-active--caseWrap');
    todoWrap.innerHTML = '';
    
    const inProgressWrap = document.getElementById('trello__todo-inprogress--caseWrap')
    inProgressWrap.innerHTML = '';

    const doneWrap = document.getElementById('trello__todo-done--caseWrap')
    doneWrap.innerHTML = '';

}

  function render() {
    reset();
    const all = getTodos();
    
    const todos = all.filter(t => {
        return t.status === statusTODO;
    });

    const inProgress =  all.filter(t => {
        return t.status === statusInProgress;
    });

    const done =  all.filter(t => {
        return t.status === statusDONE;
    });

    todos.forEach(todo => { 
        drawTodo(todo);
    });
    updateTodoCounter(todos);

    inProgress.forEach(todo => { 
        drawInProgress(todo);
    });
    updateInProgressCounter(inProgress);

    done.forEach(todo => { 
        drawDone(todo);
    });
    updateDoneCounter(done);
  }

  function updateTodoCounter(todos) {
    const activeTodoCounter = document.getElementById("trello__todo-active--amount");
    activeTodoCounter.innerText = todos.length;
  }

  function updateInProgressCounter(inProgress){
    const inProgressCounter = document.getElementById("trello__todo-inprogress--amount");
    inProgressCounter.innerText = inProgress.length;

  }

  function updateDoneCounter(done){
    const doneCounter = document.getElementById("trello__todo-done--amount");
    doneCounter.innerText = done.length;
  }


  function drawTodo(todo) {
    const todoWrap = document.getElementById("trello__todo-active--caseWrap");
    const activeTodoCase = createElementWithID("li", "trello__todo-active--case");
    const activeUpperSection = createElementWithClassName("div", "trello__todo-active--upperSection");
    const activeTitle = createElementWithClassName("p", "trello__todo-active--title");
    const activeEditBtn = createElementWithID("button", "trello__todo-active--editBtn");
    const activeDelBtn = createElementWithID("button", "trello__todo-active--delBtn");

    const activeMidSection = createElementWithClassName("div", "trello__todo-active--midSection");
    const activeDescription = createElementWithClassName("p", "trello__todo-active--description");
    const activeTransferBtn = createElementWithID("button", "trello__todo-active--transferBtn");

    const activeDownSection = createElementWithClassName("div", "trello__todo-active--downSection");
    const activeUser = createElementWithClassName("p", "trello__todo-active--user");
    const activeTime = createElementWithClassName("p", "trello__todo-active--time");

    todoWrap.append(activeTodoCase);
    activeTodoCase.append(activeUpperSection);
    activeUpperSection.append(activeTitle);
    activeTitle.innerText = todo.title;
    activeUpperSection.append(activeEditBtn);
    activeEditBtn.append("Edit");
    activeUpperSection.append(activeDelBtn);
    activeDelBtn.append("Delete");
    activeDelBtn.addEventListener("click", function() {
        deleteTodoById(todo.id)
        render();
    });
    activeTodoCase.append(activeMidSection);
    activeMidSection.append(activeDescription);
    activeDescription.append("Description");
    activeDescription.innerText = todo.description;
    activeMidSection.append(activeTransferBtn);
    activeTransferBtn.append(">");
    activeTransferBtn.addEventListener("click", function() {
        const inProgressTodo = getTodoByID(todo.id);
        if (!!inProgressTodo) {
            inProgressTodo.status = statusInProgress;
            deleteTodoById(todo.id);
            const todos = getTodos();
            todos.push(inProgressTodo);
            updateTodos(todos);
            render();
        }
    });
    activeTodoCase.append(activeDownSection);
    activeDownSection.append(activeUser);
    activeUser.append("User");
    activeDownSection.append(activeTime);
    activeTime.append("Time");
    activeTime.innerText = todo.date;
  }

  function drawInProgress(todo) {
    const inProgressWrap = document.getElementById("trello__todo-inprogress--caseWrap");
    const inProgressTodoCase = createElementWithID("li", "trello__todo-inprogress--case");
    const inProgressUpperSection = createElementWithClassName("div", "trello__todo-inprogress--upperSection");
    const inProgressTitle = createElementWithClassName("p", "trello__todo-inprogress--title");
    const inProgressBackBtn = createElementWithID("button", "trello__todo-inprogress--backBtn");
    const inProgressCompleteBtn = createElementWithID("button", "trello__todo-inprogress--completeBtn");

    const inProgressDescription = createElementWithClassName("p", "trello__todo-inprogress--description");

    const inProgressDownSection = createElementWithClassName("div", "trello__todo-inprogress--downSection");
    const inProgressUser = createElementWithClassName("p", "trello__todo-inprogress--user");
    const inProgressTime = createElementWithClassName("p", "trello__todo-inprogress--time");


    inProgressWrap.append(inProgressTodoCase);
    inProgressTodoCase.append(inProgressUpperSection);
    inProgressUpperSection.append(inProgressTitle);
    inProgressTitle.innerText = todo.title;
    inProgressUpperSection.append(inProgressBackBtn);
    inProgressBackBtn.append("Back");
    inProgressUpperSection.append(inProgressCompleteBtn);
    inProgressCompleteBtn.append("Complete");
    inProgressCompleteBtn.addEventListener("click", function() {
        const completeTODO = getTodoByID(todo.id);
        if (!!completeTODO) {
            completeTODO.status = statusDONE;
            deleteTodoById(todo.id);
            const todos = getTodos();
            todos.push(completeTODO);
            updateTodos(todos);
            render();
        }
    });
    inProgressTodoCase.append(inProgressDescription);
    inProgressDescription.append("Description");
    inProgressDescription.innerText = todo.description;
    inProgressTodoCase.append(inProgressDownSection);
    inProgressDownSection.append(inProgressUser);
    inProgressUser.append("User");
    inProgressDownSection.append(inProgressTime);
    inProgressTime.append("Time");
    inProgressTime.innerText = todo.date;
  }

  function drawDone(todo) {
    const doneWrap = document.getElementById("trello__todo-done--caseWrap");
    const doneCase = createElementWithID("li", "trello__todo-done--case");
    const doneUpperSection = createElementWithClassName("div", "trello__todo-done--upperSection");
    const doneTitle = createElementWithClassName("p", "trello__todo-done--title");
    const doneDelBtn = createElementWithID("button", "trello__todo-done--delBtn");

    const doneDescription = createElementWithClassName("p", "trello__todo-done--description");

    const doneDownSection = createElementWithClassName("div", "trello__todo-done--downSection");
    const doneUser = createElementWithClassName("p", "trello__todo-done--user");
    const doneTime = createElementWithClassName("p", "trello__todo-done--time");

    doneWrap.append(doneCase);
    doneCase.append(doneUpperSection);
    doneUpperSection.append(doneTitle);
    doneTitle.innerText = todo.title;
    doneUpperSection.append(doneDelBtn);
    doneDelBtn.append("Delete");
    doneDelBtn.addEventListener("click", function() {
        deleteTodoById(todo.id)
        render();
    });
    doneCase.append(doneDescription);
    doneDescription.append("Description");
    doneDescription.innerText = todo.description;
    doneCase.append(doneDownSection);
    doneDownSection.append(doneUser);
    doneUser.append("User");
    doneDownSection.append(doneTime);
    doneTime.append("Time");
    doneTime.innerText = todo.date;
  }

  function createElementWithClassName(tag, className) {
    let element = document.createElement(tag);
    element.setAttribute("class", className);
    return element;
  }
  
  function createElementWithID(tag, idName) {
    let idElement = document.createElement(tag);
    idElement.setAttribute("id", idName);
    return idElement;
  }



function addTodo(title, description) {
    const todos = getTodos();
  
    const todo = {
      title: title,
      description: description,
      date: getCurentDate(),
      id: generateId(),
      status: statusTODO,
    };

    todos.push(todo);
    updateTodos(todos);
}

function getTodos() {
    const todos = localStorage.getItem("todos");
    return !!todos ? JSON.parse(todos) : [];
}

function getTodoByID(id) {
    return getTodos().find(todo => todo.id === id);
}

function deleteTodoById(id) {
    const todos =  getTodos().filter(function(todo) {
        return todo.id !== id;
    });
    updateTodos(todos);
}

// DELETE ALL!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function deleteAll(){
    const all = getTodos();
    const todos = all.filter(t => {
        return t.status !== statusDONE;
    });
    updateTodos(todos);
}

deleteAllBtn.addEventListener("click", function () {
    deleteAll(statusDONE);
    render();
});

function updateTodos(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function generateId() {
    return Math.floor(Math.random() * 1000);
}

function getCurentDate() {
    return new Date().toLocaleString();
}

function clearInputFields() {
    modalTitleInput.value = '';
    modaldescriptionInput.value = '';
}

addTodoBtn.addEventListener("click", function () {
    overlayWrap.classList.add("active");
});

modalCancelBtn.addEventListener("click", function () {
    overlayWrap.classList.remove("active");
    clearInputFields();
});
// временно:
modalConfirmBtn.addEventListener("click", function () {
    const title = modalTitleInput.value;
    const description = modaldescriptionInput.value;

    if (!!description && !!title) {
        addTodo(title, description);
        overlayWrap.classList.remove("active"); // закрываю модальное окно
        clearInputFields();
        render();
    } else {
        alert("Please, input the title and the description");
    }
});


// warning modal window:
const transferBtn = document.getElementById("trello__todo-active--transferBtn");
const warningOverlay = document.getElementById("overlayWarning");
const warningCancelBtn = document.getElementById("modal-warning__cancelBtn");
const warningConfirmBtn = document.getElementById("modal-warning__confirmBtn");


warningCancelBtn.addEventListener("click", function () {
    warningOverlay.classList.remove("show");
})

//временно:

warningConfirmBtn.addEventListener("click", function () {
    console.log("I agree to add 6 more cases");
    warningOverlay.classList.remove("show");
})

// Clock
function updateClock() {
    let now = new Date(); // текущая дата и время
    let hours = now.getHours().toString().padStart(2, '0'); // часы
    let minutes = now.getMinutes().toString().padStart(2, '0'); // минуты
    let timeString = hours + ':' + minutes; // строка времени в формате "чч:мм"
    document.getElementById('trello__title-clock').textContent = timeString; // обновляем содержимое элемента с id="clock"
  }
  updateClock(); // вызываем функцию updateClock() в первый раз, чтобы отобразить текущее время
  // обновляем время каждую минуту
  setInterval(updateClock, 60000);

  
  init();
  
