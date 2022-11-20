export default class UserInfo {
    constructor(nameSelector, descriptionSelector) {
        this._name = document.querySelector(nameSelector).textContent;
        this._description = document.querySelector(descriptionSelector).textContent;
    }

    getUserInfo() {
        const userInfo = {};
        userInfo.name = this._name;
        userInfo.description = this._description;
        return userInfo;
    }

    setUserInfo(name, description) {
        this._name = name;
        this._description = description;
        document.querySelector('.profile__name').textContent = this._name;
        document.querySelector('.profile__description').textContent = this._description;
    }
}