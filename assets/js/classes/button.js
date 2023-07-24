class Button {
  constructor(width = 140, height = 50, type = "button") {
    this.width = width;
    this.height = height;
    this.type = type;
  }

  createButton() {
    const buttonElement = document.createElement("button");
    buttonElement.style.width = `${this.width}px`;
    buttonElement.style.height = `${this.height}px`;
    buttonElement.type = this.type;
    buttonElement.classList.add("button");
    return buttonElement;
  }
}

export default Button;
