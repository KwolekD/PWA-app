const cacheName = 'PWA app';
const filesToCache = [
    './',
    './index.html',
    './style.css',
    './js/main.js',
    './js/firebase.js',
    './about.html',
    './gallery.html',
];

self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('Service Worker: Caching files');
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request).then((fetchResponse) => {
                return caches.open(cacheName).then((cache) => {
                    // Aktualizuj cache tylko dla żądań GET
                    if (event.request.method === 'GET') {
                        cache.put(event.request, fetchResponse.clone());
                    }
                    return fetchResponse;
                });
            });
        }).catch(() => {
            // Fallback dla braku połączenia
            if (event.request.mode === 'navigate') {
                return caches.match('./index.html');
            }
        })
    );
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    const cacheWhitelist = [cacheName];

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (!cacheWhitelist.includes(cache)) {
                        console.log('Service Worker: Deleting old cache', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Firebase Messaging w Service Worker
// Używaj tego samego API co w głównej aplikacji (modułowe lub compat, ale nie mieszaj)
importScripts("https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js");

// Konfiguracja Firebase - taka sama jak w firebase.js
firebase.initializeApp({
    apiKey: "AIzaSyDxqNWEoaGWgoi8hgh8XupzG3Be9crsC9A",
    authDomain: "pwa-app-247d6.firebaseapp.com",
    projectId: "pwa-app-247d6",
    storageBucket: "pwa-app-247d6.firebasestorage.app",
    messagingSenderId: "917743617946",
    appId: "1:917743617946:web:dea610f5b264dabd505c23",
    measurementId: "G-7MJ7Z4XX2X"
});

const messaging = firebase.messaging();

// Nasłuchiwanie wiadomości w tle
messaging.onBackgroundMessage((payload) => {
    console.log("[firebase-messaging-sw.js] Otrzymano wiadomość w tle:", payload);

    // Utwórz powiadomienie
    const notificationTitle = payload.notification.title || "Nowe powiadomienie";
    const notificationOptions = {
        body: payload.notification.body || "",
        icon: "./images/favicon/favicon-96x96.png",
        // Dodaj więcej opcji powiadomień według potrzeb
        data: payload.data
    };

    // Pokaż powiadomienie
    return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Obsługa kliknięcia w powiadomienie
self.addEventListener('notificationclick', (event) => {
    console.log('Kliknięto powiadomienie:', event.notification);

    event.notification.close();

    // Opcjonalnie: otwórz stronę po kliknięciu w powiadomienie
    const urlToOpen = new URL('/', self.location.origin).href;

    event.waitUntil(
        clients.matchAll({
            type: 'window',
            includeUncontrolled: true
        })
            .then((clientList) => {
                for (const client of clientList) {
                    if (client.url === urlToOpen && 'focus' in client) {
                        return client.focus();
                    }
                }

                if (clients.openWindow) {
                    return clients.openWindow(urlToOpen);
                }
            })
    );
});