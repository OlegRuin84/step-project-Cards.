// class Modal {
// }

// export { Modal };

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
} //Кардіолог Class Visit +
// Фахівець
// звичайний тиск
// Індекс маси тіла
// перенесені захворювання серцево-судинної системи
// вік

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
} // Фахівець
// дата останнього відвідування

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
// Фахівець
// вік

// test
// вікладаємо все у консоль+ метод рендер у div з відповідним id = "test"...

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
console.log(ivanToCardiologist);
document.querySelector("#test1").innerHTML = ivanToCardiologist.render();

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
console.log(andreyToDantist);
document.querySelector("#test2").innerHTML = andreyToDantist.render();

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
console.log(rimmaToTherapist);
document.querySelector("#test3").innerHTML = rimmaToTherapist.render();
