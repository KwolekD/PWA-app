// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDxqNWEoaGWgoi8hgh8XupzG3Be9crsC9A",
    authDomain: "pwa-app-247d6.firebaseapp.com",
    projectId: "pwa-app-247d6",
    storageBucket: "pwa-app-247d6.firebasestorage.app",
    messagingSenderId: "917743617946",
    appId: "1:917743617946:web:dea610f5b264dabd505c23",
    measurementId: "G-7MJ7Z4XX2X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);


// Wait for the service worker to register and then tell messaging to use it
async function requestNotificationPermission() {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") return;

    const registration = await window.serviceWorkerReady;

    if (!registration) {
        console.error("Service Worker nie zarejestrowany");
        return;
    }

    try {
        const messaging = getMessaging();
        const token = await getToken(messaging, {
            vapidKey: "BNNLHbEMj...",
            serviceWorkerRegistration: registration
        });
        console.log("FCM Token:", token);
    } catch (err) {
        console.error("Błąd FCM:", err);
    }
}

// Inicjalizacja Firebase PO rejestracji SW
window.serviceWorkerReady.then(() => {
    const app = initializeApp(firebaseConfig);
    window.messaging = getMessaging(app);
});
