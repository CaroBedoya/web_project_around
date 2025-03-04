import { Card } from "../scripts/Card.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import Section from "../scripts/Section.js";
import UserInfo from "../scripts/UserInfo.js";
import FormValidator from "../scripts/FormValidator.js";
import api from "../scripts/Api.js";

document.addEventListener("DOMContentLoaded", () => {
  // Variables del DOM
  const cardContainer = document.querySelector(".elements");
  const profileButton = document.querySelector(".profile__edit-button");
  const addButton = document.querySelector(".profile__add-container");
  const profileNameElem = document.querySelector(".profile__username");
  const profileAboutElem = document.querySelector(".profile__paragraph");
  const inputName = document.querySelector("#input-name");
  const inputAbout = document.querySelector("#input-about");
  const formProfile = document.querySelector("#form-profile");
  const formAddCard = document.querySelector("#form-addcard");
  const inputCardName = document.querySelector("#input-title");
  const inputLink = document.querySelector("#input-url");

  // Configuración para la validación de formularios
  const config = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "form__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  };

  const profileFormValidator = new FormValidator(config, formProfile);
  profileFormValidator.enableValidation();

  const addCardFormValidator = new FormValidator(config, formAddCard);
  addCardFormValidator.enableValidation();

  // Instanciar userInfo
  const userInfo = new UserInfo({
    nameSelector: ".profile__username",
    aboutSelector: ".profile__paragraph",
  });

  // Instanciar popups
  const profilePopup = new PopupWithForm("#popup-profile", (data) => {
    api
      .updateUserProfile(data.name, data.about)
      .then((updatedData) => {
        userInfo.setUserInfo({
          name: updatedData.name,
          about: updatedData.about,
        });
        profilePopup.close();
      })
      .catch((err) => console.error("Error al actualizar perfil:", err));
  });

  const addCardPopup = new PopupWithForm("#popup-add-card", (data) => {
    api
      .addNewCard(data.title, data.url)
      .then((cardData) => {
        // Se asume que cardData retorna propiedades: name, link, _id, etc.
        const newCard = createCard(
          cardData.link,
          cardData.name,
          cardData._id,
          false
        );
        cardContainer.prepend(newCard);
        inputCardName.value = "";
        inputLink.value = "";
        addCardPopup.close();
      })
      .catch((err) => console.error("Error al agregar tarjeta:", err));
  });

  const showCardPopup = new PopupWithImage("#popup-image");

  // Obtener información del usuario desde la API
  api
    .getUserInfo()
    .then((userData) => {
      userInfo.setUserInfo({ name: userData.name, about: userData.about });
    })
    .catch((err) => console.error("Error al obtener datos del usuario:", err));

  // Obtener tarjetas iniciales desde la API e instanciar Section
  api
    .getInitialCards()
    .then((initialCards) => {
      const section = new Section(
        {
          items: initialCards,
          renderer: (item) => {
            // Se asume que cada tarjeta tiene: link, name, _id y opcionalmente isLiked (default false)
            const newCard = createCard(
              item.link,
              item.name,
              item._id,
              item.isLiked || false
            );
            section.addItem(newCard);
          },
        },
        ".elements"
      );
      section.renderItems();
    })
    .catch((err) => console.error("Error al obtener tarjetas iniciales:", err));

  // Función para crear una tarjeta (card)
  function createCard(link, name, cardId, isLiked = false) {
    const card = new Card(
      name,
      link,
      ".template-card",
      // Callback para agrandar la imagen
      (link, name) => {
        showCardPopup.open(link, name);
      },
      // Callback para eliminar la tarjeta (se comunica con la API)
      (cardId) => {
        return api.deleteCard(cardId);
      },
      // Callback para alternar "me gusta" (se comunica con la API)
      (cardId, isLiked) => {
        return api.toggleLike(cardId, isLiked);
      },
      isLiked, // Estado inicial del like
      cardId // Identificador de la tarjeta
    );
    return card.generateCard();
  }

  // Evento para abrir el popup de editar perfil
  profileButton.addEventListener("click", () => {
    const data = userInfo.getUserInfo();
    inputName.value = data.name;
    inputAbout.value = data.about;
    profilePopup.open();
  });

  // Evento para abrir el popup de agregar tarjeta
  addButton.addEventListener("click", () => {
    addCardPopup.open();
  });

  // Cerrar popups al hacer click en el overlay
  document.querySelectorAll(".popup").forEach((popup) => {
    popup.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup__overlay")) {
        if (popup.id === "popup-profile") profilePopup.close();
        if (popup.id === "popup-add-card") addCardPopup.close();
        if (popup.id === "popup-image") showCardPopup.close();
      }
    });
  });

  // Cerrar popups al hacer click en el botón de cierre
  document.querySelectorAll(".popup__close-button").forEach((button) => {
    button.addEventListener("click", (evt) => {
      const popup = evt.target.closest(".popup");
      if (popup) {
        if (popup.id === "popup-profile") profilePopup.close();
        else if (popup.id === "popup-add-card") addCardPopup.close();
        else if (popup.id === "popup-image") showCardPopup.close();
        else if (popup.id === "popup-confirm") {
          // Lógica para popup de confirmación, si es necesario
        }
      }
    });
  });
});
