import { Popup } from "./Popup.js";

export class PopupDeleteCard extends Popup {
  constructor( popupSelector, { handleSubmit }) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._button = this._popupSelector.querySelector('.popup__save-btn');
  }

  setEventListeners() {
    super.setEventListeners();

    this._button.addEventListener('click', () => {
      this._handleSubmit();
      // this.close();
    });
  }
}
