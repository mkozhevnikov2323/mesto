"use strict";
// import { Card } from "./Card.js";

// All popups
const popups = document.querySelectorAll('.popup');

// Open and close pop-up Edit Profile
const editBtn = document.querySelector('.profile__edit-bth');
const popupProfile = document.querySelector('.popup_action_edit-profile');

// Open and close pop-up Add Place
const addPlaceBtn = document.querySelector('.profile__add-btn');
const popupPlace = document.querySelector('.popup_action_add-place');

// Open and close pop-up Show Place
const imagePlace = document.querySelector('.element__photo');
const popupShowPlace = document.querySelector('.popup_action_show-place');
const imageShowPlace = popupShowPlace.querySelector('.popup__photo');
const titleShowPlace = popupShowPlace.querySelector('.popup__photo-title');

// Get info about user
const userName = document.querySelector('.profile__name');
const userProfession = document.querySelector('.profile__profession');
const popupName = popupProfile.querySelector('.popup__input_data_name');
const popupProfession = popupProfile.querySelector('.popup__input_data_job');

// Get info about place
const popupPlaceName = popupPlace.querySelector('.popup__input_data_place-name');
const popupPlaceLink = popupPlace.querySelector('.popup__input_data_place-link');

// Save new user info
const formEditUser = popupProfile.querySelector('.popup__form');

// Save new place
const formAddPlace = popupPlace.querySelector('.popup__form');

// Template
const placeTemplate = document.querySelector('#place-template').content;

// Places
const places = document.querySelector('.elements');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupPressEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupPressEscape);
}

function closePopupPressOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

function closePopupPressEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function openPopupEditUser() {
  openPopup(popupProfile);
  getUserInfo();
}

function closePopupEditUser() {
  closePopup(popupProfile);
}

function openPopupAddPlace() {
  openPopup(popupPlace);
}

function closePopupAddPlace() {
  closePopup(popupPlace);
}

function openPopupShowPlace() {
  openPopup(popupShowPlace);
}

function closePopupShowPlace() {
  closePopup(popupShowPlace);
}

function getUserInfo() {
  popupName.value = userName.textContent;
  popupProfession.value = userProfession.textContent;
}

function sendNewUserInfo(evt) {
  evt.preventDefault();

  userName.textContent = popupName.value;
  userProfession.textContent = popupProfession.value;

  closePopupEditUser();
}

function addCreatedCardPrepend(container, createFunc) {
  container.prepend(createFunc);
}

function renderPlaces(arr) {
  arr.forEach((item) => {
    addCreatedCardPrepend(places, createPlace(item.name, item.link));
  });
}

function sendAddedPlace(evt) {
  evt.preventDefault();
  addCreatedCardPrepend(places, createPlace(popupPlaceName.value, popupPlaceLink.value));
  closePopupAddPlace();
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

class Card {
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
      openPopupShowPlace();
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

// renderPlaces(initialCards);
initialCards.forEach((item) => {
  // Создадим экземпляр карточки
  const card = new Card(item, '#place-template');
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();

  // Добавляем в DOM
  document.querySelector('.elements').prepend(cardElement);
});

editBtn.addEventListener('click', openPopupEditUser);

addPlaceBtn.addEventListener('click', openPopupAddPlace);

formEditUser.addEventListener('submit', sendNewUserInfo);

formAddPlace.addEventListener('submit', sendAddedPlace);

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup);
      }
      if (evt.target.classList.contains('popup__close-icon')) {
        closePopup(popup);
      }
  })
})
