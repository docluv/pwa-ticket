'use strict';

self.importScripts("js/libs/mustache.min.js");


class ResponseManager {

    isResponseCacheable(response) {

        //only cache good responses
        //200 - Good :)
        // 0  - Good, but CORS. 
        //This is for Cross Origin opaque requests

        return [0, 200].includes(response.status);

    }

    isResponseNotFound(response) {

        return response.status === 404;

    }

    fetchText(url) {

        return fetch(url)
            .then(response => {

                if (response.ok) {

                    return response.text();

                }

            });

    }

    fetchJSON(url) {

        return fetch(url)
            .then(response => {

                if (response.ok) {

                    return response.json();

                }

            });

    }

    /*
        This will fetch an app shell, page and data template
        It then uses Mustache to render everything together
    */
    fetchAndRenderResponseCache(options) {

        //fetch appShell
        //fetch template
        //fetch data from API
        //render page HTML

        // let appShell,
        //     template,
        //     json;

        return fetchText(options.pageURL)
            .then(pageHTML => {

                return fetchText(options.template)
                    .then(template => {

                        return pageHTML.replace(/<%template%>/g, template);

                    });

            })
            .then(pageTemplate => {

                return fetchJSON(options.dataUrl)
                    .then(data => {

                        return Mustache.render(pageTemplate, data);

                    });

            }).then(html => {

                //make custom response
                let response = new Response(html, {
                        headers: {
                            'content-type': 'text/html'
                        }
                    }),
                    copy = response.clone();

                caches.open(options.cacheName)
                    .then(cache => {
                        cache.put(options.request, copy);
                    });

                return response;

            });

    }

    cacheFallingBackToNetworkWithRender(options) {

        var responseManager = this;

        return caches.match(options.request)
            .then(response => {

                return response || responseManager.networkOnly(options.request)
                    .then(response => {

                        let rsp = response.clone();

                        //don't cache a 404 because the URL may become 200, etc
                        //chrome-extension requests can't be cached
                        //0 & 200 are good responses that can be cached
                        if (responseManager.isResponseNotFound(rsp) ||
                            request.url.indexOf("chrome-extension") > -1 ||
                            !responseManager.isResponseCacheable(rsp)) {

                            //return response;
                            return caches.match(responseManager.getFallback(request.url));

                        }


                    });

            });

    }

    cacheFallingBackToNetwork(request, cacheName) {

        var responseManager = this;

        return caches.match(request)
            .then(response => {

                return response || fetch(request);

            });
    }

    cacheFallingBackToNetworkCache(request, cacheName) {

        var responseManager = this;

        return responseManager.cacheFallingBackToNetwork(request, cacheName)
            .then(response => {

                var rsp = response.clone();

                //don't cache a 404 because the URL may become 200, etc
                //chrome-extension requests can't be cached
                //0 & 200 are good responses that can be cached
                if (!responseManager.isResponseNotFound(rsp) &&
                    request.url.indexOf("chrome-extension") === -1 &&
                    responseManager.isResponseCacheable(rsp)) {

                    //cache response for the next time around
                    return caches.open(cacheName).then(function (cache) {

                        cache.put(request, rsp);

                        return response;

                    });

                }

            });

    }

    cacheOnly(request, cacheName) {

        return caches.match(request);

    }

    networkOnly(request) {

        return fetch(request);

    }

    matchRoute(path, url) {

        var re = new RegExp(path);

        return re.test(url);

    }

    returnFallback(request) {

        var that = this;

        that.fallbacks.forEach(function (value) {

            value.routes.forEach(function (route) {

                console.log("fallback match ", that.matchRoute(route, request.url),
                    "for : ", request.url);

            });

        });

    }

    getFallback(url) {

        if (/\.jpg|\.gif|\.png/.test(url)) {

            return "images/offline-product.jpg";

        } else if (!/\.css|\.js|\.woff|\.svg|\.eot/.test(url)) {
            //should leave us with HTML

            return "fallback/";

        }

    }

}