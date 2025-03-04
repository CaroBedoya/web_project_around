export class Card {
  constructor(
    name,
    link,
    templateSelector,
    handleCardClick, // Callback para abrir imagen (agrandar)
    handleDeleteClick, // Callback para eliminar la tarjeta (debe devolver una promesa)
    handleLikeClick, // Callback para alternar "me gusta" (debe devolver una promesa con el nuevo estado)
    isLiked, // Estado inicial del "like" (true o false)
    cardId // Identificador de la tarjeta
  ) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._isLiked = isLiked;
    this._cardId = cardId;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    // Selecciona los elementos según el HTML:
    this._btnLike = this._element.querySelector(".element__photo-heart");
    this._btnDelete = this._element.querySelector(".element__photo-delete");
    this._cardImage = this._element.querySelector(".element__photo");

    // Alternar "like" al hacer clic, comunicándose con la API
    this._btnLike.addEventListener("click", () => this._toggleLike());

    // Eliminar tarjeta al hacer clic, comunicándose con la API
    this._btnDelete.addEventListener("click", () => {
      this._handleDeleteClick(this._cardId)
        .then(() => {
          this._element.remove();
        })
        .catch((err) => console.error("Error al eliminar la tarjeta:", err));
    });

    // Agrandar imagen: llama al callback para abrir el popup de imagen
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._link, this._name);
    });
  }

  _toggleLike() {
    this._handleLikeClick(this._cardId, this._isLiked)
      .then((newState) => {
        this._isLiked = newState; // Actualiza el estado según la respuesta de la API
        this._updateLikeButton();
      })
      .catch((err) => console.error("Error al alternar 'me gusta':", err));
  }

  _updateLikeButton() {
    if (this._isLiked) {
      this._btnLike.classList.add("element__photo-heart_active");
    } else {
      this._btnLike.classList.remove("element__photo-heart_active");
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    // Configura la imagen y el nombre de la tarjeta
    const cardImage = this._element.querySelector(".element__photo");
    cardImage.src = this._link;
    cardImage.alt = this._name;
    this._element.querySelector(".element__photo-name").textContent =
      this._name;

    // Primero asigna los event listeners (esto define _btnLike, _btnDelete, etc.)
    this._setEventListeners();
    // Luego actualiza visualmente el botón de "like" según el estado inicial
    this._updateLikeButton();

    return this._element;
  }
}
