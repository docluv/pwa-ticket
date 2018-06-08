'use strict';

self.importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js",
    "js/libs/2ae25530a0dd28f30ca44f5182f0de61.min.js",
    "js/app/libs/e392a867bee507b90b366637460259aa.min.js",
    "sw/sw-push-manager.js"
);


const version = "1.08",
    preCache = "PRECACHE-" + version,
    dynamicCache = "DYNAMIC-" + version,
    eventsCacheName = "events-cache-" + version,
    qrCodesCacheName = "qr-codes-cache-" + version,
    apiHost = "http://localhost:15501/",
    routeRules = [{
            "route": /event\/\?/,
            "strategy": "fetchAndRenderResponseCache",
            "options": {
                pageURL: "templates/event-page.html",
                template: "templates/event.html",
                api: function (request) {
                    return pwaTicketAPI.getEvent(getParameterByName("id", request.url));
                },
                cacheName: eventsCacheName
            },
            "cacheName": eventsCacheName
        },
        {
            "route": /qrcodes/,
            "strategy": "cacheFallingBackToNetworkCache",
            "cacheName": qrCodesCacheName
        }
    ];


workbox.setConfig({
    debug: true
});

workbox.skipWaiting();
workbox.clientsClaim();

workbox.precaching.precacheAndRoute([]);

// ,
// {
//    directoryIndex: null,
//     ignoreUrlParametersMatching: /.^utm/
//   }


function getCacheName(url) {

    var cacheName = dynamicCache;

    if (/\/event\//.test(url)) {

        cacheName = eventsCacheName;

    }

    return cacheName;

}


if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);
} else {
    console.log(`Boo! Workbox didn't load 😬`);
}


workbox.routing.setDefaultHandler(workbox.strategies.cacheFirst());

workbox.routing.registerRoute(
    new RegExp('/event/'),
    workbox.strategies.cacheFirst({
        cacheName: 'events',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 40,
                maxAgeSeconds: 60 * 60, // 1 Hour
            })
        ]
    })
);

workbox.routing.registerRoute(
    /img\/venues\/\S+/,
    workbox.strategies.cacheFirst({
        cacheName: 'venues',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 20,
                maxAgeSeconds: 10 * 24 * 60 * 60, // 10 Days
            })
        ]
    })
);