import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    setSubmitFunction(submitFunction) {
        this._submitFunction = submitFunction;
    }

    setEventListeners() {
        super.setEventListeners();
        this._submit = this._popupSelector.querySelector('.popup__submit');
        this._submit.addEventListener('click', () => {
            this._submitFunction();
        })
    }
}