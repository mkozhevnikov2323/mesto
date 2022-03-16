import { Popup } from "./Popup.js";
import {
  popupPlaceName,
  popupPlaceLink,
  // formAddPlace
} from '../utils/constants.js';

export class PopupWithForm extends Popup {
  constructor(cardSelector, submiterForm) {
    super(cardSelector);
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
      this._getInputValues();
      this.close();
    });
  }

  _getInputValues() {
    this._placeName = popupPlaceName.value;
    this._placeLink = popupPlaceLink.value;
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    popupPlaceName.value = '';
    popupPlaceLink.value = '';
  }

  renderItem() {
    this._submiterForm();
  }
}
