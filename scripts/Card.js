export default class Card {
    constructor(title, link, openCardPopup) {
        this._title = title;
        this._link = link;
        this._openCardPopup = openCardPopup;
    }

    _getTemplate() {
        return document.querySelector('#card-template').content.querySelector('.card').cloneNode(true);
    }

    _cardLike() {
        this._cardLikeBtn.classList.toggle('card__like-btn_active');
    }

    _cardDelete() {
        this._element.remove();
    }


    _setEventListeners() {
        this._cardImg = this._element.querySelector('.card__photo');

        this._cardImg.addEventListener('click', () => {
            this._openCardPopup(this._title, this._link);
        });

        this._cardLikeBtn = this._element.querySelector('.card__like-btn');
        this._cardDeleteBtn = this._element.querySelector('.card__delete-btn');

        this._cardLikeBtn.addEventListener('click', () => {
            this._cardLike();
        });

        this._cardDeleteBtn.addEventListener(('click'), ()  => {
            this._cardDelete();
        })

    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._cardImg.src = this._link;
        this._element.querySelector('.card__heading').textContent = this._title;
        this._cardImg.alt = this._title;
        return this._element;
    }
}
