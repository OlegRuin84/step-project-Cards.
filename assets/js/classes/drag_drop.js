class DragAndDrop {
  constructor(container) {
    this.container = container;
  }

  init() {
    this.container.addEventListener(`dragstart`, (evt) => {
      evt.target.classList.add(`selected`);
    });

    this.container.addEventListener(`dragend`, (evt) => {
      evt.target.classList.remove(`selected`);
    });

    this.container.addEventListener(`dragover`, (evt) => {
      evt.preventDefault();

      const activeElement = this.container.querySelector(`.selected`);

      const currentElement = evt.target;

      const isMoveable =
        activeElement !== currentElement &&
        currentElement.classList.contains(`card`);

      if (!isMoveable) {
        return;
      }

      const nextElement =
        currentElement === activeElement.nextElementSibling
          ? currentElement.nextElementSibling
          : currentElement;

      this.container.insertBefore(activeElement, nextElement);
    });
  }
}

export default DragAndDrop;
