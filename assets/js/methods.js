// now we are using a code below and all script only for testing... :)

// server token
let token = "70dd6d15-1769-4113-a892-9664144ebf41";

// ! Oleg
// import { VisitCardiologist, VisitDentist, VisitTherapist } from "./classes.js";

// GET
// async function getUserServer() {
//   try {
//     let response = await fetch(`https://ajax.test-danit.com/api/v2/cards/`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     let data = await response.json();
//     console.log(data);

//     data.forEach((e) => {
//       // console.log(e)
//       if (e.doc === "Кардіолог") {
//         // console.log(e)
//         let card = new VisitCardiologist(
//           e.descriptionVisit,
//           e.goalVisit,
//           e.changeUrgency,
//           e.namePatient,
//           e.doc,
//           e.pressure,
//           e.bmi,
//           e.heartDisease,
//           e.age,
//           e.id
//         );
//         card.render();
//       } else if (e.doc === "Стоматолог") {
//         let card = new VisitDentist(
//           e.descriptionVisit,
//           e.goalVisit,
//           e.changeUrgency,
//           e.namePatient,
//           e.doc,
//           e.id
//         );
//         card.render();
//       } else if (e.doc === "Терапевт") {
//         let card = new VisitTherapist(
//           e.descriptionVisit,
//           e.goalVisit,
//           e.changeUrgency,
//           e.namePatient,
//           e.doc,
//           e.age,
//           e.id
//         );
//         card.render();
//       }
//     });

//     return data;
//   } catch (e) {
//     console.log("Помилка в GET запиті (функція getUserServer)!");
//     console.log(e);
//   }
// }
// getUserServer();

//
// DELETE for 1 id
// async function deleteCard(cardId) {
//   let response = await fetch(
//     `https://ajax.test-danit.com/api/v2/cards/${cardId}`,
//     {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
//   console.log(response);
// }
// deleteCard("180545");

//
// DELETE for all id
// async function delllete() {
//   let response = await fetch(`https://ajax.test-danit.com/api/v2/cards/`, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   let data = await response.json();
//   console.log(data);
//   data.forEach((i) => {
//     let id = i.id;
//     console.log(i);

//     async function delete1(id) {
//       let deleteResponse = await fetch(
//         `https://ajax.test-danit.com/api/v2/cards/${id}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//     }
//     // delete1(id);
//   });
// }
// delllete();
