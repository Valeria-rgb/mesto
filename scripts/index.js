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
    getInput ();
}

function formSubmitHandler(evt) {
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    evt.preventDefault();
    popupToggle();
}

function getInput () {
    nameInput.value =  profileName.textContent;
    jobInput.value = profileDescription.textContent;
}

buttonOpenPopup.addEventListener("click", popupToggle);
buttonClosePopup.addEventListener("click", popupToggle);
formElement.addEventListener('submit', formSubmitHandler);

