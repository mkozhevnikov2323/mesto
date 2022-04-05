export class Card {
  constructor(data, cardSelector, handleCardClick, handleDeleteCard) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._userId = data.owner._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  getIdCard() {
    return this._id;
  }

  _openPopupShowPlace() {
    this._handleCardClick();
  }

  _openPopupDeleteCard() {
    this._handleDeleteCard(this._id);
    // console.log(this._id)
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementPhoto = this._element.querySelector('.element__photo');
    this._elementGarbage = this._element.querySelector('.element__trash');
    this._setEventListeners();

    this._elementPhoto.setAttribute('src', this._link);
    this._elementPhoto.setAttribute('alt', this._name);
    this._element.querySelector('.element__place').textContent = this._name;

    if (this._userId !== '761edb0fe2f2cbc489706bfd') {
      this._elementGarbage.remove();
    };

    return this._element;
  }

  _setEventListeners() {
    this._elementPhoto.addEventListener('click', () => {
      this._openPopupShowPlace();
    });

    this._element.querySelector('.element__trash').addEventListener('click', () => {
      // this._element.remove();
      this._openPopupDeleteCard();
    });

    this._element.querySelector('.element__heart').addEventListener('click', (evt) => {
      evt.target.classList.toggle('element__heart_active');
    });
  }
}
