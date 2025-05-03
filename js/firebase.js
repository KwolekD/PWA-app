// firebase.js - poprawiona wersja
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging.js";

// Konfiguracja Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDxqNWEoaGWgoi8hgh8XupzG3Be9crsC9A",
    authDomain: "pwa-app-247d6.firebaseapp.com",
    projectId: "pwa-app-247d6",
    storageBucket: "pwa-app-247d6.firebasestorage.app",
    messagingSenderId: "917743617946",
    appId: "1:917743617946:web:dea610f5b264dabd505c23",
    measurementId: "G-7MJ7Z4XX2X"
};

// Inicjalizacja Firebase (tylko raz)
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);


const VAPID_KEY = "BNNLHbEMjcfRP8yytSWjYTCHkI4NVixdA9hBUNVXtDzbtUFPyNfFJiwUovIIBAT60JFm3isWooIlzqm-Adllgko";

// Funkcja do żądania uprawnień powiadomień i rejestracji tokena FCM
export async function requestNotificationPermission() {
    try {
        console.log("Prośba o uprawnienia powiadomień...");
        const permission = await Notification.requestPermission();

        if (permission !== "granted") {
            console.log("Uprawnienia do powiadomień odrzucone");
            return null;
        }

        console.log("Uprawnienia do powiadomień przyznane");

        // Czekaj na rejestrację Service Workera
        const swRegistration = await navigator.serviceWorker.ready;
        console.log("Service Worker gotowy:", swRegistration);

        // Pobierz token FCM
        try {
            const currentToken = await getToken(messaging, {
                vapidKey: VAPID_KEY,
                serviceWorkerRegistration: swRegistration
            });

            if (currentToken) {
                console.log("Token FCM:", currentToken);
                return currentToken;
            } else {
                console.log("Nie można uzyskać tokena");
                return null;
            }
        } catch (fcmError) {
            console.error("Błąd pobierania tokena FCM:", fcmError);
            return null;
        }
    } catch (error) {
        console.error("Błąd przy żądaniu uprawnień:", error);
        return null;
    }
}

// Nasłuchiwanie wiadomości w foreground
export function setupMessagingForeground() {
    onMessage(messaging, (payload) => {
        console.log("Otrzymano wiadomość w aplikacji:", payload);

        // Wyświetl powiadomienie
        if (payload.notification) {
            const notificationTitle = payload.notification.title || "Nowe powiadomienie";
            const notificationOptions = {
                body: payload.notification.body || "",
                icon: "./images/favicon/favicon-96x96.png"
            };

            // Wyświetl powiadomienie
            new Notification(notificationTitle, notificationOptions);
        }
    });
}

// Inicjalizacja po załadowaniu strony
document.addEventListener("DOMContentLoaded", async () => {
    if ('serviceWorker' in navigator) {
        try {
            // Poczekaj na zarejestrowanie service workera
            await window.serviceWorkerReady;

            // Poproś o uprawnienia i zarejestruj token
            await requestNotificationPermission();

            // Ustaw obsługę wiadomości w foreground
            setupMessagingForeground();
        } catch (error) {
            console.error("Błąd inicjalizacji Firebase Messaging:", error);
        }
    } else {
        console.warn("Service Worker nie jest wspierany w tej przeglądarce");
    }
});
