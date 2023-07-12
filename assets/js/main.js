//
// imports
import { deleteWorningWindow, createVisitBtn } from "./functions.js";

let login = "1";
let password = "1";

//
// Create log-in button
let body = document.querySelector("body");
let headerBackground = document.querySelector(".header-background");
let header = document.querySelector(".header");
let logInBtn = document.createElement("div");
logInBtn.classList.add("button");
logInBtn.classList.add("button-log-in");
logInBtn.textContent = "ВХІД";
header.append(logInBtn);

//
// Create log-in window
let container = document.querySelector("main");
let logInWindow = document.createElement("div");
logInWindow.classList.add("log-in-window-before");
container.append(logInWindow);

// open log-in window
let isRequesting = false; // a flag for button
logInBtn.addEventListener("click", function () {
  if (isRequesting) return; // after this the button doesn't work
  isRequesting = true;

  logInWindow.classList.add("log-in-window");

  let headline = document.createElement("p");
  headline.classList.add("log-in-window-header");
  headline.textContent = "Введіть логін та пароль";
  logInWindow.append(headline);

  let inputEmail = document.createElement("input");
  inputEmail.setAttribute("placeholder", "email");
  inputEmail.setAttribute("type", "text");
  inputEmail.classList.add("input-email");
  headline.after(inputEmail);

  let inputPassword = document.createElement("input");
  inputPassword.setAttribute("placeholder", "password");
  inputPassword.setAttribute("type", "password");
  inputPassword.classList.add("input-password");
  inputEmail.after(inputPassword);

  let enterBtn = document.createElement("div");
  enterBtn.classList.add("button");
  enterBtn.classList.add("enter-btn");
  enterBtn.textContent = "УВІЙТИ";
  inputPassword.after(enterBtn);

  logInBtn.classList.add("not-visiable");
  logInBtn.textContent = "";

  // chenge the main style
  headerBackground.style.backgroundColor = "rgb(228, 228, 228)";
  body.style.backgroundColor = "rgb(228, 228, 228)";

  // go to the system
  enterBtn.addEventListener("click", enterToTheSystem);
  function enterToTheSystem() {
    if (inputEmail.value !== login || inputPassword.value !== password) {
      inputEmail.classList.add("input-worning");
      inputPassword.classList.add("input-worning");
      // let worningWindowWrapper = document.createElement("div");
      let worningWindow = document.createElement("div");
      let cardsWrapper = document.querySelector(".cards-wrapper");
      worningWindow.classList.add("worning-window");
      worningWindow.textContent =
        "Невведені або некоректно введені дані. Будь ласка, повторіть спробу";
      cardsWrapper.append(worningWindow);

      setTimeout(deleteWorningWindow, 3000);
    } else {
      console.log("Ok");
      createWindowAfterLogIn(header);

      // back to the main style
      logInBtn.remove();
      logInWindow.remove();
      headerBackground.style.backgroundColor = "rgb(162, 204, 252)";
      body.style.backgroundColor = "rgb(190, 220, 255)";
      let cardsWrapper = document.querySelector(".cards-wrapper ");
      cardsWrapper.textContent = "Жодного візита не додано";
    }
  }
});

//
// Close the log-in window
document.addEventListener("click", function (event) {
  let targetElement = event.target;

  if (
    !logInWindow.contains(targetElement) &&
    !targetElement.classList.contains("button-log-in")
  ) {
    logInWindow.classList.remove("log-in-window");
    let worningWindow = document.querySelector(".worning-window");
    if (worningWindow) {
      worningWindow.remove();
    }
    let headline = document.querySelector(".log-in-window-header");
    if (headline) {
      headline.remove();
    }
    let inputPassword = document.querySelector(".input-password");
    if (inputPassword) {
      inputPassword.remove();
    }
    let inputEmail = document.querySelector(".input-email");
    if (inputEmail) {
      inputEmail.remove();
    }
    let enterBtn = document.querySelector(".enter-btn");
    if (enterBtn) {
      enterBtn.remove();
    }
    logInBtn.classList.remove("not-visiable");
    logInBtn.textContent = "ВХІД";
    headerBackground.style.backgroundColor = "rgb(162, 204, 252)";
    body.style.backgroundColor = "rgb(190, 220, 255)";

    isRequesting = false; // the button is working again
  }
});

//
// Create the window after log-In
function createWindowAfterLogIn(header) {
  // create btn "Create a visit"
  createVisitBtn(header);
  let visitBtn = document.querySelector(".button-create-visit");
  visitBtn.addEventListener("click", createWindowContent);

  let isRequesting = false;
  function createWindowContent() {
    if (isRequesting) return;
    isRequesting = true;

    //
    // ! Here is your code for a window, that creates visits -----------------------------------------------------
    //
  }
}
