//
// imports
import { fetchData } from "./api/api.js";
// let token = "70dd6d15-1769-4113-a892-9664144ebf41";

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
// Forms

// class Form without FormData
// class Form {
//   constructor(style) {
//     this.formElement = document.createElement("form");
//     this.formElement.classList.add(`${style}`);
//     this.buttonElement = null;
//   }

//   addInput(placeholderText, inputType, inputName, style) {
//     const inputElement = document.createElement("input");
//     inputElement.setAttribute("placeholder", `${placeholderText}`);
//     inputElement.setAttribute("type", `${inputType}`);
//     inputElement.setAttribute("name", `${inputName}`);
//     inputElement.classList.add(`${style}`);
//     this.formElement.append(inputElement);
//   }

//   addTextarea(placeholderText, inputName, style) {
//     const textareaElement = document.createElement("textarea");
//     textareaElement.setAttribute("placeholder", `${placeholderText}`);
//     textareaElement.setAttribute("name", `${inputName}`);
//     textareaElement.classList.add(`${style}`);
//     this.formElement.append(textareaElement);
//   }

//   addSelect(selectName, style) {
//     const selectElement = document.createElement("select");
//     const trimmedStyle = String(style).trim();
//     selectElement.setAttribute("name", `${selectName}`);
//     selectElement.classList.add(trimmedStyle);
//     this.formElement.append(selectElement);
//     this.selectElement = selectElement;
//   }

//   addOption(style, value, content = value) {
//     const optionElement = document.createElement("option");
//     optionElement.setAttribute("value", `${value}`);
//     optionElement.classList.add(`${style}`);
//     optionElement.textContent = `${content}`;

//     const lastOptionElement =
//       this.selectElement.querySelector("option:last-child");
//     if (lastOptionElement) {
//       lastOptionElement.after(optionElement);
//     } else {
//       this.selectElement.append(optionElement);
//     }
//   }

//   addButton(buttonText, buttonStyle, type) {
//     const buttonElement = new Button().createButton();
//     buttonElement.textContent = buttonText;
//     buttonElement.classList.add(`${buttonStyle}`);
//     buttonElement.setAttribute("type", `${type}`);
//     buttonElement.addEventListener("click", (event) => {
//       event.preventDefault();
//     });
//     this.formElement.append(buttonElement);
//   }

//   clearFormElement() {
//     while (this.formElement.firstChild) {
//       if (this.formElement.firstChild.nodeName === "OPTION") {
//         this.formElement.firstChild.remove();
//       } else {
//         this.formElement.removeChild(this.formElement.firstChild);
//       }
//     }
//   }

//   // addSelectElement() {
//   //   const selectElement = document.createElement("select");
//   //   selectElement.classList.add("select");
//   //   this.formElement.append(selectElement);
//   // }

//   setSelectElement(selectElement) {
//     this.selectElement = selectElement;
//   }

//   // TODO version 1 - witout FormData
//   // sendData(url, titleVisut, input) {
//   //   fetch("https://ajax.test-danit.com/api/v2/cards", {
//   //     method: "POST",
//   //     headers: {
//   //       "Content-Type": "application/json",
//   //       Authorization: `Bearer ${token}`,
//   //     },
//   //     body: JSON.stringify({
//   //       title: `${titleVisut}`,
//   //       goal: input,
//   //       // ...
//   //     }),
//   //   })
//   //     .then((response) => response.json())
//   //     .then((response) => console.log(response));
//   // }

//   // TODO version 2 - FormData + api.js
//   sendData(url) {
//     const formElement = document.querySelector(".doctor-form");
//     const formData = new FormData(formElement);
//     console.log(formData);

//     // fetchData(url, "POST", formData)
//     //   .then((data) => {
//     //     console.log("Відповідь сервера:", data);
//     //     this.renderCard(data);
//     //   })
//     //   .catch((error) => {
//     //     console.error("Помилка відправки даних:", error);
//     //   });
//   }

//   // for rendering on the Page
//   // renderCard(data) {}
// }

// ! test 1 of 3
// class Form wit FormData
class Form {
  constructor(style) {
    this.formElement = document.createElement("form");
    this.formElement.classList.add(style);
    this.buttonElement = null;
  }

  addInput(placeholderText, inputType, inputName, style) {
    const inputElement = document.createElement("input");
    inputElement.setAttribute("placeholder", placeholderText);
    inputElement.setAttribute("type", inputType);
    inputElement.setAttribute("name", inputName);
    inputElement.classList.add(style);
    this.formElement.append(inputElement);
  }

  addTextarea(placeholderText, inputName, style) {
    const textareaElement = document.createElement("textarea");
    textareaElement.setAttribute("placeholder", placeholderText);
    textareaElement.setAttribute("name", inputName);
    textareaElement.classList.add(style);
    this.formElement.append(textareaElement);
  }

  addSelect(selectName, style) {
    const selectElement = document.createElement("select");
    selectElement.setAttribute("name", selectName);
    selectElement.classList.add(style);
    this.formElement.append(selectElement);
    this.selectElement = selectElement;
  }

  addOption(style, value, content = value) {
    const optionElement = document.createElement("option");
    optionElement.setAttribute("value", value);
    optionElement.classList.add(style);
    optionElement.textContent = content;

    const lastOptionElement =
      this.selectElement.querySelector("option:last-child");
    if (lastOptionElement) {
      lastOptionElement.after(optionElement);
    } else {
      this.selectElement.append(optionElement);
    }
  }

  addButton(buttonText, buttonStyle, type) {
    const buttonElement = document.createElement("button");
    buttonElement.textContent = buttonText;
    buttonElement.classList.add(buttonStyle);
    buttonElement.setAttribute("type", type);
    buttonElement.addEventListener("click", (event) => {
      event.preventDefault();
    });
    this.formElement.append(buttonElement);
  }

  clearFormElement() {
    while (this.formElement.firstChild) {
      if (this.formElement.firstChild.nodeName === "OPTION") {
        this.formElement.firstChild.remove();
      } else {
        this.formElement.removeChild(this.formElement.firstChild);
      }
    }
  }

  setSelectElement(selectElement) {
    this.selectElement = selectElement;
  }

  sendData() {
    const formData = new FormData(this.formElement);
    displayFormData(formData);
  }
}

// ! test 2 of 3
// func for rendering
function displayFormData(formData) {
  let data = Object.fromEntries(formData.entries());
  console.log(data);

  fetchData(data);
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
    this.form.addInput("Введіть логін", "text", "login", "input-login");
    this.form.addInput(
      "Введіть пароль",
      "password",
      "password",
      "input-password"
    );
    this.form.addButton("УВІЙТИ", "enter-btn");

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
      const noneOption = selectElement.querySelector(
        'option[value="-- none --"]'
      );
      if (noneOption) {
        noneOption.remove();
      }
      this.form.clearFormElement();
      this.form.formElement.append(selectElement, modalForm.form.formElement);
    }
  }
}

// class ModalCardiologistForm for work without FormData
// class ModalCardiologistForm {
//   constructor() {
//     this.form = new Form("doctor-form");
//     this.createForm();
//     this.addButtonClickListener();
//   }

//   createForm() {
//     this.form.addInput("Мета візиту", "text", "goalVisit", "input-login");
//     this.form.addTextarea("Опис візиту", "descriptionVisit", "textarea");
//     this.form.addInput("ПІБ", "text", "namePatient", "input-login");

//     this.form.addSelect("changeUrgency", "select");
//     const selectElement = this.form.formElement.querySelector("select");
//     this.form.setSelectElement(selectElement);

//     this.form.addOption("option", "-- none --", "Терміновість");
//     this.form.addOption("option", "Звичайна");
//     this.form.addOption("option", "Пріоритетна");
//     this.form.addOption("option", "Невідкладна");

//     this.form.addButton("СТВОРИТИ", "create-card", "submit");
//   }

//   addButtonClickListener() {
//     const createButton = this.form.formElement.querySelector(".create-card");
//     createButton.addEventListener("click", () => {
//       // TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//       // const url = "https://ajax.test-danit.com/api/v2/cards/";
//       // let input = document.querySelector(".input-login").value;
//       // this.form.sendData(url, "Візит до кардіолога", input);

//       const formElement = document.querySelector(".doctor-form");
//       const formData = new FormData(formElement);
//       console.log(formData);
//     });
//   }
// }

// ! test 3 of 3
// class ModalCardiologistForm for work with FormData
class ModalCardiologistForm {
  constructor() {
    this.form = new Form("doctor-form");
    this.createForm();
    this.addButtonClickListener();
  }

  createForm() {
    this.form.addInput("Мета візиту", "text", "goalVisit", "input-login");
    this.form.addTextarea("Опис візиту", "descriptionVisit", "textarea");
    this.form.addInput("ПІБ", "text", "namePatient", "input-login");

    this.form.addSelect("changeUrgency", "select");
    const selectElement = this.form.formElement.querySelector("select");
    this.form.setSelectElement(selectElement);

    this.form.addOption("option", "-- none --", "Терміновість");
    this.form.addOption("option", "Звичайна");
    this.form.addOption("option", "Пріоритетна");
    this.form.addOption("option", "Невідкладна");

    this.form.addButton("СТВОРИТИ", "create-card", "submit");
  }
  // ! go to the server
  addButtonClickListener() {
    const createButton = this.form.formElement.querySelector(".create-card");
    createButton.addEventListener("click", () => {
      this.form.sendData();
    });
  }
}

class ModalCardiologist extends ModalCardWindow {
  constructor(element, content) {
    super(element, content);
    this.modalElement = element;
    this.modalElement.append(this.form.formElement);
  }
}

// class for Dentist`s form
// class ModalDentistForm {
//   constructor() {
//     this.form = new Form("log-in-form");
//     this.createForm();
//     this.addButtonClickListener();
//   }

//   createForm() {
//     this.form.addInput("Мета візиту", "text", "input-login");
//     this.form.addTextarea("Опис візиту", "textarea");
//     this.form.addInput("ПІБ", "text", "input-login");

//     this.form.addSelect("select");
//     const selectElement = this.form.formElement.querySelector("select");
//     this.form.setSelectElement(selectElement);

//     this.form.addOption("option", "-- none --", "Терміновість");
//     this.form.addOption("option", "Звичайна");
//     this.form.addOption("option", "Пріоритетна");
//     this.form.addOption("option", "Невідкладна");

//     this.form.addButton("СТВОРИТИ", "create-card");
//   }

//   // addButtonClickListener() {
//   //   const createButton = this.form.formElement.querySelector(".create-card");
//   //   createButton.addEventListener("click", () => {
//   //     const url = "https://ajax.test-danit.com/api/v2/cards/";
//   //     this.form.sendData(url);
//   //   });
//   // }
// }

// class for Therapist`s form
// class ModalTherapistForm {
//   constructor() {
//     this.form = new Form("log-in-form");
//     this.createForm();
//     this.addButtonClickListener();
//   }

//   createForm() {
//     this.form.addInput("Мета візиту", "text", "input-login");
//     this.form.addTextarea("Опис візиту", "textarea");
//     this.form.addInput("ПІБ", "text", "input-login");

//     this.form.addSelect("select");
//     const selectElement = this.form.formElement.querySelector("select");
//     this.form.setSelectElement(selectElement);

//     this.form.addOption("option", "-- none --", "Терміновість");
//     this.form.addOption("option", "Звичайна");
//     this.form.addOption("option", "Пріоритетна");
//     this.form.addOption("option", "Невідкладна");

//     this.form.addButton("СТВОРИТИ", "create-card");
//   }

//   // addButtonClickListener() {
//   //   const createButton = this.form.formElement.querySelector(".create-card");
//   //   createButton.addEventListener("click", () => {
//   //     const url = "https://ajax.test-danit.com/api/v2/cards/";
//   //     this.form.sendData(url);
//   //   });
//   // }
// }
// -------------------------------------------------------------

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
}

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
}

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
  VisitCardiologist,
  VisitDentist,
  VisitTherapist,
};
