// IMPORTS
import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api';
import {
    profileEditForm,
    profileEditOpenBtn,
    profileNameInput,
    profileDescriptionInput,
    cardAddForm,
    cardAddOpenBtn,
    cardHeadingInput,
    cardLinkInput,
    avatarEditForm,
    avatarEditOpenBtn,
    avatarLinkInput,
    avatarPhoto,
    settings,
    formList
} from '../utils/constans.js';


//API
const apiConfig = {
    url: "https://mesto.nomoreparties.co/v1/cohort-55/",
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
        authorization: "eb0039d3-e6aa-4ad7-aa59-39dc515af41e"
    }
}
const api = new Api(apiConfig);
let userId;

Promise.all([api.getInitialCards(), api.getProfileInformation()])
    .then(([initialCards, profileInformation]) => {
        userInfo.setUserInfo(profileInformation.name, profileInformation.about);
        userId = profileInformation._id;
        avatarPhoto.src = profileInformation.avatar;
        photoContainer.renderItems(initialCards);
        formList.forEach(function(form) {
            const formElement = new FormValidator(settings, form);
            formElement.enableValidation();
        });
    })
    .catch((err) => console.log(err));


// FORM VALIDATORS
const formEditProfileValidator = new FormValidator(settings, profileEditForm);
const formCardAddValidator = new FormValidator(settings, cardAddForm);
const formEditAvatar = new FormValidator(settings, avatarEditForm);


// USER INFO
const userInfo = new UserInfo('.profile__name', '.profile__description');


// PROFILE EDIT POPUP
const profileEditPopup = new PopupWithForm('.popup_type_edit-profile', () => {
    profileEditPopup.renderLoading(true)
    api.patchUserInfo({name: profileNameInput.value, about: profileDescriptionInput.value})
        .then((data) => {
            userInfo.setUserInfo(data.name, data.about);
            profileEditPopup.close();
        })
        .catch((err) => console.log(err))
        .finally(() => {
            profileEditPopup.renderLoading(false);
        });
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
    cardAddPopup.renderLoading(true, cardAddForm)
    api.postNewCard({name: cardHeadingInput.value, link: cardLinkInput.value, likes: []})
        .then((res) => {
            photoContainer.addItem(addCard(res), true);
            cardAddPopup.close();
        })
        .catch((err) => console.log(err))
        .finally(() => {
            cardAddPopup.renderLoading(false);
        });
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

//CARD DELETE POPUP
const cardDeletePopup = new PopupWithSubmit('.popup_type_delete-card');
cardDeletePopup.setEventListeners();


//AVATAR EDIT POPUP
const avatarEditPopup = new PopupWithForm('.popup_type_edit-avatar', () => {
    avatarEditPopup.renderLoading(true);
    api.patchNewAvatar(avatarLinkInput.value)
        .then((res) => {
            avatarPhoto.src = res.avatar;
            avatarEditPopup.close();
        })
        .catch((err) => console.log(err))
        .finally(() => {
            avatarEditPopup.renderLoading(false);
        });
});
avatarEditOpenBtn.addEventListener('click', () => {
    avatarEditPopup.open();
    formEditAvatar.toggleButtonState();
    formEditAvatar.hideAllErrors();
});
avatarEditPopup.setEventListeners();

// CARD ADD FUNCTION
const addCard = (data) => {
    const newCard = new Card({
        data: data,
        handleCardClick: () => {
            cardPopup.open(data.link, data.name)
        },
        handleSetLikeClick: (cardId) => {
            api.putCardLike(cardId)
                .then((res) => {
                    newCard.cardLike(res);
                })
                .catch((err) => console.log(err))
        },
        handleRemoveLikeClick: (cardId) =>{
            api.deleteCardLike(cardId)
                .then((res) => {
                    newCard.cardLike(res);
                })
                .catch((err) => console.log(err))
        },
        handleDeleteIconClick: (cardId) => {
            cardDeletePopup.open();
            cardDeletePopup.handleSubmit(() => {
                api.deleteCard(cardId)
                    .then((res) => {
                        newCard.cardDelete();
                    })
                    .catch((err) => console.log(err))
            })
        }
    }, '#card-template', userId);
    return newCard.generateCard()
}

//PHOTOS SECTION
const photoContainer = new Section({
        renderer: (item) => {
            const cardElement = addCard({name: item.name, link: item.link, likes: item.likes, _id: item._id, owner: item.owner});
            photoContainer.addItem(cardElement);
        },
    },
    '.photos');