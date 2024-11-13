// Función para abrir un popup
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscClose);
}

// Función para cerrar un popup
export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscClose);
}

// Función para agregar el evento de cierre a los popups
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

// Función para cerrar el popup al presionar "Escape"
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_opened");
    if (openPopup) {
      closePopup(openPopup);
    }
  }
}
