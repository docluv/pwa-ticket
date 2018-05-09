'use strict';

self.importScripts("js/libs/localforage.min.js",
    "js/app/libs/api.js",
    "sw/response-mgr.js",
    "sw/push-mgr.js",
    "sw/invalidation-mgr.js",
    "sw/date-mgr.js"
);

const version = "1.08",
    preCache = "PRECACHE-" + version,
    dynamicCache = "DYNAMIC-" + version,
    eventsCacheName = "events-cache-" + version,
    qrCodesCacheName = "qr-codes-cache-" + version,
    cacheList = [
        "/",
        "img/pwa-tickets-logo-320x155.png",
        "js/app/app.js",
        "js/app/libs/lazy.images.js",
        "js/app/libs/api.js",
        "js/app/libs/push-mgr.js",
        "js/app/pages/cart.js",
        "js/app/pages/config.js",
        "js/app/pages/contact.js",
        "js/app/pages/event.js",
        "js/app/pages/events.js",
        "js/app/pages/home.js",
        "js/app/pages/login.js",
        "js/app/pages/profile.js",
        "js/app/pages/ticket.js",
        "js/app/pages/tickets.js",
        "js/libs/localforage.min.js",
        "js/libs/mustache.min.js",
        "js/libs/utils.js",
        "css/libs/bootstrap.min.css",
        "css/app/site.css",
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

        break;

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

            break;

        case "cacheOnly":

            return responseManager.cacheOnly(event.request, cacheName)
                .then(response => {

                    invalidationManager.cacheCleanUp(cacheName);

                    return response;

                });

            break;

        case "networkOnly":

            return responseManager.networkOnly(event.request);

            break;

    case "cacheFallingBackToNetworkCache":
    default:

        return responseManager.cacheFallingBackToNetworkCache(event.request, cacheName)
            .then(response => {

                invalidationManager.cacheCleanUp(cacheName);

                return response;

            });

        break;
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