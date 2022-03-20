import './index.css';
import {
  editBtn,
  addPlaceBtn,
  formEditUser,
  formAddPlace,
  initialCards,
  settings,
  placesSelector,
} from "../scripts/utils/constants.js"
import { Card } from "../scripts/components/Card.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { Section } from "../scripts/components/Section.js";
import { Popup } from "../scripts/components/Popup.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { UserInfo } from "../scripts/components/UserInfo.js";

const validateFormAddPlace = new FormValidator(settings, formAddPlace);
const validateFormEditUser = new FormValidator(settings, formEditUser);

const popupWithImage = new PopupWithImage('.popup_action_show-place');
const userInfo = new UserInfo('.profile__name', '.profile__profession');

const createCard = (cardItem) => {
  const card = new Card(
    cardItem,
    '#place-template',
    () => {
      popupWithImage.open(cardItem);
      popupWithImage.setEventListeners();
    },
  );
  const cardElement = card.generateCard();
  return cardElement;
}

const openPopupAddCard = () => {
  popupWithForm.open();
  validateFormAddPlace._toggleButtonState();
}



const cardsList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const cardElement = createCard(cardItem);
    cardsList.addItem(cardElement);
  }
},
placesSelector
);

const popupWithForm = new PopupWithForm(
  '.popup_action_add-place',
    {
    submiterForm: (formData) => {
      const cardElement = createCard(formData);
      cardsList.addItem(cardElement);
    }
  }
);

const popupEditUser = new PopupWithForm(
  '.popup_action_edit-profile',
    {
    submiterForm: () => {
      userInfo.setUserInfo(popupEditUser._getInputValues());
    }
  }
);

const openPopupEditUser = () => {
  popupEditUser.open();
  userInfo.getUserInfo();
}


editBtn.addEventListener('click', openPopupEditUser);
addPlaceBtn.addEventListener('click', openPopupAddCard);

popupEditUser.setEventListeners();
popupWithForm.setEventListeners();
cardsList.renderItems();
validateFormAddPlace.enableValidation();
validateFormEditUser.enableValidation();
