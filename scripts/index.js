"use strict";

// Open and close pop-up Edit Profile
const editBtn = document.querySelector('.profile__edit-bth');
const popupProfile = document.querySelector('.popup_action_edit-profile');
const closePopupProfileBtn = popupProfile.querySelector('.popup__close-icon');

// Open and close pop-up Add Place
const addPlaceBtn = document.querySelector('.profile__add-btn');
const popupPlace = document.querySelector('.popup_action_add-place');
const closePopupPlaceBtn = popupPlace.querySelector('.popup__close-icon');

// Open and close pop-up Show Place
const imagePlace = document.querySelector('.element__photo');
const popupShowPlace = document.querySelector('.popup_action_show-place');
const closePopupShowPlaceBtn = popupShowPlace.querySelector('.popup__close-icon');
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
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
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

function addCard(card, container) {
  container.prepend(card);
}

function renderPlaces(arr) {
  for (let i = 0; i < arr.length; i++) {
    createPlace(`${arr[i].name}`, `${arr[i].link}`);
  }
}

function sendAddedPlace(evt) {
  evt.preventDefault();

  if (popupPlaceName.value === '' || popupPlaceLink.value === '') {
    createPlace('Архыз', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg');
  } else {
    createPlace(popupPlaceName.value, popupPlaceLink.value);
  }

  closePopupAddPlace();
}

function createPlace(placeName, placeLink) {
  const placeTemplate = document.querySelector('#place-template').content;
  const placeElement = placeTemplate.querySelector('.element').cloneNode(true);
  const placePhoto = placeElement.querySelector('.element__photo');
  const placeTitle = placeElement.querySelector('.element__place');
  const heart = placeElement.querySelector('.element__heart');
  const trash = placeElement.querySelector('.element__trash');

  function getPlaceInfo() {
    imageShowPlace.src = placeLink;
    imageShowPlace.alt = placeName;
    titleShowPlace.textContent = placeName;
  }

  placeTitle.textContent = placeName;
  placePhoto.setAttribute('src', placeLink);
  placePhoto.setAttribute('alt', placeName);

  getPlaceInfo();

  addCard(placeElement, places);

  trash.addEventListener('click', function(evt) {
    evt.target.parentElement.parentElement.remove();
  });

  heart.addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__heart_active');
  });

  placePhoto.addEventListener('click', openPopupShowPlace);

  placePhoto.addEventListener('click', getPlaceInfo);
}

renderPlaces(initialCards);

editBtn.addEventListener('click', openPopupEditUser);

closePopupProfileBtn.addEventListener('click', closePopupEditUser);

addPlaceBtn.addEventListener('click', openPopupAddPlace);

closePopupPlaceBtn.addEventListener('click', closePopupAddPlace);

closePopupShowPlaceBtn.addEventListener('click', closePopupShowPlace);

formEditUser.addEventListener('submit', sendNewUserInfo);

formAddPlace.addEventListener('submit', sendAddedPlace);
