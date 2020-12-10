export default class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings;
        this._formElement = formElement;
    }

    _checkInputValidity(input, errorClass, inputErrorClass) {
        const isValid = input.validity.valid;
        if (isValid) {
            this._hideError(input, inputErrorClass);
        } else {
            this._showError(input, errorClass, inputErrorClass);
        }
    }

    _findErrorElement(input) {
        return this._formElement.querySelector(`#${input.id}-error`);
    }

    _hideError(input, inputErrorClass) {
        const errorElement = this._findErrorElement(input)
        errorElement.textContent = '';
        input.classList.remove(inputErrorClass);
    }

    _showError(input, errorClass, inputErrorClass) {
        const errorElement = this._findErrorElement(input)
        errorElement.textContent = input.validationMessage;
        errorElement.classList.add(errorClass);
        input.classList.add(inputErrorClass);
    }

    _isAnyInvalidInput(inputs) {
        return inputs.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    disableButton(inactiveButtonClass) {
        this._submitBtn.classList.add(inactiveButtonClass);
        this._submitBtn.disabled = true;
    }

    _toggleButtonState(inputs, inactiveButtonClass) {
        if (this._isAnyInvalidInput(inputs)) {
            this.disableButton(inactiveButtonClass)
        } else {
            this._submitBtn.classList.remove(inactiveButtonClass);
            this._submitBtn.disabled = false;
        }
    }

    enableValidation() {
        this._formElement.addEventListener('submit', evt => {
            evt.preventDefault()
        })
        const inputs = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector))
        this._submitBtn = this._formElement.querySelector(this._settings.submitButtonSelector)
        this._toggleButtonState(inputs, this._settings.inactiveButtonClass)
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                this._toggleButtonState(inputs, this._settings.inactiveButtonClass);
                this._checkInputValidity(input, this._settings.errorClass, this._settings.inputErrorClass)
            })
        })
    }

    cleanInputValidityErrors() {
        const inputs = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector))
        inputs.forEach(input => {
            this._hideError(input, this._settings.inputErrorClass)
        })
    }
}