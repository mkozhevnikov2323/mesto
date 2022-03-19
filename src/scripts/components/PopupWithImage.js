import { Popup } from "./Popup.js";
import {
  imageShowPlace,
  titleShowPlace
} from '../utils/constants.js';

export class PopupWithImage extends Popup {

  open({name, link}) {
    super.open();

    imageShowPlace.src = link;
    imageShowPlace.alt = name;
    titleShowPlace.textContent = name;
  }
}
