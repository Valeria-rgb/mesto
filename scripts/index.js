const initialCards = [
    {
        name: 'Индия',
        link: './images/India.jpg'
    },
    {
        name: 'Италия',
        link: './images/Italy.jpg'
    },
    {
        name: 'Дания',
        link: './images/Denmark.jpg'
    },
    {
        name: 'Вена',
        link: './images/Vien.jpg'
    },
    {
        name: 'Китай',
        link: './images/China.jpg'
    },
    {
        name: 'Германия',
        link: './images/Germany.jpg'
    }
];

const cardTemplate = document.querySelector("#card__template").content;
const cardsContainer = document.querySelector(".cards");
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

function createCard(link, name) {
    const cardItem = cardTemplate.cloneNode(true);
    const image = cardItem.querySelector(".card__photo");
    const photoLike = cardItem.querySelector(".card__like");
    const cardTitle = cardItem.querySelector(".card__title");
    const deleteButton = cardItem.querySelector(".card__trash");
    image.src = link;
    image.alt = name;
    cardTitle.textContent = name;
    photoLike.addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like_active');
    });
    deleteButton.addEventListener('click', function () {
        const parent = deleteButton.closest('.card');
        parent.remove();
    });
    image.addEventListener('click', function () {
        fullScreenPhotoPopup.querySelector(".popup__photo").src = link;
        openPopup(fullScreenPhotoPopup);
    });
    cardsContainer.prepend(cardItem);
}

initialCards.forEach(function (item) {
    createCard(item.link, item.name);
})

function openPopup(popup) {
    popup.classList.add("popup_opened");
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
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

function getInputCards(evt) {
    evt.preventDefault();
    let imageLink = imageLinkInput.value;
    console.log()
    let name = imageTitleInput.value;
    createCard(imageLink, name)
    closePopup(popupAdd);
}

buttonOpenEditPopup.addEventListener("click", getInputProfile);
buttonCloseEditPopup.addEventListener("click", function () {
    closePopup(popupEdit)
});

formEdit.addEventListener('submit', formSubmitHandler);

buttonOpenAddPopup.addEventListener('click', function () {
    openPopup(popupAdd)
});

buttonCloseAddPopup.addEventListener("click", function () {
    closePopup(popupAdd)
});

formAdd.addEventListener("submit", getInputCards);
buttonClosePhotoPopup.addEventListener('click', function () {
    closePopup(fullScreenPhotoPopup)
});









