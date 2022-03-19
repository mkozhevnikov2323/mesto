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
    this._handleCardClick();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementPhoto = this._element.querySelector('.element__photo');
    this._setEventListeners();

    this._elementPhoto.setAttribute('src', this._link);
    this._elementPhoto.setAttribute('alt', this._name);
    this._element.querySelector('.element__place').textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._elementPhoto.addEventListener('click', () => {
      this._openPopupShowPlace();
    });

    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._element.remove();
    });

    this._element.querySelector('.element__heart').addEventListener('click', (evt) => {
      evt.target.classList.toggle('element__heart_active');
    });
  }
}
