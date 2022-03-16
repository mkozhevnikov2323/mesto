import { Popup } from "./Popup.js";
import {
  popupShowPlace,
  imageShowPlace,
  titleShowPlace
} from '../utils/constants.js';

export class PopupWithImage extends Popup {
  constructor(data, cardSelector) {
    super(cardSelector);
    this._name = data.name;
    this._link = data.link;
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    imageShowPlace.src = this._link;
    imageShowPlace.alt = this._name;
    titleShowPlace.textContent = this._name;
  }
}
