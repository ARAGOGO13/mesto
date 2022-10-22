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
const cardTemplate = document.querySelector('#card-template').content;
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
const popupList = Array.from(document.querySelectorAll('.popup'));

/*functions*/
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    popup.removeEventListener('click', closePopupOverlay);
    document.removeEventListener('keydown', closePopupEsc);
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    popup.addEventListener('click', closePopupOverlay);
    document.addEventListener('keydown', closePopupEsc);
}

function setProfileEdit() {
    profileNameInput.value = profileName.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
}

function editProfile(evt) {
    evt.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closePopup(profileEditPopup);
}

function createCard(cardHeading, cardLink) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImg = cardElement.querySelector('.card__photo');

    const cardLikeBtn = cardElement.querySelector('.card__like-btn');
    const cardDeleteBtn = cardElement.querySelector('.card__delete-btn');

    cardElement.querySelector('.card__heading').textContent = cardHeading;
    cardElement.querySelector('.card__photo').src = cardLink;
    cardElement.querySelector('.card__photo').alt = cardHeading;

    cardImg.addEventListener('click', function () {
        cardPopupImg.src = cardLink;
        cardPopupImg.alt = cardHeading;
        cardPopupHeading.textContent = cardHeading;
        openPopup(cardPopup);
    });

    cardLikeBtn.addEventListener('click', function (evt) {
        const cardLikeTarget = evt.target;
        cardLikeTarget.classList.toggle('card__like-btn_active');
    });

    cardDeleteBtn.addEventListener('click', function (evt) {
        const cardTarget = evt.target.closest('.card');
        cardTarget.remove();
    });

    return cardElement;
}

function addCard(evt) {
    evt.preventDefault();
    const newCard = createCard(cardHeadingInput.value, cardLinkInput.value);
    cardsContainer.prepend(newCard);
    cardAddForm.reset();
    closePopup(cardAddPopup);
}

function addInitialCards(initialCards) {
    initialCards.forEach(function(card) {
        const newCard = createCard(card.name, card.link);
        cardsContainer.append(newCard);
    });
}

/*listeners*/
profileEditOpenBtn.addEventListener('click', () => {
    openPopup(profileEditPopup);
    setProfileEdit();
});
profileEditForm.addEventListener('submit', editProfile);

cardAddOpenBtn.addEventListener('click', () => {
    openPopup(cardAddPopup);
});
cardAddForm.addEventListener('submit', addCard);

closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

function closePopupEsc (evt) {
    if (evt.key === "Escape") {
        popupList.forEach((popupElement) => {
            if (popupElement.classList.contains('popup_opened')) {
                closePopup((popupElement));
            }
        });
    }
}

function closePopupOverlay (evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target);
    }
}




/*defaults*/
setProfileEdit();
addInitialCards(initialCards);