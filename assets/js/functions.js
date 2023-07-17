import { fetchData } from "./api/api.js";

// delete worning window
function deleteWorningWindow() {
  let worningWindow = document.querySelector(".worning-window");
  if (worningWindow) {
    worningWindow.remove();
  }
}

function sendFormData(formData) {
  let data = Object.fromEntries(formData.entries());
  console.log(data);

  fetchData(data);
}

export { deleteWorningWindow, sendFormData };
