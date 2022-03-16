// All popups
export const popups = document.querySelectorAll('.popup');

// Open and close pop-up Edit Profile
export const editBtn = document.querySelector('.profile__edit-bth');
export const popupProfile = document.querySelector('.popup_action_edit-profile');

// Open and close pop-up Add Place
export const addPlaceBtn = document.querySelector('.profile__add-btn');
export const popupPlace = document.querySelector('.popup_action_add-place');
export const popupPlaceSubmitBtn = popupPlace.querySelector('.popup__save-btn');

// Get info about user
export const userName = document.querySelector('.profile__name');
export const userProfession = document.querySelector('.profile__profession');
export const popupName = popupProfile.querySelector('.popup__input_data_name');
export const popupProfession = popupProfile.querySelector('.popup__input_data_job');

// Get info about place
export const popupPlaceName = popupPlace.querySelector('.popup__input_data_place-name');
export const popupPlaceLink = popupPlace.querySelector('.popup__input_data_place-link');

// Save new user info
export const formEditUser = popupProfile.querySelector('.popup__form');

// Save new place
export const formAddPlace = popupPlace.querySelector('.popup__form');

// Places
export const placesSelector = '.elements';
export const places = document.querySelector('.elements');
export const initialCards = [
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

export const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
