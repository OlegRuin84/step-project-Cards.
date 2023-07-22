import { getToken } from "./api/api.js";
import { VisitCardiologist, VisitDentist, VisitTherapist } from "./classes.js";

// delete worning window
function deleteWorningWindow() {
  let worningWindow = document.querySelector(".worning-window");
  if (worningWindow) {
    worningWindow.remove();
  }
}

function sendFormData(formData) {
  return new Promise((resolve, reject) => {
    let data = Object.fromEntries(formData.entries());
    getToken(data)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function rendering(e, responseId) {
  if (e.doc === "Кардіолог") {
    let card = new VisitCardiologist(
      e.descriptionVisit,
      e.goalVisit,
      e.changeUrgency,
      e.changeStatus,
      e.namePatient,
      e.doc,
      e.pressure,
      e.bmi,
      e.heartDisease,
      e.age,
      (e.id = responseId)
    );
    card.render();
  } else if (e.doc === "Стоматолог") {
    let card = new VisitDentist(
      e.descriptionVisit,
      e.goalVisit,
      e.changeUrgency,
      e.changeStatus,
      e.namePatient,
      e.doc,
      (e.id = responseId),
      e.lastDate
    );
    card.render();
  } else if (e.doc === "Терапевт") {
    let card = new VisitTherapist(
      e.descriptionVisit,
      e.goalVisit,
      e.changeUrgency,
      e.changeStatus,
      e.namePatient,
      e.doc,
      e.age,
      (e.id = responseId)
    );
    card.render();
  }
}

// change the form of the date
function formatDate(date) {
  let parts = date.split("-");
  let year = parts[0];
  let month = parts[1];
  let day = parts[2];

  let formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
}

// create the filter form
function createFilter(where, elementAfter) {
  let filterWrapper = document.createElement("div");
  let filterWrapperHeadline = document.createElement("h2");
  let filterContent = document.createElement("div");
  let filterDescriptionWrapper = document.createElement("div");
  let filterDescriptionLabel = document.createElement("label");
  let filterDescription = document.createElement("input");
  let filterStatusWrapper = document.createElement("div");
  let filterStatusLabel = document.createElement("label");
  let filterStatus = document.createElement("select");
  let filterStatusAll = document.createElement("option");
  let filterStatusOpen = document.createElement("option");
  let filterStatusDone = document.createElement("option");
  let filterUrgencyWrapper = document.createElement("div");
  let filterUrgencyLabel = document.createElement("label");
  let filterUrgency = document.createElement("select");
  let filterUrgencyAll = document.createElement("option");
  let filterUrgencyHigh = document.createElement("option");
  let filterUrgencyNormal = document.createElement("option");
  let filterUrgencyLow = document.createElement("option");

  filterWrapper.classList.add("container");
  filterWrapper.classList.add("filter-wrapper");
  filterWrapperHeadline.classList.add("filter-wrapper__headline");
  filterContent.classList.add("filter-content");
  filterDescriptionWrapper.classList.add("filter-description-wrapper");
  filterWrapperHeadline.textContent = "Фільтрування візитів";
  filterDescriptionLabel.classList.add("filter-label");
  filterDescriptionLabel.textContent = "За ім'ям клієнта:";
  filterDescription.classList.add("filter-description");
  filterStatusWrapper.classList.add("filter-status-wrapper");
  filterStatusLabel.classList.add("filter-label");
  filterStatusLabel.textContent = "За статусом:";
  filterStatus.classList.add("select");
  filterStatus.classList.add("filter-status");
  filterStatusAll.setAttribute("value", "All");
  filterStatusOpen.setAttribute("value", "Open");
  filterStatusDone.setAttribute("value", "Done");
  filterStatusAll.textContent = "Всі";
  filterStatusOpen.textContent = "Відкритий";
  filterStatusDone.textContent = "Закритий";
  filterUrgencyWrapper.classList.add("filter-urgency-wrapper");
  filterUrgencyLabel.classList.add("filter-label");
  filterUrgencyLabel.textContent = "За терміновістю:";
  filterUrgency.classList.add("filter-urgency");
  filterUrgency.classList.add("select");
  filterUrgencyAll.setAttribute("value", "All");
  filterUrgencyHigh.setAttribute("value", "High");
  filterUrgencyNormal.setAttribute("value", "Norma");
  filterUrgencyLow.setAttribute("value", "Low");
  filterUrgencyAll.textContent = "Всі";
  filterUrgencyLow.textContent = "Звичайна";
  filterUrgencyNormal.textContent = "Пріоритетна";
  filterUrgencyHigh.textContent = "Невідкладна";

  filterWrapper.prepend(filterWrapperHeadline);
  filterWrapperHeadline.after(filterContent);
  filterContent.prepend(filterDescriptionWrapper);
  filterDescriptionWrapper.prepend(filterDescriptionLabel);
  filterDescriptionLabel.after(filterDescription);
  filterStatusWrapper.prepend(filterStatusLabel);
  filterStatusLabel.after(filterStatus);
  filterStatus.prepend(filterStatusAll);
  filterStatusAll.after(filterStatusOpen);
  filterStatusOpen.after(filterStatusDone);
  filterDescriptionWrapper.after(filterStatusWrapper);
  filterStatusLabel.after(filterStatus);
  filterUrgencyWrapper.append(filterUrgencyLabel);
  filterUrgencyLabel.after(filterUrgency);
  filterUrgency.prepend(filterUrgencyAll);
  filterUrgencyAll.after(filterUrgencyLow);
  filterUrgencyLow.after(filterUrgencyNormal);
  filterUrgencyNormal.after(filterUrgencyHigh);
  filterStatusWrapper.after(filterUrgencyWrapper);

  where.prepend(filterWrapper);
  filterWrapper.after(elementAfter);
}

export {
  deleteWorningWindow,
  sendFormData,
  rendering,
  formatDate,
  createFilter,
};
