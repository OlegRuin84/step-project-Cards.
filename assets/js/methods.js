// now we are using a code below and all script only for testing... :)
// THIS FILE ONLY FOR TESTING - we can see the result of our work on the coтsole

// ---------------- TEST ----------------------
// to see the result
// let token = "62c5f5c5-0f93-422d-8955-a756d445d739";
let token = "ed0baaa2-558b-48fc-9651-92d35c662e2a";
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
//     delete1(id);
//   });
// }
// delllete();
// ---------------- TEST ----------------------
