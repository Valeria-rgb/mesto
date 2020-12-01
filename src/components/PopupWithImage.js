import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popupSelector.querySelector('.popup__photo');
        this._title = this._popupSelector.querySelector('.popup__photo-title');
    }

    open({link, name}) {
        this._image.src = link;
        this._title.alt = name;
        this._title.textContent = name;

        super.open();
    }
}


