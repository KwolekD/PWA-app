// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: API_KEY,
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

    if (permission === "granted") {
        console.log("Notification permission granted.");

        try {
            // Explicitly get the service worker registration for sw.js
            // Make sure the path here matches how you registered it in main.js
            const registration = await navigator.serviceWorker.getRegistration('../sw.js');

            if (registration) {
                // Pass the serviceWorkerRegistration option to getToken
                const currentToken = await getToken(messaging, {
                    vapidKey: "BNNLHbEMjcfRP8yytSWjYTCHkI4NVixdA9hBUNVXtDzbtUFPyNfFJiwUovIIBAT60JFm3isWooIlzqm-Adllgko",
                    serviceWorkerRegistration: registration // <-- Pass the registration object here
                });

                if (currentToken) {
                    console.log("FCM Token:", currentToken);
                    // TODO: Send the token to your server
                } else {
                    console.log("No registration token available. Request permission to generate one.");
                }
            } else {
                console.error("Service worker registration not found for path '../sw.js'");
                console.log("No registration token available without service worker.");
            }


        } catch (err) {
            console.error("An error occurred while retrieving token or getting service worker registration.", err);
        }

    } else {
        console.log("Notification permission not granted.");
    }
}

// Call the async function to start the process
requestNotificationPermission();


// Handle messages, when the page is active (still needed)
onMessage(messaging, (payload) => {
    console.log("Wiadomość odebrana:", payload);
    alert("Nowa wiadomość: " + payload.notification.title);
});