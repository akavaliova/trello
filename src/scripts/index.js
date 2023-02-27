"use strict"

// Open and close modal window:
const overlayWrap = document.getElementById("overlay");
const modalEditBtn = document.getElementById("trello__todo-active--editBtn");
const addTodoBtn = document.getElementById("trello__todo-active--addTodoBtn");
const modalCancelBtn = document.getElementById("modal-window__cancelBtn");
const modalConfirmBtn = document.getElementById("modal-window__confirmBtn");
const titleInput = document.getElementById("modal-window__title");
const descriptionInput = document.getElementById("modal-window__text");

function addTodo(title, description) {
    // Create TODO object and put it to the local storage
    // {id = '', title = '', state = 'TODO, In Progress, DONE' etc}
    alert(title);
    alert(description)
    alert(generateId());
    alert(getCurentDate());
    alert("Not done");
}

function generateId() {
    return 1;
}

function getCurentDate() {
    return new Date();
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
