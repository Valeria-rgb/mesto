const buttonOpenPopup = document.querySelector(".profile__edit-button")
const buttonClosePopup = document.querySelector(".popup__close-button")
const popup = document.querySelector(".popup")

function popupToggle() {
    popup.classList.toggle("popup_opened")
}

buttonOpenPopup.addEventListener("click", popupToggle)
buttonClosePopup.addEventListener("click", popupToggle)

const formElement = document.querySelector(".popup__form")

function getInputData() {
    let nameInput = document.querySelector(".popup__name-field")
    let jobInput = document.querySelector(".popup__description-field")
    let profileName = document.querySelector(".profile__name")
    let profileDescription = document.querySelector(".profile__description")
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    getInputData();
    popupToggle();
}

formElement.addEventListener('submit', formSubmitHandler);

