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

saveButton.addEventListener('click', changeName);

function changeName () {
    let nameInput = document.querySelector('.form__item_el_name');
    let descriptionInput = document.querySelector('.form__item_el_description');
    evt.preventDefault();
    name.innerHTML = nameValue.value;
    description.innerHTML = descriptionValue.value;
}

