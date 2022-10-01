/*profileEdit*/
const profileEditPopup = document.querySelector('.popup_type_edit-profile');
const profileEditForm = document.querySelector('.form_type_profile-edit');
const profileEditOpenBtn = document.querySelector('.profile__edit-btn');
const profileEditCloseBtn = document.querySelector('#close-btn_type_profile-edit');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let profileNameInput = document.querySelector('.form__item_el_profile-name');
let profileDescriptionInput = document.querySelector('.form__item_el_profile-description');

/*cardAdd*/
const cardAddPopup = document.querySelector('.popup_type_add-card');
const cardAddForm = document.querySelector('.form_type_card-add');
const cardAddOpenBtn = document.querySelector('.profile__add-btn');
const cardAddCloseBtn = document.querySelector('#close-btn_type_card-add');
let cardHeadingInput = document.querySelector('.form__item_el_card-heading');
let cardLinkInput = document.querySelector('.form__item_el_card-link');

/*card*/
const cardPopup = document.querySelector('.popup_type_card');
const cardCloseBtn = document.querySelector('#close-btn_type_card');


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
const cardTemplate = document.querySelector('#card-template').content;
const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

/*functions*/
function popupClose(popup) {
    popup.classList.remove('popup_opened');
}

function profileEditOpen() {
    profileEditPopup.classList.add('popup_opened');
    profileNameInput.value = profileName.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
}

function profileEdit(evt) {
    evt.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    popupClose(profileEditPopup);
}

function cardAddOpen() {
    cardAddPopup.classList.add('popup_opened');
}

function cardAdd(evt) {
    evt.preventDefault();

    cardElement.querySelector('.card__heading').textContent = cardHeadingInput.value;
    cardElement.querySelector('.card__photo').src = cardLinkInput.value;

    const cardImg = cardElement.querySelector('.card__photo');
    const cardPopupImg = document.querySelector('.popup__card-img');
    const cardPopupHeading = document.querySelector('.popup__card-heading');

    cardImg.addEventListener('click', function (evt) {
        const cardImgTarget = evt.target;
        const cardTarget = cardImgTarget.parentElement;
        cardPopupImg.src = cardImgTarget.src;
        cardPopupHeading.textContent = cardTarget.querySelector('.card__heading').textContent;
        cardPopup.classList.add('popup_opened');
    });

    const cardLikeBtn = cardElement.querySelector('.card__like-btn');
    cardLikeBtn.addEventListener('click', function (evt) {
        const cardLikeTarget = evt.target;
        cardLikeTarget.classList.toggle('card__like-btn_active');
    });

    const cardDeleteBtn = cardElement.querySelector('.card__delete-btn');
    cardDeleteBtn.addEventListener('click', function (evt) {
        const cardTarget = evt.target.parentElement;
        cardTarget.remove();
    });

    cardsContainer.prepend(cardElement);
    popupClose(cardAddPopup);
}

function initialAddCards(initialCards) {
    initialCards.forEach(function (card) {
        const cardTemplate = document.querySelector('#card-template').content;
        const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
        const cardImg = cardElement.querySelector('.card__photo');
        const cardPopupImg = document.querySelector('.popup__card-img');
        const cardPopupHeading = document.querySelector('.popup__card-heading');

        cardElement.querySelector('.card__heading').textContent = card.name;
        cardElement.querySelector('.card__photo').src = card.link;

        cardImg.addEventListener('click', function (evt) {
            const cardImgTarget = evt.target;
            const cardTarget = cardImgTarget.parentElement;
            cardPopupImg.src = cardImgTarget.src;
            cardPopupHeading.textContent = cardTarget.querySelector('.card__heading').textContent;
            cardPopup.classList.add('popup_opened');
        });

        const cardLikeBtn = cardElement.querySelector('.card__like-btn');
        cardLikeBtn.addEventListener('click', function (evt) {
            const cardLikeTarget = evt.target;
            cardLikeTarget.classList.toggle('card__like-btn_active');
        });

        const cardDeleteBtn = cardElement.querySelector('.card__delete-btn');
        cardDeleteBtn.addEventListener('click', function (evt) {
            const cardTarget = evt.target.parentElement;
            cardTarget.remove();
        });

        cardsContainer.append(cardElement);
    })
}

/*listeners*/
profileEditOpenBtn.addEventListener('click', profileEditOpen);
profileEditCloseBtn.addEventListener('click', () => {
    popupClose(profileEditPopup)
});
profileEditForm.addEventListener('submit', profileEdit);

cardAddOpenBtn.addEventListener('click', cardAddOpen);
cardAddCloseBtn.addEventListener('click', () => {
    popupClose(cardAddPopup)
});
cardAddForm.addEventListener('submit', cardAdd);

cardCloseBtn.addEventListener('click', () => {
    popupClose(cardPopup);
});

/*defaults*/
initialAddCards(initialCards);