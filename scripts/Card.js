export class Card {
  constructor(
    name,
    link,
    templateSelector,
    handleCardClick,
    handleDeleteClick
  ) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick; // Nuevo callback para eliminar
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners(cardElement) {
    const btnLike = cardElement.querySelector(".element__photo-heart");
    const btnDelete = cardElement.querySelector(".element__photo-delete");
    const cardImage = cardElement.querySelector(".element__photo");

    // Toggle "like" al hacer clic
    btnLike.addEventListener("click", () => {
      btnLike.classList.toggle("element__photo-heart_active");
    });

    // Al hacer clic en el botón de eliminar, se llama al callback en vez de eliminar directamente
    btnDelete.addEventListener("click", () => {
      this._handleDeleteClick(cardElement);
    });

    // Al hacer clic en la imagen, se ejecuta el callback para agrandar la imagen
    cardImage.addEventListener("click", () => {
      this._handleCardClick(this._link, this._name);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector(".element__photo");
    cardImage.src = this._link;
    cardImage.alt = this._name;
    this._element.querySelector(".element__photo-name").textContent =
      this._name;

    this._setEventListeners(this._element);
    return this._element;
  }
}
