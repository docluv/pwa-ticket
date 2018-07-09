'use strict';

self.importScripts("js/libs/2ae25530a0dd28f30ca44f5182f0de61.min.js",
    "js/app/libs/e392a867bee507b90b366637460259aa.min.js",
    "sw/response-mgr.js",
    "sw/sw-push-manager.js",
    "sw/invalidation-mgr.js",
    "sw/date-mgr.js"
);

const version = "1.10",
    preCache = "PRECACHE-" + version,
    dynamicCache = "DYNAMIC-" + version,
    eventsCacheName = "events-cache-" + version,
    qrCodesCacheName = "qr-codes-cache-" + version,
    cacheList = [
        "/",
        "img/pwa-tickets-logo-320x155.png",
        "js/app/512df4f42ca96bc22908ff3a84431452.min.js",
        "js/libs/ca901f49ff220b077f4252d2f1140c68.min.js",
        "js/app/libs/e392a867bee507b90b366637460259aa.min.js",
        "js/app/libs/8fd5a965abed65cd11ef13e6a3408641.min.js",
        "js/app/pages/5b4d14af61fc40df7d6bd62f3e2a86a4.min.js",
        "js/app/pages/8684e75675485e7af7aab5ca10cc8da5.min.js",
        "js/app/pages/88ea734e66b98120a5b835a5dfdf8f6c.min.js",
        "js/app/pages/518f8db8a1fa1813bf9256c18caeb6d3.min.js",
        "js/app/pages/ebb36cf208e8a8110dc904b28c8a2bf0.min.js",
        "js/app/pages/bc8ffbb70c5786945962ce782fae415c.min.js",
        "js/app/pages/de0777d1bf65a3df5578b791ff660949.min.js",
        "js/app/pages/631d1c493937f2fc4beb02737dfcd50d.min.js",
        "js/app/pages/423f14f5fae95d3345c30c6469533243.min.js",
        "js/app/pages/92ee49a4e74c414495cd9e36269608f6.min.js",
        "js/libs/2ae25530a0dd28f30ca44f5182f0de61.min.js",
        "js/libs/aa0a8a25292f1dc72b1bee3bd358d477.min.js",
        "js/libs/470bb9da4a68c224d0034b1792dcbd77.min.js",
        "html/app-shell.html",
        "templates/cart.html",
        "templates/event-list.html",
        "templates/ticket-list.html",
        "templates/user.html",
        "templates/ticket.html",
        "templates/event.html",
        "templates/profile.html",
        "ticket/",
        "tickets/",
        "signup/",
        "profile/",
        "notfound/",
        "login/",
        "events/",
        "event/",
        "contact/",
        "config/",
        "cart/"
    ],
    apiHost = "http://localhost:15501/",
    responseManager = new ResponseManager(),
    pushManager = new PushManager(),
    invalidationManager = new InvalidationManager([{
            "cacheName": preCache,
            "invalidationStrategy": "ttl",
            "strategyOptions": {
                "ttl": 100
                //604800 //1 week
            }
        },
        {
            "cacheName": qrCodesCacheName,
            "invalidationStrategy": "maxItems",
            "strategyOptions": {
                "max": 10
            }
        }
    ]),
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


function getCacheName(url) {

    var cacheName = dynamicCache;

    if (/\/event\//.test(url)) {

        cacheName = eventsCacheName;

    }

    return cacheName;

}

self.addEventListener("install", event => {

    self.skipWaiting();

    caches.open(preCache)
        .then(cache => {

            return cache.addAll(cacheList);

        });

});

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(cacheNames => {
            cacheNames.forEach(value => {

                if (value.indexOf(version) < 0) {
                    caches.delete(value);
                }

            });

            console.log("service worker activated");

            return;

        })

    );

});

self.addEventListener("fetch", event => {

    event.respondWith(

        handleResponse(event)

    );

});

function handleResponse(event) {

    let cacheName = getCacheName(event.request.url);

    let rule = testRequestRule(event.request.url, routeRules);

    rule = rule || {};

    switch (rule.strategy) {

        case "cacheFallingBackToNetwork":

            return responseManager.cacheFallingBackToNetworkCache(event.request, cacheName);

        case "fetchAndRenderResponseCache":

            return responseManager.fetchAndRenderResponseCache({
                    request: event.request,
                    pageURL: rule.options.pageURL,
                    template: rule.options.template,
                    api: rule.options.api,
                    cacheName: cacheName
                })
                .then(response => {

                    invalidationManager.cacheCleanUp(cacheName);

                    return response;

                });

        case "cacheOnly":

            return responseManager.cacheOnly(event.request, cacheName)
                .then(response => {

                    invalidationManager.cacheCleanUp(cacheName);

                    return response;

                });

        case "networkOnly":

            return responseManager.networkOnly(event.request);

        case "cacheFallingBackToNetworkCache":
        default:

            return responseManager.cacheFallingBackToNetworkCache(event.request, cacheName)
                .then(response => {

                    invalidationManager.cacheCleanUp(cacheName);

                    return response;

                });

    }

}


//Push Stuff
self.addEventListener("pushsubscriptionchange", event => {

    console.log("subscription change ", event);

});

function testRequestRule(url, rules) {

    for (let i = 0; i < rules.length - 1; i++) {

        if (rules[i].route.test(url)) {
            return rules[i];
        }

    }

}


function getParameterByName(name, url) {

    name = name.replace(/[\[\]]/g, "\\$&");

    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);

    if (!results) {
        return null;
    }

    if (!results[2]) {
        return '';
    }

    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getEventTemplate() {

    return fetch("templates/event.html")
        .then(response => {

            if (response.ok) {

                return response.text()
                    .then(html => {

                        return html;

                    });
            }

        });

}

function getEvent(id) {

    return fetch(apiHost + "futureEvents/" + id)
        .then(function (response) {

            if (response.ok) {

                return response.json();

            } else {

                throw "event " + id + " fetch failed";
            }

        });

}

function renderEvent(event) {

    let id = getParameterByName(event.request.url, "id"),
        appShell = "",
        eventTemplate = "";

    return getAppShell()
        .then(html => {

            appShell = html;

        })
        .then(() => {

            return getEventTemplate()
                .then(html => {

                    eventTemplate = html;

                });

        }).then(() => {

            let eventShell = appShell.replace("<%template%>", eventTemplate);

            return getEvent(id)
                .then((eventObj) => {

                    let sessionPage = Mustache.render(eventShell, session);

                    //make custom response
                    let response = new Response(sessionPage, {
                            headers: {
                                'content-type': 'text/html'
                            }
                        }),
                        copy = response.clone();

                    caches.open(dynamicCache)
                        .then(cache => {
                            cache.put(event.request, copy);
                        });

                    return response;

                });

        });

};

function isAPIRequest(url) {

    return url.indexOf(apiHost) != -1;

}