export default class Card {
    constructor({data, handleCardClick, handleSetLikeClick, handleRemoveLikeClick,handleDeleteIconClick}, cardTemplateSelector, userId) {
        this._likes = data.likes;
        this._name = data.name;
        this._link = data.link;
        this._cardId = data._id;
        this._ownerId = data.owner;
        this._userId = userId;
        this._handleCardClick = handleCardClick;
        this._handleSetLikeClick = handleSetLikeClick;
        this._handleRemoveLikeClick = handleRemoveLikeClick;
        this._handleDeleteIconClick = handleDeleteIconClick;
        this._cardTemplateSelector = cardTemplateSelector;
    }

    _getTemplate() {
        return document.querySelector(this._cardTemplateSelector).content.querySelector('.card').cloneNode(true);
    }

    cardDelete() {
        this._element.remove();
    }

    cardLike(data) {
        this._likes = data.likes;
        this._element.querySelector('.card__like-counter').textContent = this._likes.length;
        this._cardLikeBtn.classList.toggle('card__like-btn_active');
    }

    _isCardLikedByUser() {
        return this._likes.some((user) => {
            if (user._id === this._userId) {
                this._cardLikeBtn.classList.add('card__like-btn_active');
            };
        });
    }

    _isPossibleToDelete() {
        if (this._ownerId._id === this._userId) {
            this._element.querySelector('.card__delete-btn').classList.add('card__delete-btn_active');
        }
    }

    _setEventListeners() {
        this._cardImg = this._element.querySelector('.card__photo');

        this._cardImg.addEventListener('click', () => {
            this._handleCardClick();
        });

        this._cardLikeBtn = this._element.querySelector('.card__like-btn');
        this._cardDeleteBtn = this._element.querySelector('.card__delete-btn');

        this._cardLikeBtn.addEventListener('click', () => {
            if (this._cardLikeBtn.classList.contains('card__like-btn_active')) {
                this._handleRemoveLikeClick(this._cardId);
            } else {
                this._handleSetLikeClick(this._cardId);
            }
        });

        this._cardDeleteBtn.addEventListener(('click'), ()  => {
            this._handleDeleteIconClick(this._cardId);
        })

    }

    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.card__photo').src = this._link;
        this._element.querySelector('.card__heading').textContent = this._name;
        this._element.querySelector('.card__photo').alt = this._name;
        this._element.querySelector('.card__like-counter').textContent = this._likes.length;
        this._setEventListeners();
        this._isPossibleToDelete();
        this._isCardLikedByUser();
        return this._element;
    }
}
