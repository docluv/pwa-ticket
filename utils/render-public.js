var utils = require("./utils"),
    uglify = require("./uglify").uglify,
    path = require("path"),
    glob = require("glob"),
    fs = require("fs"),
    template = require("mustache"),
    cheerio = require("cheerio"),
    uncss = require('uncss'),
    CleanCSS = require('clean-css'),
    templates = "", //contact templates to this string
    publicPath = "../www/public/",
    scriptsObjs = [],
    scripts = ["js/app/app.js",
        "js/app/libs/api.js",
        "js/app/libs/push-mgr.js",
        "js/libs/lazy.images.js",
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
        "js/libs/utils.js"
    ],
    utf8 = 'utf-8',
    appShell = "",
    polyfils = "",
    pageJSON = {};

function loadAppShell() {

    appShell = fs.readFileSync(path.resolve(publicPath, "html/app-shell.html"), utf8);
    pageJSON = utils.readJSON("page.json");
    polyfils = fs.readFileSync(path.resolve(publicPath, "html/polyfils.html"), utf8);

    loadTemplates();
}

function loadTemplates() {

    let templatePath = path.resolve(publicPath + "templates/");

    fs.readdirSync(templatePath).forEach(file => {

        if (file !== "event-page.html") {

            templates += fs.readFileSync(path.resolve(templatePath, file), utf8);

        }

    });

}

function extractCSS($, callback) {

    let options = {
            ignore: [".page-content .card", ".page-content .card-title", ".page-content .ticket-card"],
            media: ['@media (max-width:480px)', '@media (min-width:768px)', '@media (max-width:992px)', '@media (max-width:1199px)'],
            stylesheets: [path.resolve(publicPath, 'css/libs/bootstrap.min.css'),
                path.resolve(publicPath, 'css/app/site.css')
            ],
            timeout: 1000,
            report: true,
            banner: false
        },
        html = $.html();

    let $html = cheerio.load(html);

    $html("body").append(templates);
    $html("script").remove();

    $("script").remove();

    //run uncss
    uncss($html.html(), options, function (error, output) {

        if (error) {
            console.log(error);
        }

        let minCSS = new CleanCSS({
            level: 2
        }).minify(output);

        $("head").append("<style>" + minCSS.styles + "</style>");

        callback($);

    });

    //return html with inline styles

}

function updateAssets(page, pageHTML, callback) {

    let $ = cheerio.load(pageHTML);

    //replace CSS with inline styles

    $("link[rel=stylesheet]").remove();

    extractCSS($, function ($) {

        //replace script references with hash names
        //fs.writeFileSync("test.html", html.html(), utf8);
        callback($.html());

    });

}

function renderPage(page) {

    let body = fs.readFileSync(path.resolve(page), utf8),
        slug = path.basename(page, ".html"),
        pageObj = utils.readJSON(path.resolve("public/" + slug + ".json")),
        pageHTML,
        name = slug;

    if (slug === "home") {
        slug = "";
    }

    pageObj = mergePage(pageObj);

    pageHTML = appShell.replace("<%template%>", body);
    pageSlug = path.resolve("", slug);

    pageHTML = template.render(pageHTML, pageObj);

    utils.createFile("public/" + name + ".json", JSON.stringify({
        "name": name,
        "slug": slug,
        "scripts": [
            "js/app/pages/" + name + ".js"
        ],
        "css": []
    }), true);

    //    if (target === "production") {

    updateAssets(page, pageHTML, function (html) {

        html = html.replace(/<%polyfils%>/g, polyfils);

        html = injectScripts(pageObj, html);

        html = replaceScriptsWithHashes(html);

        utils.createFile(path.resolve(publicPath, slug, "index.html"), html, true);

        html = html.replace(/<div class=\"loader\"><\/div>/g, "<%template%>");

        utils.createFile(path.resolve(publicPath, "templates/" + slug + "-page.html"), html, true);

    });

    //  }

}

function getScriptHash(scriptName) {

    for (let i = 0; i < scriptsObjs.length; i++) {

        if (scriptsObjs[i].src.indexOf(scriptName) > -1) {

            let fileName = path.basename(scriptName);

            if (scriptsObjs[i].hash) {

                return scriptName.replace(fileName, scriptsObjs[i].hash);

            } else {

                return scriptName;

            }

        }

    }

    return scriptName;

}

function injectScripts(pageObj, html) {

    let pageScripts = "";

    pageObj.scripts.forEach(script => {

        let scriptName = getScriptHash(script);

        pageScripts += '<script src="' + scriptName + '"></script>';

    });

    return html.replace(/<\/%polyfils%>/, pageScripts);

}

function mergePage(slugJson) {

    slugJson.css = pageJSON.css.concat(slugJson.css || []);

    slugJson.scripts = pageJSON.scripts.concat(slugJson.scripts || []);

    return slugJson;

}

function readPageFiles() {

    loadAppShell();

    glob(path.resolve(publicPath, "html/pages/*.html"), (er, files) => {

        files.forEach(file => {

            renderPage(file, utf8);

        });

    });

}

function uglifyScripts() {

    scripts.forEach(script => {

        let ug = new uglify(path.resolve(publicPath, script));

        console.log(script);

        let min = ug.minify();

        if (min.code && min.code !== "") {

            let hashName = utils.getHash(min.code);

            console.log(script + " " + hashName);

            fs.writeFileSync(path.join(publicPath, path.dirname(script), hashName + ".min.js"), min.code);

            scriptsObjs.push({
                src: script,
                hash: hashName + ".min.js"
            });
        } else {
            console.log("uglify error ", min.error);
        }

    });

}

function renderServiceWorker() {

    let sw = fs.readFileSync(path.resolve(publicPath, "templates/sw.js"), utf8);

    fs.writeFileSync(path.join(publicPath, "sw.js"), replaceScriptsWithHashes(sw), utf8);

}

function replaceScriptsWithHashes(src) {

    for (let i = 0; i < scriptsObjs.length; i++) {

        let scriptName = path.basename(scriptsObjs[i].src);

        src = src.replace(scriptName, scriptsObjs[i].hash)
            .replace(scriptName, scriptsObjs[i].hash);

    }

    return src;

}


uglifyScripts();

readPageFiles();

renderServiceWorker();