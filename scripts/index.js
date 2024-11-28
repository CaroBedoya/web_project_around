import Section from "./Section.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { enableValidation } from "./utils.js";

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

// Crear las tarjetas iniciales
initialCards.forEach((element) => {
  const card = new Card(element, templateSelector, openImagePopup);
  cardArea.append(card.generateCard());
});

// Función para abrir y cerrar popups
closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup");
    popup.classList.remove("popup_opened");
  });
});

// Función para abrir popups
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

// Eventos para abrir los popups
profileButton.addEventListener("click", () => {
  const popupProfileInstance = new PopupWithForm(
    "#popup-profile",
    handleProfileFormSubmit
  );
  popupProfileInstance.open();
});

openCardForm.addEventListener("click", () => {
  const popupAddCardInstance = new PopupWithForm(
    "#popup-add-card",
    handleAddCardFormSubmit
  );
  popupAddCardInstance.open();
});

closeImageButton.addEventListener("click", () => {
  popupImage.classList.remove("popup_opened");
});

// Función para manejar la creación de una tarjeta
function handleAddCardFormSubmit(event) {
  event.preventDefault();
  const card = new Card(inputTitle.value, inputLink.value, templateSelector);
  cardArea.prepend(card.generateCard());
  formCards.reset();
  popupCards.classList.remove("popup_opened");
}

// Función para manejar el envío del formulario de perfil
function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  popupProfile.classList.remove("popup_opened");
}

// Función para abrir la imagen en el popup
function openImagePopup(name, link) {
  popupImageContent.src = link;
  popupImageContent.alt = name;
  popupImageTitle.textContent = name;
  openPopup(popupImage);
}
