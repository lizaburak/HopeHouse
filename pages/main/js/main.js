/*Slider*/

$(document).ready(function(){
	$('.pets-cards').slick({
        arrows:true,
		    dots:true,
        slidesToShow:3,
        autoplay:true,
		speed:1000,
		autoplaySpeed:2000
    });
});

/*Карта для секции contacts*/

mapboxgl.accessToken = 'pk.eyJ1IjoiYnVyYWtlIiwiYSI6ImNsMTZzYzV0YTE5bTkzYm10MXR0NW8wODAifQ.wyFRWqsKDdOIX8FuTGTu-Q';

let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v9',
    zoom: 14,
    center: [ 27.604839205741882,
        53.936893048590285],
});

let  nav = new mapboxgl.NavigationControl({
    showCompass: true,
    showZoom: true
})

map.addControl(nav,'top-right');

const markerMain = new mapboxgl.Marker({
    color: "#000000",
    draggable: true
    }).setLngLat([ 27.604839205741882,
        53.936893048590285])
    .addTo(map); 

const marker1 = new mapboxgl.Marker({
     color: "#757575",
    draggable: true
     }).setLngLat([27.600510120391846,
           53.9397208557626])
     .addTo(map);   

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

/* попап*/

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');
const popupContent = document.querySelector('.popup_content');

let unlock = true;

const timeout = 400;

if(popupLinks.length > 0){
    for (let i = 0; i < popupLinks.length; i++){
        const popupLink = popupLinks[i];
        popupLink.addEventListener('click' , function(e){
            const popupName = popupLink.getAttribute('href').replace('#' , '');
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();
        })
    }
}


const popupCloseIcon = document.querySelectorAll('.close-popup');
if(popupCloseIcon.length > 0){
    for (let i = 0; i<popupCloseIcon.length; i++){
        const el = popupCloseIcon[i];
        el.addEventListener('click' , function(e){
            popupClose(el.closest('.popup'));
        })
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



const ticketFormBtn = document.querySelector('.donation_btn');
const form = document.querySelector('.donation-form');
const message = document.querySelector('.message');


// Valid Name
const nameForm = form.querySelector('#name');
nameForm.addEventListener('change', validName);
function validName() {
  let regExr = /^[а-яА-ЯёЁa-zA-Z ]{3,15}$/;
  let valid = regExr.test(nameForm.value);
  if (!valid) {
    message.innerHTML = 'Неверный формат имени! Пожалуйста, используйте буквы латиницы или кириллицы';
    message.style.display = 'block';
    nameForm.style.borderColor = 'red';
  } else {
    message.style.display = 'none';
    nameForm.style.borderColor = '#030303';
  }
  return valid;
}  

// Valid Email

const emailForm = form.querySelector('#email');
emailForm.addEventListener('change', validEmail);
function validEmail() {
  let regExr = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  let valid = regExr.test(emailForm.value);
  if (!valid) {
    message.innerHTML = 'Электронная почта введена в неправильном формате!';
    message.style.display = 'block';
    emailForm.style.borderColor = 'red';
  } else {
    message.style.display = 'none';
    emailForm.style.borderColor = '#030303';
  }
  return valid;
}  

// Valid Phone

const phoneForm = form.querySelector('#phone');
phoneForm.addEventListener('change', validPhone);
function validPhone() {
  let regExr = '^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$ ';
  let valid = regExr.test(phoneForm.value);
  let numberOfDigits = phoneForm.value.replaceAll(/[\D]/g, "").length;
  if (numberOfDigits > 10) valid = false;
  if (!valid) {
    message.innerHTML = 'Номер телефона введен в неправильном формате!';
    message.style.display = 'block';
    phoneForm.style.borderColor = 'red';
  } else {
    message.style.display = 'none';
    phoneForm.style.borderColor = '#030303';
  }
  return valid;
}  

// Valid cardholder-name
const  cardholderName = form.querySelector('#cardholder-name');
cardholderName.addEventListener('change', validCardholderName);
function validCardholderName() {
  let regExr = /^[а-яА-ЯёЁa-zA-Z ]{3,15}$/;
  let valid = regExr.test(cardholderName.value);
  if (!valid) {
    message.innerHTML = 'Неверный формат имени держателя карты! Пожалуйста, используйте буквы латиницы или кириллицы';
    message.style.display = 'block';
    cardholderName.style.borderColor = 'red';
  } else {
    message.style.display = 'none';
    cardholderName.style.borderColor = '#030303';
  }
  return valid;
}  


// Valid card-number
const  cardNumber = form.querySelector('#card-number');
cardNumber.addEventListener('change', validCardNumber);
function validCardNumber() {
  let regExr =   /^(?:4[0-9]{12}(?:[0-9]{3,6})?|5[1-5][0-9]{14}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12,15}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11}|6[27][0-9]{14})$/;
  let valid = regExr.test(cardNumber.value);
  if (!valid) {
    message.innerHTML = 'Номер карты введен в неправильном формате!';
    message.style.display = 'block';
    cardNumber.style.borderColor = 'red';
  } else {
    message.style.display = 'none';
    cardNumber.style.borderColor = '#030303';
  }
  return valid;
}  

const donationAmount = form.querySelector('#donationNumber'),
      expirationMonth = form.querySelector('#expiration-month'),
      expirationYear = form.querySelector('#expiration-year'),
      cvcCvv = form.querySelector('#cvcCvv');

const formBtn = form.querySelector('#submit');


function closeFormPopup(){
  message.style.color = "#000"
  message.innerHTML = 'Спасибо за помощь нашему приюту!';
  message.style.display = 'block';
  form.reset();
  setTimeout(function () {
    message.style.display = 'none';
}, 1800);
}

form.addEventListener('submit', async function (event) {
    event.preventDefault();
    console.log(event);
    const serverUrl = 'https://hope-house-server.herokuapp.com/payment'
    let response = await fetch(serverUrl, {
      method: "POST",
      body: JSON.stringify({name: nameForm.value, 
                            email: emailForm.value, 
                            phone: phoneForm.value, 
                            donationAmount: donationAmount.value,
                            cardNumber: cardNumber.value,
                            expirationMonth: expirationMonth.value,
                            expirationYear: expirationYear.value,
                            cardholderName:  cardholderName.value,
                            cvcCvv: cvcCvv.value}),      
        headers: {
        'Content-Type': 'application/json'
      },
    });
    closeFormPopup();
    if(response.ok){
        let result = await response.json();
    } else {
        alert("Ошибка");
    }
})
