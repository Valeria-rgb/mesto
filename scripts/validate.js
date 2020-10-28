const obj = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

function checkInputValidity(input, errorClass, inputErrorClass) {
    const isValid = input.validity.valid;
    if (isValid) {
        hideError(input, inputErrorClass);
    } else {
        showError(input, errorClass, inputErrorClass);
    }
}

function findErrorElement(input) {
    const inputName = input.getAttribute('name')
    return document.getElementById(`${inputName}-error`)
}

function hideError(input, inputErrorClass) {
    const errorElement = findErrorElement(input)
    errorElement.textContent = '';
    input.classList.remove(inputErrorClass);
}

function showError(input, errorClass, inputErrorClass) {
    const errorElement = findErrorElement(input)
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(errorClass);
    input.classList.add(inputErrorClass);
}

function isAnyInvalidInput(inputs) {
    return inputs.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

function toggleButtonState(submitBtn, inputs, inactiveButtonClass) {
    if (isAnyInvalidInput(inputs)) {
        submitBtn.classList.add(inactiveButtonClass);
        submitBtn.disabled = true;
    } else {
        submitBtn.classList.remove(inactiveButtonClass);
        submitBtn.disabled = false;
    }
}

function enableValidation({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) {
    const forms = Array.from(document.querySelectorAll(formSelector));
    forms.forEach(form => {
        form.addEventListener('submit', evt => {
            evt.preventDefault()
        })
        const inputs = Array.from(form.querySelectorAll(inputSelector))
        const submitBtn = form.querySelector(submitButtonSelector)
        toggleButtonState(submitBtn, inputs, inactiveButtonClass)
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                toggleButtonState(submitBtn, inputs, inactiveButtonClass);
                checkInputValidity(input, errorClass, inputErrorClass)
            })
        })
    })
}
