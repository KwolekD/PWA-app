// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDnzudufBGmwLRJ9Ne7UJmsKfxkZ-xs1L4",
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

Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
        console.log("Notification permission granted.");

        getToken(messaging, { vapidKey: "BNNLHbEMjcfRP8yytSWjYTCHkI4NVixdA9hBUNVXtDzbtUFPyNfFJiwUovIIBAT60JFm3isWooIlzqm-Adllgko" }).then((currentToken) => {
            if (currentToken) {
                console.log("FCM Token:", currentToken);
            }
        });
    }
});

// Obsługa wiadomości, gdy strona jest aktywna
onMessage(messaging, (payload) => {
    console.log("Wiadomość odebrana:", payload);
    alert("Nowa wiadomość: " + payload.notification.title);
});