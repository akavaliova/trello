"use strict"

// Open and close modal window
const overlayWrap = document.getElementById("overlay");
const modalEditBtn = document.getElementById("trello__todo-active--editBtn");
const addTodoBtn = document.getElementById("trello__todo-active--addTodoBtn");
const modalCancelBtn = document.getElementById("modal-window__cancelBtn");
const modalConfirmBtn = document.getElementById("modal-window__confirmBtn");



modalEditBtn.addEventListener("click", function () {
    overlayWrap.classList.add("active");
})

addTodoBtn.addEventListener("click", function () {
    overlayWrap.classList.add("active");
})

modalCancelBtn.addEventListener("click", function () {
    overlayWrap.classList.remove("active");
})
//временно:
modalConfirmBtn.addEventListener("click", function () {
    const descriptionText = document.getElementById("modal-window__text").value; 
    if(!!descriptionText){
        console.log(descriptionText);  // сохраняю в консоль введенный в поле input текст
        overlayWrap.classList.remove("active"); // закрываю модальное окно
        // не работает, не очищает поле input!!!!!!!!!!!!!!!!!!!!!!!!!!
        descriptionText.value = "";
    }
})



//warning modal window
const transferBtn = document.getElementById("trello__todo-active--transferBtn");
const warningOverlay = document.getElementById("overlayWarning");
const warningCancelBtn = document.getElementById("modal-warning__cancelBtn");
const warningConfirmBtn = document.getElementById("modal-warning__confirmBtn");


transferBtn.addEventListener("click", function () {
    warningOverlay.classList.add("show");
})



warningCancelBtn.addEventListener("click", function () {
    warningOverlay.classList.remove("show");
})

//временно

warningConfirmBtn.addEventListener("click", function () {
    console.log("I agree to add 6 more cases");
    warningOverlay.classList.remove("show");
})

//Clock
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
