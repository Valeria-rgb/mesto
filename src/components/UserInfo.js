export default class UserInfo {
    constructor({descriptionElement, nameElement, avatarElement}) {
        this._descriptionElement = document.querySelector(descriptionElement);
        this._nameElement = document.querySelector(nameElement);
        this._avatarElement = document.querySelector(avatarElement);
    }

    getUserInfo() {
        const info = {};
        info._nameElement = this._nameElement.textContent;
        info._descriptionElement = this._descriptionElement.textContent;
        return info;
    }

    setUserInfo(info) {
        this._nameElement.textContent = info.name;
        this._descriptionElement.textContent = info.about;
    }

    setAvatar(info) {
        this._avatarElement.src = info.avatar;
    }
}

