'use strict';

self.importScripts("js/libs/localforage.min.js",
    "js/libs/mustache.min.js",
    "js/app/libs/api.js", "sw/response-mgr.js", "sw/push-mgr.js",
    "sw/invalidation-mgr.js", "sw/date-mgr.js"
);

const version = "1.04",
    preCache = "PRECACHE-" + version,
    dynamicCache = "DYNAMIC-" + version,
    eventsCacheName = "events-cache-" + version,
    cacheList = [
        "/",
        "img/pwa-tickets-logo-320x155.png",
        "js/app/app.js",
        "js/app/pages/events.js",
        "js/libs/localforage.min.js",
        "js/libs/mustache.min.js",
        "js/libs/utils.js",
        "css/libs/bootstrap.min.css",
        "css/app/site.css",
        "html/app-shell.html",
        "templates/event-list.html",
        "templates/ticket-list.html",
        "templates/user.html",
        "templates/ticket.html",
        "templates/event.html",
        "templates/profile.html"
    ];

/*  Service Worker Event Handlers */

function getCacheName(url) {

    var cacheName = dynamicCache;
  
    if (/\/event\//.test(url)) {
  
      cacheName = eventsCacheName;
  
    }
  
    return cacheName;
  
  }
  

self.addEventListener("install", event => {

    self.skipWaiting();

    console.log("Installing the service worker!");

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

    let cacheName = getCacheName(event.request.url);

    event.respondWith(
        caches.match(event.request)
        .then(function (response) {

            if (response) {
                return response;
            }

            return fetch(event.request)
                .then(response => {

                    if (response.ok || response.status === 0) {

                        //I have no clue why the chrome extensions requests are passed through the SW
                        //but I don't like the error messages in the console ;)
                        if (event.request.url.indexOf("chrome-extension") === -1) {

                            let copy = response.clone();

                            //if it was not in the cache it must be added to the dynamic cache
                            caches.open(dynamicCache)
                                .then(cache => {
                                    cache.put(event.request, copy);
                                });

                        }

                        return response;

                    }

                }).catch(err => {

                    if (err.message === "Failed to fetch") {

                        if (event.request.url.indexOf("session") > -1) {

                            return renderSession(event);

                        }

                    }

                });
        })
    );

});

function getAppShell() {

    return fetch("html/app-shell.html")
        .then(response => {

            if (response.ok) {

                return response.text()
                    .then(html => {

                        return html;

                    });
            }

        });

}


function getSlug(url) {

    let slug = url.split("\/"),
        index = slug.length - 1;

    if (slug[index] === "") {

        index--;

    }

    return slug[index];

}
