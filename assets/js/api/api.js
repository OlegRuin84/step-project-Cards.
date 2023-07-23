// import { VisitCardiologist, VisitDentist, VisitTherapist } from "../classes.js";
import { rendering, paragraphDisplay } from "../functions.js";
// set ID елементів, що вже відображені
let setID = new Set;


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
      getUserServer()
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
async function getUserServer() {
  try {
    let response = await fetch(`https://ajax.test-danit.com/api/v2/cards/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let data = await response.json();
    paragraphDisplay(data.length)
    
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

    // sorting
    data.sort((a, b) => a.id - b.id);
    data.forEach((e) => {
    let id = e.id
    if (setID.has(id)){
      return
    } else {
      setID.add(id);
      rendering(e);
    }});
    return data, setID;
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
  let response = await fetch(`https://ajax.test-danit.com/api/v2/cards/${arg}`, {
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${token}`
  },
})
// перевірка статусу видалення за номером ID, 
// і при видаленні - видаляємо картку з відповідним ID з DOM
if (response.status === 200) {
  let el = document.getElementById(arg);
  let num = arg;
  el.remove();
  setID.delete(num);
  // рендер тих карток, що є на сервері
  getUserServer()
}
}


export { getToken, getToken2, deleteCardAtAPI, setID };
