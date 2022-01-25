"use strict";

// Open and close pop-up Edit Profile
const editBtn = document.querySelector('.profile__edit-bth');
const popupProfile = document.querySelector('.popup_action_edit-profile');
const closePopupProfileBtn = popupProfile.querySelector('.popup__close-icon');

// Open and close pop-up Add Place
const addPlaceBtn = document.querySelector('.profile__add-btn');
const popupPlace = document.querySelector('.popup_action_add-place');
const closePopupPlaceBtn = popupPlace.querySelector('.popup__close-icon');

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

// Like places
// const likeBtn = document.querySelector('.element__heart');

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

function openPopupEditUser() {
  popupProfile.classList.add('popup_opened');
  getUserInfo();
}

function closePopupEditUser() {
  popupProfile.classList.remove('popup_opened');
}

function openPopupAddPlace() {
  popupPlace.classList.add('popup_opened');
}

function closePopupAddPlace() {
  popupPlace.classList.remove('popup_opened');
}

function getUserInfo() {
  popupName.value = userName.textContent;
  popupProfession.value = userProfession.textContent;
}

function formSubmitNewUserInfo(evt) {
  evt.preventDefault();

  userName.textContent = popupName.value;
  userProfession.textContent = popupProfession.value;

  closePopupEditUser();
}

function addPlace(placeName, placeLink) {
  const placeTemplate = document.querySelector('#place-template').content;
  const placeElement = placeTemplate.querySelector('.element').cloneNode(true);

  placeElement.querySelector('.element__place').textContent = placeName;
  placeElement.querySelector('.element__photo').setAttribute('src', placeLink);

  placeElement.querySelector('.element__heart').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__heart_active');
  });

  placeElement.querySelector('.element__trash').addEventListener('click', function(evt) {
    evt.target.parentElement.parentElement.remove();
  });

  places.prepend(placeElement);
}

function renderPlaces() {
  for (let i = 0; i < initialCards.length; i++) {
    addPlace(`${initialCards[i].name}`, `${initialCards[i].link}`);
  }
}

function formSubmitAddPlace(evt) {
  evt.preventDefault();

  addPlace(popupPlaceName.value, popupPlaceLink.value);
  console.log(popupPlaceLink.value);

  closePopupAddPlace();
}

renderPlaces();

editBtn.addEventListener('click', openPopupEditUser);

addPlaceBtn.addEventListener('click', openPopupAddPlace);

closePopupProfileBtn.addEventListener('click', closePopupEditUser);

closePopupPlaceBtn.addEventListener('click', closePopupAddPlace);

formEditUser.addEventListener('submit', formSubmitNewUserInfo);

formAddPlace.addEventListener('submit', formSubmitAddPlace);



