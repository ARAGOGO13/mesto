export const profileEditPopup = document.querySelector('.popup_type_edit-profile');
export const profileEditForm = document.querySelector('.form_type_profile-edit');
export const profileEditOpenBtn = document.querySelector('.profile__edit-btn');
export const profileName = document.querySelector('.profile__name');
export const profileDescription = document.querySelector('.profile__description');
export const profileNameInput = document.querySelector('.form__input_type_profile-name');
export const profileDescriptionInput = document.querySelector('.form__input_type_profile-description');

/*cardAdd*/
export const cardAddForm = document.querySelector('.form_type_card-add');
export const cardAddOpenBtn = document.querySelector('.profile__add-btn');
export const cardHeadingInput = document.querySelector('.form__input_type_card-heading');
export const cardLinkInput = document.querySelector('.form__input_type_card-link');


/*cards*/
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
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit-btn',
    inactiveButtonClass: 'form__submit-btn_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
};

export const formList = document.querySelectorAll('.form');