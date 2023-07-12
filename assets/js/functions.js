// for creating btn "Create a visit"
function createVisitBtn(elem) {
  let visitBtn = document.createElement("div");
  visitBtn.textContent = "СТВОРИТИ ВІЗИТ";
  visitBtn.classList.add("button");
  visitBtn.classList.add("button-create-visit");
  elem.append(visitBtn);
}

// delete worning window
function deleteWorningWindow() {
  let worningWindow = document.querySelector(".worning-window");
  worningWindow.remove();
}

export { createVisitBtn, deleteWorningWindow };
