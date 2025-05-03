window.onload = () => {
    'use strict';
    if ('serviceWorker' in navigator) {
        // Return the promise from register
        window.serviceWorkerRegistrationPromise = navigator.serviceWorker.register('../sw.js')
            .then((registration) => {
                console.log('Service Worker registered successfully.');
                return registration; // Return the registration object
            })
            .catch((error) => {
                console.error('Service Worker registration failed:', error);
                throw error; // Propagate the error
            });
    } else {
        window.serviceWorkerRegistrationPromise = Promise.reject(new Error('Service Workers not supported'));
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