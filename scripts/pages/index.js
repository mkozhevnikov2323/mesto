import {
  popups,
  editBtn,
  popupProfile,
  addPlaceBtn,
  popupPlace,
  popupPlaceSubmitBtn,
  userName,
  userProfession,
  popupName,
  popupProfession,
  popupPlaceName,
  popupPlaceLink,
  formEditUser,
  formAddPlace,
  places,
  initialCards,
  settings,
  placesSelector
} from "../utils/constants.js"
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";


// Validation
const validateFormAddPlace = new FormValidator(settings, formAddPlace);
const validateFormEditUser = new FormValidator(settings, formEditUser);

export function openPopup(popup) {
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

export const closePopupPressEscape = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function openPopupEditUser() {
  getUserInfo();
  openPopup(popupProfile);
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

// function createCard(name, link, cardSelector) {
//   const newCard = {
//     name,
//     link
//   };
//   const card = new Card(newCard, cardSelector);
//   const generatedCard = card.generateCard();
//   return generatedCard;
// }

// function addCreatedCardPrepend(container, createFunc) {
//   container.prepend(createFunc);
// }

// function sendAddedPlace(evt) {
//   evt.preventDefault();

//   addCreatedCardPrepend(places, createCard(popupPlaceName.value, popupPlaceLink.value, '#place-template'));

//   evt.target.reset();

//   validateFormAddPlace.enableValidation();

//   closePopupAddPlace();
// }

// initialCards.forEach((item) => {
//   addCreatedCardPrepend(places, createCard(item.name, item.link, '#place-template'));
// });


const cardsList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const card = new Card(cardItem, '#place-template');
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
  }
},
placesSelector
);

cardsList.renderItems();



validateFormAddPlace.enableValidation();

validateFormEditUser.enableValidation();

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
  popup.addEventListener('keydown', closePopupPressEscape);
})
