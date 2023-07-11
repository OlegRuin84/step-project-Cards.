//
// server token
let token = "70dd6d15-1769-4113-a892-9664144ebf41";

// GET
async function getUserServer() {
  try {
    let response = await fetch(
      `https://ajax.test-danit.com/api/v2/cards/
      179975`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    let data = await response.json();
    console.log(data);

    return data;
  } catch (e) {
    console.log("Помилка в GET запиті (функція getUserServer)!");
    console.log(e);
  }
}
getUserServer();

// GET user id
async function getCurrentUserServer(id) {
  try {
    let response = await fetch(
      `https://ajax.test-danit.com/api/v2/cards/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    let data = await response.json();
    // console.log(data);
    const arr = data.visits;
    // console.log(arr);

    return arr;
  } catch (e) {
    console.log("Помилка в GET запиті (функція getCurrentUserServer)!");
    console.log(e);
  }
}

// PUT user id
async function putUserServer(par, id, email, password) {
  try {
    let change = await fetch(`https://ajax.test-danit.com/api/v2/cards/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        visits: par,
        email: `${email}`,
        password: `${password}`,
      }),
    });
    let data = change.json();
    // console.log(data);
    data.then((i) => {
      // console.log(i);
    });
  } catch (e) {
    console.log("Помилка в PUT запиті (функція putUserServer)!");
    console.log(e);
  }
}

//
// POST
// let registerBtn = document.querySelector(".register-btn");
// registerBtn.addEventListener("click", registration);
// async function registration() {
//   let user = new Modal(userEmail.value, userPassword.value);
//   let email = user.email;
//   let password = user.password;

//   let response = await fetch("https://ajax.test-danit.com/api/v2/cards", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({
//       title: "Новий користувач",
//       login: `${login}`,
//       email: `${email}`,
//     }),
//   });
//   let data = response.json();
//   data.then((i) => {
//     user.id = i.id;
//     console.log(user);
//   });
// }

// GET request ALL user
// async function getCard() {
//   let response = await fetch(`https://ajax.test-danit.com/api/v2/cards/`, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   let data = response.json();
//   data.then((i) => {
//     console.log(i);
//   });
// }
// getCard();

//
// DELETE request
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
// deleteCard("179438");

export { putUserServer, getCurrentUserServer };
