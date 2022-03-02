export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    // this._isLiked = false;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    // this._setEventListeners();

    this._element.querySelector('.element__photo').setAttribute('src', this._link);
    this._element.querySelector('.element__photo').setAttribute('alt', this._name);
    this._element.querySelector('.element__place').textContent = this._name;

    return this._element;
  }
}
