// get for 1 card

async function getOneCard ( id ) {
    let token

    // отримання токену 

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
        token = await response.text(); 
      } catch (error) {
        console.log("Помилка в deleteCardAPI, файл api.js");
        console.log(error);
      }

    // отримання данних однієї картки

    try {
      let response = await fetch(`https://ajax.test-danit.com/api/v2/cards/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await response.json();
      console.log(data)
      return data;
    } catch (e) {
      console.log("Помилка в GET запиті (функція getOneCard)!");
      console.log(e);
    }}
  

    export default getOneCard 