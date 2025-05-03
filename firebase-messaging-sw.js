importScripts("https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging.js");

firebase.initializeApp({
    apiKey: "AIzaSyDnzudufBGmwLRJ9Ne7UJmsKfxkZ-xs1L4",
    authDomain: "pwa-app-247d6.firebaseapp.com",
    projectId: "pwa-app-247d6",
    storageBucket: "pwa-app-247d6.firebasestorage.app",
    messagingSenderId: "917743617946",
    appId: "1:917743617946:web:dea610f5b264dabd505c23",
    measurementId: "G-7MJ7Z4XX2X"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log("[firebase-messaging-sw.js] Received background message", payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: "/images/favicon/favicon-96x96.png"
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
