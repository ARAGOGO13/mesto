// IMPORTS
import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {
    profileEditForm,
    profileEditOpenBtn,
    profileName,
    profileDescription,
    profileNameInput,
    profileDescriptionInput,
    cardAddForm,
    cardAddOpenBtn,
    cardHeadingInput,
    cardLinkInput,
    initialCards,
    settings,
    formList
} from '../utils/constans.js';

// FORM VALIDATORS
const formEditProfileValidator = new FormValidator(settings, profileEditForm);
const formCardAddValidator = new FormValidator(settings, cardAddForm);


// USER INFO
const userInfo = new UserInfo('.profile__name', '.profile__description');


// PROFILE EDIT POPUP
const profileEditPopup = new PopupWithForm('.popup_type_edit-profile', () => {
    userInfo.setUserInfo(profileNameInput.value, profileDescriptionInput.value);
});
profileEditPopup.setEventListeners();

profileEditOpenBtn.addEventListener('click', () => {
    profileEditPopup.open();
    const userData = userInfo.getUserInfo();
    profileNameInput.value = userData.name;
    profileDescriptionInput.value = userData.description;
    formEditProfileValidator.toggleButtonState();
    formEditProfileValidator.hideAllErrors();

});


// CARD ADD POPUP
const cardAddPopup = new PopupWithForm('.popup_type_add-card', () => {
    photoContainer.addItem(addCard(cardHeadingInput.value, cardLinkInput.value));
    cardAddPopup.close();
});

cardAddOpenBtn.addEventListener('click', () => {
    cardAddPopup.open();
    formCardAddValidator.toggleButtonState();
    formCardAddValidator.hideAllErrors();
})

cardAddPopup.setEventListeners();


// CARD POPUP
const cardPopup = new PopupWithImage('.popup_type_card');
cardPopup.setEventListeners();


// CARD ADD FUNCTION
const addCard = (title, src) => {
    const newCard = new Card(title, src, () => {
        cardPopup.open(src, title)
    });
    return newCard.generateCard()
}

// PHOTOS SECTION
const photoContainer = new Section({
        items: initialCards,
        renderer: (item) => {
            const cardElement = addCard(item.name, item.link);
            photoContainer.addItem(cardElement);
        },
    },
    '.photos');
photoContainer.renderItems();

// DEFAULTS
formList.forEach(function(form) {
    const formElement = new FormValidator(settings, form);
    formElement.enableValidation();
})