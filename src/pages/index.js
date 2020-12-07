import "./index.css";
import FormValidator from '../components/FormValidator.js';
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import Api from "../components/Api.js";
import UserInfo from "../components/UserInfo.js";
import {initialCards, validationTools} from "../utils/data.js";
import {
    buttonOpenAddPopup,
    buttonOpenEditPopup,
    profileName,
    profileDescription,
    profileAvatar,
    cardContainer,
    cardTemplate,
    formAdd,
    formEdit,
    fullScreenPhotoPopup,
    jobInput,
    nameInput,
    popupAdd,
    popupEdit,
    popupAvatar,
    buttonEditAvatar,
    formAvatar,
    popupDeletePhoto
} from "../utils/constants.js";

const api = new Api({
    url: "https://mesto.nomoreparties.co/v1/cohort-18/",
    headers: {
        authorization: '4ce0d8a0-2bf1-4ede-8511-f9af6b75d79f',
        'Content-Type': 'application/json'
    }
})

const validateAddForm = new FormValidator(validationTools, formAdd);
validateAddForm.enableValidation();

const validateEditForm = new FormValidator(validationTools, formEdit);
validateEditForm.enableValidation();

const validateAvatarForm = new FormValidator(validationTools, formAvatar);
validateAvatarForm.enableValidation();

const popupDeletePhotoInstance = new PopupWithSubmit(popupDeletePhoto);
popupDeletePhotoInstance.setEventListeners();

function createCard(item) {
    const card = new Card(
        item,
        (link, name) => {
            photoPopup.open({
                link: link,
                name: name
            });
        },
        cardTemplate,
        (cardId) => {
            popupDeletePhotoInstance.setSubmitFunction(() => {
                api.deleteCard(cardId)
                    .then(() => {
                        popupDeletePhotoInstance.close();
                        card.deleteImage()
                    })
                    .catch((err) => console.log(`Произошла ошибка: ${err}`))
            })
            popupDeletePhotoInstance.open()
        }
    );
    return card.generateCard();
}

let cardSection;

api.getCards()
    .then(data => {
        cardSection = new Section({
                items: data,
                renderer: item => {
                    cardSection.addItem(createCard(item));
                },
            },
            cardContainer
        );
        cardSection.renderItems();
    })
    .catch(console.error);

const user = new UserInfo({
    nameElement: profileName,
    descriptionElement: profileDescription,
    avatarElement: profileAvatar
});

const photoPopup = new PopupWithImage(fullScreenPhotoPopup);
photoPopup.setEventListeners();

const popupChangeAvatar = new PopupWithForm(popupAvatar, () => {
    api.changeAvatar()
        .then((info) => {
            user.setAvatar(info);
            popupChangeAvatar.close();
        })
        .catch((err) => console.log(`Произошла ошибка: ${err}`))
})
popupChangeAvatar.setEventListeners();

const popupEditProfile = new PopupWithForm(popupEdit, () => {
    user.setUserInfo(jobInput.value, nameInput.value);
    popupEditProfile.close();
});
popupEditProfile.setEventListeners();

const popupAddPlace = new PopupWithForm(popupAdd, inputValues => {
    api.addCard(inputValues)
        .then((data) => {
            const cardResponse = {
                link: data.link,
                name: data.name,
                _id: data._id,
            }
            const newCard = createCard(cardResponse);
            cardSection.addItem(newCard);
            popupAddPlace.close();
        })
        .catch((err) => console.log(`Произошла ошибка: ${err}`))
});
popupAddPlace.setEventListeners();

buttonOpenEditPopup.addEventListener('click', function () {
    nameInput.value = user.getUserInfo()._nameElement;
    jobInput.value = user.getUserInfo()._descriptionElement;
    validateEditForm.cleanInputValidityErrors();
    popupEditProfile.open()
});

buttonOpenAddPopup.addEventListener('click', function () {
    formAdd.reset();
    validateAddForm.cleanInputValidityErrors();
    popupAddPlace.open();
    validateAddForm.disableButton(validationTools.inactiveButtonClass);
});

buttonEditAvatar.addEventListener('click', function () {
    popupChangeAvatar.open()
});