import './index.css';
import {
  editBtn,
  addPlaceBtn,
  formEditUser,
  formAddPlace,
  initialCards,
  settings,
  placesSelector,
  popupName,
  popupProfession,
  userName,
  userProfession,
  garbage
} from "../scripts/utils/constants.js";
import {
  api
} from "../scripts/components/Api.js";
import { Card } from "../scripts/components/Card.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { Section } from "../scripts/components/Section.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { PopupDeleteCard } from '../scripts/components/PopupDeleteCard.js';
import { UserInfo } from "../scripts/components/UserInfo.js";
import { Api } from "../scripts/components/Api.js";

const validateFormAddPlace = new FormValidator(settings, formAddPlace);
const validateFormEditUser = new FormValidator(settings, formEditUser);

const popupWithImage = new PopupWithImage('.popup_action_show-place');
popupWithImage.setEventListeners();

const popupDeleteCard = new PopupDeleteCard(
  '.popup_action_delete-place', {
    handleSubmit: () => {

    }
  });
popupDeleteCard.setEventListeners();


const userInfo = new UserInfo('.profile__name', '.profile__profession');

// const cardsList = new Section({
//   items: initialCards,
//   renderer: (cardItem) => {
//     const cardElement = createCard(cardItem);
//     cardsList.addItem(cardElement);
//   }
// },
// placesSelector
// );


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
const cardsList = createSection({});

const popupWithForm = new PopupWithForm(
  '.popup_action_add-place',
    {
    submiterForm: (formData) => {
      api.setNewCard(formData)
        .then((result) => {
          console.log(result._id);
        })
        .catch((err) => {
          console.log(err);
        }
      );
    }
  }
);


const popupEditUser = new PopupWithForm(
  '.popup_action_edit-profile',
    {
    submiterForm: (formData) => {
      api.setUserInfo(formData)
        .then((result) => {
          api.getUserInfo()
            .then((result) => {
              userName.textContent = result.name;
              userProfession.textContent = result.about;
            })
            .catch((err) => {
              console.log(err);
            }
          );
        })
        .catch((err) => {
          console.log(err);
        }
      );
    }
  }
);

const createCard = (cardItem) => {
  const card = new Card(
    cardItem,
    '#place-template',
    () => {
      popupWithImage.open(cardItem);
    },
    () => {
      popupDeleteCard.open();
    }
  );
  const cardElement = card.generateCard();
  return cardElement;
}

const openPopupAddCard = () => {
  popupWithForm.open();
  validateFormAddPlace.toggleButtonState();
}

const openPopupEditUser = () => {
  popupEditUser.open();
  const newUserInfo = userInfo.getUserInfo();
  popupName.value = newUserInfo.name;
  popupProfession.value = newUserInfo.about;
  validateFormEditUser.toggleButtonState();
}

editBtn.addEventListener('click', openPopupEditUser);
addPlaceBtn.addEventListener('click', openPopupAddCard);

popupEditUser.setEventListeners();
popupWithForm.setEventListeners();
// cardsList.renderItems();
validateFormAddPlace.enableValidation();
validateFormEditUser.enableValidation();

api.getUserInfo()
  .then((result) => {
    userName.textContent = result.name;
    userProfession.textContent = result.about;
  })
  .catch((err) => {
    console.log(err);
  }
);

api.getInitialCards()
  .then((result) => {
    const cardsListFromServer = createSection(result);
    cardsListFromServer.renderItems();
  })
  .catch((err) => {
    console.log(err);
  }
);


