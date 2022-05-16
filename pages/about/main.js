
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