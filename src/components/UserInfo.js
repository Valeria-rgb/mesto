export default class UserInfo {

    constructor({descriptionElement, nameElement, avatarElement}) {
        this._descriptionElement = document.querySelector(descriptionElement);
        this._nameElement = document.querySelector(nameElement);
        this._avatarElement = document.querySelector(avatarElement);
    }

    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            about: this._descriptionElement.textContent
        }
    }

    setUserInfo(info) {
        this._nameElement.textContent = info.name;
        this._descriptionElement.textContent = info.about;
    }

    setAvatar(avatar) {
        console.log("avatar url - " + avatar)
        this._avatarElement.src = avatar;
    }
}

