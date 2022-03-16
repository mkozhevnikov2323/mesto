import {
  popupShowPlace,
  imageShowPlace,
  titleShowPlace
} from '../utils/constants.js';

export class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _openPopupShowPlace() {
    // openPopup(popupShowPlace);
    this._handleCardClick();
    // console.log(12)
  }

  _getPlaceInfo() {
    imageShowPlace.src = this._link;
    imageShowPlace.alt = this._name;
    titleShowPlace.textContent = this._name;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__photo').setAttribute('src', this._link);
    this._element.querySelector('.element__photo').setAttribute('alt', this._name);
    this._element.querySelector('.element__place').textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__photo').addEventListener('click', () => {
      this._openPopupShowPlace();
      this._getPlaceInfo();
    });

    this._element.querySelector('.element__trash').addEventListener('click', (evt) => {
      evt.target.parentElement.parentElement.remove();
    });

    this._element.querySelector('.element__heart').addEventListener('click', (evt) => {
      evt.target.classList.toggle('element__heart_active');
    });
  }
}
