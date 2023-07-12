//
// imports
import { deleteWorningWindow, createVisitBtn } from "./functions.js";
import { ModalCardiologist } from "./classes.js";

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
      createWindowAfterLogIn(header);

      // back to the main style
      logInBtn.remove();
      logInWindow.remove();
      headerBackground.style.backgroundColor = "rgb(162, 204, 252)";
      body.style.backgroundColor = "rgb(190, 220, 255)";
      let cardsWrapper = document.querySelector(".cards-wrapper ");
      let text = document.createElement("p");
      text.classList.add("text-about-nothing");
      text.textContent = "Жодного візита не додано";
      cardsWrapper.append(text);
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
// Create the modal window (for creating cards)
function createWindowAfterLogIn(header) {
  // create btn "Create a visit"
  createVisitBtn(header);
  let visitBtn = document.querySelector(".button-create-visit");
  let isRequesting = false;
  visitBtn.addEventListener("click", createWindowContent);
  // create modal window
  function createWindowContent() {
    if (isRequesting) return; // after this the button doesn't work
    isRequesting = true;

    let text = document.querySelector(".text-about-nothing");
    text.remove();

    let windowCreateCardWrapper = document.createElement("div");
    let headline = document.createElement("p");
    let inputWrapper = document.createElement("div");
    let select = document.createElement("select");
    let option0 = document.createElement("option");
    let optionOne = document.createElement("option");
    let optionTwo = document.createElement("option");
    let optionThree = document.createElement("option");

    windowCreateCardWrapper.classList.add("window-create-card-wrapper");
    headline.classList.add("headline");
    inputWrapper.classList.add("input-wrapper");
    select.classList.add("select");
    option0.classList.add("option-none");
    optionOne.classList.add("option");
    optionTwo.classList.add("option");
    optionThree.classList.add("option");
    inputWrapper.classList.add("input-wrapper");

    headline.textContent = "Новий візит";
    option0.setAttribute("value", "none");
    option0.textContent = "-- оберіть лікаря --";
    optionOne.setAttribute("value", "Кардіолог");
    optionOne.textContent = "Кардіолог";
    optionTwo.setAttribute("value", "Стоматолог");
    optionTwo.textContent = "Стоматолог";
    optionThree.setAttribute("value", "Терапевт");
    optionThree.textContent = "Терапевт";

    let container = document.querySelector("main");
    container.prepend(windowCreateCardWrapper);
    windowCreateCardWrapper.append(headline);
    windowCreateCardWrapper.append(inputWrapper);
    inputWrapper.append(select);
    select.append(option0);
    option0.after(optionOne);
    optionOne.after(optionTwo);
    optionTwo.after(optionThree);

    select.addEventListener("change", function showOptions() {
      let isWrapper = document.querySelector(".doctors-inputs-wrapper");

      if (select.value === "Кардіолог") {
        if (isWrapper) {
          isWrapper.remove();
          createDoctorCardWrapper();
          createCardiolog();
        } else {
          createDoctorCardWrapper();
          createCardiolog();
        }
      } else if (select.value === "Стоматолог") {
        if (isWrapper) {
          isWrapper.remove();
          createDoctorCardWrapper();
          createDentist();
        } else {
          createDoctorCardWrapper();
          createDentist();
        }
      } else if (select.value === "Терапевт") {
        if (isWrapper) {
          isWrapper.remove();
          createDoctorCardWrapper();
          createTherapist();
        } else {
          createDoctorCardWrapper();
          createTherapist();
        }
      } else {
        if (isWrapper) {
          isWrapper.remove();
        }
      }
    });

    // card wrapper pattern
    function createDoctorCardWrapper() {
      let wrapper = document.createElement("div");
      wrapper.classList.add("doctors-inputs-wrapper");
      select.after(wrapper);
    }

    // all DOCTORS pattern
    function createDoctor() {
      let wrapper = document.querySelector(".doctors-inputs-wrapper");
      let inputGoal = document.createElement("input");
      let inputDesc = document.createElement("textarea");
      let selectUrgency = document.createElement("select");
      let option0 = document.createElement("option");
      let optionOne = document.createElement("option");
      let optionTwo = document.createElement("option");
      let optionThree = document.createElement("option");
      let name = document.createElement("input");

      inputGoal.classList.add("input-goal");
      inputDesc.classList.add("input-desc");
      selectUrgency.classList.add("select-urgency");
      name.classList.add("input-name");
      option0.classList.add("option-none");
      optionOne.classList.add("option-one");
      optionTwo.classList.add("option-two");
      optionThree.classList.add("option-three");

      inputGoal.setAttribute("placeholder", "Мета візиту");
      inputDesc.setAttribute("placeholder", "Опис візиту");
      name.setAttribute("placeholder", "ПІБ");

      option0.setAttribute("value", "- none -");
      option0.textContent = "-- Терміновість візиту --";
      optionOne.setAttribute("value", "Звичайна");
      optionOne.textContent = "Звичайна";
      optionTwo.setAttribute("value", "Приоритетна");
      optionTwo.textContent = "Приоритетна";
      optionThree.setAttribute("value", "Невідкладна");
      optionThree.textContent = "Невідкладна";

      wrapper.append(inputGoal);
      inputGoal.after(inputDesc);
      selectUrgency.append(option0);
      option0.after(optionOne);
      optionOne.after(optionTwo);
      optionTwo.after(optionThree);
      inputDesc.after(selectUrgency);
      selectUrgency.after(name);
    }

    // CARDIOLOGIST pattern
    function createCardiolog() {
      createDoctor();

      let wrapper = document.querySelector(".doctors-inputs-wrapper");
      let pressure = document.createElement("input");
      let bmi = document.createElement("input");
      let heartDiseases = document.createElement("textarea");
      let age = document.createElement("input");
      let btn = document.createElement("div");

      pressure.setAttribute("placeholder", "Звичайний тиск");
      bmi.setAttribute("placeholder", "Індекс маси тіла");
      heartDiseases.setAttribute(
        "placeholder",
        "Перенесені захворювання серцево-судинної системи"
      );
      age.setAttribute("placeholder", "Вік");
      btn.textContent = "СТВОРИТИ";

      age.classList.add("input-age");
      pressure.classList.add("input-pressure");
      bmi.classList.add("input-bmi");
      heartDiseases.classList.add("input-heartDiseases");
      btn.classList.add("button");
      btn.classList.add("button-create-visit");
      btn.classList.add("button-create-card");

      wrapper.append(pressure);
      pressure.after(bmi);
      bmi.after(heartDiseases);
      heartDiseases.after(age);
      age.after(btn);

      btn.addEventListener("click", function () {
        let select = document.querySelector(".select").value;
        let goal = document.querySelector(".input-goal").value;
        let description = document.querySelector(".input-desc").value;
        let urgency = document.querySelector(".select-urgency").value;
        let name = document.querySelector(".input-name").value;
        let pressure = document.querySelector(".input-pressure").value;
        let bmi = document.querySelector(".input-bmi").value;
        let heartDiseases = document.querySelector(
          ".input-heartDiseases"
        ).value;
        let age = document.querySelector(".input-age").value;
        let newCards = new ModalCardiologist(
          select,
          goal,
          description,
          urgency,
          name,
          pressure,
          bmi,
          heartDiseases,
          age
        );
        console.log(newCards);
        newCards.postToTheServer(
          select,
          goal,
          description,
          urgency,
          name,
          pressure,
          bmi,
          heartDiseases,
          age
        );
      });
    }

    // DENTIST pattern
    function createDentist() {
      createDoctor();

      let wrapper = document.querySelector(".doctors-inputs-wrapper");
      let lastDate = document.createElement("input");
      let btn = document.createElement("div");

      lastDate.setAttribute("placeholder", "Дата останнього відвідування");
      lastDate.classList.add("last-date");
      btn.textContent = "СТВОРИТИ";
      btn.classList.add("button");
      btn.classList.add("button-create-visit");
      btn.classList.add("button-create-card");

      wrapper.append(lastDate);
      lastDate.after(btn);

      btn.addEventListener("click", function () {
        let select = document.querySelector(".select").value;
        let goal = document.querySelector(".input-goal").value;
        let description = document.querySelector(".input-desc").value;
        let urgency = document.querySelector(".select-urgency").value;
        let name = document.querySelector(".input-name").value;
        let lastDate = document.querySelector(".last-date").value;
        let newCards = new ModalCardiologist(
          select,
          goal,
          description,
          urgency,
          name,
          lastDate
        );
        console.log(newCards);
        newCards.postToTheServer(
          select,
          goal,
          description,
          urgency,
          name,
          lastDate
        );
      });
    }

    // THERAPIST pattern
    function createTherapist() {
      createDoctor();

      let wrapper = document.querySelector(".doctors-inputs-wrapper");
      let age = document.createElement("input");
      let btn = document.createElement("div");

      age.classList.add("input-age");
      age.setAttribute("placeholder", "Вік");
      btn.textContent = "СТВОРИТИ";
      btn.classList.add("button");
      btn.classList.add("button-create-visit");
      btn.classList.add("button-create-card");

      wrapper.append(age);
      age.after(btn);

      btn.addEventListener("click", function () {
        let select = document.querySelector(".select").value;
        let goal = document.querySelector(".input-goal").value;
        let description = document.querySelector(".input-desc").value;
        let urgency = document.querySelector(".select-urgency").value;
        let name = document.querySelector(".input-name").value;
        let age = document.querySelector(".input-age").value;
        let newCards = new ModalCardiologist(
          select,
          goal,
          description,
          urgency,
          name,
          age
        );
        console.log(newCards);
        newCards.postToTheServer(select, goal, description, urgency, name, age);
      });
    }
  }
}
