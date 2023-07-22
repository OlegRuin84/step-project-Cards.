import { deleteWorningWindow, createFilter } from "./functions.js";
import { getToken2 } from "./api/api.js";
import { Button, ModalEnterWindow, ModalCardWindow } from "./classes.js";

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

// get local storage data - download the page
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

// create the log-in window
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
    const window = document.querySelector(".window");

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

          createPageAfterLogIn(inputLogin.value, inputPassword.value);
        } else {
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

// create the page after log-in
function createPageAfterLogIn(login, password) {
  if (!createNewVisitButton) {
    // let conteinerCards = document.querySelector(".conteiner__cards");

    const visitBtn = new Button();
    createNewVisitButton = visitBtn.createButton();
    createNewVisitButton.classList.add("button-create-visit");
    createNewVisitButton.textContent = "НОВИЙ ВІЗИТ";
    btnWrapper.append(createNewVisitButton);
    createNewVisitButton.addEventListener("click", createWindowContent);

    // for cards rendering
    let cardsWrapper = document.createElement("div");
    let cardsConteiner = document.createElement("div");
    cardsWrapper.classList.add("cards-wrapper");
    cardsConteiner.classList.add("conteiner__cards");

    // create the filter form
    createFilter(main, cardsConteiner);
    let filterDescription = document.querySelector(".filter-description");
    let filterUrgency = document.querySelector(".filter-urgency");
    let filterStatus = document.querySelector(".filter-status");

    // Функція фільтрації даних
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
          card.classList.remove("card-hidden");
        } else {
          card.classList.add("card-hidden");
        }
      });
      return false;
    }

    filterDescription.addEventListener("input", filterData);
    filterUrgency.addEventListener("change", filterData);
    filterStatus.addEventListener("change", filterData);

    // TODO text
    async function isServerEmpty() {
      let response = await fetch(`https://ajax.test-danit.com/api/v2/cards/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await response.json();
      console.log(data.length);
      if (data.length === 0) {
        let text = document.createElement("div");
        text.classList.add("text");
        text.textContent = "Картки відвідувань відсутні";
        cardsConteiner.prepend(text);
      }
    }
    isServerEmpty();
    // TODO

    getToken2(login, password);
  }
}

// create modal window visit
function createWindowContent() {
  if (isRequesting || !isLoggedIn) {
    console.log("Condition check:", isRequesting, isLoggedIn);
    return;
  }
  isRequesting = true;

  const createWindow = new ModalCardWindow(header, "НОВИЙ ВІЗИТ");
  createWindow.open();

  let button = document.querySelector(".button-create-visit");
  let window = document.querySelector(".window-create-doctor");
  let conteinerCards = document.querySelector(".conteiner__cards");
  let filterWrapper = document.querySelector(".filter-wrapper");

  // close the window
  if (window) {
    setTimeout(() => {
      document.addEventListener("click", closeModalWindow);
      button.classList.add("hidden");
      conteinerCards.style.display = "none";
      filterWrapper.style.display = "none";
    }, 0);
  }
  function closeModalWindow(event) {
    const targetElement = event.target;

    if (window && !window.contains(targetElement)) {
      window.remove();
      button.classList.remove("hidden");
      conteinerCards.style.display = "flex";
      filterWrapper.style.display = "flex";
      document.removeEventListener("click", closeModalWindow);
    }
  }
  isRequesting = false;
}
