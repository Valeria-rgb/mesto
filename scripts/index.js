const buttonOpenPopup = document.querySelector(".profile__edit-button");
const buttonClosePopup = document.querySelector(".popup__close-button");
const popup = document.querySelector(".popup");
const formElement = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__input_name");
let jobInput = document.querySelector(".popup__input_description");
let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__description");

function popupToggle() {
    popup.classList.toggle("popup_opened");
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    popupToggle();
}

function getInput () {
    nameInput.value =  profileName.textContent;
    jobInput.value = profileDescription.textContent;
    popupToggle();
}

buttonOpenPopup.addEventListener("click", getInput);
buttonClosePopup.addEventListener("click", popupToggle);
formElement.addEventListener('submit', formSubmitHandler);

