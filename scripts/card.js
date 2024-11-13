export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle("element__photo-heart_active");
  }

  _handleDeleteButton() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._handleLikeButton());
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteButton()
    );
  }

  getCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".element__photo-heart");
    this._deleteButton = this._element.querySelector(".element__photo-delete");
    const cardImage = this._element.querySelector(".element__photo");
    cardImage.src = this._link;
    cardImage.alt = this._name;
    this._element.querySelector(".element__photo-name").textContent =
      this._name;
    this._setEventListeners();
    return this._element;
  }
}
