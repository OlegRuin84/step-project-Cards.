//
// imports
import {
  Form,
  ModalCardiologistForm,
  ModalDentistForm,
  ModalTherapistForm,
} from "./forms.js";

import { shomMeMore } from "./functions.js";

// Classes for buttons
class Button {
  constructor(width = 140, height = 50, type = "button") {
    this.width = width;
    this.height = height;
    this.type = type;
  }

  createButton() {
    const buttonElement = document.createElement("button");
    buttonElement.style.width = `${this.width}px`;
    buttonElement.style.height = `${this.height}px`;
    buttonElement.type = this.type;
    buttonElement.classList.add("button");
    return buttonElement;
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
    this.modalElement.remove();
  }
}

class ModalEnterWindow extends Modal {
  constructor(element, content) {
    super(element);
    this.headline.textContent = content;

    this.form = new Form("log-in-form");
    this.form.addInput("Введіть логін", "text", "login", "input-login");
    this.form.addInput(
      "Введіть пароль",
      "password",
      "password",
      "input-password"
    );
    this.form.addButton("УВІЙТИ", "enter-btn");
    this.modalElement.classList.add("window-log-in");

    this.modalElement.append(this.form.formElement);
  }
}

class ModalCardWindow extends Modal {
  constructor(element, content) {
    super(element);
    this.headline.textContent = content;

    this.form = new Form("visit-form");
    this.form.addSelect("changeDoctor", "select");

    const selectElement = this.form.formElement.querySelector("select");
    this.form.setSelectElement(selectElement);

    this.form.addOption("option", "-- none --");
    this.form.addOption("option", "Кардіолог");
    this.form.addOption("option", "Стоматолог");
    this.form.addOption("option", "Терапевт");
    this.form.addButton("ЗАКРИТИ", "close-card", "button");

    this.modalElement.classList.add("window-create-doctor");
    this.modalElement.append(this.form.formElement);

    selectElement.addEventListener(
      "change",
      this.handleSelectChange.bind(this)
    );

    const closeWindow = this.form.formElement.querySelector(".close-card");
    closeWindow.addEventListener("click", function () {
      this.form.remove();
    });
  }

  handleSelectChange(event) {
    const selectedOption = event.target.value;
    let modalForm;

    switch (selectedOption) {
      case "Кардіолог":
        modalForm = new ModalCardiologistForm();
        break;
      case "Стоматолог":
        modalForm = new ModalDentistForm();
        break;
      case "Терапевт":
        modalForm = new ModalTherapistForm();
        break;
      default:
        modalForm = null;
        break;
    }

    if (modalForm) {
      const selectElement = this.form.formElement.querySelector("select");
      const closeWindow = this.form.formElement.querySelector(".close-card");

      const noneOption = selectElement.querySelector(
        'option[value="-- none --"]'
      );
      if (noneOption) {
        noneOption.remove();
      }
      this.form.clearFormElement();
      this.form.formElement.append(
        selectElement,
        modalForm.form.formElement,
        closeWindow
      );

      const createButton =
        modalForm.form.formElement.querySelector(".create-card");
      createButton.addEventListener("click", () => {
        modalForm.form.sendData();
      });

      // let closeCardBtn = document.querySelector(".close-card");
      // let window = document.querySelector(".window-create-doctor");
      // closeCardBtn.addEventListener("click", closeTheCard);
      // function closeTheCard() {
      //   window.remove();
      // }
    }
  }
}

class Visit {
  constructor(descriptionVisit, goalVisit, changeUrgency, namePatient) {
    (this.descriptionVisit = descriptionVisit),
      (this.goalVisit = goalVisit),
      (this.changeUrgency = changeUrgency),
      (this.namePatient = namePatient);
  }
  render() {}
}

class VisitCardiologist extends Visit {
  constructor(
    descriptionVisit,
    goalVisit,
    changeUrgency,
    namePatient,
    doc,
    pressure,
    bmi,
    heartDisease,
    age,
    id
  ) {
    super(descriptionVisit, goalVisit, changeUrgency, namePatient),
      (this.doc = doc),
      (this.pressure = pressure),
      (this.bmi = bmi),
      (this.heartDisease = heartDisease),
      (this.age = age),
      (this.id = id);
  }
  render() {
    let card = `
            <div class="card" id="${this.id}">
            <button class="card__delete">❌</button>
            <h4 class="card__title">ПІБ: ${this.namePatient}</h4>
            <h4 class="card__doc">Доктор: ${this.doc}</h4>
            <button class="card__btn-more">Показати більше</button>
            <div class="card__block" data-card-info= ${this.id}>
              <p class ="card__descriptionVisit">Опис візиту: ${this.descriptionVisit}</p>
              <p class="card__goalVisit">Мета визиту: ${this.goalVisit}</p>
              <p class="card__changeUrgency">Терміновість: ${this.changeUrgency}</p>
              <p class="card__pressure">Внутрішний тиск: ${this.pressure}</p>
              <p class="card__bmi">Індекс маси тіла: ${this.bmi}</p>
              <p class="card__heartDisease">Перенесені захворювання серцево-судинної системи: ${this.heartDisease}</p>
              <p class="card__age">Вік: ${this.age}</p>
              <button class="card__btn-rewrite" >Редагувати</button>
            </div>
            </div>`;

    let element = document.querySelector(".conteiner__cards");
    if (element) {
      element.insertAdjacentHTML("beforeend", card);
      shomMeMore(".conteiner__cards");
    }
  }
}

class VisitDentist extends Visit {
  constructor(
    descriptionVisit,
    goalVisit,
    changeUrgency,
    namePatient,
    doc,
    id,
    lastDate
  ) {
    super(descriptionVisit, goalVisit, changeUrgency, namePatient),
      (this.doc = doc),
      (this.id = id),
      (this.lastDate = lastDate);
  }

  render() {
    let card = `
            <div class="card" id="${this.id}">
            <button class="card__delete">❌</button>
            <h4 class="card__title">ПІБ: ${this.namePatient}</h4>
            <h4 class="card__doc">Доктор: ${this.doc}</h4>
            <button class="card__btn-more">Показати більше</button>
            <div class="card__block" data-card-info= ${this.id}>
              <p class ="card__descriptionVisit">Опис візиту: ${this.descriptionVisit}</p>
              <p class="card__goalVisit">Мета визиту: ${this.goalVisit}</p>
              <p class="card__changeUrgency">Терміновість: ${this.changeUrgency}</p>
              <p class="card__age">Вік: ${this.age}</p>
              <p class="card__lastDate">Останній візит: ${this.lastDate}</p>
              <button class="card__btn-rewrite" >Редагувати</button>
            </div>
            </div>`;
    let element = document.querySelector(".conteiner__cards");
    if (element) {
      element.insertAdjacentHTML("beforeend", card);
      shomMeMore(".conteiner__cards");
    }
  }
}

class VisitTherapist extends Visit {
  constructor(
    descriptionVisit,
    goalVisit,
    changeUrgency,
    namePatient,
    doc,
    age,
    id
  ) {
    super(descriptionVisit, goalVisit, changeUrgency, namePatient),
      (this.doc = doc),
      (this.age = age),
      (this.id = id);
  }
  render() {
    let card = `
            <div class="card" id="${this.id}">
            <button class="card__delete">❌</button>
            <h4 class="card__title">ПІБ: ${this.namePatient}</h4>
            <h4 class="card__doc">Доктор: ${this.doc}</h4>
            <button class="card__btn-more">Показати більше</button>
            <div class="card__block" data-card-info= ${this.id}>
              <p class ="card__descriptionVisit">Опис візиту: ${this.descriptionVisit}</p>
              <p class="card__goalVisit">Мета визиту: ${this.goalVisit}</p>
              <p class="card__changeUrgency">Терміновість: ${this.changeUrgency}</p>
              <p class="card__age">Вік: ${this.age}</p>
              <button class="card__btn-rewrite" >Редагувати</button>
            </div>
            </div>`;
    let element = document.querySelector(".conteiner__cards");
    if (element) {
      element.insertAdjacentHTML("beforeend", card);
      shomMeMore(".conteiner__cards");
    }
  }
}

export {
  Button,
  ModalEnterWindow,
  ModalCardWindow,
  VisitCardiologist,
  VisitDentist,
  VisitTherapist,
};
