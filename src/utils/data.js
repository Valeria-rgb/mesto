import india from '../images/India.jpg'
import italy from '../images/Italy.jpg'
import denmark from '../images/Denmark.jpg'
import vien from '../images/Vien.jpg'
import china from '../images/China.jpg'
import germany from '../images/Germany.jpg'

export const initialCards = [
    {
        name: 'Индия',
        link: india
    },
    {
        name: 'Италия',
        link: italy
    },
    {
        name: 'Дания',
        link: denmark
    },
    {
        name: 'Вена',
        link: vien
    },
    {
        name: 'Китай',
        link: china
    },
    {
        name: 'Германия',
        link: germany
    }
];

export const validationTools = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

