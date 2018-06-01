"use strict";

const lighthouse = require('lighthouse'),
    fs = require("fs"),
    path = require("path"),
    url = require('url'),
    utf8 = 'utf-8',
    chromeLauncher = require('chrome-launcher');

function launchChromeAndRunLighthouse(url, flags, config = null) {

    return chromeLauncher.launch({
        chromeFlags: flags.chromeFlags
    }).then(chrome => {

        flags.port = chrome.port;

        return lighthouse(url, flags, config).then(results => {
            // The gathered artifacts are typically removed as they can be quite large (~50MB+)
            delete results.artifacts;
            return chrome.kill().then(() => results);
        });

    });

}


launchChromeAndRunLighthouse(myURL, {output: json}).then(results => {
    // Use results!

    fs.writeFileSync(path.join(url.pathname, "-audit.json"), JSON.stringify(results), utf8);

});



/*
 * promiseSerial resolves Promises sequentially.
 * @example
 * const urls = ['/url1', '/url2', '/url3']
 * const funcs = urls.map(url => () => $.ajax(url))
 *
 * promiseSerial(funcs)
 *   .then(console.log)
 *   .catch(console.error)
 */
const promiseSerial = funcs =>
    funcs.reduce((promise, func) =>
        promise.then(result => func().then(Array.prototype.concat.bind(result))),
        Promise.resolve([]));


// execute Promises in serial
promiseSerial(funcs)
    .then(console.log.bind(console))
    .catch(console.error.bind(console));

module.exports = {

    audit: function (urls) {

        if (!Array.isArray(urls)) {

            if (typeof urls !== "string") {

                throw "not a valie URL";
            }

            urls = [urls];

        }

        // convert each url to a function that returns a promise
        const funcs = urls.map(url => () => launchChromeAndRunLighthouse(url, {}));

    }

}