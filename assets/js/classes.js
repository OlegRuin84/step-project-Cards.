//
// imports
import {
  Form,
  ModalCardiologistForm,
  ModalDentistForm,
  ModalTherapistForm,
} from "./forms.js";

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
    // TODO
    this.form.addButton("ЗАКРИТИ", "close-card", "button");

    this.modalElement.classList.add("window-create-doctor");
    this.modalElement.append(this.form.formElement);

    selectElement.addEventListener(
      "change",
      this.handleSelectChange.bind(this)
    );

    // TODO
    const closeWindow = this.form.formElement.querySelector(".close-card");
    closeWindow.addEventListener("click", function () {
      console.log("!");

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
      // TODO
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

// ok - bmi:"1.2"
// ok - changeUrgency:"Звичайна"
// ok - descriptionVisit:"вимір тиску"
// ok - doc:"Кардіолог"
// ok - goalVisit:"Прановий огляд"
// ok - heartDisease:"інсульт"
// id:182998
// ok - namePatient:"Івашов Ігор Хомич "
// pressure:"130/70"
// Visit`s classes

// class Visit {
//   constructor(descriptionVisit, goalVisit, changeUrgency, namePatient) {
//     (this.descriptionVisit = descriptionVisit),
//       (this.goalVisit = goalVisit),
//       (this.changeUrgency = changeUrgency),
//       (this.namePatient = namePatient);
//   }
//   render() {}
// }

// class VisitCardiologist extends Visit {
//   constructor(
//     descriptionVisit,
//     goalVisit,
//     changeUrgency,
//     namePatient,
//     doc,
//     pressure,
//     bmi,
//     heartDisease,
//     age,
//     id
//   ) {
//     super(descriptionVisit, goalVisit, changeUrgency, namePatient),
//       (this.doc = doc),
//       (this.pressure = pressure),
//       (this.bmi = bmi),
//       (this.heartDisease = heartDisease),
//       (this.age = age),
//       (this.id = id);
//   }
//   render() {
//     let card = `
//             <div class="card" id="${this.id}">
//             <button class="card__delete">❌</button>
//             <h4 class="card__title">ПІБ: ${this.namePatient}</h4>
//             <h4 class="card__doc">Доктор: ${this.doc}</h4>
//             <button class="card__btn-more">Показати більше</button>
//             <div class="card__block" data-card-info= ${this.id}>
//               <p class ="card__descriptionVisit">Опис візиту: ${this.descriptionVisit}</p>
//               <p class="card__goalVisit">Мета визиту: ${this.goalVisit}</p>
//               <p class="card__changeUrgency">Терміновість: ${this.changeUrgency}</p>
//               <p class="card__pressure">Внутрішний тиск: ${this.pressure}</p>
//               <p class="card__bmi">Індекс маси тіла: ${this.bmi}</p>
//               <p class="card__heartDisease">Перенесені захворювання серцево-судинної системи: ${this.heartDisease}</p>
//               <p class="card__age">Вік: ${this.age}</p>
//               <button class="card__btn-rewrite" >Редагувати</button>
//             </div>
//             </div>`;
//     // Кнопка Редагувати.

//     // При натисканні на неї замість текстового вмісту картки з'являється форма,
//     // де можна відредагувати введені поля. Така ж, як у модальному вікні під час створення картки
//     // Іконка з хрестиком у верхньому правому кутку, при натисканні на яку картку буде видалено

//     // console.log (card)
//     let element = document.querySelector(".conteiner__cards");
//     // console.log(element)
//     element.insertAdjacentHTML("beforeend", card);
//     // return card;
//   }
// }

// VisitDentist

// changeUrgency:"Звичайна"
// descriptionVisit:"огляд ротового простору"
// doc:"Стоматолог"
// goalVisit:""
// id:182999
// lastDate:"рік тому"
// namePatient:"Кизил Марина Павловна"

// class VisitDentist extends Visit {
//   constructor(
//     // мета візиту
//     // короткий опис візиту
//     // дропдаун - терміновість (звичайна, пріоритетна, невідкладна)
//     // ПІБ
//     descriptionVisit,
//     goalVisit,
//     changeUrgency,
//     namePatient,
//     doc,
//     id,
//     lastDate
//   ) {
//     super(descriptionVisit, goalVisit, changeUrgency, namePatient),
//       (this.doc = doc),
//       (this.id = id),
//       (this.lastDate = lastDate);
//   }

//   render() {
//     let card = `
//             <div class="card" id="${this.id}">
//             <button class="card__delete">❌</button>
//             <h4 class="card__title">ПІБ: ${this.namePatient}</h4>
//             <h4 class="card__doc">Доктор: ${this.doc}</h4>
//             <button class="card__btn-more">Показати більше</button>
//             <div class="card__block" data-card-info= ${this.id}>
//               <p class ="card__descriptionVisit">Опис візиту: ${this.descriptionVisit}</p>
//               <p class="card__goalVisit">Мета визиту: ${this.goalVisit}</p>
//               <p class="card__changeUrgency">Терміновість: ${this.changeUrgency}</p>
//               <p class="card__age">Вік: ${this.age}</p>
//               <p class="card__lastDate">Останній візит: ${this.lastDate}</p>
//               <button class="card__btn-rewrite" >Редагувати</button>
//             </div>
//             </div>`;
//     let element = document.querySelector(".conteiner__cards");
//     // console.log(element)
//     element.insertAdjacentHTML("beforeend", card);
//     // return card;
//   }
// }

// age:"18"
// changeUrgency:"Невідкладна"
// descriptionVisit:"Отримання лікарняного листа"
// doc:"Терапевт"
// goalVisit:""
// id:183000
// namePatient:"Ледащій Прохор Серафимович"

// class VisitTherapist extends Visit {
//   constructor(
//     descriptionVisit,
//     goalVisit,
//     changeUrgency,
//     namePatient,
//     doc,
//     age,
//     id
//   ) {
//     super(descriptionVisit, goalVisit, changeUrgency, namePatient),
//       (this.doc = doc),
//       (this.age = age),
//       (this.id = id);
//   }
//   render() {
//     let card = `
//             <div class="card" id="${this.id}">
//             <button class="card__delete">❌</button>
//             <h4 class="card__title">ПІБ: ${this.namePatient}</h4>
//             <h4 class="card__doc">Доктор: ${this.doc}</h4>
//             <button class="card__btn-more">Показати більше</button>
//             <div class="card__block" data-card-info= ${this.id}>
//               <p class ="card__descriptionVisit">Опис візиту: ${this.descriptionVisit}</p>
//               <p class="card__goalVisit">Мета визиту: ${this.goalVisit}</p>
//               <p class="card__changeUrgency">Терміновість: ${this.changeUrgency}</p>
//               <p class="card__age">Вік: ${this.age}</p>
//               <button class="card__btn-rewrite" >Редагувати</button>
//             </div>
//             </div>`;
//     let element = document.querySelector(".conteiner__cards");
//     // console.log(element)
//     element.insertAdjacentHTML("beforeend", card);
//     // return card;
//   }
// }

// ! Oleg
// export { Button, ModalEnterWindow, ModalCardWindow, VisitCardiologist, VisitDentist, VisitTherapist };
export { Button, ModalEnterWindow, ModalCardWindow };
