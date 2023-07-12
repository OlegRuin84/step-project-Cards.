// now we are using a code below and all script only for testing... :)
//
// server token
let token = "70dd6d15-1769-4113-a892-9664144ebf41";

// GET
async function getUserServer() {
  try {
    let response = await fetch(`https://ajax.test-danit.com/api/v2/cards/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let data = await response.json();
    console.log(data);

    return data;
  } catch (e) {
    console.log("Помилка в GET запиті (функція getUserServer)!");
    console.log(e);
  }
}
getUserServer();

//
// DELETE request
async function deleteCard(cardId) {
  let response = await fetch(
    `https://ajax.test-danit.com/api/v2/cards/${cardId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response);
}
// deleteCard("180545");
