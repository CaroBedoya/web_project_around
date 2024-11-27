export default class Card {
  constructor(data, templateSelector, openImagePopup) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openImagePopup = openImagePopup;
  }

  // Método para obtener el template
  _getTemplate() {
    const template = document.querySelector(this._templateSelector).content;
    return template.querySelector(".element").cloneNode(true);
  }

  // Método para crear la tarjeta
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._setCardContent();
    return this._element;
  }

  // Establecer los contenidos de la tarjeta
  _setCardContent() {
    this._element.querySelector(".element__photo").src = this._link;
    this._element.querySelector(".element__photo").alt = this._name;
    this._element.querySelector(".element__photo-name").textContent =
      this._name;
  }

  // Función para agregar los event listeners
  _setEventListeners() {
    this._element
      .querySelector(".element__photo")
      .addEventListener("click", () => {
        this._openImagePopup(this._link, this._name);
      });
    this._element
      .querySelector(".element__photo-heart")
      .addEventListener("click", (event) => {
        event.target.classList.toggle("element__photo-heart_active");
      });
    this._element
      .querySelector(".element__photo-delete")
      .addEventListener("click", () => {
        this._element.remove();
      });
  }
}
