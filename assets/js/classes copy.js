// 1 опція в селект

//
// imports
import { fetchData } from "./api/api.js";

// Classes for buttons
class Button {
  constructor(width = 140, height = 50) {
    this.width = width;
    this.height = height;
  }

  createButton() {
    const buttonElement = document.createElement("div");
    buttonElement.style.width = `${this.width}px`;
    buttonElement.style.height = `${this.height}px`;
    buttonElement.classList.add("button");
    return buttonElement;
  }
}

//
// Forms
class Form {
  constructor(style) {
    this.formElement = document.createElement("form");
    this.formElement.classList.add(`${style}`);
    this.buttonElement = null;
  }

  addInput(placeholderText, inputType, style) {
    const inputElement = document.createElement("input");
    inputElement.setAttribute("placeholder", `${placeholderText}`);
    inputElement.setAttribute("type", `${inputType}`);
    inputElement.classList.add(`${style}`);
    this.formElement.append(inputElement);
  }

  addTextarea(placeholderText, style) {
    const textareaElement = document.createElement("textarea");
    textareaElement.setAttribute("placeholder", `${placeholderText}`);
    textareaElement.classList.add(`${style}`);
    this.formElement.append(textareaElement);
  }

  addSelect(style) {
    const selectElement = document.createElement("select");
    const trimmedStyle = String(style).trim();
    selectElement.classList.add(trimmedStyle);
    this.formElement.append(selectElement);
    this.selectElement = selectElement;
  }

  addOption(style, value, content = value) {
    const optionElement = document.createElement("option");
    optionElement.setAttribute("value", `${value}`);
    optionElement.classList.add(`${style}`);
    optionElement.textContent = `${content}`;

    const lastOptionElement =
      this.selectElement.querySelector("option:last-child");
    if (lastOptionElement) {
      lastOptionElement.after(optionElement);
    } else {
      this.selectElement.append(optionElement);
    }
  }

  addButton(buttonText, buttonStyle) {
    const buttonElement = document.createElement("div");
    buttonElement.textContent = buttonText;
    buttonElement.classList.add("button");
    buttonElement.classList.add(`${buttonStyle}`);
    this.formElement.append(buttonElement);
  }

  clearFormElement() {
    while (this.formElement.firstChild) {
      this.formElement.firstChild.remove();
    }
  }

  addSelectElement() {
    const selectElement = document.createElement("select");
    selectElement.classList.add("select");
    this.formElement.append(selectElement);
  }

  setSelectElement(selectElement) {
    this.selectElement = selectElement; // Додайте метод setSelectElement
  }

  sendData(url) {
    const formElement = document.querySelector(".visit-form"); // виберіть форму, яку потрібно відправити
    const formData = new FormData(formElement);

    fetchData(url, "POST", formData)
      .then((data) => {
        console.log("Відповідь сервера:", data);
        this.renderCard(data);
      })
      .catch((error) => {
        console.error("Помилка відправки даних:", error);
      });
  }

  renderCard(data) {
    // Рендеринг карточки на основі даних
  }
}

//
// Modals
class Modal {
  constructor(element) {
    this.modalElement = document.createElement("div");
    this.modalElement.classList.add("window");
    element.append(this.modalElement);

    this.headline = document.createElement("h2");
    this.headline.classList.add("headline");
    this.modalElement.append(this.headline);
  }

  open() {
    this.modalElement.style.display = "flex";
  }

  close() {
    // this.modalElement.style.display = "none";
    this.modalElement.remove();
  }
}

class ModalEnterWindow extends Modal {
  constructor(element, content) {
    super(element);
    this.headline.textContent = content;

    this.form = new Form("log-in-form");
    this.form.addInput("Введіть логін", "text", "input-login");
    this.form.addInput("Введіть пароль", "password", "input-password");
    this.form.addButton("УВІЙТИ", "enter-btn");

    this.modalElement.append(this.form.formElement);
  }
}

class ModalCardWindow extends Modal {
  constructor(element, content) {
    super(element);
    this.headline.textContent = content;

    this.form = new Form("visit-form");
    this.form.addSelect("select");

    const selectElement = this.form.formElement.querySelector("select");
    this.form.setSelectElement(selectElement);

    this.form.addOption("option", "-- none --");
    this.form.addOption("option", "Кардіолог");
    this.form.addOption("option", "Стоматолог");
    this.form.addOption("option", "Терапевт");

    this.modalElement.append(this.form.formElement);

    selectElement.addEventListener(
      "change",
      this.handleSelectChange.bind(this)
    );
  }

  handleSelectChange(event) {
    const selectedOption = event.target.value;
    let modalForm;

    switch (selectedOption) {
      case "Кардіолог":
        modalForm = new ModalCardiologistForm();
        break;
      default:
        modalForm = null;
        break;
    }

    if (modalForm) {
      this.form.clearFormElement(); // Видалити всі опції з <select>
      this.form.addSelect("select"); // Додати новий <select> з потрібними опціями
      const selectElement = this.form.formElement.querySelector("select");
      this.form.setSelectElement(selectElement);
      this.form.addOption("option", selectedOption); // Додати вибрану опцію до <select>
      this.form.formElement.append(modalForm.form.formElement);
    }
  }
}

class ModalCardiologistForm {
  constructor() {
    this.form = new Form("log-in-form");
    this.createForm();
  }

  createForm() {
    this.form.addInput("Мета візиту", "text", "input-login");
    this.form.addTextarea("Опис візиту", "textarea");
    this.form.addInput("ПІБ", "text", "input-login");

    this.form.addSelect("select");
    const selectElement = this.form.formElement.querySelector("select");
    this.form.setSelectElement(selectElement);

    this.form.addOption("option", "-- none --", "Терміновість");
    this.form.addOption("option", "Звичайна");
    this.form.addOption("option", "Пріоритетна");
    this.form.addOption("option", "Невідкладна");

    this.form.addButton("СТВОРИТИ", "create-card");
  }
}

class ModalCardiologist extends ModalCardWindow {
  constructor(element, content) {
    super(element, content);
    this.modalElement = element;
    this.modalElement.append(this.form.formElement);
  }
}

//
// Visit`s classes
class Visit {
  // мета візиту
  // короткий опис візиту
  // дропдаун - терміновість (звичайна, пріоритетна, невідкладна)
  // ПІБ
  constructor(
    targetOfVisit,
    whatHappened,
    urgency,
    firstName,
    lastName,
    surName
  ) {
    (this.targetOfVisit = targetOfVisit),
      (this.whatHappened = whatHappened),
      (this.urgency = urgency),
      (this.firstName = firstName),
      (this.lastName = lastName),
      (this.surName = surName);
  }
  render() {
    // return card
    //             ПІБ, які були введені під час створення картки
    // Лікар, до якого людина записана на прийом
    // Кнопка Показати більше.
    // На кліку на неї картка розширюється,
    //  і з'являється решта інформації, яка була введена під час створення візиту
    // Кнопка Редагувати.
    // При натисканні на неї замість текстового вмісту картки з'являється форма,
    // де можна відредагувати введені поля. Така ж, як у модальному вікні під час створення картки
    // Іконка з хрестиком у верхньому правому кутку, при натисканні на яку картку буде видалено
  }
}

class VisitCardiologist extends Visit {
  constructor(
    targetOfVisit,
    whatHappened,
    urgency,
    firstName,
    lastName,
    surName,
    specialist,
    pressure,
    indexOfWeight,
    diseasesOfCardiovascularSystem,
    age,
    id
  ) {
    super(targetOfVisit, whatHappened, urgency, firstName, lastName, surName),
      (this.specialist = specialist),
      (this.pressure = pressure),
      (this.indexOfWeight = indexOfWeight),
      (this.diseasesOfCardiovascularSystem = diseasesOfCardiovascularSystem),
      (this.age = age),
      (this.id = id);
  }
  render() {
    let card = `       
            <div class="card" id="${this.id}">
            <h4 class="title">${this.firstName} ${this.lastName} ${this.surName}</h4>               
            <p class="specialist">${this.specialist}</p>
            <button class="more" id="more">More</button>
            <p class ="targetOfVisit">${this.targetOfVisit}</p>
            <p class="whatHappened">${this.whatHappened}</p>
            <p class="urgency">${this.urgency}</p>
            <p class="pressure">${this.pressure}</p>
            <p class="indexOfWeight">${this.indexOfWeight}</p>
            <p class="diseasesOfCardiovascularSystem">${this.diseasesOfCardiovascularSystem}</p>
            <p class="age">${this.age}</p>
            <button class="rewrite">Rewrite</button>
            </div>`;
    return card;
  }
} //Кардіолог Class Visit +
// Фахівець
// звичайний тиск
// Індекс маси тіла
// перенесені захворювання серцево-судинної системи
// вік

class VisitDentist extends Visit {
  constructor(
    targetOfVisit,
    whatHappened,
    urgency,
    firstName,
    lastName,
    surName,
    specialist,
    dateOfLastVisit,
    id
  ) {
    super(targetOfVisit, whatHappened, urgency, firstName, lastName, surName),
      (this.specialist = specialist),
      (this.dateOfLastVisit = dateOfLastVisit),
      (this.id = id);
  }
  render() {
    let card = `       
            <div class="card" id="${this.id}">
            <h4 class="title">${this.firstName} ${this.lastName} ${this.surName}</h4>               
            <p class="specialist">${this.specialist}</p>
            <button class="more" id="more">More</button>
            <p class ="targetOfVisit">${this.targetOfVisit}</p>
            <p class="whatHappened">${this.whatHappened}</p>
            <p class="urgency">${this.urgency}</p>
            <p class="dateOfLastVisit">${this.dateOfLastVisit}</p>
            <button class="rewrite">Rewrite</button>
            </div>`;
    return card;
  }
} // Фахівець
// дата останнього відвідування

class VisitTherapist extends Visit {
  constructor(
    targetOfVisit,
    whatHappened,
    urgency,
    firstName,
    lastName,
    surName,
    specialist,
    age,
    id
  ) {
    super(targetOfVisit, whatHappened, urgency, firstName, lastName, surName),
      (this.specialist = specialist),
      (this.age = age),
      (this.id = id);
  }
  render() {
    let card = `       
            <div class="card" id="${this.id}">
            <h4 class="title">${this.firstName} ${this.lastName} ${this.surName}</h4>               
            <p class="specialist">${this.specialist}</p>
            <button class="more" id="more">More</button>
            <p class ="targetOfVisit">${this.targetOfVisit}</p>
            <p class="whatHappened">${this.whatHappened}</p>
            <p class="age">${this.age}</p>
            <button class="rewrite">Rewrite</button>
            </div>`;
    return card;
  }
}
// Фахівець
// вік

// test
// вікладаємо все у консоль+ метод рендер у div з відповідним id = "test"...

let ivanToCardiologist = new VisitCardiologist(
  "Визит до кардиологу",
  "Плановий візит",
  "High",
  "Ivanov",
  "Ivan",
  "Archipovich",
  "Cardiologist",
  "120/60",
  12,
  "no",
  70,
  1
);
// console.log(ivanToCardiologist);
// document.querySelector("#test1").innerHTML = ivanToCardiologist.render();

let andreyToDantist = new VisitDentist(
  "Визит до дантиста",
  "Плановий візит",
  "High",
  "Pavlenko",
  "Andrey",
  "Yrievich",
  "Dantist",
  "21.12.2019",
  2
);
// console.log(andreyToDantist);
// document.querySelector("#test2").innerHTML = andreyToDantist.render();

let rimmaToTherapist = new VisitTherapist(
  "Визит до теропевта",
  "Плановий візит",
  "High",
  "Kyzmenko",
  "Rimma",
  "Mykolaivna",
  "Therapist",
  19
);
// console.log(rimmaToTherapist);
// document.querySelector("#test3").innerHTML = rimmaToTherapist.render();

export {
  Button,
  Form,
  ModalEnterWindow,
  ModalCardWindow,
  ModalCardiologist,
  VisitCardiologist,
  VisitDentist,
  VisitTherapist,
};
