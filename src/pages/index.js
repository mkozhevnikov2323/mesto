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
  userName,
  userProfession,
  userAvatar,
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
const userInfo = new UserInfo('.profile__name', '.profile__profession');
const popupWithImage = new PopupWithImage('.popup_action_show-place');

const createSection = (arrayCards) => {
  const cardsList = new Section({
    items: arrayCards,
    renderer: (cardItem) => {
      const cardElement = createCard(cardItem);
      cardsList.addItem(cardElement);
    }
  },
  placesSelector
  );
  return cardsList;
}

const popupAddPlace = new PopupWithForm(
  '.popup_action_add-place',
    {
    submiterForm: (formData) => {
      popupAddPlace.renderLoading('Отправка...');
      api.setNewCard(formData)
        .then((result) => {
          const cardFromServer = createSection(result);
          cardFromServer.renderItems();
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
              userName.textContent = result.name;
              userProfession.textContent = result.about;
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
          userAvatar.src = result.avatar;
          popupChangeAvatar.close();
        })
        .catch((err) => console.log(err))
        .finally(() => popupChangeAvatar.renderLoading('Сохранить'));
    }
  }
);

let cardIdfromServer;
let cardElementfromServer;

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

      if (card.isLiked('761edb0fe2f2cbc489706bfd')) {
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
  const newUserInfo = userInfo.getUserInfo();
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

api.getUserInfo()
  .then((result) => {
    userName.textContent = result.name;
    userProfession.textContent = result.about;
    userAvatar.src = result.avatar;
  })
  .catch((err) => console.log(err));

api.getInitialCards()
  .then((result) => {
    const cardsListFromServer = createSection(result);
    cardsListFromServer.renderItems();

  })
  .catch((err) => console.log(err));


