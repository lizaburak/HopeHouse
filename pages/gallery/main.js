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

/*показать доп информацию*/


window.onload = function () {
    document.addEventListener('click' ,documentActions);

    function documentActions(e) {
        const targetElement  = e.target;
    
        if(targetElement.classList.contains('gallery_btn')){
            getPhotos(targetElement);
            e.preventDefault();
        }
    }

async function getPhotos(button) {
    if(!button.classList.contains('_hold')){
        button.classList.add('_hold');
        const serverUrl = 'https://hope-house-server.herokuapp.com/gallery';
        let response = await fetch(serverUrl, {
            method: "GET"
        });
        if(response.ok){
            let result = await response.json();
            loadProducts(result);
            button.classList.remove('_hold');
            button.remove();
        } else {
            alert("Ошибка");
        }
    }
}

function  loadProducts(data){
    const galleryList = document.querySelector('.gallery-list');

   data.forEach(item => {

    let photo = `
    <div class="gallery-list-item">
        <a href="#popup" class="popup-link">
            <img src="../../assets/img/${item.image}" alt="${item.alt}" class="gallery-img">
        </a>
    </div>
    `
    galleryList.insertAdjacentHTML('beforeend' , photo);   
   });
}
}

