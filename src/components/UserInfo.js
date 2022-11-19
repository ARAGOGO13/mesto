export default class UserInfo {
    constructor(name, description) {
        this._name = name;
        this._description = description;
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