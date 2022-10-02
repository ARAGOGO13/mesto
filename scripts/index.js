/*profileEdit*/
const profileEditPopup = document.querySelector('.popup_type_edit-profile');
const profileEditForm = document.querySelector('.form_type_profile-edit');
const profileEditOpenBtn = document.querySelector('.profile__edit-btn');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileNameInput = document.querySelector('.form__item_el_profile-name');
const profileDescriptionInput = document.querySelector('.form__item_el_profile-description');

/*cardAdd*/
const cardAddPopup = document.querySelector('.popup_type_add-card');
const cardAddForm = document.querySelector('.form_type_card-add');
const cardAddOpenBtn = document.querySelector('.profile__add-btn');
let cardHeadingInput = document.querySelector('.form__item_el_card-heading');
let cardLinkInput = document.querySelector('.form__item_el_card-link');

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

/*functions*/
function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function openProfileEdit() {
    profileNameInput.value = profileName.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
}

function editProfile(evt) {
    evt.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closePopup(profileEditPopup);
}

function createCard() {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImg = cardElement.querySelector('.card__photo');

    const cardLikeBtn = cardElement.querySelector('.card__like-btn');
    const cardDeleteBtn = cardElement.querySelector('.card__delete-btn');

    cardImg.addEventListener('click', function (evt) {
        const cardImgTarget = evt.target;
        const cardTarget = cardImgTarget.closest('.card');
        cardPopupImg.src = cardImgTarget.src;
        cardPopupImg.alt = cardElement.querySelector('.card__heading').textContent;
        cardPopupHeading.textContent = cardTarget.querySelector('.card__heading').textContent;
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

    const newCard = createCard();

    newCard.querySelector('.card__heading').textContent = cardHeadingInput.value;
    newCard.querySelector('.card__photo').src = cardLinkInput.value;
    newCard.querySelector('.card__photo').alt = cardHeadingInput.value;

    cardsContainer.prepend(newCard);

    cardHeadingInput.value = '';
    cardLinkInput.value = '';

    closePopup(cardAddPopup);
}

function addInitialCards(initialCards) {
    initialCards.forEach(function(card) {
        const newCard = createCard();

        const newCardHeading = newCard.querySelector('.card__heading');
        const newCardPhoto = newCard.querySelector('.card__photo');

        newCardHeading.textContent = card.name;
        newCardPhoto.src = card.link;
        newCardPhoto.alt = card.name;

        cardsContainer.append(newCard);
    });
}

/*listeners*/
profileEditOpenBtn.addEventListener('click', () => {
    openPopup(profileEditPopup);
    openProfileEdit();
});
profileEditForm.addEventListener('submit', editProfile);

cardAddOpenBtn.addEventListener('click', () => {
    openPopup(cardAddPopup);
});
cardAddForm.addEventListener('submit', addCard);

const closeButtons = document.querySelectorAll('.popup__close-btn');

closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

/*defaults*/
addInitialCards(initialCards);