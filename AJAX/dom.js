let cardId; // Глобальная переменная
const generateBearCard = (id, name, description, linkToImage, code, provider) => {
    return `
        <div class="list-block__card" id='${id}'>
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

function fetchAll() { // получаем все данные
    fetchProfile();
    fetchCards();
}

async function fetchProfile() { // получаем и выводим имя автора
    try {
        let user = await fetch('http://localhost:3000/profile').then((response) => response.json());
        document.getElementById('header__text').textContent = user.name + " " + user.group;
    } catch (err) {
        alert("Ошибка в запросе имени автора: " + err);
    }

}

async function fetchCards() { // функция получения и отрисовки карточек с сервера
    try {
        let cards = await fetch('http://localhost:3000/posts').then((response) => response.json());
        let skeletons = document.getElementsByClassName('skeleton');
        for (let skeleton of skeletons) {
            skeleton.classList.add('invisible');
        }
        let cardsForRender = await cards ? await cards : []
        renderCards(cardsForRender);

    } catch (err) {
        alert("Карточки не приходят с сервера:" + err);
    }
}

function renderCards(BearsList) {
    // добавляем кнопки
    let bearList = document.getElementById('bearList')
    let bearListHTML = BearsList.map(Bear => {
        return generateBearCard(Bear.id, Bear.name, Bear.description, Bear.linkToImage, Bear.code, Bear.provider);
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

async function setupDefaultCard() {
    // добавляем кнопки
    let cards = document.getElementsByClassName('list-block__card');
    for (let card of cards) {
        card.classList.add('invisible');
    }
    let skeletons = document.getElementsByClassName('skeleton');
    for (let skeleton of skeletons) {
        skeleton.classList.remove('invisible');
    }
    let bearList = document.getElementById('bearList')
    let bearListHTML = BearsList.map(Bear => {
        return generateBearCard(Bear.id, Bear.name, Bear.description, Bear.linkToImage, Bear.code, Bear.provider);
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
    try {
        // очистка
        let oldCards = await fetch('http://localhost:3000/posts').then((response) => response.json());
        for (let oldCard of oldCards) {
            await fetch(`http://localhost:3000/posts/${oldCard.id}`, {
                method: 'DELETE',
            });
        }
        //добавление
        for (let j = 0; j < BearsList.length;) {
            await fetch('http://localhost:3000/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(BearsList[j])
            }).then(++j);
        }

    } catch {
        alert("карточки не сетапятся");
    }
    await fetchCards();

}

const BearsList = [
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
    let cardElement = currentButton.closest('.list-block__card');
    cardId = cardElement.id;
    console.log("МЕНЯЕМ КАРТОЧКУ С ID1", cardId);
    let cards = await fetch('http://localhost:3000/posts').then((response) => response.json());
    let cartIndex = cards.findIndex((card) => cardId == card.id);
    console.log("МЕНЯЕМ КАРТОЧКУ С ID2", cartIndex);
    let editingCard = cards.at(cartIndex);
    document.getElementsByName('name')[0].value = editingCard.name;
    document.getElementsByName('linkToImage')[0].value = editingCard.linkToImage;
    document.getElementsByName('description')[0].value = editingCard.description;
    document.getElementsByName('code')[0].value = editingCard.code;
    document.getElementsByName('provider')[0].value = editingCard.provider;
    document.getElementById('submit-button').classList.add('invisible');
    document.getElementById('edit-button').classList.remove('invisible');

}

async function handleClick(e) {
    const currentButton = e.currentTarget;
    let cardElement = currentButton.closest('.list-block__card');
    let cardId = cardElement.id;
    cardElement.remove();
    try {
        await fetch(`http://localhost:3000/posts/${cardId}`, {
            method: 'DELETE'
        }).then()
    } catch (err) {
        alert(err);
    }
}


const applicantForm = document.getElementById('card-form')

function serializeForm(Form) { // собираем данные из формы
    const formData = new FormData(Form); // создаём объект FormData, передаём в него элемент формы
    const name = formData.get('name');
    const description = formData.get('description');
    const linkToImage = formData.get('linkToImage');
    const code = formData.get('code');
    const provider = formData.get('provider');
    return {name, description, linkToImage, code, provider};

}

function validateForm() {
    console.log('validate start');
    let addedCardForm = serializeForm(applicantForm);
    if (Object.values(addedCardForm).filter((param) => param === "").length === 0) {
        console.log('validate success');
        pushCard().then();
    }
}

async function pushCard() { // функция добавления карточки
    let addedCard = serializeForm(applicantForm);
    console.log('card add test', addedCard)
    // document.getElementById('loader').classList.remove('invisible');
    // setupButton.setAttribute('disabled', '');
    // submitButton.setAttribute('disabled', '');
    await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(addedCard)
    }).then(async () => {
        let cards = await fetch('http://localhost:3000/posts').then((response) => response.json());
        cards.push(addedCard);
        document.getElementById('loader').classList.add('invisible');
        setupButton.removeAttribute('disabled', '');
        submitButton.removeAttribute('disabled', '');
        renderCards(cards);
    });
}

function generateId() {
    return Math.random().toString(16).slice(2);
}

async function editCard(e) { //редактируем данные
    let editCard = serializeForm(applicantForm);
    try {
        console.log('edit index', cardId)
        await fetch(`http://localhost:3000/posts/${cardId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editCard)
        }).then(() => {
            console.log("Запушили");
            // document.getElementById('submit-button').classList.remove('invisible');
            // document.getElementById('edit-button').classList.add('invisible');
            // location.reload();
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

