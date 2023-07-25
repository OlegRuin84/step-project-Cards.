// запит на видалення картки
let token = "ed0baaa2-558b-48fc-9651-92d35c662e2a";
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
}}

    export default deleteCardAtAPI 