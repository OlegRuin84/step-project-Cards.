import getUserServer from "./getUserServer.js";

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
    console.log("Помилка в getRegistrationData, файл api.js");
    console.log(error);
  }
}

export default getRegistrationData;
