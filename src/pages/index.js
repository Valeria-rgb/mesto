import "./index.css";
import FormValidator from '../components/FormValidator.js';
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import Api from "../components/Api.js";
import UserInfo from "../components/UserInfo.js";
import {validationTools} from "../utils/data.js";
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

function createCard(item, userId) {
    const card = new Card(
        item,
        userId,
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
                    .catch((err) => console.log(`Упс! ${err}`))
            })
            popupDeletePhotoInstance.open()
        },
        (cardId) => {
            api.addLike(cardId)
                .then((data) => {
                    card.toggleLike()
                    card.updateLikes(data.likes)
                })
                .catch((err) => console.log(`Упс! ${err}`))
        },
        (cardId) => {
            api.deleteLike(cardId)
                .then((cardResponse) => {
                    card.toggleLike()
                    card.updateLikes(cardResponse.likes)
                })
                .catch((err) => console.log(`Упс! ${err}`))
        }
    );
    return card.generateCard();
}

const cardSection = new Section(
    (item) => {
        const card = createCard(item, userId);
        cardSection.addItem(card);
    },
    cardContainer
);

let userInfo;
let userId;

function initializeCards(cards) {
    cardSection.renderItems(cards);
}

function initializeUserInfo(data) {
    userInfo = new UserInfo({
        nameElement: profileName,
        descriptionElement: profileDescription,
        avatarElement: profileAvatar
    });
    userInfo.setAvatar(data.avatar)
    userInfo.setUserInfo(data)
    userId = data._id
}

Promise.all([
    api.getUserInfo(),
    api.getCards()
])
    .then((data) => {
        initializeUserInfo(data[0]);
        initializeCards(data[1]);
    })
    .catch((err) => console.log(`Упс! ${err}`))

const photoPopup = new PopupWithImage(fullScreenPhotoPopup);
photoPopup.setEventListeners();

const popupChangeAvatar = new PopupWithForm(popupAvatar, (inputValues) => {
    popupChangeAvatar.showLoading(true);
    api.changeAvatar(inputValues.avatar)
        .then(() => {
            userInfo.setAvatar(inputValues.avatar);
            popupChangeAvatar.close();
        })
        .catch((err) => console.log(`Упс! ${err}`))
        .finally(() => {
            popupChangeAvatar.showLoading(false);
        })
})
popupChangeAvatar.setEventListeners();

const popupEditProfile = new PopupWithForm(popupEdit, (inputValues) => {
    popupEditProfile.showLoading(true);
    api.changeUserInfo(inputValues.name, inputValues.description)
        .then(() => {
            userInfo.setUserInfo({
                name: inputValues.name,
                about: inputValues.description
            });
            popupEditProfile.close();
        })
        .catch((err) => console.log(`Упс! ${err}`))
        .finally(() => {
            popupEditProfile.showLoading(false);
        })
});

popupEditProfile.setEventListeners();

const popupAddPlace = new PopupWithForm(popupAdd, inputValues => {
    popupAddPlace.showLoading(true);
    api.addCard(inputValues)
        .then((data) => {
            const newCard = createCard(data, userId);
            cardSection.addItem(newCard);
            popupAddPlace.close()
        })
        .catch((err) => console.log(`Упс! ${err}`))
        .finally(() => {
            popupAddPlace.showLoading(false);
        })
});

popupAddPlace.setEventListeners();

buttonOpenEditPopup.addEventListener('click', function () {
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.name;
    jobInput.value = userData.about;
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
    formAvatar.reset();
    validateAvatarForm.cleanInputValidityErrors();
    popupChangeAvatar.open()
    validateAvatarForm.disableButton(validationTools.inactiveButtonClass);
});