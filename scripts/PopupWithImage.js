import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".popup__image");
    this._popupCaption = this._popup.querySelector(".popup__image-title");
  }

  open(link, name) {
    this._popupImage.src = link || "#";
    this._popupImage.alt = name || "Imagen no disponible";
    this._popupCaption.textContent = name || "Sin descripción";
    super.open();
  }
}
