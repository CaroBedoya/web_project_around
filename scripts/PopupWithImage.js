import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".popup__image");
    this._caption = this._popup.querySelector(".popup__image-title");
  }

  // Método para abrir el popup con la imagen
  open(name, link) {
    // Verifica si los datos son válidos
    if (!name || !link) {
      console.error("Datos inválidos para abrir el popup:", { name, link });
      return;
    }

    // Configura la imagen y el título
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;

    // Asegúrate de que la imagen esté completamente cargada antes de mostrarla
    this._image.onload = () => {
      super.open(); // Abre el popup solo cuando la imagen esté cargada
    };

    // Si la imagen no se carga, muestra un mensaje de error
    this._image.onerror = () => {
      console.error("Error al cargar la imagen:", link);
    };
  }
}

export default PopupWithImage;
