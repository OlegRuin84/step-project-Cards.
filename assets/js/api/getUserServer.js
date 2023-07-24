import { rendering } from "../functions.js";

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

export { getUserServer };
