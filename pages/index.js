"use strict";

// Open and close pop-up
const editBtn = document.querySelector('.profile__edit-bth');
const popup = document.querySelector('.popup');
const closePopupBtn = document.querySelector('.popup__close-icon');

function openPopup() {
  popup.classList.add('popup_opened');
  getUserInfo();
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

editBtn.addEventListener('click', openPopup);
closePopupBtn.addEventListener('click', closePopup);

// Get info about user
const userName = document.querySelector('.profile__name');
const userProfession = document.querySelector('.profile__profession');
const popupName = document.querySelector('.popup__name');
const popupProfession = document.querySelector('.popup__profession');

function getUserInfo() {
  popupName.value = userName.textContent;
  popupProfession.value = userProfession.textContent;
}

// Save new user info
const form = document.querySelector('.popup__container');

function formSubmitNewUserInfo(evt) {
  evt.preventDefault();

  userName.textContent = popupName.value;
  userProfession.textContent = popupProfession.value;

  closePopup();
}

form.addEventListener('submit', formSubmitNewUserInfo);
