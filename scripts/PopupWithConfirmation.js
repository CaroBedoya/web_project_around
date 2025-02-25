import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirm) {
    super(popupSelector);
    this._handleConfirm = handleConfirm;

    this._confirmButton = this._popup.querySelector(".popup__button_confirm");
    this._cancelButton = this._popup.querySelector(".popup__button_cancel");
  }

  open(cardId, cardElement) {
    this._cardId = cardId;
    this._cardElement = cardElement;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();

    this._confirmButton.addEventListener("click", () => {
      this._handleConfirm(this._cardId, this._cardElement);
    });

    this._cancelButton.addEventListener("click", () => {
      this.close();
    });
  }
}
