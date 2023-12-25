let cardId; // Глобальная переменная
const generateBeerCard = (id, name, description, linkToImage, code, provider) => {
    return `
        <div class="list-block__card" id='${id}'>
        <button type='button' class="list-block__editBtn">Редактировать</button>
            <h2>${name.toUpperCase()}</h2>
            <img class="list-block__card-img" src=${linkToImage} alt="beercard">
            <p> ${description.toUpperCase()}</p>
            <p>Код товара: ${code}</p>
            <p>Поставщика: ${provider}</p>
            <button type='button' class='list-block__btn'>Удалить</button>
        </div>
    `;
}

function fetchAll() { // получаем все данные
    fetchProfile();
    fetchCards();
}

async function fetchProfile() { // получаем и выводим имя автора
    try {
        const response = await fetch('http://localhost:3000/profile')
        const user = await response.json();
        document.getElementById('header__text').textContent = user.name + " " + user.group;
    } catch (err) {
        alert("Ошибка в запросе имени автора: " + err);
    }

}

async function fetchCards() { // функция получения и отрисовки карточек с сервера
    try {
        const response = await fetch('http://localhost:3000/posts')
        const cards = await response.json();
        const skeletons = document.getElementsByClassName('skeleton');
        for (const skeleton of skeletons) {
            skeleton.classList.add('invisible');
        }
        const cardsForRender = await cards ? await cards : []
        renderCards(cardsForRender);

    } catch (err) {
        alert("Карточки не приходят с сервера:" + err);
    }
}

function renderCards(beersList) {
    // добавляем кнопки
    const beerList = document.getElementById('beerList')
    const beerListHTML = beersList.map(beer => {
        return generateBeerCard(beer.id, beer.name, beer.description, beer.linkToImage, beer.code, beer.provider);
    }).join('');
    beerList.innerHTML = beerListHTML;
    beerList.insertAdjacentElement('beforebegin', beerList);

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

async function setupDefaultCard() {
    // добавляем кнопки
    const cards = document.getElementsByClassName('list-block__card');
    for (const card of cards) {
        card.classList.add('invisible');
    }
    const skeletons = document.getElementsByClassName('skeleton');
    for (const skeleton of skeletons) {
        skeleton.classList.remove('invisible');
    }
    const beerList = document.getElementById('beerList')
    const beerListHTML = beersList.map(beer => {
        return generateBeerCard(beer.id, beer.name, beer.description, beer.linkToImage, beer.code, beer.provider);
    }).join('');
    beerList.innerHTML = beerListHTML;
    beerList.insertAdjacentElement('beforebegin', beerList);

    // добавляем на каждую кнопку удаление
    const buttons = document.querySelectorAll(".list-block__btn");
    buttons.forEach(button => {
        button.addEventListener('click', handleClick)
    })
    const editButtons = document.querySelectorAll(".list-block__editBtn");
    editButtons.forEach(button => {
        button.addEventListener('click', editClick)
    })
    try {
        // очистка
        const response =  await fetch('http://localhost:3000/posts')
        let oldCards = await response.json();

        for (let oldCard of oldCards) {
            await fetch(`http://localhost:3000/posts/${oldCard.id}`, {
                method: 'DELETE',
            });
        }
        //добавление
        for (let j = 0; j < beersList.length; j++) {
            await fetch('http://localhost:3000/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(beersList[j])
            })

        }

    } catch {
        alert("карточки не сетапятся");
    }
    await fetchCards();

}

const beersList = [
    {
        id: generateId(),
        name: 'Спиноломный Стаут',
        description: 'Бодрящий пенистый напиток, который наполнит каждого истинного дворфа свежестью и энергией!',
        linkToImage: 'https://steamuserimages-a.akamaihd.net/ugc/1865070080961279425/A1FC053FE3EC20DAAEC8993410F203DC7B747AA7/',
        code: 1,
        provider: 'Какой-то хмурый гном'
    },
    {
        id: generateId(),
        name: 'Темный моркит',
        description: 'Оригинальный напиток, одобренный DRG. Опьяняющий и горький, хоть он и вряд ли сможет вывести вас из строя.',
        linkToImage: 'https://steamuserimages-a.akamaihd.net/ugc/1865070080961114338/0B169681095D1F2CC8493BA7BE00B4E1DDC5A0DB/',
        code: 2,
        provider: 'Какой-то хмурый гном'
    },
    {
        id: generateId(),
        name: 'Золотые горшочки',
        description: 'Почти золотой дождь',
        linkToImage: 'https://steamuserimages-a.akamaihd.net/ugc/1875202855990764160/581C570F30E8335EF94DE35BF68F65695E995294/',
        code: 123,
        provider: 'Какой-то хмурый гном'
    },
    {
        id: generateId(),
        name: 'Скалистая гора',
        description: 'Черта стиля. Напиток мыслителя. Осушение кружки этого крепкого варева дает чедесное чувство единства с окружающим камнем, позволяя вам резать его словно масло.',
        linkToImage: 'https://steamuserimages-a.akamaihd.net/ugc/1865070080961217466/5FCB876B9124E35129CA5DD80C2B9404D62D4D88/',
        code: 4,
        provider: 'Какой-то хмурый гном'
    },
    {
        id: generateId(),
        name: 'Взрыватель Красных Скал',
        description: 'Когда вы абсолютно, однозначно собираетесь убить все на своем пути, не соглашайтесь ни на что другое.',
        linkToImage: 'https://steamuserimages-a.akamaihd.net/ugc/1865070080961239138/DAD5F6FC052713E0E05F917789CE0A9592D9B007/',
        code: 5,
        provider: 'Какой-то хмурый гном'
    },
]


async function editClick(e) {
    const currentButton = e.currentTarget;
    const cardElement = currentButton.closest('.list-block__card');
    cardId = cardElement.id;
    const response = await fetch('http://localhost:3000/posts');
    const cards = await response.json();
    const cartIndex = cards.findIndex((card) => cardId == card.id);
    const editingCard = cards.at(cartIndex);

    document.querySelector('[name="name"]').value = editingCard.name;
    document.querySelector('[name="description"]').value = editingCard.description;
    document.querySelector('[name="linkToImage"]').value = editingCard.linkToImage;
    document.querySelector('[name="code"]').value = editingCard.code;
    document.querySelector('[name="provider"]').value = editingCard.provider;

    document.getElementById('submit-button').classList.add('invisible');
    document.getElementById('edit-button').classList.remove('invisible');

}

async function handleClick(e) {
    const currentButton = e.currentTarget;
    const cardElement = currentButton.closest('.list-block__card');
    const cardId = cardElement.id;
    cardElement.remove();
    try {
        await fetch(`http://localhost:3000/posts/${cardId}`, {
            method: 'DELETE'
        })
    } catch (err) {
        alert(err);
    }
}


const applicantForm = document.getElementById('card-form')

function serializeForm(form) { // собираем данные из формы
    const formData = new FormData(form); // создаём объект FormData, передаём в него элемент формы
    const name = formData.get('name');
    const description = formData.get('description');
    const linkToImage = formData.get('linkToImage');
    const code = formData.get('code');
    const provider = formData.get('provider');
    return {name, description, linkToImage, code, provider};

}

function validateForm() {
    const addedCardForm = serializeForm(applicantForm);
    if (Object.values(addedCardForm).filter((param) => param === "").length === 0) {

        pushCard();
    }
}

async function pushCard() { // функция добавления карточки
    const addedCard = serializeForm(applicantForm);
    await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(addedCard)
    });
    let response = await fetch('http://localhost:3000/posts')
    let cards = await response.json();
    cards.push(addedCard);
    document.getElementById('loader').classList.add('invisible');
    setupButton.removeAttribute('disabled', '');
    submitButton.removeAttribute('disabled', '');
    renderCards(cards);
}

function generateId() {
    return Math.random().toString(16).slice(2);
}

async function editCard(e) { //редактируем данные
    const editCard = serializeForm(applicantForm);
    try {
        await fetch(`http://localhost:3000/posts/${cardId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editCard)
        })
    } catch (err) {
        alert(err);
    }
}

const setupButton = document.getElementById('setup-button');
const submitButton = document.getElementById('submit-button');
const editButton = document.getElementById('edit-button');

submitButton.addEventListener('click', validateForm);
setupButton.addEventListener('click', setupDefaultCard);
editButton.addEventListener('click', editCard);

fetchAll();

