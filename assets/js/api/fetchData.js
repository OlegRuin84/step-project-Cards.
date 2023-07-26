import { rendering } from "../rendering.js";
import { set } from "./counter.js";
import { paragraphDisplay } from "./paragraph.js";

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
      // rendering

      let info = await fetch(`https://ajax.test-danit.com/api/v2/cards/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await info.json();

      // контроль над надписом , про відсутність карток
      paragraphDisplay(data.length);

      // sorting
      data.sort((a, b) => a.id - b.id);
      data.forEach((e) => {
        if (set.has(e.id)) {
          return;
        } else {
          set.add(e.id);
          rendering(e);
        }
      });
    }
  } catch (error) {
    console.log("Помилка в fetchData, файл api.js");
    console.log(error);
  }
}

export default fetchData;
