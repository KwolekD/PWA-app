window.serviceWorkerReady = new Promise((resolve) => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js', { scope: './' })
            .then(registration => {
                console.log('SW zarejestrowany:', registration);
                resolve(registration);
            })
            .catch(err => {
                console.error('Błąd rejestracji SW:', err);
                resolve(null); // Nie przerywaj łańcucha
            });
    } else {
        resolve(null);
    }
});



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