// Abre un popup
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscClose);
}

// Cierra un popup
export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscClose);
}

// Añade listeners para cerrar popups
export function addClosePopupListeners(popup) {
  popup.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("form__close-button")
    ) {
      closePopup(popup);
    }
  });
}

// Cierra el popup con la tecla "Escape"
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_opened");
    if (openPopup) {
      closePopup(openPopup);
    }
  }
}
