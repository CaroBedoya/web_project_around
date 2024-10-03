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
const template = document.querySelector(".template-card");
const cardArea = document.querySelector(".elements");
const inputTitle = document.querySelector("#input-title");
const inputLink = document.querySelector("#input-url");
const popupImage = document.querySelector("#popup-image");
const popupImageContent = popupImage.querySelector(".popup__image");
const closeImageButton = document.querySelector("#close-image-popup");

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

function cardGenerator(name, link) {
  const card = template.content.cloneNode(true).querySelector(".element");
  const cardImage = card.querySelector(".element__photo");
  const cardTitle = card.querySelector(".element__photo-name");
  const btnDelete = card.querySelector(".element__photo-delete");
  const btnLike = card.querySelector(".element__photo-heart");

  btnLike.addEventListener("click", function () {
    btnLike.classList.toggle("element__photo-heart_active");
  });

  btnDelete.addEventListener("click", function () {
    card.remove();
  });

  cardImage.src = link;
  cardTitle.textContent = name;
  cardImage.alt = name;
  return card;
}

initialCards.forEach(function (element) {
  const newCard = cardGenerator(element.name, element.link);
  cardArea.append(newCard);
});

function handleOpenProfile() {
  popupProfile.classList.add("popup__show");
}

function handleClosePopup(popup) {
  popup.classList.remove("popup__show");
}

closeButtons.forEach((button) => {
  button.addEventListener("click", function () {
    handleClosePopup(button.closest(".popup"));
  });
});

profileButton.addEventListener("click", handleOpenProfile);

openCardForm.addEventListener("click", function () {
  popupCards.classList.add("popup__show");
});

formProfile.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  handleClosePopup(popupProfile);
});

formCards.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const cardToAdd = cardGenerator(inputTitle.value, inputLink.value);
  cardArea.prepend(cardToAdd);
  handleClosePopup(popupCards);
  formCards.reset();
});

function openImagePopup(src, alt, name) {
  popupImageContent.src = src;
  popupImageContent.alt = alt;
  const popupTitle = document.querySelector(".popup__image-title");
  popupTitle.textContent = name;
  popupImage.classList.add("popup__show");
}

closeImageButton.addEventListener("click", function () {
  handleClosePopup(popupImage);
});

cardArea.addEventListener("click", function (evt) {
  const target = evt.target;
  if (target.classList.contains("element__photo")) {
    const cardElement = target.closest(".element");
    const cardTitle = cardElement.querySelector(
      ".element__photo-name"
    ).textContent;
    openImagePopup(target.src, target.alt, cardTitle);
  }
});
