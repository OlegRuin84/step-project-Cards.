import { rendering } from "../rendering.js";
import { set } from "./counter.js";
import { paragraphDisplay } from "./paragraph.js"

async function getUserServer(token) {
  try {
    let response = await fetch(`https://ajax.test-danit.com/api/v2/cards/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let data = await response.json();

      // контроль над надписом , про відсутність карток
      paragraphDisplay(data.length)

    // sorting
    data.sort((a, b) => a.id - b.id);
    data.forEach((e) => {
      if(set.has(e.id)){
        return
      }else{
        set.add(e.id);
        rendering(e);
      }
    });
    return data;
  }
    catch (e) {
    console.log("Помилка в GET запиті (функція getUserServer)!");
    console.log(e);
  }
}

export default getUserServer ;
