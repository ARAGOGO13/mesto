export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('click', (evt) => {this._handleOverlayClose(evt)})
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('click', (evt) => {this._handleOverlayClose(evt)})
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _handleOverlayClose(evt) {
        if (evt.target.classList.contains('popup')) {
            this.close();
        }
    }

    setEventListeners() {
        const closePopupButton = this._popup.querySelector('.popup__close-btn');
        closePopupButton.addEventListener('click', () => {this.close()});
        document.addEventListener('keydown', (evt) => {this._handleEscClose(evt)});
    }
}