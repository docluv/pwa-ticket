importScripts("../js/libs/mustache.min.js");


class ResponseManager {

    constructor(dynamicCaches, fallbacks = 
        [{
            "fallback": "images/offline-product.jpg",
            "routes": [
                "img\/thumbnails\/\S+",
                "img\/originals\/\S+",
                "img\/display\/\S+",
                "img\/mobile\/\S+"
            ]
        },
        {
            "fallback": "fallback.html",
            "routes": [
                "\/$",
                "product\/\S+"
            ]
        }
    ]) {

        this.dynamicCaches = dynamicCaches;
        this.fallbacks = fallbacks;

    }

    isResponseCacheable(response) {

        //only cache good responses
        //200 - Good :)
        // 0  - Good, but CORS. There is nothing I could find official about this, but Chrome returns this for CORS responses that are 200.
        return [0, 200].includes(response.status);

    }

    isResponseNotFound(response) {

        return response.status === 404;

    }

    getFallback(url) {

        if (/\.jpg|\.gif|\.png/.test(url)) {

            return "images/offline-product.jpg";

        } else if (!/\.css|\.js|\.woff|\.svg|\.eot/.test(url)) {
            //should leave us with HTML

            return "fallback/";

        }

    }

    cacheFallingBackToNetwork(request, cacheName) {

        var responseManager = this;

        return caches.match(request)
            .then(function (response) {

                return (
                    response || fetch(request)
                    .then(function (response) {

                        var rsp = response.clone();

                        //don't cache a 404 because the URL may become 200, etc
                        //chrome-extension requests can't be cached
                        //0 & 200 are good responses that can be cached
                        if (responseManager.isResponseNotFound(rsp) ||
                            request.url.indexOf("chrome-extension") > -1 ||
                            !responseManager.isResponseCacheable(rsp)) {

                            console.log(rsp.status + " " + request.url);

                            //return response;
                            return caches.match(responseManager
                                .getFallback(request.url));

                        }

                        //cache response for the next time around
                        return caches.open(cacheName).then(function (cache) {

                            console.log("caching : ", request.url);

                            cache.put(request, rsp);

                            return response;

                        });

                    })
                    .catch(function (err) {

                        console.error("error fetching: ", request.url);

                        //                            responseManager.returnFallback(request);

                        return caches.match(responseManager.getFallback(request.url));

                        // if(err.request){
                        //   console.error(" url: " + err.request.url);
                        // }
                    })

                );

            })

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

}