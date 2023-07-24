// delete worning window
function deleteWorningWindow() {
  let worningWindow = document.querySelector(".worning-window");
  if (worningWindow) {
    worningWindow.remove();
  }
}

export { deleteWorningWindow };
