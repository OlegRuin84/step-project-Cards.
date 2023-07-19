import { deleteWorningWindow } from "./functions.js";
import { getToken2 } from "./api/api.js";
import {
  Button,
  ModalEnterWindow,
  ModalCardWindow,
  VisitCardiologist,
} from "./classes.js";

//
// Create log-in button
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

window.addEventListener("DOMContentLoaded", function () {
  let storedLogin = localStorage.getItem("login");
  let storedPassword = localStorage.getItem("password");
  if (storedLogin && storedPassword) {
    logInBtnElement.style.display = "none";
    headerBackground.style.backgroundColor = "rgb(162, 204, 252)";
    body.style.backgroundColor = "rgb(190, 220, 255)";
    isLoggedIn = true;
    createWindowAfterLogIn(header);
  }
});

function createWindowContent() {
  let button = document.querySelector(".button-create-visit");
  let conteinerCards = document.querySelector(".conteiner__cards");
  let filterWrapper = document.querySelector(".filter-wrapper");
  if (isRequesting || !isLoggedIn) {
    console.log("Condition check:", isRequesting, isLoggedIn);
    return;
  }
  isRequesting = true;

  const createWindow = new ModalCardWindow(header, "НОВИЙ ВІЗИТ");
  createWindow.open();
  conteinerCards.style.display = "none";
  filterWrapper.style.display = "none";

  // close the window
  const newWindow = document.querySelector(".window-create-doctor");
  if (newWindow) {
    setTimeout(() => {
      document.addEventListener("click", closeModalWindow);
      button.classList.add("hidden");
    }, 0);
  }
  function closeModalWindow(event) {
    const targetElement = event.target;

    if (newWindow && !newWindow.contains(targetElement)) {
      newWindow.remove();
      button.classList.remove("hidden");
      conteinerCards.style.display = "flex";
      filterWrapper.style.display = "flex";
      document.removeEventListener("click", closeModalWindow);
    }
  }
  isRequesting = false;
}
//

//
// Create log-in window
logInBtnElement.addEventListener("click", openWindow);
function openWindow() {
  if (isRequesting || isLoggedIn) return;
  isRequesting = true;

  let logInWindow = new ModalEnterWindow(header, "АВТОРИЗАЦІЯ");
  logInWindow.open();

  logInBtnElement.style.display = "none";

  headerBackground.style.backgroundColor = "rgb(219, 219, 219)";
  body.style.backgroundColor = "rgb(219, 219, 219)";
  isRequesting = false;

  const enterBtn = document.querySelector(".enter-btn");
  enterBtn.addEventListener("click", enterToTheSystem);

  function enterToTheSystem() {
    const inputLogin = document.querySelector(".input-login");
    const inputPassword = document.querySelector(".input-password");
    // ! ???
    const window = document.querySelector(".window");
    // ! ???

    // TODO: Login API request
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

          // createWindowAfterLogIn(header);
          createWindowAfterLogIn(inputLogin.value, inputPassword.value);
        } else {
          // delete
          alert(
            "ДРУЗІ! Вводимо логін та пароль, які вводили при реєстрації на сервері"
          );

          inputLogin.classList.add("input-worning");
          inputPassword.classList.add("input-worning");
          const worningWindow = document.createElement("div");
          worningWindow.classList.add("worning-window");
          worningWindow.textContent =
            "Невведені або некоректно введені дані. Будь ласка, повторіть спробу";
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
}

function createWindowAfterLogIn(login, password) {
  if (!createNewVisitButton) {
    const visitBtn = new Button();
    createNewVisitButton = visitBtn.createButton();
    createNewVisitButton.classList.add("button-create-visit");
    createNewVisitButton.textContent = "НОВИЙ ВІЗИТ";
    btnWrapper.append(createNewVisitButton);
    createNewVisitButton.addEventListener("click", createWindowContent);

    // for filtering
    let filterWrapper = document.createElement("div");
    let filterDescription = document.createElement("input");
    let filterStatus = document.createElement("select");
    let filterStatusOpen = document.createElement("option");
    let filterStatusDone = document.createElement("option");
    let filterUrgency = document.createElement("select");
    let filterUrgencyHigh = document.createElement("option");
    let filterUrgencyNormal = document.createElement("option");
    let filterUrgencyLow = document.createElement("option");
    let buttonInput = document.createElement("input");

    filterWrapper.classList.add("container");
    filterWrapper.classList.add("filter-wrapper");
    filterDescription.classList.add("filter-description");
    filterStatus.classList.add("select");
    filterStatus.classList.add("filter-status");
    filterStatusOpen.setAttribute("value", "Open");
    filterStatusDone.setAttribute("value", "Done");
    filterStatusOpen.textContent = "Чинна";
    filterStatusDone.textContent = "Закрита";
    filterUrgency.classList.add("filter-urgency");
    filterUrgency.classList.add("select");
    filterUrgencyHigh.setAttribute("value", "High");
    filterUrgencyNormal.setAttribute("value", "Norma");
    filterUrgencyLow.setAttribute("value", "Low");
    filterUrgencyLow.textContent = "Звичайна";
    filterUrgencyNormal.textContent = "Приоритетна";
    filterUrgencyHigh.textContent = "Невідкладна";
    buttonInput.type = "button";
    buttonInput.value = "Искать";
    buttonInput.classList.add("section__form-btn");

    filterWrapper.prepend(filterDescription);
    filterStatus.prepend(filterStatusOpen);
    filterStatus.prepend(filterStatusDone);
    filterDescription.after(filterStatus);
    filterUrgency.prepend(filterUrgencyHigh);
    filterUrgency.prepend(filterUrgencyNormal);
    filterUrgency.prepend(filterUrgencyLow);
    filterStatus.after(filterUrgency);
    filterWrapper.append(buttonInput);

    // for cards rendering
    let cardsWrapper = document.createElement("div");
    let cardsConteiner = document.createElement("div");
    cardsWrapper.classList.add("cards-wrapper");
    cardsConteiner.classList.add("conteiner__cards");

    // main.prepend(cardsWrapper);
    // cardsWrapper.prepend(cardsConteiner);
    main.prepend(filterWrapper);
    filterWrapper.after(cardsConteiner);

    // Функція фільтрації даних
    function filterData(event) {
      event.preventDefault();
      // Отримати значення з полів вводу та вибору
      const descriptionFilter = filterDescription.value.trim();
      const statusFilter = filterStatus.value;
      const urgencyFilter = filterUrgency.value;

      // Отримати всі картки для фільтрації
      const cards = document.querySelectorAll(".conteiner__cards .card");

      // Проходження крізь всі картки і приховування тих, що не відповідають фільтру
      cards.forEach((card) => {
        const description = card
          .querySelector(".card__descriptionVisit")
          .textContent.trim();
        const urgency = card
          .querySelector(".card__changeUrgency")
          .textContent.trim();
        const doc = card.querySelector(".card__doc").textContent.trim();

        const descriptionMatch =
          descriptionFilter === "" || description.includes(descriptionFilter);
        const urgencyMatch = statusFilter === "" || urgency === statusFilter;
        const docMatch = urgencyFilter === "" || doc === urgencyFilter;

        if (descriptionMatch || urgencyMatch || docMatch) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    }

    // Додайте обробник події для кнопки "Искать"
    buttonInput.addEventListener("click", filterData);

    getToken2(login, password);
  }
}

// Close the log-in window
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
    window.remove();
    let enterBtn = document.querySelector(".button-log-in");
    enterBtn.style.display = "flex";

    logInBtnElement.addEventListener("click", openWindow);
    headerBackground.style.backgroundColor = "rgb(162, 204, 252)";
    body.style.backgroundColor = "rgb(190, 220, 255)";

    isRequesting = false;
  }
}

window.addEventListener("beforeunload", function () {
  let storedLogin = localStorage.getItem("login");
  let storedPassword = localStorage.getItem("password");
  if (storedLogin && storedPassword) {
    const visitBtn = new Button();
    const visitBtnElement = visitBtn.createButton();
    visitBtnElement.classList.add("button-create-visit");
    visitBtnElement.textContent = "НОВИЙ ВІЗИТ";
    btnWrapper.append(visitBtnElement);

    visitBtnElement.addEventListener("click", createWindowContent);
  }
});
