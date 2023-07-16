//
// imports
import { deleteWorningWindow } from "./functions.js";
import { Button, ModalEnterWindow, ModalCardWindow, VisitCardiologist} from "./classes.js";

// for testing
let login = "1";
let password = "1";

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

//
// Create log-in window
logInBtnElement.addEventListener("click", openWindow);
function openWindow() {
  if (isRequesting) return;
  isRequesting = true;

  let logInWindow = new ModalEnterWindow(header, "АВТОРИЗАЦІЯ");
  logInWindow.open();

  let button = document.querySelector(".button-log-in");
  button.remove();
  const logOutBtn = new Button();
  const logOutBtnElement = logOutBtn.createButton();
  logOutBtnElement.classList.add("button-log-out");
  logOutBtnElement.textContent = "ВИЙТИ";
  btnWrapper.append(logOutBtnElement);

  headerBackground.style.backgroundColor = "rgb(219, 219, 219)";
  body.style.backgroundColor = "rgb(219, 219, 219)";
  isRequesting = false;

  let enterBtn = document.querySelector(".enter-btn");
  enterBtn.addEventListener("click", enterToTheSystem);

  function enterToTheSystem() {
    let inputLogin = document.querySelector(".input-login");
    let inputPassword = document.querySelector(".input-password");
    let window = document.querySelector(".window");

    if (inputLogin.value !== login || inputPassword.value !== password) {
      inputLogin.classList.add("input-worning");
      inputPassword.classList.add("input-worning");
      let worningWindow = document.createElement("div");
      worningWindow.classList.add("worning-window");
      worningWindow.textContent =
        "Невведені або некоректно введені дані. Будь ласка, повторіть спробу";
      window.append(worningWindow);

      setTimeout(deleteWorningWindow, 3000);
    } else {
      createWindowAfterLogIn(header);
      // back to the main style
      logOutBtnElement.remove();
      logInWindow.close();
      headerBackground.style.backgroundColor = "rgb(162, 204, 252)";
      body.style.backgroundColor = "rgb(190, 220, 255)";
      let cardsWrapper = document.createElement("div");
      cardsWrapper.classList.add("cards-wrapper");
      let text = document.createElement("p");
      text.classList.add("text-about-nothing");
      text.textContent = "Жодного візита не додано";
      cardsWrapper.append(text);
      main.append(cardsWrapper);
    }
  }
}

// Close the log-in window
document.addEventListener("click", closeWindow);
function closeWindow(event) {
  let targetElement = event.target;
  let window = document.querySelector(".window");

  if (!window) {
    return;
  } else if (
    !window.contains(targetElement) &&
    !targetElement.classList.contains("button-log-in")
  ) {
    window.remove();
    let logOutBtnElement = document.querySelector(".button-log-out");
    logOutBtnElement.remove();
    const logInBtn = new Button();
    const logInBtnElement = logInBtn.createButton();
    logInBtnElement.classList.add("button-log-in");
    logInBtnElement.textContent = "ВХІД";
    header.append(logInBtnElement);

    logInBtnElement.addEventListener("click", openWindow);
    headerBackground.style.backgroundColor = "rgb(162, 204, 252)";
    body.style.backgroundColor = "rgb(190, 220, 255)";

    isRequesting = false;
  }
}

//
// Create the modal window (for creating cards)
function createWindowAfterLogIn() {
  // create btn "Create a visit"
  const visitBtn = new Button();
  const visitBtnElement = visitBtn.createButton();
  visitBtnElement.classList.add("button-create-visit");
  visitBtnElement.textContent = "НОВИЙ ВІЗИТ";
  btnWrapper.append(visitBtnElement);

  const outBtn = new Button();
  const outBtnElement = outBtn.createButton();
  outBtnElement.classList.add("button-log-in");
  outBtnElement.classList.add("out-button");
  outBtnElement.textContent = "ВИЙТИ";
  visitBtnElement.after(outBtnElement);
  let isRequesting = false;

  // button go out
  outBtnElement.addEventListener("click", goOut);
  function goOut() {
    let textContent = document.querySelector(".text-about-nothing");
    let window = document.querySelector(".window");
    if (textContent) {
      textContent.remove();
    } else if (window) {
      window.remove();
    }
    let visitBtn = document.querySelector(".button-create-visit");
    visitBtn.remove();
    let outButton = document.querySelector(".out-button");
    outButton.remove();

    const logInBtn = new Button();
    const logInBtnElement = logInBtn.createButton();
    logInBtnElement.classList.add("button-log-in");
    logInBtnElement.textContent = "ВХІД";
    header.append(btnWrapper);
    btnWrapper.append(logInBtnElement);
    logInBtnElement.addEventListener("click", openWindow);
  }

  let buttonCreateVisit = document.querySelector(".button-create-visit");
  buttonCreateVisit.addEventListener("click", createWindowContent);

  // create modal window
  function createWindowContent() {
    document.removeEventListener("click", closeWindow);

    if (isRequesting) return;
    isRequesting = true;

    let text = document.querySelector(".cards-wrapper");
    text.remove();

    let createWindow = new ModalCardWindow(header, "НОВИЙ ВІЗИТ");
    createWindow.open();
  }
}

// card__btn-more Listener

let conteinerCards = document.querySelector('.conteiner__cards')
// console.log(conteinerCards)
  conteinerCards.addEventListener('click', function(event){
  // console.log(event.target.closest('div').id)
  let div = event.target.closest('div').lastElementChild
  if(div.style.display === ""){
    div.style.display = "block"
  }else if(div.style.display === "block"){
    div.style.display = ""
  }
  })