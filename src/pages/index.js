import './index.css';
import {
  editBtn,
  addPlaceBtn,
  formEditUser,
  formAddPlace,
  formEditAvatar,
  settings,
  placesSelector,
  popupName,
  popupProfession,
  avatar
} from "../scripts/utils/constants.js";
import { api } from "../scripts/components/Api.js";
import { Card } from "../scripts/components/Card.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { Section } from "../scripts/components/Section.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { PopupDeleteCard } from '../scripts/components/PopupDeleteCard.js';
import { UserInfo } from "../scripts/components/UserInfo.js";

const validateFormAddPlace = new FormValidator(settings, formAddPlace);
const validateFormEditUser = new FormValidator(settings, formEditUser);
const validateFormEditAvatar = new FormValidator(settings, formEditAvatar);

let userId;
let userInfoFromServer;
let cardIdfromServer;
let cardElementfromServer;

const userInfo = new UserInfo(
  '.profile__name',
  '.profile__profession',
  '.profile__avatar'
);
const popupWithImage = new PopupWithImage('.popup_action_show-place');

const cardsList = new Section({
  renderer: (cardItem) => {
    const cardElement = createCard(cardItem);
    cardsList.addItem(cardElement);
  }
},
placesSelector
);

const popupAddPlace = new PopupWithForm(
  '.popup_action_add-place',
    {
    submiterForm: (formData) => {
      popupAddPlace.renderLoading('Отправка...');
      api.setNewCard(formData)
        .then((result) => {
          cardsList.renderItems(result);
          popupAddPlace.close();
        })
        .catch((err) => console.log(err))
        .finally(() => popupAddPlace.renderLoading('Создать'));
    }
  }
);

const popupEditUser = new PopupWithForm(
  '.popup_action_edit-profile',
    {
    submiterForm: (formData) => {
      popupEditUser.renderLoading('Сохранение...');
      api.setUserInfo(formData)
        .then((result) => {
          api.getUserInfo()
            .then((result) => {
              userInfo.setUserInfo(result);
              userInfoFromServer = userInfo.getUserInfo(result);
              popupEditUser.close();
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err))
        .finally(() => popupEditUser.renderLoading('Сохранить'));
    }
  }
);

const popupChangeAvatar = new PopupWithForm(
  '.popup_action_change-avatar',
  {
    submiterForm: (formData) => {
      popupChangeAvatar.renderLoading('Сохранение...');
      api.setUserAvatar(formData)
        .then((result) => {
          api.getUserInfo()
            .then((result) => {
              userInfo.setUserInfo(result);
              userInfoFromServer = userInfo.getUserInfo(result);
              popupChangeAvatar.close();
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err))
        .finally(() => popupChangeAvatar.renderLoading('Сохранить'));
    }
  }
);


const popupDeleteCard = new PopupDeleteCard(
  '.popup_action_delete-place', {
    handleSubmit: () => {
      popupDeleteCard.renderLoading('Удаление...');
      api.deleteCard(cardIdfromServer)
        .then(result => {
          cardElementfromServer.deleteCard();
          popupDeleteCard.close();
        })
        .finally(() => {
          popupDeleteCard.renderLoading('Да');
        });
    }
  });

const createCard = (cardItem) => {
  const card = new Card(
    cardItem,
    userId,
    '#place-template',
    () => {
      popupWithImage.open(cardItem);
    },
    () => {
      popupDeleteCard.open();
      const cardId = card.getIdCard();
      cardIdfromServer = cardId;
      cardElementfromServer = card;
    },
    () => {
      const cardId = card.getIdCard();
      let counterLikes;

      if (card.isLiked()) {
        api.deleteLike(cardId)
          .then(result => {
            counterLikes = result.likes.length;
            card.setCounter(counterLikes);
            card.deleteLike();
          })
          .catch((err) => console.log(err));

      } else {
        api.addLike(cardId)
          .then(result => {
            counterLikes = result.likes.length;
            card.setCounter(counterLikes);
            card.setLike();
          })
          .catch((err) => console.log(err));
      }
    }
  );
  const cardElement = card.generateCard();
  return cardElement;
}

const openPopupAddCard = () => {
  popupAddPlace.open();
  validateFormAddPlace.toggleButtonState();
}

const openPopupEditUser = () => {
  popupEditUser.open();
  const newUserInfo = userInfo.getUserInfo(userInfoFromServer);
  popupName.value = newUserInfo.name;
  popupProfession.value = newUserInfo.about;
  validateFormEditUser.toggleButtonState();
}

const openPopupChangeAvatar = () => {
  popupChangeAvatar.open();
}

editBtn.addEventListener('click', openPopupEditUser);
addPlaceBtn.addEventListener('click', openPopupAddCard);
avatar.addEventListener('click', openPopupChangeAvatar);

popupChangeAvatar.setEventListeners();
popupEditUser.setEventListeners();
popupAddPlace.setEventListeners();
popupDeleteCard.setEventListeners();
popupWithImage.setEventListeners();
validateFormAddPlace.enableValidation();
validateFormEditUser.enableValidation();
validateFormEditAvatar.enableValidation();


Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfoFromServer = userInfo.getUserInfo(userData);
    userInfo.setUserInfo(userData);
    userId = userData._id;
    cardsList.renderItems(cards);
  })
  .catch((err) => console.log(err));
