import Popup from './Popup.js'

export default class PopupWithSubmit extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._submitButton = this._popup.querySelector('.form__submit-btn');
        this._form = this._popup.querySelector('.form');
    }

    handleSubmit(newFunction) {
        this._submitFunction = newFunction;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitFunction();
            this.close();
        });
    }

}