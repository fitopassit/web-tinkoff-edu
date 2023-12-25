let cartIndex; // Глобальная переменная
const generateBearCard = (name, description, linkToImage, code, provider) => {
    return `
        <div class="list-block__card" id='${code}'>
        <button type='button' class="list-block__editBtn">Редактировать</button>
            <h2>${name.toUpperCase()}</h2>
            <img class="list-block__card-img" src=${linkToImage} alt="bearcard">
            <p> ${description.toUpperCase()}</p>
            <p>Код товара: ${code}</p>
            <p>Поставщика: ${provider}</p>
            <button type='button' class='list-block__btn'>Удалить</button>
        </div>
    `;
}

const BearsList = [
    {
        name: 'Спиноломный Стаут',
        description: 'Бодрящий пенистый напиток, который наполнит каждого истинного дворфа свежестью и энергией!',
        linkToImage: 'https://steamuserimages-a.akamaihd.net/ugc/1865070080961279425/A1FC053FE3EC20DAAEC8993410F203DC7B747AA7/',
        code: 1,
        provider: 'Какой-то хмурый гном'
    },
    {
        name: 'Темный моркит',
        description: 'Оригинальный напиток, одобренный DRG. Опьяняющий и горький, хоть он и вряд ли сможет вывести вас из строя.',
        linkToImage: 'https://steamuserimages-a.akamaihd.net/ugc/1865070080961114338/0B169681095D1F2CC8493BA7BE00B4E1DDC5A0DB/',
        code: 2,
        provider: 'Какой-то хмурый гном'
    },
    {
        name: 'Золотые горшочки',
        description: 'Почти золотой дождь',
        linkToImage: 'https://steamuserimages-a.akamaihd.net/ugc/1875202855990764160/581C570F30E8335EF94DE35BF68F65695E995294/',
        code: 123,
        provider: 'Какой-то хмурый гном'
    },
    {
        name: 'Скалистая гора',
        description: 'Черта стиля. Напиток мыслителя. Осушение кружки этого крепкого варева дает чедесное чувство единства с окружающим камнем, позволяя вам резать его словно масло.',
        linkToImage: 'https://steamuserimages-a.akamaihd.net/ugc/1865070080961217466/5FCB876B9124E35129CA5DD80C2B9404D62D4D88/',
        code: 4,
        provider: 'Какой-то хмурый гном'
    },
    {
        name: 'Взрыватель Красных Скал',
        description: 'Когда вы абсолютно, однозначно собираетесь убить все на своем пути, не соглашайтесь ни на что другое.',
        linkToImage: 'https://steamuserimages-a.akamaihd.net/ugc/1865070080961239138/DAD5F6FC052713E0E05F917789CE0A9592D9B007/',
        code: 5,
        provider: 'Какой-то хмурый гном'
    },
]

function setupDefaultCard() {
    // добавляем кнопки
    let bearList = document.getElementById('bearList')
    let bearListHTML = BearsList.map(Bear => {
        return generateBearCard(Bear.name, Bear.description, Bear.linkToImage, Bear.code, Bear.provider);
    }).join('');
    bearList.innerHTML = bearListHTML;
    bearList.insertAdjacentElement('beforebegin', bearList);

    // добавляем на каждую кнопку удаление
    const buttons = document.querySelectorAll(".list-block__btn");
    buttons.forEach(button => {
        button.addEventListener('click', handleClick)
    })
    const editButtons = document.querySelectorAll(".list-block__editBtn");
    editButtons.forEach(button => {
        button.addEventListener('click', editClick)
    })

    // закидываем карточки в стор
    window.localStorage.clear();
    localStorage.setItem('cards', JSON.stringify(BearsList));

}

function renderCards() {
    // читаем стор
    let BearsList = JSON.parse(localStorage.getItem('cards'));

    // добавляем кнопки
    let bearList = document.getElementById('bearList')
    let bearListHTML = BearsList.map(Bear => {
        return generateBearCard(Bear.name, Bear.description, Bear.linkToImage, Bear.code, Bear.provider);
    }).join('');
    bearList.innerHTML = bearListHTML;
    bearList.insertAdjacentElement('beforebegin', bearList);

    // добавляем на каждую кнопку удаление
    const buttons = document.querySelectorAll(".list-block__btn");
    buttons.forEach(button => {
        button.addEventListener('click', handleClick)
    })
    const editButtons = document.querySelectorAll(".list-block__editBtn");
    editButtons.forEach(button => {
        button.addEventListener('click', editClick)
    })

}

function editClick(e) {

    const currentCard = e.currentTarget;
    let cards = JSON.parse(window.localStorage.getItem("cards"));
    let cardElement = currentCard.closest('.list-block__card');
    let cardId = cardElement.id;
    cartIndex = cards.findIndex((card) => cardId == card.code);
    let editingCard = cards.at(cartIndex);
    document.getElementsByName('name')[0].value = editingCard.name;
    document.getElementsByName('linkToImage')[0].value = editingCard.linkToImage;
    document.getElementsByName('description')[0].value = editingCard.description;
    document.getElementsByName('code')[0].value = editingCard.code;
    document.getElementsByName('provider')[0].value = editingCard.provider;
    document.getElementById('submit-button').classList.add('invisible');
    document.getElementById('edit-button').classList.remove('invisible');

}

function handleClick(e) {
    const currentButton = e.currentTarget;
    let cards = JSON.parse(window.localStorage.getItem("cards"));
    let cardElement = currentButton.closest('.list-block__card');
    let cardId = cardElement.id;
    let cartIndex = cards.findIndex((card) => cardId == card.code);
    cards.splice(cartIndex, 1);
    cardElement.remove();
    window.localStorage.setItem('cards', JSON.stringify(cards));
}


const applicantForm = document.getElementById('card-form')

function serializeForm(Form) { // собираем данные из формы
    const formData = new FormData(Form); // создаём объект FormData, передаём в него элемент формы
    // теперь можно извлечь данные
    const name = formData.get('name');
    const description = formData.get('description');
    const linkToImage = formData.get('linkToImage');
    const code = formData.get('code');
    const provider = formData.get('provider');
    return {name, description, linkToImage, code, provider};

}

function validateForm() {
    let addedCardForm = serializeForm(applicantForm);
    if (Object.values(addedCardForm).filter((param) => param === "").length === 0) {
        pushCard();
    }
}

function pushCard() { // функция добавления карточки
    let addedCard = serializeForm(applicantForm);
    console.log('card add test', addedCard)
    let cards = JSON.parse(window.localStorage.getItem("cards"));
    cards.push(addedCard);
    window.localStorage.clear();
    window.localStorage.setItem('cards', JSON.stringify(cards));
}


function editCard(e) { //редактируем данные
    let cards = JSON.parse(window.localStorage.getItem("cards"));
    let editCard = serializeForm(applicantForm);
    cards[cartIndex] = editCard;
    window.localStorage.clear();
    window.localStorage.setItem('cards', JSON.stringify(cards));
    document.getElementById('submit-button').classList.remove('invisible');
    document.getElementById('edit-button').classList.add('invisible');

}

const setupButton = document.getElementById('setup-button');
const submitButton = document.getElementById('submit-button');
const editButton = document.getElementById('edit-button');

submitButton.addEventListener('click', validateForm);
setupButton.addEventListener('click', setupDefaultCard);
editButton.addEventListener('click', editCard);

renderCards(); // при перезагрузке страницы рендерим карточки

