import Card from './Card.js';
import FormValidator from "./FormValidator.js";
/*profileEdit*/
const profileEditPopup = document.querySelector('.popup_type_edit-profile');
const profileEditForm = document.querySelector('.form_type_profile-edit');
const profileEditOpenBtn = document.querySelector('.profile__edit-btn');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileNameInput = document.querySelector('.form__input_type_profile-name');
const profileDescriptionInput = document.querySelector('.form__input_type_profile-description');

/*cardAdd*/
const cardAddPopup = document.querySelector('.popup_type_add-card');
const cardAddForm = document.querySelector('.form_type_card-add');
const cardAddOpenBtn = document.querySelector('.profile__add-btn');
const cardHeadingInput = document.querySelector('.form__input_type_card-heading');
const cardLinkInput = document.querySelector('.form__input_type_card-link');

/*card*/
const cardPopup = document.querySelector('.popup_type_card');
const cardPopupImg = document.querySelector('.popup__card-img');
const cardPopupHeading = document.querySelector('.popup__card-heading');

/*cards*/
const cardsContainer = document.querySelector('.photos');
const initialCards = [
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

const closeButtons = document.querySelectorAll('.popup__close-btn');
const settings = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit-btn',
    inactiveButtonClass: 'form__submit-btn_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
};

const formList = document.querySelectorAll('.form');


const formEditProfileValidator = new FormValidator(settings, profileEditForm);;
const formCardAddValidator = new FormValidator(settings, cardAddForm);
/*functions*/
const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    popup.removeEventListener('click', closePopupOverlay);
    document.removeEventListener('keydown', closePopupEsc);
}

const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    popup.addEventListener('click', closePopupOverlay);
    document.addEventListener('keydown', closePopupEsc);
}

const openCardPopup = (title, src) => {
    openPopup(cardPopup);
    cardPopupImg.src = src;
    cardPopupImg.alt = title;
    cardPopupHeading.textContent = title;
}

const setEditProfilePopupInputs = () => {
    profileNameInput.value = profileName.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
}

const editProfile = (evt) => {
    evt.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closePopup(profileEditPopup);
}

const addCard = (title, src) => {
    const newCard = new Card(title, src, openCardPopup);
    return newCard.generateCard()
}

const addInitialCards = (initialCards) => {
    initialCards.forEach(function(card) {
        cardsContainer.append(addCard(card.name, card.link));
    });
}

const closePopupEsc = (evt) => {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

const closePopupOverlay = (evt) => {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target);
    }
}

/*listeners*/
profileEditOpenBtn.addEventListener('click', () => {
    openPopup(profileEditPopup);
    setEditProfilePopupInputs();
    formEditProfileValidator.toggleButtonState();
    formEditProfileValidator.hideAllErrors();

});

profileEditForm.addEventListener('submit', editProfile);

cardAddOpenBtn.addEventListener('click', () => {
    openPopup(cardAddPopup);
    cardAddForm.reset();
    formCardAddValidator.toggleButtonState();
    formCardAddValidator.hideAllErrors();
});

cardAddForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    cardsContainer.prepend(addCard(cardHeadingInput.value, cardLinkInput.value));
    closePopup(cardAddPopup);
});

closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});


formList.forEach(function(form) {
    const formElement = new FormValidator(settings, form);
    formElement.enableValidation();
})
/*defaults*/
addInitialCards(initialCards);