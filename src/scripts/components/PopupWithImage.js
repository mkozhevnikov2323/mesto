import { Popup } from "./Popup.js";
import {
  imageShowPlace,
  titleShowPlace
} from '../utils/constants.js';

export class PopupWithImage extends Popup {

  open(cardItem) {
    super.open();

    imageShowPlace.src = cardItem.link;
    imageShowPlace.alt = cardItem.name;
    titleShowPlace.textContent = cardItem.name;
  }
}
