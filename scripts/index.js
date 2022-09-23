let popup = document.querySelector('.popup');
let profileEditBtn = document.querySelector('.profile__edit-btn');
let popupCloseBtn = document.querySelector('.popup__close-btn');

let name = document.querySelector('.profile__name');
let description = document.querySelector('.profile__description');

let nameInput = document.querySelector('.form__item_el_name');
let descriptionInput = document.querySelector('.form__item_el_description');

function popupOpen() {
    popup.classList.add('popup_opened');
    nameInput.value = name.textContent;
    descriptionInput.value = description.textContent;

}

function popupClose() {
    popup.classList.remove('popup_opened');
}

function changeName (evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    description.textContent = descriptionInput.value;
}

profileEditBtn.addEventListener('click', popupOpen);

popupCloseBtn.addEventListener('click', popupClose);

popup.addEventListener('submit', changeName);
