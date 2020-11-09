import {scalePhotoInPopup} from "./index.js";

export default class Card {
    constructor(link, name, templateSelector) {
        this._link = link;
        this._name = name;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        return this._templateSelector.cloneNode(true);
    }

    generateCard() {
        this._item = this._getTemplate();
        this._setEventListeners();

        const _image = this._item.querySelector(".card__photo");
        _image.src = this._link;
        _image.alt = this._name;
        this._item.querySelector(".card__title").textContent = this._name;
        this._item.querySelector(".card__like").src =  this._like;
        this._item.querySelector(".card__trash").src = this._trash;

        return this._item;
    }

    _setEventListeners() {
        this._like = this._item.querySelector(".card__like")
        this._trash = this._item.querySelector(".card__trash")
        this._image = this._item.querySelector(".card__photo");
        this._like.addEventListener('click', () => this._toggleLike());
        this._trash.addEventListener('click', () => this._deleteImage());
        this._image.addEventListener('click', () => scalePhotoInPopup(this._link));
    }

    _toggleLike() {
       this._like.classList.toggle('card__like_active');
    }

    _deleteImage() {
        this._trash.closest('.card').remove();
    }

}


