"use strict"

// Open and close modal window:
const statusTODO = "TODO";
const statusDONE = "DONE";
const overlayWrap = document.getElementById("overlay");
const modalEditBtn = document.getElementById("trello__todo-active--editBtn");
const addTodoBtn = document.getElementById("trello__todo-active--addTodoBtn");
const modalCancelBtn = document.getElementById("modal-window__cancelBtn");
const modalConfirmBtn = document.getElementById("modal-window__confirmBtn");
const titleInput = document.getElementById("modal-window__title");
const descriptionInput = document.getElementById("modal-window__text");



function init() {
    const ulWrap = document.getElementsByClassName("trello__todo-active trello__todo-active--wrap");
    const activeCase = createElementWithID("li", "trello__todo-active--case");
    const activeUpperSection = createElementWithClassName("div", "trello__todo-active trello__todo-active--upperSection");
    const activeTitle = createElementWithClassName("p", "trello__todo-active trello__todo-active--title");
    const activeEditBtn = createElementWithID("button", "trello__todo-active--editBtn");
    const activeDelBtn = createElementWithClassName("button", "trello__todo-active trello__todo-active--delBtn");

    const activeMidSection = createElementWithClassName("div", "trello__todo-active trello__todo-active--midSection");
    const activeDescription = createElementWithClassName("p", "trello__todo-active trello__todo-active--description");
    const activeTransferBtn = createElementWithID("button", "trello__todo-active--transferBtn");

    const activeDownSection = createElementWithClassName("div", "trello__todo-active trello__todo-active--downSection");
    const activeUser = createElementWithClassName("p", "trello__todo-active trello__todo-active--user");
    const activeTime = createElementWithClassName("p", "trello__todo-active trello__todo-active--time");
  
    ulWrap.append(activeCase);
    activeCase.append(activeUpperSection);
    activeUpperSection.append(activeTitle);
    activeTitle.append(activeEditBtn);
    activeEditBtn.append(activeDelBtn);
    activeDelBtn.append(activeMidSection);
    activeMidSection.append(activeDescription);
    activeDescription.append(activeTransferBtn);
    activeTransferBtn.append(activeDownSection);
    activeDownSection.append(activeUser);
    activeUser.append(activeTime);
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
    localStorage.setItem("todos", JSON.stringify(todos));  
}

function getTodos() {
    const todos = localStorage.getItem("todos");
    return !!todos ? JSON.parse(todos) : [];
}

function generateId() {
    return Math.floor(Math.random() * 1000);
}

function getCurentDate() {
    return new Date().toLocaleString();
}

function clearInputFields() {
    titleInput.value = '';
    descriptionInput.value = '';
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
    const title = titleInput.value;
    const description = descriptionInput.value;

    if (!!description && !!title) {
        overlayWrap.classList.remove("active"); // закрываю модальное окно
        clearInputFields();
        addTodo(title, description);
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
    let hours = now.getHours(); // часы
    let minutes = now.getMinutes(); // минуты
    let timeString = hours + ':' + minutes; // строка времени в формате "чч:мм"
    document.getElementById('trello__title-clock').textContent = timeString; // обновляем содержимое элемента с id="clock"
  }
  updateClock(); // вызываем функцию updateClock() в первый раз, чтобы отобразить текущее время
  // обновляем время каждую минуту
  setInterval(updateClock, 60000);

  
  init();