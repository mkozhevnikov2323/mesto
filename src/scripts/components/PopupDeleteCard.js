import { Popup } from "./Popup.js";

export class PopupDeleteCard extends Popup {
  constructor( popupSelector, { handleSubmit }) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._button = this._popupSelector.querySelector('.popup__save-btn');
  }

  deleleCard() {
    this._handleSubmit();
  }

  setEventListeners() {
    super.setEventListeners();

    this._button.addEventListener('click', (evt) => {
      this.deleleCard();
      // console.log(12);
      this.close();
    });
  }
}
