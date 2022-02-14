"use strict";

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const showInputError = (formElement, inputElement, errorMessage, settingsObj) => {
  const errorElement = inputElement.nextElementSibling;
  inputElement.classList.add(settingsObj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settingsObj.errorClass);
};

const hideInputError = (formElement, inputElement, settingsObj) => {
  const errorElement = inputElement.nextElementSibling;
  inputElement.classList.remove(settingsObj.inputErrorClass);
  errorElement.classList.remove(settingsObj.errorClass);
  errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, settingsObj) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settingsObj.inactiveButtonClass);
    buttonElement.setAttribute('disabled', '');
  }
  else {
    buttonElement.classList.remove(settingsObj.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

const checkInputValidity = (formElement, inputElement, settingsObj) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settingsObj);
  } else {
    hideInputError(formElement, inputElement, settingsObj);
  }
};

const setEventListeners = (formElement, settingsObj) => {
  const inputList = Array.from(formElement.querySelectorAll(settingsObj.inputSelector));
  const buttonElement = formElement.querySelector(settingsObj.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settingsObj);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, settingsObj);
      toggleButtonState(inputList, buttonElement, settingsObj);
    });
  });
};

function enableValidation(settingsObj) {
  const formList = Array.from(document.querySelectorAll(settingsObj.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
      evt.target.reset();
    });
    setEventListeners(formElement, settingsObj);
  });
};

enableValidation(settings);
