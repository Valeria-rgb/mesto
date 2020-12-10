import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

    constructor(popupSelector, submitFormCallback) {
        super(popupSelector);
        this._submitFormCallback = submitFormCallback;
        this._submit = this._popupSelector.querySelector('.popup__submit');
        this._submitText = this._submit.textContent;
    }

    close() {
        super.close();
        this._form.reset();
    }

    _getInputValues() {
        this._inputList = Array.from(this._popupSelector.querySelectorAll('.popup__input'));
        let formValues = {};
        this._inputList.forEach(input => {
            formValues[input.name] = input.value;
        });
        return formValues;
    }

    showLoading(isLoading) {
        if (isLoading) {
            this._submit.textContent = 'Сохранение...';
        } else {
            this._submit.textContent = this._submitText;
        }
    }

    setEventListeners() {
        super.setEventListeners();
        this._form = this._popupSelector.querySelector('.popup__form');
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitFormCallback(this._getInputValues());
        })
    }
}





