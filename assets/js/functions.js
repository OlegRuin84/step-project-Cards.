import { getToken } from "./api/getToken.js";
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

function rendering(e) {
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
      e.id
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
      e.id,
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
      e.id
    );
    card.render();
  }
}

function formatDate(a) {
  let parts = a.split("-");
  let year = parts[0];
  let month = parts[1];
  let day = parts[2];

  let formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
}

export { deleteWorningWindow, sendFormData, rendering, formatDate };
