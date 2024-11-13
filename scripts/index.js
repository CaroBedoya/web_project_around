import Card from "./card.js";
import FormValidator from "./FormValidator.js";
import { openPopup, closePopup, addClosePopupListeners } from "./utils.js";

// Selección de elementos del DOM
const popupProfile = document.querySelector("#popup-profile");
const popupCards = document.querySelector("#popup-add-card");
const profileButton = document.querySelector(".profile__edit-button");
const openCardForm = document.querySelector(".profile__add-container");
const profileName = document.querySelector(".profile__username");
const profileAbout = document.querySelector(".profile__paragraph");
const inputName = document.querySelector("#input-name");
const inputAbout = document.querySelector("#input-about");
const formProfile = document.querySelector("#form-profile");
const formCards = document.querySelector("#form-addcard");
const closeButtons = document.querySelectorAll(".form__close-button");
const templateSelector = ".template-card";
const cardArea = document.querySelector(".elements");
const inputTitle = document.querySelector("#input-title");
const inputLink = document.querySelector("#input-url");
const popupImage = document.querySelector("#popup-image");
const popupImageContent = popupImage.querySelector(".popup__image");
const popupImageTitle = popupImage.querySelector(".popup__image-title");
const closeImageButton = document.querySelector("#close-image-popup");

// Tarjetas iniciales
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

// Función para crear y agregar tarjeta
initialCards.forEach((element) => {
  const card = new Card(element, templateSelector);
  cardArea.append(card.getCard());
});

// Configuración de validación
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".form__input, .popup__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const formProfileValidator = new FormValidator(validationConfig, formProfile);
formProfileValidator.enableValidation();

const formCardsValidator = new FormValidator(validationConfig, formCards);
formCardsValidator.enableValidation();

// Función para abrir el formulario de perfil y llenar los campos
function handleOpenProfile() {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  openPopup(popupProfile);
}

// Configura los eventos de los botones de cierre de los popups
closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup");
    closePopup(popup);
  });
});

// Eventos para abrir los formularios
profileButton.addEventListener("click", handleOpenProfile);
openCardForm.addEventListener("click", () => openPopup(popupCards));

// Evento para enviar el formulario de "Nuevo Lugar"
formCards.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const card = new Card(
    { name: inputTitle.value, link: inputLink.value },
    templateSelector
  );
  cardArea.prepend(card.getCard());
  closePopup(popupCards);
  formCards.reset();
});

// Evento para enviar el formulario de "Editar perfil"
formProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup(popupProfile);
});

// Evento para abrir la imagen en tamaño grande
cardArea.addEventListener("click", (evt) => {
  const target = evt.target;
  if (target.classList.contains("element__photo")) {
    const cardTitle = target
      .closest(".element")
      .querySelector(".element__photo-name").textContent;
    openImagePopup(target.src, target.alt, cardTitle);
  }
});

function openImagePopup(src, alt, name) {
  popupImageContent.src = src;
  popupImageContent.alt = alt;
  popupImageTitle.textContent = name;
  openPopup(popupImage);
}

// Cierra el popup de imagen al hacer clic en el botón de cerrar
closeImageButton.addEventListener("click", () => closePopup(popupImage));
