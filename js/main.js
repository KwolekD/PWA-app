window.onload = () => {
    'use strict';
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('../sw.js')
            .then(() => console.log('Service Worker registered successfully.'))
            .catch((error) => console.error('Service Worker registration failed:', error));
    }
};


// document.addEventListener('DOMContentLoaded', () => {
//     const hamburger = document.createElement('div');
//     hamburger.className = 'hamburger';
//     hamburger.innerHTML = `
//         <div class="line"></div>
//         <div class="line"></div>
//         <div class="line"></div>
//     `;

//     const container = document.querySelector('nav .container');
//     container.appendChild(hamburger);

//     const navLinks = document.querySelector('.nav-links');

//     hamburger.addEventListener('click', () => {
//         hamburger.classList.toggle('active');
//         navLinks.classList.toggle('active');
//     });
// });