const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');
const popupContent = document.querySelector('.popup_content');

let unlock = true;

const timeout = 400;

function openModal() {
  if(event.target.classList.contains('our-friends-card')
  || event.target.classList.contains('our-friends-card_img')
  || event.target.classList.contains('our-friends-card_name')
  || event.target.classList.contains('our-friends-card_btn')){
    console.log(event.target)
    const jsonOrder = event.target.closest('.our-friends-card').dataset.jsonOrder;
    const curentPopup = document.querySelector(`.popup[data-json-order="${jsonOrder}"]`);
            console.log(event.target)
            console.log(curentPopup)
            popupOpen(curentPopup);
            // e.preventDefault();
  }
}

function popupOpen(curentPopup) {
    if(curentPopup && unlock){
        const popupActive = document.querySelector('.popup.open');
        if(popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
    }
    curentPopup.classList.add('open');
    curentPopup.addEventListener('click', function(e){
        if(!e.target.closest('.popup_content')){
            popupClose(e.target.closest('.popup'));
        } else if(e.target.closest('.close-popup')){
          popupClose(e.target.closest('.popup'));
        }
    });
}

function popupClose(popupActive , doUnlock = true){
    if(unlock){
        popupActive.classList.remove('open');
        if(doUnlock){
            bodyUnLock();
        }
    }
}

function bodyLock(){
    body.classList.add('lock');

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}


function bodyUnLock(){
    setTimeout(function() {
        for (let i = 0; i < lockPadding.length; i++){
            const el = lockPadding[i];
            el.style.paddingRight = '0px';
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    },timeout) 

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

/*Scroll кнопка */

const btnUp = document.querySelector('.btn-up');

function trackScroll() {
    let scrolled = window.pageYOffset;

    if (scrolled > 100) {
        btnUp.classList.add('shown');
    }
    if (scrolled < 100) {
        btnUp.classList.remove('shown');
    }
}

function scrollToTop() {
    if (window.pageYOffset > 0) {
      window.scrollTo(0, 0);
    }
}

window.addEventListener('load', trackScroll);
window.addEventListener('scroll', trackScroll);
btnUp.addEventListener('click', scrollToTop);


/*--------------*/

const divPetCards = document.querySelector('.pets-cards');

const LEFT_LAST = document.querySelector('.left-last');
const LEFT = document.querySelector('.left');
const PAGE = document.querySelector('.page');
const RIGHT_LAST = document.querySelector('.right-last');
const RIGHT = document.querySelector('.right');


async function getData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

const petCards = [];
const petModals = [];
const arrWithCardsArr = [];
let cards48 = [];

getData('https://hope-house-server.herokuapp.com/pets').then(data => {
  const pets = data;
  let i = 0;
  pets.forEach((pet,i) => {
    /* Pet card */
    const card = document.createElement('div');
    card.classList.add('our-friends-card');
    card.id = `pets-${i}`;
    const popupLink = document.createElement('a');
    popupLink.classList.add('popup-link');
    popupLink.href = `#pets-popup_${i}`;
    const img = document.createElement('img');
    img.classList.add('our-friends-card_img');
    img.src = pet.img;
    img.alt = pet.name;
    popupLink.append(img);
    const name = document.createElement('h3');
    name.classList.add('our-friends-card_name');
    name.innerText = pet.name;
    popupLink.append(name);
    const button = document.createElement('button');
    button.classList.add('button');
    button.classList.add('our-friends-card_btn');
    const popupLinkB = document.createElement('a');
    popupLinkB.classList.add('popup-link');
    popupLinkB.href = `#pets-popup_${i}`;
    popupLinkB.innerText = 'Узнать больше';
    button.append(popupLinkB);
    popupLink.append(button);
    card.append(popupLink);
    card.dataset.jsonOrder = i;
    petCards.push(card);

    /* Modal */
    
    const petsPopup = document.createElement('div');
    petsPopup.classList.add('popup');
    petsPopup.classList.add('pets-popup');
    petsPopup.id = `pets-popup_${i}`;
    petsPopup.dataset.jsonOrder = i;

    const bodyPopup = document.createElement('div');
    bodyPopup.classList.add('popup_body');
    petsPopup.append(bodyPopup);

    const bodyContent = document.createElement('div');
    bodyContent.classList.add('popup_content');

    const petsPopupImg = document.createElement('img');
    petsPopupImg.classList.add('popup-pets-img');
    petsPopupImg.src = pet.img;
    petsPopupImg.alt = pet.name;
    bodyContent.append(petsPopupImg);

    const divInfo = document.createElement('div');
    divInfo.classList.add('popup-pets-info');

    const h3 = document.createElement('h3');
    h3.classList.add('popup-pets-info-title');
    h3.innerText = pet.name;
    divInfo.append(h3);

    const petsPopupDesc = document.createElement('p');
    petsPopupDesc.classList.add('popup-pets-desc');
    petsPopupDesc.innerText = pet.description;
    divInfo.append(petsPopupDesc);

    const petsPopupUl = document.createElement('ul');
    petsPopupUl.classList.add('popup-pets-ul');
    const li1 = document.createElement('li');
    li1.classList.add('popup-pets-li');
    li1.innerHTML = '<b>Возраст:</b> ' + pet.age;
    petsPopupUl.append(li1);
    const li2 = document.createElement('li');
    li2.classList.add('li-info');
    li2.classList.add('popup-pets-li');
    li2.innerHTML = '<b>Пол:</b> ' + pet.gender;
    petsPopupUl.append(li2);
    const li3 = document.createElement('li');
    li3.classList.add('li-info');
    li3.classList.add('popup-pets-li');
    li3.innerHTML = '<b>Прививки:</b> ' + pet.inoculations.join(', ');
    petsPopupUl.append(li3);
    const li4 = document.createElement('li');
    li4.classList.add('li-info');
    li4.classList.add('popup-pets-li');
    li4.innerHTML = '<b>Паразиты:</b> ' + pet.parasites.join(', ');
    petsPopupUl.append(li4);
    divInfo.append(petsPopupUl);

    bodyContent.append(divInfo);

    const close = document.createElement('a');
    close.classList.add('popup_close');
    close.classList.add('close-popup');
    close.href = `#pets-${i}`;
    close.innerText = 'X';

    bodyContent.append(close);

    bodyPopup.append(bodyContent);
    petsPopup.append(bodyPopup);
    petModals.push(petsPopup);
    document.body.prepend(petModals[i++]);
  });
}).then(() => {
  const cards = document.querySelector('.pets-cards');
    for(let i = 0; i < 6; i++){
      arrWithCardsArr[i] = petCards.map(value => ({ value, sort: Math.random() }))
                                   .sort((a, b) => a.sort - b.sort)
                                   .map(({ value }) => value);
    }
    for(let i = 0; i < 8; i++){
      const card = document.createElement('div');
      card.classList.add('our-friends-card');
      card.innerHTML = arrWithCardsArr[0][i].innerHTML;
      card.dataset.id = i;
      card.dataset.jsonOrder = arrWithCardsArr[0][i].dataset.jsonOrder;
      cards.append(card);
    }
});

divPetCards.addEventListener('click', openModal);

LEFT_LAST.addEventListener('click', firstPage);
LEFT.addEventListener('click', previousPage);
RIGHT.addEventListener('click', nextPage);
RIGHT_LAST.addEventListener('click', lastPage);

function firstPage() {
  if(PAGE.value != 1){
    PAGE.value = 1;
    PAGE.innerText = PAGE.value;
    RIGHT.dataset.disabled = 'false';
    RIGHT.classList.remove('disabled-button');
    RIGHT_LAST.dataset.disabled = 'false';
    RIGHT_LAST.classList.remove('disabled-button');
    LEFT.dataset.disabled = 'true';
    LEFT.classList.add('disabled-button');
    LEFT_LAST.dataset.disabled = 'true';
    LEFT_LAST.classList.add('disabled-button');
    let i = 0;
    arrWithCardsArr[0].forEach(card => {
      document.querySelector('[data-id="' + i + '"]').innerHTML = card.innerHTML;
      document.querySelector('[data-id="' + i + '"]').dataset.jsonOrder = card.dataset.jsonOrder;
      i++;
    });
  }
}

function previousPage() {
  if(PAGE.value > 1){
    PAGE.value--;
    const pageNum = PAGE.value;
    PAGE.innerText = PAGE.value;
    RIGHT.dataset.disabled = 'false';
    RIGHT.classList.remove('disabled-button');
    RIGHT_LAST.dataset.disabled = 'false';
    RIGHT_LAST.classList.remove('disabled-button');
    let i = 0;
    arrWithCardsArr[pageNum - 1].forEach(card => {
      document.querySelector('[data-id="' + i + '"]').innerHTML = card.innerHTML;
      document.querySelector('[data-id="' + i + '"]').dataset.jsonOrder = card.dataset.jsonOrder;
      i++;
    });
  }
  
  if(PAGE.value == 1){
    LEFT.dataset.disabled = 'true';
    LEFT.classList.add('disabled-button');
    LEFT_LAST.dataset.disabled = 'true';
    LEFT_LAST.classList.add('disabled-button');
  }
}

function nextPage() {
  let countPages;
  countPages = 6;
  if(PAGE.value < countPages){
    PAGE.value++;
    const pageNum = PAGE.value;
    PAGE.innerText = PAGE.value;
    LEFT.dataset.disabled = 'false';
    LEFT.classList.remove('disabled-button');
    LEFT_LAST.dataset.disabled = 'false';
    LEFT_LAST.classList.remove('disabled-button');
    let i = 0;
    arrWithCardsArr[pageNum - 1].forEach(card => {
      document.querySelector('[data-id="' + i + '"]').innerHTML = card.innerHTML;
      document.querySelector('[data-id="' + i + '"]').dataset.jsonOrder = card.dataset.jsonOrder;
      i++;
    });
  }
  
  if(PAGE.value == countPages){
    RIGHT.dataset.disabled = 'true';
    RIGHT.classList.add('disabled-button');
    RIGHT_LAST.dataset.disabled = 'true';
    RIGHT_LAST.classList.add('disabled-button');
  }
}

function lastPage() {
  let countPages;
  countPages = 6;
  if(PAGE.value != countPages){
    PAGE.value = countPages;
    PAGE.innerText = PAGE.value;
    LEFT.dataset.disabled = 'false';
    LEFT.classList.remove('disabled-button');
    LEFT_LAST.dataset.disabled = 'false';
    LEFT_LAST.classList.remove('disabled-button');
    RIGHT.dataset.disabled = 'true';
    RIGHT.classList.add('disabled-button');
    RIGHT_LAST.dataset.disabled = 'true';
    RIGHT_LAST.classList.add('disabled-button');
    let i = 0;
    arrWithCardsArr[countPages - 1].forEach(card => {
      document.querySelector('[data-id="' + i + '"]').innerHTML = card.innerHTML;
      document.querySelector('[data-id="' + i + '"]').dataset.jsonOrder = card.dataset.jsonOrder;
      i++;
    });
  }
}