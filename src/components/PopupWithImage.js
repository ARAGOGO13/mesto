import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup__card-img');
        this._popupTitle = this._popup.querySelector('.popup__card-heading');
    }

    open(src, title) {
        this._popupImage.src = src;
        this._popupImage.alt = title;
        this._popupTitle.textContent = title;
        super.open();
    }
}