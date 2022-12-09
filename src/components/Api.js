export default class Api {
    constructor({url, headers}) {
        this._url = url;
        this._headers = headers;
    }

    _getResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            Promise.reject(`Ошибка ${res.status} ${res.statusText}`);
        }
    }

    getInitialCards() {
        return fetch(`${this._url}cards`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._getResponse)
    }

    getProfileInformation() {
        return fetch(`${this._url}users/me`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._getResponse)
    }

    patchUserInfo(userData) {
        return fetch(`${this._url}users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(userData)
        })
            .then(this._getResponse);
    }

    postNewCard(newCardData) {
        return fetch(`${this._url}cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(newCardData)
        })
            .then(this._getResponse);
    }

    deleteCard(id) {
        return fetch(`${this._url}cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._getResponse);
    }

    putCardLike(id) {
        return fetch(`${this._url}cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(this._getResponse);
    }

    deleteCardLike(id) {
        return fetch(`${this._url}cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._getResponse);
    }

    patchNewAvatar(avatar) {
        return fetch(`${this._url}users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({avatar: avatar})
        })
            .then(this._getResponse);
    }

    renderLoading(isLoading, form, text = 'Сохранить') {
        const formSubmitBtn = form.querySelector('.form__submit-btn');
        if (isLoading) {
            formSubmitBtn.textContent = 'Сохранение...'
        } else {
            formSubmitBtn.textContent = text;
        }
    }
}