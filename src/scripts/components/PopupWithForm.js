import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor( popupSelector, { submiterForm }) {
    super(popupSelector);
    this._submiterForm = submiterForm;
    this._inputList = this._popupSelector.querySelectorAll('.popup__input');
    this._form = this._popupSelector.querySelector('.popup__form');
    this._button = this._popupSelector.querySelector('.popup__save-btn');
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submiterForm(this._getInputValues());
      this.close();
    });
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  close() {
    super.close();
    this._form.reset();
  }
}
