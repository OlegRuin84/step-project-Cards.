import { Visit } from "./visit.js";
import formatDate from "../formatDate.js";

class VisitDentist extends Visit {
  constructor(
    descriptionVisit,
    goalVisit,
    changeUrgency,
    changeStatus,
    namePatient,
    doc,
    id,
    lastDate
  ) {
    super(
      descriptionVisit,
      goalVisit,
      changeUrgency,
      changeStatus,
      namePatient
    ),
      (this.doc = doc),
      (this.id = id),
      (this.lastDate = lastDate);
  }

  render() {
    let formattedDate = formatDate(this.lastDate);
    let element = document.querySelector(".conteiner__cards");

    let wrapper = document.createElement("div");
    let nameWrapper = document.createElement("div");
    let cross = document.createElement("div");
    let doc = document.createElement("h3");
    let name = document.createElement("h4");
    let moreBtn = document.createElement("div");
    let moreInfo = document.createElement("div");
    let desc = document.createElement("p");
    let goal = document.createElement("p");
    let urgency = document.createElement("p");
    let status = document.createElement("p");
    let lastDate = document.createElement("p");
    let editBtn = document.createElement("div");

    wrapper.classList.add("card");
    nameWrapper.classList.add("card__name-wrapper");
    cross.classList.add("cross");
    doc.classList.add("card__doc");
    name.classList.add("card__title");
    moreBtn.classList.add("card__btn-more");
    moreInfo.classList.add("card__block");
    moreInfo.classList.add("hidden");
    desc.classList.add("card__descriptionVisit");
    goal.classList.add("card__goalVisit");
    urgency.classList.add("card__changeUrgency");
    status.classList.add("card__changeStatus");
    lastDate.classList.add("card__lastDate");
    editBtn.classList.add("card__btn-rewrite");
    wrapper.setAttribute("draggable", "true");

    doc.textContent = `ВІЗИТ ДО: ${this.doc}а`;
    name.textContent = `${this.namePatient}`;
    moreBtn.textContent = `показати більше`;
    desc.textContent = `Опис візиту: ${this.descriptionVisit}`;
    goal.textContent = `Мета візиту: ${this.goalVisit}`;
    urgency.textContent = `Терміновість: ${this.changeUrgency}`;
    status.textContent = `Статус зустрічі: ${this.changeStatus}`;
    lastDate.textContent = `Остання дата відвідування: ${formattedDate}`;
    editBtn.textContent = "Редагувати";

    wrapper.append(nameWrapper);
    nameWrapper.append(doc);
    doc.after(cross);
    nameWrapper.after(name);
    name.after(moreBtn);
    moreBtn.after(moreInfo);
    moreInfo.append(desc);
    desc.after(goal);
    goal.after(urgency);
    urgency.after(status);
    status.after(lastDate);
    lastDate.after(editBtn);
    element.prepend(wrapper);

    moreBtn.addEventListener("click", function () {
      moreInfo.classList.toggle("hidden");
      moreBtn.textContent = `приховати`;
      if (moreInfo.matches(".hidden")) {
        moreBtn.textContent = `показати більше`;
      }
    });
  }
}

export { VisitDentist };
