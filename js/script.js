const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const closeBtn = document.querySelector('.close-btn');

hamburger.addEventListener('click', () => {
    if (mobileMenu.classList.contains('active')) {
        mobileMenu.style.display = 'none';
        mobileMenu.classList.remove('active');
        hamburger.style.position = 'absolute';
    } else {
        mobileMenu.classList.add('active');
        mobileMenu.style.display = 'flex';
        hamburger.style.position = 'fixed';
    }
});


// Zamknięcie po kliknięciu w link
// document.querySelectorAll('.mobile-menu a').forEach(link => {
//     link.addEventListener('click', () => {
//         mobileMenu.classList.remove('active');
//     });
// });
