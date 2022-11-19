import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(src, title) {
        const popupImage = this._popup.querySelector('.popup__card-img');
        const popupTitle = this._popup.querySelector('.popup__card-heading');
        popupImage.src = src;
        popupImage.alt = title;
        popupTitle.textContent = title;
        super.open();
    }
}