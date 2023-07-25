import { rendering } from "../rendering.js";
// let token = "ed0baaa2-558b-48fc-9651-92d35c662e2a";
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


// async function getUserServer() {
//   try {
//     let response = await fetch(`https://ajax.test-danit.com/api/v2/cards/`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     let data = await response.json();
//     paragraphDisplay(data.length)
    
//     // TODO
//     // let filterWrapper = document.querySelector(".filter-wrapper");
//     // let text = document.createElement("div");
//     // text.classList.add("text");
//     // text.textContent = "Візити відсутні";
//     // if (data.length !== 0) {
//     //   if (text) {
//     //     // text.remove();
//     //     text.remove();
//     //   }
//     // } else if (data.length === 0) {
//     //   console.log("Ok");
//     //   filterWrapper.after(text);
//     // }
//     // TODO

//     // sorting
//     data.sort((a, b) => a.id - b.id);
//     data.forEach((e) => {
//     let id = e.id
//     if (setID.has(id)){
//       return
//     } else {
//       setID.add(id);
//       rendering(e);
//     }});
//     return data, setID;
//   } catch (e) {
//     console.log("Помилка в GET запиті (функція getUserServer)!");
//     console.log(e);
//   }
// }
// //
// // ! You can't touch this
// // async function fetchData(url, fetchMethod, data = null) {
// //   const options = {
// //     method: `${fetchMethod}`,
// //     headers: {
// //       Authorization: `Bearer ${token}`,
// //     },
// //   };
// //   if (data) {
// //     options.body = data;
// //   }
// //   try {
// //     const response = await fetch(url, options);
// //     console.log(response);
// //     const responseData = await response.json();
// //     if (!response.ok) {
// //       throw new Error(responseData.message || "Помилка методу fetch");
// //     }
// //     return responseData;
// //   } catch (error) {
// //     console.error("Помилка:", error);
// //     throw error;
// //   }
// // }

export default getUserServer ;
