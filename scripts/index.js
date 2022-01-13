"use strict";

// Open and close pop-up
const editBtn = document.querySelector('.profile__edit-bth');
const popup = document.querySelector('.popup');
const closePopupBtn = popup.querySelector('.popup__close-icon');

// Get info about user
const userName = document.querySelector('.profile__name');
const userProfession = document.querySelector('.profile__profession');
const popupName = popup.querySelector('.popup__input_data_name');
const popupProfession = popup.querySelector('.popup__input_data_job');

// Save new user info
const form = popup.querySelector('.popup__form');

function openPopup() {
  popup.classList.add('popup_opened');
  getUserInfo();
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function getUserInfo() {
  popupName.value = userName.textContent;
  popupProfession.value = userProfession.textContent;
}

function formSubmitNewUserInfo(evt) {
  evt.preventDefault();

  userName.textContent = popupName.value;
  userProfession.textContent = popupProfession.value;

  closePopup();
}

editBtn.addEventListener('click', openPopup);

closePopupBtn.addEventListener('click', closePopup);

form.addEventListener('submit', formSubmitNewUserInfo);
