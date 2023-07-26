    import { setIdDelete, set } from "./counter.js" 
    import { paragraphDisplay } from "./paragraph.js"
    import { getToken }from "./fetchData.js";

    // запит на видалення картки

async function deleteCardAtAPI(arg){

    // отримання токену 
    getToken() 
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