import Popup from "./Popup.js";

export default class PopupWithSubmut extends Popup {
    constructor(popupSelector, submitFormCallback) {
        super(popupSelector);
        this._submitFormCallback = submitFormCallback;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form = this._popupSelector.querySelector('.popup__form');
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitFormCallback();
        })
    }
}