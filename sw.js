const cacheName = 'PWA app';
const filesToCache = [
    './',
    './index.html',
    './style.css',
    './js/main.js',
    './about.html',
    './gallery.html',
];
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll(filesToCache);
        })
    );
});
// self.addEventListener('fetch', (event) => {
//     event.respondWith(
//         caches.match(event.request).then((response) => {
//             return response || fetch(event.request).then((fetchResponse) => {
//                 if (event.request.method === 'GET') {
//                     return caches.open(cacheName).then((cache) => {
//                         cache.put(event.request, fetchResponse.clone());
//                         return fetchResponse;
//                     });
//                 }
//                 return fetchResponse;
//             });
//         }).catch(() => {
//             if (event.request.mode === 'navigate') {
//                 return caches.match('/index.html');
//             }
//         })
//     );
// });

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request).then((fetchResponse) => {
                return caches.open(cacheName).then((cache) => {
                    cache.put(event.request, fetchResponse.clone());
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
    const cacheWhitelist = [cacheName];

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (!cacheWhitelist.includes(cache)) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

importScripts("https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js");

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

messaging.onBackgroundMessage((payload) => {
    console.log("[firebase-messaging-sw.js] Received background message", payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: "./images/favicon/favicon-96x96.png"
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
