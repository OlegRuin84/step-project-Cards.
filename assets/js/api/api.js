// import { VisitCardiologist, VisitDentist, VisitTherapist } from "../classes.js";
import { rendering } from "../functions.js";

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
    // TODO GET
    if (response.status === 200) {
      console.log(data);
      rendering(data);

      // if (data.doc === "Кардіолог") {
      //   let card = new VisitCardiologist(
      //     data.descriptionVisit,
      //     data.goalVisit,
      //     data.changeUrgency,
      //     data.namePatient,
      //     data.doc,
      //     data.pressure,
      //     data.bmi,
      //     data.heartDisease,
      //     data.age,
      //     data.id
      //   );
      //   card.render();
      // } else if (data.doc === "Стоматолог") {
      //   let card = new VisitDentist(
      //     data.descriptionVisit,
      //     data.goalVisit,
      //     data.changeUrgency,
      //     data.namePatient,
      //     data.doc,
      //     data.id
      //   );
      //   card.render();
      // } else if (data.doc === "Терапевт") {
      //   let card = new VisitTherapist(
      //     data.descriptionVisit,
      //     data.goalVisit,
      //     data.changeUrgency,
      //     data.namePatient,
      //     data.doc,
      //     data.age,
      //     data.id
      //   );
      //   card.render();
      // }
    }
    // TODO GET
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
      console.log(response);
      const token = await response.text();
      console.log(token);
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

    // TODO
    // let filterWrapper = document.querySelector(".filter-wrapper");
    // let text = document.createElement("div");
    // text.classList.add("text");
    // text.textContent = "Візити відсутні";

    // if (data.length !== 0) {
    //   if (text) {
    //     // text.remove();
    //     text.remove();
    //   }
    // } else if (data.length === 0) {
    //   console.log("Ok");

    //   filterWrapper.after(text);
    // }
    // TODO

    data.forEach((e) => {
      console.log(e.doc);
      rendering(e);
      // if (e.doc === "Кардіолог") {
      //   let card = new VisitCardiologist(
      //     e.descriptionVisit,
      //     e.goalVisit,
      //     e.changeUrgency,
      //     e.namePatient,
      //     e.doc,
      //     e.pressure,
      //     e.bmi,
      //     e.heartDisease,
      //     e.age,
      //     e.id
      //   );
      //   card.render();
      // } else if (e.doc === "Стоматолог") {
      //   let card = new VisitDentist(
      //     e.descriptionVisit,
      //     e.goalVisit,
      //     e.changeUrgency,
      //     e.namePatient,
      //     e.doc,
      //     e.id
      //   );
      //   card.render();
      // } else if (e.doc === "Терапевт") {
      //   let card = new VisitTherapist(
      //     e.descriptionVisit,
      //     e.goalVisit,
      //     e.changeUrgency,
      //     e.namePatient,
      //     e.doc,
      //     e.age,
      //     e.id
      //   );
      //   card.render();
      // }
    });

    return data;
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

// запит на видалення картки
async function deleteCardAtAPI(arg){
  let response = await fetch(arg, {
  method: 'DELETE',
  headers: {
    'Authorization': `Bearer ${token}`
  },
})
  console.log(response)
}


// function deleteCard(text){
//   fetch(text, {
//   method: 'DELETE',
//   headers: {
//   'Authorization': `Bearer ${token}`
//   },
//   })
//   }
  



export { getToken, getToken2, deleteCardAtAPI};
