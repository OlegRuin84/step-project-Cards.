import { rendering } from "../rendering.js";

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

      // rendering(data);
// -------------

    let info = await fetch(`https://ajax.test-danit.com/api/v2/cards/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
    }});
    let data = await info.json();

    // sorting
    data.sort((a, b) => a.id - b.id);
    let setID = new Set;
    data.forEach((e) => {
      let id = e.id
      if (setID.has(id)){
        return 
      } else {
        setID.add(id);
        rendering(e);
        return setID;
      }});
      console.log(setID)
    ;
  } 
}


// ---------------
    
   catch (error) {
    console.log("Помилка в fetchData, файл api.js");
    console.log(error);
  }
}

export default fetchData;
