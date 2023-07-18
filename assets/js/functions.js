import { getToken } from "./api/api.js";

// delete worning window
function deleteWorningWindow() {
  let worningWindow = document.querySelector(".worning-window");
  if (worningWindow) {
    worningWindow.remove();
  }
}

function sendFormData(formData) {
  return new Promise((resolve, reject) => {
    let data = Object.fromEntries(formData.entries());
    getToken(data)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function shomMeMore(styleClass) {
  let conteinerCards = document.querySelector(styleClass);
  // console.log(conteinerCards)
  conteinerCards.addEventListener("click", function (event) {
    // console.log(event.target.closest('div').id)
    let div = event.target.closest("div").lastElementChild;
    if (div.style.display === "") {
      div.style.display = "block";
    } else if (div.style.display === "block") {
      div.style.display = "";
    }
  });
}

export { deleteWorningWindow, sendFormData, shomMeMore };
