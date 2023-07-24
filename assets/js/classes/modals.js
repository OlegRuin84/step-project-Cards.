import {
  Form,
  ModalCardiologistForm,
  ModalDentistForm,
  ModalTherapistForm,
} from "../forms.js";

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
    this.form.addButton("УВІЙТИ", "enter-btn", "button");
    this.modalElement.classList.add("window-log-in");

    this.modalElement.append(this.form.formElement);
  }
}

class ModalCardWindow extends Modal {
  constructor(element, content) {
    super(element);
    this.headline.textContent = content;

    this.form = new Form("visit-form");
    this.form.addSelect("changeDoctor", "select-main");

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

        // conteiner__cards is visiable after sending
        function closeWindow() {
          let conteinerCards = document.querySelector(".conteiner__cards");
          let filterWrapper = document.querySelector(".filter-wrapper");
          let button = document.querySelector(".button-create-visit");
          let window = document.querySelector(".window-create-doctor");

          window.remove();
          conteinerCards.style.display = "flex";
          filterWrapper.style.display = "flex";
          button.classList.remove("hidden");
        }
        closeWindow();
      });
    }
  }
}

export { ModalEnterWindow, ModalCardWindow };
