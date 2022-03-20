
export class FormValidator {
  constructor(data, form) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._form = form;
    this._inputList = Array.from(form.querySelectorAll(this._inputSelector));
    this._buttonElement = form.querySelector(this._submitButtonSelector);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = inputElement.nextElementSibling;
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = inputElement.nextElementSibling;
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList))  {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', '');
    }
    else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }

  enableValidation() {
    this._toggleButtonState(this._inputList, this._buttonElement);

    this._form.addEventListener('submit', () => {
      this._toggleButtonState(this._inputList, this._buttonElement);
    });

    this._setEventListeners(this._inputList, this._buttonElement);
  }
}
