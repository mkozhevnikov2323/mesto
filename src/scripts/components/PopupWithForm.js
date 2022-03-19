import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({ popupSelector, submiterForm }) {
    super(popupSelector);
    this._submiterForm = submiterForm;
  }

  setEventListeners() {
    this._popupSelector.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
      if (evt.target.classList.contains('popup__close-icon')) {
        this.close();
      }
    });

    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        this.close();
      }
    });

    this._popupSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._submiterForm(this._getInputValues());
      this.close();
    });
  }

  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    this._popupSelector.querySelector('.popup__form').reset();
  }
}
