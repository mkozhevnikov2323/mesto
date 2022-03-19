import {
  editBtn,
  popupProfile,
  addPlaceBtn,
  popupPlace,
  formEditUser,
  formAddPlace,
  initialCards,
  settings,
  placesSelector,
  popupShowPlace
} from "../utils/constants.js"
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { Popup } from "../components/Popup.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

const validateFormAddPlace = new FormValidator(settings, formAddPlace);
const validateFormEditUser = new FormValidator(settings, formEditUser);

const cardsList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const card = new Card(
      cardItem,
      '#place-template',
      () => {
        const popup = new PopupWithImage(cardItem, popupShowPlace);
        popup.open();
        popup.setEventListeners();
      },
    );
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
  }
},
placesSelector
);

const eee = () => {
  let test = new PopupWithForm({
    popupSelector: popupPlace,
    submiterForm: (formData) => {
      const card = new Card(
        formData,
        '#place-template',
        () => {
          const popup = new PopupWithImage(formData, popupShowPlace);
          popup.open();
          popup.setEventListeners();
        },
      );
      const cardElement = card.generateCard();
      cardsList.addItem(cardElement);
    }
  })
  test.open();
  validateFormAddPlace.enableValidation();
  test.setEventListeners();
}

const openPopupEditUser = () => {
  const test = new UserInfo(
    {
      name: "Жак-Ив Кусто",
      job: "Исследователь океана"
    }
  );
  const popup = new Popup(
    popupProfile
  );
  test.getUserInfo();
  popup.open();
  popup.setEventListeners();
  popupProfile.querySelector('.popup__form').addEventListener('submit', (evt) => {
    evt.preventDefault();

    test.setUserInfo();
    popup.close();
  });
}

editBtn.addEventListener('click', openPopupEditUser);
addPlaceBtn.addEventListener('click', eee);

cardsList.renderItems();
validateFormAddPlace.enableValidation();
validateFormEditUser.enableValidation();
