import { rendering } from "../functions.js";

function buttonClickHandler(e, token) {
  if (this.getAttribute("data-id") === e.target.dataset.id) {
    fetch(`https://ajax.test-danit.com/api/v2/cards/${e.target.dataset.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      // TODO DELETE
      if (response.ok === true) {
        let card = e.target.closest(".card");
        if (card) {
          card.remove();

          // TODO text
          let cardsConteiner = document.querySelector(".conteiner__cards");
          let remainingCards = cardsConteiner.querySelectorAll(".card");
          if (remainingCards.length === 0) {
            let text = document.querySelector(".text");
            if (text) {
              text.classList.remove("hidden");
            } else {
              let text = document.createElement("div");
              text.classList.add("text");
              text.textContent = "Картки відвідувань відсутні";
              cardsConteiner.prepend(text);
            }
          }
          // TODO
        }
      }
    });
  }
}

async function fetchData(token, data) {
  try {
    const response = await fetch("https://ajax.test-danit.com/api/v2/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    await response.json().then((response) => {
      if (response.id) {
        rendering(data, response.id);
        // TODO text
        let cardsConteiner = document.querySelector(".conteiner__cards");
        let remainingCards = cardsConteiner.querySelectorAll(".card");
        if (remainingCards.length !== 0) {
          let text = document.querySelector(".text");
          if (text) {
            text.classList.add("hidden");
          }
        }
        // TODO

        // TODO DELETE
        let allButtons = [...document.querySelectorAll(".cross")];
        allButtons.forEach((button) => {
          if (!button.hasEventListener) {
            button.addEventListener("click", function (e) {
              buttonClickHandler.call(this, e, token);
            });
            button.hasEventListener = true;
          }
        });
        // TODO
      }
    });
  } catch (error) {
    console.log("Помилка в fetchData, файл api.js");
    console.log(error);
  }
}

async function getToken(data) {
  try {
    let storedLogin = localStorage.getItem("login");
    let storedPassword = localStorage.getItem("password");
    const response = await fetch(
      "https://ajax.test-danit.com/api/v2/cards/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: storedLogin, password: storedPassword }),
      }
    );
    const token = await response.text();
    fetchData(token, data);
  } catch (error) {
    console.log("Помилка в getToken, файл api.js");
    console.log(error);
  }
}

async function getToken2(login, password) {
  try {
    let storedLogin = localStorage.getItem("login");
    let storedPassword = localStorage.getItem("password");

    if (storedLogin === null && storedPassword === null) {
      let response = await fetch(
        "https://ajax.test-danit.com/api/v2/cards/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: login,
            password: password,
          }),
        }
      );
      const token = await response.text();
      getUserServer(token);
    } else {
      const response = await fetch(
        "https://ajax.test-danit.com/api/v2/cards/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: storedLogin,
            password: storedPassword,
          }),
        }
      );
      const token = await response.text();
      getUserServer(token);
    }
  } catch (error) {
    console.log("Помилка в getToken, файл api.js");
    console.log(error);
  }
}

// for rendering cards
async function getUserServer(token) {
  try {
    let response = await fetch(`https://ajax.test-danit.com/api/v2/cards/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let data = await response.json();
    console.log(data);

    // sorting
    data.sort((a, b) => a.id - b.id);

    data.forEach((e) => {
      rendering(e, e.id);

      // TODO DELETE
      let allButtons = [...document.querySelectorAll(".cross")];
      allButtons.forEach((button) => {
        if (!button.hasEventListener) {
          button.addEventListener("click", function (e) {
            buttonClickHandler.call(this, e, token);
          });
          button.hasEventListener = true;
        }
      });
      // TODO
    });

    // return data;
  } catch (e) {
    console.log("Помилка в GET запиті (функція getUserServer)!");
    console.log(e);
  }
}

//
// ! You can't touch this
// async function fetchData(url, fetchMethod, data = null) {
//   const options = {
//     method: `${fetchMethod}`,
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   if (data) {
//     options.body = data;
//   }

//   try {
//     const response = await fetch(url, options);
//     console.log(response);
//     const responseData = await response.json();

//     if (!response.ok) {
//       throw new Error(responseData.message || "Помилка методу fetch");
//     }

//     return responseData;
//   } catch (error) {
//     console.error("Помилка:", error);
//     throw error;
//   }
// }

export { getToken, getToken2 };
