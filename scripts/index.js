import FormValidator from './FormValidator.js';
import Card from "./Card.js";
import {initialCards, validationTools} from "./data.js";

const fullScreenPhotoPopup = document.querySelector(".popup_scale-photo");
const buttonOpenEditPopup = document.querySelector(".profile__edit-button");
const buttonCloseEditPopup = document.querySelector(".popup__close-button_edit-popup");
const popupEdit = document.querySelector(".popup_edit");
const formEdit = document.querySelector(".popup__form_edit");
const nameInput = document.querySelector(".popup__input_name");
const jobInput = document.querySelector(".popup__input_description");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const buttonOpenAddPopup = document.querySelector(".profile__add-button");
const buttonCloseAddPopup = document.querySelector(".popup__close-button_add-popup");
const popupAdd = document.querySelector(".popup_add");
const imageTitleInput = document.querySelector(".popup__input_image-title");
const imageLinkInput = document.querySelector(".popup__input_link-of-image");
const formAdd = document.querySelector(".popup__form_add");
const buttonClosePhotoPopup = document.querySelector(".popup__close-button_photo");
const escape = 'Escape';

function openPopup(popup) {
    document.addEventListener('keydown', closeByEscape);
    popup.classList.add("popup_opened");
}

export function scalePhotoInPopup(image) {
    fullScreenPhotoPopup.querySelector(".popup__photo").src = image;
    openPopup(fullScreenPhotoPopup);
}

function closePopup(popup) {
    document.removeEventListener('keydown', closeByEscape);
    popup.classList.remove("popup_opened");
}

function submitProfileForm(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popupEdit);
}

function getInputProfile() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(popupEdit);
}

function getCardTemplate() {
    return document.querySelector("#card__template").content;
}

function addCard(card) {
    document.querySelector(".cards").prepend(card);
}

function submitNewCardForm(evt) {
    evt.preventDefault();
    const imageLink = imageLinkInput.value;
    const name = imageTitleInput.value;
    const generateCard = new Card(imageLink, name, getCardTemplate()).generateCard();
    addCard(generateCard);
    closePopup(popupAdd);
}

initialCards.forEach((item) => {
    const card = new Card(item.link, item.name, getCardTemplate());
    const cardItem = card.generateCard();
    document.querySelector(".cards").prepend(cardItem);
})

function closeByEscape(evt) {
    if (evt.key === escape) {
        closePopup(document.querySelector('.popup_opened'));
    }
}

function closeByOverlay(evt) {
    if (evt.target === evt.currentTarget) closePopup(evt.target);
}

const validateAddForm = new FormValidator(validationTools, formAdd);
validateAddForm.enableValidation();
const validateEditForm = new FormValidator(validationTools, formEdit);
validateEditForm.enableValidation();

buttonOpenEditPopup.addEventListener("click", getInputProfile);
buttonCloseEditPopup.addEventListener("click", function () {
    closePopup(popupEdit)
    validateEditForm.cleanInputValidityErrors()
});

formEdit.addEventListener('submit', submitProfileForm);

buttonOpenAddPopup.addEventListener('click', function () {
    formAdd.reset();
    openPopup(popupAdd)
});

buttonCloseAddPopup.addEventListener("click", function () {
    closePopup(popupAdd)
    validateAddForm.cleanInputValidityErrors()
});

formAdd.addEventListener("submit", submitNewCardForm);
buttonClosePhotoPopup.addEventListener('click', function () {
    closePopup(fullScreenPhotoPopup)
});

popupAdd.addEventListener('click', closeByOverlay);
popupEdit.addEventListener('click', closeByOverlay);
fullScreenPhotoPopup.addEventListener('click', closeByOverlay);