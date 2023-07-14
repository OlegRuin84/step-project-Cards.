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
// DELETE for 1 id
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

//
// DELETE for all id
async function delllete() {
  let response = await fetch(`https://ajax.test-danit.com/api/v2/cards/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  let data = await response.json();
  console.log(data);
  data.forEach((i) => {
    let id = i.id;
    console.log(i);

    async function delete1(id) {
      let deleteResponse = await fetch(
        `https://ajax.test-danit.com/api/v2/cards/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
    // delete1(id);
  });
}
// delllete();
