import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitFunction) {
        super(popupSelector);
        this._submitFunction = submitFunction;
    }

    _getInputValues() {
        this._inputList = this._popup.querySelectorAll('.form__input');

        this._formValues = {};

        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitFunction(this._getInputValues());
            const form = this._popup.querySelector('.form');
            form.reset();
            this.close();
        });
    }

    close() {
        const form = this._popup.querySelector('.form');
        super.close();
        form.reset();
    }
}