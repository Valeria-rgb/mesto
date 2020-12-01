import "./pages/index.css";
import FormValidator from './components/FormValidator.js';
import Card from "./components/Card.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import {initialCards, validationTools} from "./scripts/data.js";
import {
    buttonOpenAddPopup,
    buttonOpenEditPopup,
    profileName,
    profileDescription,
    cardContainer,
    cardTemplate,
    formAdd,
    formEdit,
    fullScreenPhotoPopup,
    jobInput,
    nameInput,
    popupAdd,
    popupEdit
} from "./utils/constants.js";

const validateAddForm = new FormValidator(validationTools, formAdd);
validateAddForm.enableValidation();
const validateEditForm = new FormValidator(validationTools, formEdit);
validateEditForm.enableValidation();

const photoPopup = new PopupWithImage(fullScreenPhotoPopup);
photoPopup.setEventListeners();

function createCard(item) {
    const card = new Card(
        item,
        (link, name) => {
            photoPopup.open({
                link: link,
                name: name
            });
        },
        cardTemplate
    );
    return card.generateCard();
}

const cardSection = new Section({
        items: initialCards,
        renderer: item => {
            cardSection.addItem(createCard(item));
        }
    },
    cardContainer
);

cardSection.renderItems();

const user = new UserInfo({
    nameElement: profileName,
    descriptionElement: profileDescription
});

const popupEditProfile = new PopupWithForm(popupEdit, () => {
    user.setUserInfo(jobInput.value, nameInput.value);
    popupEditProfile.close();
});
popupEditProfile.setEventListeners();


const popupAddPlace = new PopupWithForm(popupAdd, inputValues => {
    const newCard = createCard(inputValues);
    cardSection.addItem(newCard);
    popupAddPlace.close();
});
popupAddPlace.setEventListeners();

buttonOpenEditPopup.addEventListener("click", function () {
    nameInput.value = user.getUserInfo()._nameElement;
    jobInput.value = user.getUserInfo()._descriptionElement;
    validateEditForm.cleanInputValidityErrors();
    popupEditProfile.open()
});

buttonOpenAddPopup.addEventListener('click', function () {
    formAdd.reset();
    validateAddForm.cleanInputValidityErrors();
    popupAddPlace.open();
});