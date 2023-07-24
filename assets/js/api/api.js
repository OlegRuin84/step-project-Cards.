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
    if (response.status === 200) {
      console.log(data);
      rendering(data);
    }
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

async function getRegistrationData(login, password) {
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

    // sorting
    data.sort((a, b) => a.id - b.id);
    data.forEach((e) => {
      rendering(e);
    });

    return data;
  } catch (e) {
    console.log("Помилка в GET запиті (функція getUserServer)!");
    console.log(e);
  }
}

export { getToken, getRegistrationData };
