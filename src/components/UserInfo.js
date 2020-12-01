export default class UserInfo {
    constructor({descriptionElement, nameElement}) {
        this._descriptionElement = document.querySelector(descriptionElement);
        this._nameElement = document.querySelector(nameElement);
    }
    getUserInfo() {
        const info = {};
        info._nameElement = this._nameElement.textContent;
        info._descriptionElement = this._descriptionElement.textContent;
        return info;
    }

    setUserInfo(descriptionElement, nameElement) {
        this._nameElement.textContent = nameElement;
        this._descriptionElement.textContent = descriptionElement;
    }
}
