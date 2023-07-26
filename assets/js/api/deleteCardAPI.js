    import { setIdDelete } from "./counter.js" 
    import { paragraphDisplay } from "./paragraph.js"

    // запит на видалення картки

async function deleteCardAtAPI(arg){
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
    // відправлення запросу на видалення конкретної картки
   
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
    setIdDelete(arg);
    el.remove();

    // контроль над надписом , про відсутність карток
    let info = await fetch(`https://ajax.test-danit.com/api/v2/cards/`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        }});
        let data = await info.json();
            paragraphDisplay(data.length)
}}

    export default deleteCardAtAPI 