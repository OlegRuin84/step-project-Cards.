import { VisitCardiologist } from "./classes/visitCardiologist.js";
import { VisitDentist } from "./classes/visitDentist.js";
import { VisitTherapist } from "./classes/visitTherapist.js";

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

export { rendering };
