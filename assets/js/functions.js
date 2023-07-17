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
    console.log(data);

    getToken(data)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export { deleteWorningWindow, sendFormData };
