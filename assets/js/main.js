import deleteWorningWindow from "./deleteWorningWindow.js";
import getRegistrationData from "./api/getRegistrationData.js";
import buildFilter from "./buildFilter.js";
import { ModalEnterWindow, ModalCardWindow } from "./classes/modals.js";
import Button from "./classes/button.js";
import DragAndDrop from "./classes/drag_drop.js";
import deleteCardAtAPI from "./api/deleteCardAPI.js";
import getOneCard from "./api/getOneCard.js";
import { ModalCardiologistForm, ModalDentistForm, ModalTherapistForm } from "./forms.js";
import valuesFormTherapist  from "./valuesFormDoctors/valuesFormTherapist.js";
import valuesFormDantist from "./valuesFormDoctors/valuesFormDantist.js";
import valuesFormCardiologist from "./valuesFormDoctors/valuesFormCardiologist.js"


//
// Create the First page
let body = document.querySelector("body");
let headerBackground = document.querySelector(".header-background");
let main = document.querySelector("main");
let header = document.querySelector(".header");

let btnWrapper = document.createElement("div");
btnWrapper.classList.add("btn-wrapper");

const logInBtn = new Button();
const logInBtnElement = logInBtn.createButton();
logInBtnElement.classList.add("button-log-in");
logInBtnElement.textContent = "ВХІД";
header.append(btnWrapper);
btnWrapper.append(logInBtnElement);

let isRequesting = false;
let isLoggedIn = false;
let createNewVisitButton = null;

//
// Create the log-in window
logInBtnElement.addEventListener("click", openWindow);
function openWindow() {
  if (isRequesting || isLoggedIn) return;
  isRequesting = true;

  let logInWindow = new ModalEnterWindow(main, "АВТОРИЗАЦІЯ");
  logInWindow.open();

  logInBtnElement.style.display = "none";
  headerBackground.style.backgroundColor = "rgb(219, 219, 219)";
  body.style.backgroundColor = "rgb(219, 219, 219)";
  isRequesting = false;

  const enterBtn = document.querySelector(".enter-btn");
  enterBtn.addEventListener("click", enterToTheSystem);

  // take login / password and if "ok" - enter to the system
  function enterToTheSystem() {
    const inputLogin = document.querySelector(".input-login");
    const inputPassword = document.querySelector(".input-password");
    const window = document.querySelector(".window");

    // login API request
    async function takeToken() {
      try {
        let response = await fetch(
          "https://ajax.test-danit.com/api/v2/cards/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: inputLogin.value,
              password: inputPassword.value,
            }),
          }
        );

        if (response.status === 200) {
          isLoggedIn = true;
          let data = response.text().then((data) => {
            localStorage.setItem("login", inputLogin.value);
            localStorage.setItem("password", inputPassword.value);
          });

          logInWindow.close();
          headerBackground.style.backgroundColor = "rgb(162, 204, 252)";
          body.style.backgroundColor = "rgb(190, 220, 255)";
          createPageAfterLogIn(inputLogin.value, inputPassword.value);
        } else {
          inputLogin.classList.add("input-worning");
          inputPassword.classList.add("input-worning");
          const worningWindow = document.createElement("div");
          worningWindow.classList.add("worning-window");
          worningWindow.textContent =
            "Дані не введено або введено некоректно. Будь ласка, повторіть спробу";
          window.append(worningWindow);

          setTimeout(deleteWorningWindow, 3000);
        }
      } catch (error) {
        console.log("Помилка:");
        console.log(error);
      }
    }
    takeToken();
  }

  // for closing the window
  document.addEventListener("click", closeWindow);
  function closeWindow(event) {
    let targetElement = event.target;
    let window = document.querySelector(".window-log-in");

    if (!window) {
      return;
    } else if (
      !window.contains(targetElement) &&
      !targetElement.classList.contains("button-log-in")
    ) {
      logInWindow.close();
      let enterBtn = document.querySelector(".button-log-in");
      enterBtn.style.display = "flex";

      logInBtnElement.addEventListener("click", openWindow);
      headerBackground.style.backgroundColor = "rgb(162, 204, 252)";
      body.style.backgroundColor = "rgb(190, 220, 255)";

      isRequesting = false;
    }
  }
}

// create the page after log-in
function createPageAfterLogIn(login, password) {
  if (!createNewVisitButton) {
    const visitBtn = new Button();
    createNewVisitButton = visitBtn.createButton();
    createNewVisitButton.classList.add("button-create-visit");
    createNewVisitButton.textContent = "НОВИЙ ВІЗИТ";
    btnWrapper.append(createNewVisitButton);
    createNewVisitButton.addEventListener("click", createWindowContent);

    // cards rendering
    let cardsWrapper = document.createElement("div");
    let cardsConteiner = document.createElement("div");
    cardsWrapper.classList.add("cards-wrapper");
    cardsConteiner.classList.add("conteiner__cards");

    // add paragraph with text "картки відсутні"
        let paragraph = document.createElement('p');
        cardsConteiner.prepend(paragraph);
        paragraph.textContent = "Картки відсутні";
        paragraph.id = 'paragraphText';


    // filter rendering
    buildFilter(main, cardsConteiner);

    // Drag & Drop
    const dragAndDrop = new DragAndDrop(cardsConteiner);
    dragAndDrop.init();

    // Функція фільтрації даних
    let filterDescription = document.querySelector(".filter-description");
    let filterUrgency = document.querySelector(".filter-urgency");
    let filterStatus = document.querySelector(".filter-status");

    function filterData(event) {
      event.preventDefault();
      // Отримати значення з полів вводу та вибору
      const descriptionFilter = filterDescription.value.trim();
      const urgencyFilter =
        filterUrgency.options[filterUrgency.options.selectedIndex].textContent;
      const statusFilter =
        filterStatus.options[filterStatus.options.selectedIndex].textContent;

      // Отримати всі картки для фільтрації
      const cards = document.querySelectorAll(".card");

      // Проходження крізь всі картки і приховування тих, що не відповідають фільтру
      cards.forEach((card) => {
        const description = card
          .querySelector(".card__title")
          .textContent.trim();

        const urgency = card.querySelector(".card__changeUrgency").textContent;

        const status = card.querySelector(".card__changeStatus").textContent;

        const descriptionMatch =
          descriptionFilter === "" || description.includes(descriptionFilter);
        const urgencyMatch =
          urgencyFilter === "Всі" || urgency.includes(urgencyFilter);
        const statusMatch =
          statusFilter === "Всі" || status.includes(statusFilter);

        if (descriptionMatch && urgencyMatch && statusMatch) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
      return false;
    }

    filterDescription.addEventListener("input", filterData);
    filterUrgency.addEventListener("change", filterData);
    filterStatus.addEventListener("change", filterData);

    getRegistrationData(login, password);
  }
}

// create the visit window
function createWindowContent() {
  if (isRequesting || !isLoggedIn) {
    console.log("Condition check:", isRequesting, isLoggedIn);
    return;
  }
  isRequesting = true;

  const createWindow = new ModalCardWindow(main, "НОВИЙ ВІЗИТ");
  createWindow.open();

  let button = document.querySelector(".button-create-visit");
  let window = document.querySelector(".window-create-doctor");
  let conteinerCards = document.querySelector(".conteiner__cards");
  let filterWrapper = document.querySelector(".filter-wrapper");

  // close The New visit window
  if (createWindow) {
    setTimeout(() => {
      document.addEventListener("click", closeModalWindow);
      button.classList.add("hidden");
      conteinerCards.style.display = "none";
      filterWrapper.style.display = "none";
    }, 0);
  }

  function closeModalWindow(event) {
    const targetElement = event.target;

    if (createWindow && !window.contains(targetElement)) {
      createWindow.close();
      button.classList.remove("hidden");
      conteinerCards.style.display = "flex";
      filterWrapper.style.display = "flex";
      document.removeEventListener("click", closeModalWindow);
    }
  }
  isRequesting = false;
}
//

// go ahead after local storage
window.addEventListener("DOMContentLoaded", function () {
  let storedLogin = localStorage.getItem("login");
  let storedPassword = localStorage.getItem("password");
  if (storedLogin && storedPassword) {
    logInBtnElement.style.display = "none";
    headerBackground.style.backgroundColor = "rgb(162, 204, 252)";
    body.style.backgroundColor = "rgb(190, 220, 255)";
    isLoggedIn = true;
    createPageAfterLogIn();
  }
});


// Видалення карток

let cardsOfMain = document.querySelector('main')

cardsOfMain.addEventListener('click', function(event){
// змінна з номером картки, для delete

  let arr = event.target.classList
    for (let e of arr){
      if(e === "cross"){
        let card = event.target.closest('.card')
        
        // виклик функциї видаленняб згідно номера
        deleteCardAtAPI(card.id) 
      }
    }
  })

  // Метод редагування


cardsOfMain.addEventListener('click', 
async function (event){
  //  відслідковуємо card та його id,
  //  де відбувся клік на кнопку "редагувати"
  if(event.target.className === "card__btn-rewrite"){
    let card = event.target.closest('.card')
    console.log(card.id)
    // запит данних з API про картку
    // данні про картку в objcard
    let objcard = await getOneCard (card.id)
    console.log(objcard.doc);
// створення форми редагування
    let modalForm;
  //  фільтрація, згідно вдастивості objcard.doc
      if(objcard.doc === "Кардіолог"){

        const createWindow = new ModalCardWindow(header, "Змінити візит");
        createWindow.open();      
          //  фіксація значення у випадаючому списку вже обранного лікаря
          document.querySelector('.select-main').value = objcard.doc;
          // прибираємо наявні блоки при виклиці вікна редагування картки
          document.querySelector('.filter-wrapper').style.display = "none";
          document.querySelector('.button-create-visit').style.display = "none";
          document.querySelector('.conteiner__cards').style.display = "none";
          document.querySelector('.logo-wrapper').style.display = "none";

        modalForm = new ModalCardiologistForm()
        // modalForm.createCardiologistForm()

        const a = document.querySelector('.visit-form')
        console.log(a)
        a.append(modalForm.form.formElement)
        valuesFormCardiologist(objcard)

      }
      if(objcard.doc === "Стоматолог"){
        const createWindow = new ModalCardWindow(header, "Змінити візит");
        createWindow.open();      
          //  фіксація значення у випадаючому списку вже обранного лікаря
          document.querySelector('.select-main').value = objcard.doc;
          // прибираємо наявні блоки при виклиці вікна редагування картки
          document.querySelector('.filter-wrapper').style.display = "none";
          document.querySelector('.button-create-visit').style.display = "none";
          document.querySelector('.conteiner__cards').style.display = "none";
          document.querySelector('.logo-wrapper').style.display = "none";

        modalForm = new ModalDentistForm()
        // modalForm.createCardiologistForm()

        const a = document.querySelector('.visit-form')
        console.log(a)
        a.append(modalForm.form.formElement)
        valuesFormDantist(objcard)
      }

      if(objcard.doc === "Терапевт"){
        const createWindow = new ModalCardWindow(header, "Змінити візит");
        createWindow.open();      
          //  фіксація значення у випадаючому списку вже обранного лікаря
          document.querySelector('.select-main').value = objcard.doc;
          // прибираємо наявні блоки при виклиці вікна редагування картки
          document.querySelector('.filter-wrapper').style.display = "none";
          document.querySelector('.button-create-visit').style.display = "none";
          document.querySelector('.conteiner__cards').style.display = "none";
          document.querySelector('.logo-wrapper').style.display = "none";

        modalForm = new ModalTherapistForm()
        // modalForm.form.formElement.

        const a = document.querySelector('.visit-form')
        console.log(a)
        a.append(modalForm.form.formElement)
        valuesFormTherapist(objcard)
      }
    }
})


        // createDoctorForm();
        // console.log(modalForm.createDoctorForm("B", "W"));
        // modalForm.createDoctorForm("B", "W")
        // createWindow.handleSelectChange.modalForm = `${objcard.doc}`;


    // objcard.then(data => card1=data)
    // console.log(objcard.data)
    //     createWindow.handleSelectChange.value = `${objcard.doc}`;
    //     modalForm.createDoctorForm(objcard.goalVisit, objcard.description)
        // console.log(createDoctorForm())

// console.log(createCardiologistForm())
        // age:"60"
        // bmi:"1"
        // changeStatus:"Відкритий"
        // changeUrgency:"Звичайна"
        // descriptionVisit:"cssc"
        // doc:"Кардіолог"
        // goalVisit:"Плановий огляд"
        // heartDisease:"cssc"
        // id:186711
        // namePatient:"Івашов Ігор Хомич "
        // pressure:"120/60"

    // handleSelectChange(objcard.doc)
    // objcard.then(data => card1=data)
    // console.log(objcard.data)
    // розкр проміс
    // витягую креат віндов 
    // наповнюю форму з промісу


    // arrayCards.forEach(elem => {
    //   if (elem.id === card.id) {
    //     console.log(elem)
        
    //   }
    // })