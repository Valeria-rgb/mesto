export default class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _sendData(path, headers) {
        return fetch(`${this._url}${path}`, headers)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Произошла ошибка: ${res.status}`);
            })
    }

    getUserInfo() {
        return this._sendData("users/me", {
            method: "GET",
            headers: this._headers
        })
    }

    getCards() {
        return this._sendData("cards", {
            method: "GET",
            headers: this._headers
        })
    }

    changeUserInfo(data) {
        return this._sendData("users/me", {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                description: data.about
            })
        })
    }

    addCard(card) {
        return this._sendData("cards", {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: card.name,
                link: card.link
            })
        })
    }

    showLikes(card) {
        return this._sendData(`cards/likes/${card}`, {
            method: "PUT",
            headers: this._headers
        })

    }

    deleteCard(card) {
        return this._sendData(`cards/${card}`, {
            method: "DELETE",
            headers: this._headers
        })
    }

    deleteLike(card) {
        return this._sendData(`cards/likes/${card}`, {
            method: "DELETE",
            headers: this._headers
        })
    }

    changeAvatar(avatar) {
        return this._sendData("users/me/avatar", {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar
            })
        })
    }


}





