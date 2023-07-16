import { sendFormData } from "./functions.js";

//
// Forms
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

  //   GO TO THE SERVER
  sendData() {
    const formData = new FormData(this.formElement);
    let selectMain = document.querySelectorAll(".select");
    formData.append("doc", selectMain[0].value);
    sendFormData(formData);
  }
}

// all doctors form
class ModalDoctor {
  constructor() {
    this.form = new Form("doctor-form");
    this.createDoctorForm();
  }

  createDoctorForm() {
    this.form.addInput("Мета візиту", "text", "goalVisit", "input-login");
    this.form.addTextarea("Опис візиту", "descriptionVisit", "textarea");

    this.form.addSelect("changeUrgency", "select");
    const selectElement = this.form.formElement.querySelector("select");
    this.form.setSelectElement(selectElement);

    this.form.addOption("option", "-- none --", "Терміновість");
    this.form.addOption("option", "Звичайна");
    this.form.addOption("option", "Пріоритетна");
    this.form.addOption("option", "Невідкладна");
    this.form.addInput("ПІБ", "text", "namePatient", "input-login");
  }
}

// class for Cardiologist`s form
class ModalCardiologistForm extends ModalDoctor {
  constructor() {
    super();
    this.createCardiologistForm();
  }

  createCardiologistForm() {
    this.form.addInput("Звичайний тиск", "text", "pressure", "input-login");
    this.form.addInput("Індекс маси тіла", "text", "bmi", "input-login");
    this.form.addTextarea(
      "Перенесені захворювання серцево-судинної системи",
      "heartDisease",
      "textarea"
    );
    this.form.addButton("СТВОРИТИ", "create-card", "submit");
  }
}

// class for Dentist`s form
class ModalDentistForm extends ModalDoctor {
  constructor() {
    super();
    this.createDentistForm();
  }

  createDentistForm() {
    this.form.addInput(
      "Останнє відвідування",
      "text",
      "lastDate",
      "input-login"
    );
    this.form.addButton("СТВОРИТИ", "create-card", "submit");
  }
}

// class for Therapist`s form
class ModalTherapistForm extends ModalDoctor {
  constructor() {
    super();
    this.createTherapistForm();
  }

  createTherapistForm() {
    this.form.addInput("Вік", "text", "age", "input-login");
    this.form.addButton("СТВОРИТИ", "create-card", "submit");
  }
}

export { Form, ModalCardiologistForm, ModalDentistForm, ModalTherapistForm };