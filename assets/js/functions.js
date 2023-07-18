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

// ! ???
// function shomMeMore(styleClass) {
//   let conteinerCards = document.querySelector(styleClass);
//   conteinerCards.addEventListener("click", function (event) {
//     let div = event.target.closest("div").lastElementChild;
//     if (div.style.display === "") {
//       div.style.display = "block";
//     } else if (div.style.display === "block") {
//       div.style.display = "";
//     }
//   });
// }

// function shomMeMore(styleClass) {
//   let conteinerCards = document.querySelector(styleClass);
//   conteinerCards.addEventListener("click", function (event) {
//     let div = event.target.closest("div").lastElementChild;
//     if (div.style.display === "") {
//       div.style.display = "block";
//     } else if (div.style.display === "block") {
//       div.style.display = "";
//     }
//   });
// }

function rendering(e) {
  if (e.doc === "Кардіолог") {
    let card = new VisitCardiologist(
      e.descriptionVisit,
      e.goalVisit,
      e.changeUrgency,
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
      e.namePatient,
      e.doc,
      e.age,
      e.id
    );
    card.render();
  }
}

// export { deleteWorningWindow, sendFormData, shomMeMore, rendering };
export { deleteWorningWindow, sendFormData, rendering };
