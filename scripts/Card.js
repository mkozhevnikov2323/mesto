const popupShowPlace = document.querySelector('.popup_action_show-place');
const imageShowPlace = popupShowPlace.querySelector('.popup__photo');
const titleShowPlace = popupShowPlace.querySelector('.popup__photo-title');

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _openPopupShowPlace() {
    document.querySelector('.popup_action_show-place').classList.add('popup_opened');
    // document.addEventListener('keydown', closePopupPressEscape);
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



// function createPlace(placeName, placeLink) {
//   const placeElement = placeTemplate.querySelector('.element').cloneNode(true);
//   const placePhoto = placeElement.querySelector('.element__photo');
//   const placeTitle = placeElement.querySelector('.element__place');
//   const heart = placeElement.querySelector('.element__heart');
//   const trash = placeElement.querySelector('.element__trash');

//   function getPlaceInfo() {
//     imageShowPlace.src = placeLink;
//     imageShowPlace.alt = placeName;
//     titleShowPlace.textContent = placeName;
//   }

//   placeTitle.textContent = placeName;
//   placePhoto.setAttribute('src', placeLink);
//   placePhoto.setAttribute('alt', placeName);

//   getPlaceInfo();

//   trash.addEventListener('click', function(evt) {
//     evt.target.parentElement.parentElement.remove();
//   });

//   heart.addEventListener('click', function(evt) {
//     evt.target.classList.toggle('element__heart_active');
//   });

//   placePhoto.addEventListener('click', openPopupShowPlace);

//   placePhoto.addEventListener('click', getPlaceInfo);

//   return placeElement;
// }



// renderPlaces(initialCards);
