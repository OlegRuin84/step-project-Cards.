let token = "70dd6d15-1769-4113-a892-9664144ebf41";

//
// Modal`s classes
class Modal {
  constructor(doc, goal, description, urgency, name) {
    (this.doc = doc),
      (this.goal = goal),
      (this.description = description),
      (this.urgency = urgency),
      (this.name = name);
  }
}

class ModalCardiologist extends Modal {
  constructor(
    doc,
    goal,
    description,
    urgency,
    name,
    pressure,
    bmi,
    heartDiseases,
    age
  ) {
    super(doc, goal, description, urgency, name),
      (this.pressure = pressure),
      (this.bmi = bmi),
      (this.heartDiseases = heartDiseases),
      (this.age = age);
  }
  postToTheServer(
    doc,
    goal,
    description,
    urgency,
    name,
    pressure,
    bmi,
    heartDiseases,
    age
  ) {
    async function fetchPost() {
      let response = await fetch("https://ajax.test-danit.com/api/v2/cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          doc: `${doc}`,
          goal: `${goal}`,
          description: `${description}`,
          urgency: `${urgency}`,
          nameOgPatient: `${name}`,
          pressure: `${pressure}`,
          bmi: `${bmi}`,
          heartDiseases: `${heartDiseases}`,
          age: `${age}`,
        }),
      });
      let data = response.json();
      data.then((i) => {
        let id = i.id;
        console.log(i);
        console.log(id);
      });
    }
    fetchPost();
  }
}

class ModalDentist extends Modal {
  constructor(doc, goal, description, urgency, name, lastDate) {
    super(doc, goal, description, urgency, name), (this.lastDate = lastDate);
  }
  postToTheServer(doc, goal, description, urgency, name, lastDate) {
    async function fetchPost() {
      let response = await fetch("https://ajax.test-danit.com/api/v2/cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          doc: `${doc}`,
          goal: `${goal}`,
          description: `${description}`,
          urgency: `${urgency}`,
          nameOgPatient: `${name}`,
          lastDate: `${lastDate}`,
        }),
      });
      let data = response.json();
      data.then((i) => {
        let id = i.id;
        console.log(i);
        console.log(id);
      });
    }
    fetchPost();
  }
}

class ModalTherapist extends Modal {
  constructor(doc, goal, description, urgency, name, age) {
    super(doc, goal, description, urgency, name), (this.age = age);
  }
  postToTheServer(doc, goal, description, urgency, name, age) {
    async function fetchPost() {
      let response = await fetch("https://ajax.test-danit.com/api/v2/cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          doc: `${doc}`,
          goal: `${goal}`,
          description: `${description}`,
          urgency: `${urgency}`,
          nameOgPatient: `${name}`,
          age: `${age}`,
        }),
      });
      let data = response.json();
      data.then((i) => {
        let id = i.id;
        console.log(i);
        console.log(id);
      });
    }
    fetchPost();
  }
}

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
  ModalCardiologist,
  ModalDentist,
  ModalTherapist,
  VisitCardiologist,
  VisitDentist,
  VisitTherapist,
};
