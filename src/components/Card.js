export default class Card {
    constructor(
        {link, name, _id, likes, owner},
        userId,
        handleCardClick,
        templateSelector,
        deleteCallback,
        addLikeCallback,
        deleteLikeCallback,
    ) {
        this._link = link;
        this._name = name;
        this._cardId = _id;
        this._likes = likes;
        this._owner = owner._id;
        this._userId = userId;
        this._handleCardClick = handleCardClick;
        this._deleteCallback = deleteCallback;
        this._addLikeCallback = addLikeCallback;
        this._deleteLikeCallback = deleteLikeCallback;
        this._templateSelector = document.querySelector(templateSelector).content;
    }

    _getTemplate() {
        return this._templateSelector.cloneNode(true);
    }

    generateCard() {
        this._item = this._getTemplate();
        const _image = this._item.querySelector(".card__photo");
        _image.src = this._link;
        _image.alt = this._name;
        this._item.querySelector(".card__title").textContent = this._name;
        this._item.querySelector(".card__like").src = this._like;
        this._likeCounter = this._item.querySelector(".card__like-counter");
        this._likeCounter.textContent = this._likes.length;
        this._item.querySelector(".card__trash").src = this._trash;
        if (this._userId !== this._owner) {
            this._item.querySelector(".card__trash").classList.add("card__trash_invisible");
        }
        this._setEventListeners();
        if (this._likes.find((item) => item._id === this._userId)) {
            this.toggleLike()
        }
        return this._item;
    }

    _setEventListeners() {
        this._like = this._item.querySelector(".card__like")
        this._trash = this._item.querySelector(".card__trash")
        this._image = this._item.querySelector(".card__photo");
        this._like.addEventListener('click', () => {
            if (this._getLikeState()) {
                this._deleteLikeCallback(this._cardId)
            } else {
                this._addLikeCallback(this._cardId)
            }
        });
        this._trash.addEventListener('click', () => this._deleteCallback(this._cardId));
        this._image.addEventListener('click', () => this._handleCardClick(this._link, this._name));
    }

    toggleLike() {
        this._like.classList.toggle('card__like_active');
    }

    updateLikes(likes) {
        this._likes = likes
        this._likeCounter.textContent = this._likes.length
    }

    _getLikeState() {
        return this._like.classList.contains('card__like_active')
    }

    deleteImage() {
        this._trash.closest('.card').remove();
    }

}


