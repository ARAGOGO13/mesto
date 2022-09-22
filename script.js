let popup = document.querySelector('.popup');
let profileEditBtn = document.querySelector('.profile__edit-btn');
let popupCloseBtn = document.querySelector('.popup__close-btn');

let name = document.querySelector('.profile__name');
let description = document.querySelector('.profile__description');

let saveButton = document.querySelector('.form__save-btn')

profileEditBtn.addEventListener('click', function () {
    popup.classList.add('popup_opened');
});

popupCloseBtn.addEventListener('click', function () {
    popup.classList.remove('popup_opened');
});

function changeName (evt) {
    evt.preventDefault();
    let nameInput = document.querySelector('.form__item_el_name');
    let descriptionInput = document.querySelector('.form__item_el_description');
    name.innerHTML = nameInput.value;
    description.innerHTML = descriptionInput.value;
    console.log('dsa');
}

saveButton.addEventListener('click', changeName);
