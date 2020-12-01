import { escape } from "../../utils/constants.js";
export default class Popup {

    constructor(popupSelector) {
        this._popupSelector = popupSelector;
    }

    open() {
        document.addEventListener('keydown', this._handleEscClose.bind(this));
        this._popupSelector.classList.add("popup_opened");
    }

    close() {
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
        this._popupSelector.classList.remove("popup_opened");
    }

    _handleEscClose(evt) {
        if (evt.key === escape) {
            this.close();
        }
    }

    _handleOverlayClose(evt) {
        if (evt.target === evt.currentTarget) {
            this.close();
        }
    }

    setEventListeners() {
        const buttonClose = this._popupSelector.querySelector('.popup__close-button');
        buttonClose.addEventListener('click', this.close.bind(this));
        this._popupSelector.addEventListener('click', this._handleOverlayClose.bind(this));
    }
}

