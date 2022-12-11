import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitFunction) {
        super(popupSelector);
        this._submitFunction = submitFunction;
        this._form = this._popup.querySelector('.form');
        this._inputList = this._popup.querySelectorAll('.form__input');
        this._submitBtn = this._popup.querySelector('.form__submit-btn');
    }

    _getInputValues() {
        this._formValues = {};

        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    renderLoading(isLoading) {
        const defaultSubmitBtnText = this._submitBtn.textContent;
        if (isLoading) {
            this._submitBtn.textContent = 'Сохранение...'
        } else {
            this._submitBtn.textContent = defaultSubmitBtnText;
        }
    }

    close() {
        super.close();
        this._form.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitFunction(this._getInputValues());
        });
    }
}