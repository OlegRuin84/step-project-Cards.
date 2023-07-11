// create the window after log-In
function createWindowAfterLogIn(header) {
  // create btn "Create a visit"
  createVisitBtn(header);
  let visitBtn = document.querySelector(".button-create-visit");
  visitBtn.addEventListener("click", createWindowContent);

  let isRequesting = false; // a flag for button
  function createWindowContent() {
    if (isRequesting) return; // after this the button doesn't work. Without this the button will work again and again...
    isRequesting = true;

    //
    // ! Here is your code for a window, that creates visits -----------------------------------------------------
    //
  }
}

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

export { createVisitBtn, createWindowAfterLogIn, deleteWorningWindow };
