export class Card {
  constructor(data, cardSelector, handleCardClick, handleDeleteCard, handleLikeClick) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._userId = data.owner._id;
    this._quantityLikes = data.likes.length;
    this._ownerLike = data.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  deleteCard() {
    this._element.remove();
  }

  getIdCard() {
    return this._id;
  }

  getIdOwnerLike() {
    this._idOwnerLike = this._ownerLike.map(item => item._id);
    return this._idOwnerLike;
  }

  getCountLikes() {
    return this._quantityLikes;
  }

  setCounter(num) {
    this._elementCounterOfLikes.textContent = num;
  }

  _openPopupShowPlace() {
    this._handleCardClick();
  }

  _openPopupDeleteCard() {
    this._handleDeleteCard(this._id);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementPhoto = this._element.querySelector('.element__photo');
    this._elementGarbage = this._element.querySelector('.element__trash');
    this._elementCounterOfLikes = this._element.querySelector('.element__heart-counter');
    this._setEventListeners();

    this._elementPhoto.setAttribute('src', this._link);
    this._elementPhoto.setAttribute('alt', this._name);
    this._element.querySelector('.element__place').textContent = this._name;
    this._elementCounterOfLikes.textContent = this._quantityLikes;

    if (this._userId !== '761edb0fe2f2cbc489706bfd') {
      this._elementGarbage.remove();
    };

    if (this.isLiked('761edb0fe2f2cbc489706bfd')) {
      this.setLike();
    }

    return this._element;
  }

  isLiked(userId) {
    this._arrayOfLikedUsers = this.getIdOwnerLike();
    return this._arrayOfLikedUsers.includes(userId);
  }

  setLike() {
    this._element.querySelector('.element__heart').classList.add('element__heart_active');
  }

  deleteLike() {
    this._element.querySelector('.element__heart').classList.remove('element__heart_active');
  }

  _setEventListeners() {
    this._elementPhoto.addEventListener('click', () => {
      this._openPopupShowPlace();
    });

    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._openPopupDeleteCard();
    });

    this._element.querySelector('.element__heart').addEventListener('click', () => {
      this._handleLikeClick();
    });
  }
}
