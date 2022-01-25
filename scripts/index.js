"use strict";

// Open and close pop-up
const editBtn = document.querySelector('.profile__edit-bth');
const addPlaceBtn = document.querySelector('.profile__add-btn');
const popupProfile = document.querySelector('.popup_action_edit-profile');
const popupPlace = document.querySelector('.popup_action_add-place');
const closePopupProfileBtn = popupProfile.querySelector('.popup__close-icon');
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

function openPopupEditUser() {
  popupProfile.classList.add('popup_opened');
  getUserInfo();
}

function openPopupAddPlace() {
  popupPlace.classList.add('popup_opened');
}

function closePopupEditUser() {
  popupProfile.classList.remove('popup_opened');
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

editBtn.addEventListener('click', openPopupEditUser);

addPlaceBtn.addEventListener('click', openPopupAddPlace);

closePopupProfileBtn.addEventListener('click', closePopupEditUser);

closePopupPlaceBtn.addEventListener('click', closePopupAddPlace);

formEditUser.addEventListener('submit', formSubmitNewUserInfo);
