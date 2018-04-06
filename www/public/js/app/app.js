"use strict"; //https://love2dev.com/blog/javascript-strict-mode/

(function () {

    var eventListTemplate,
        ticketListTemplate,
        authToken = "auth-token";

    window.pwaTickets = {
        "api": "http://localhost:15501/",

        getParameterByName: function (name, url) {
            if (!url) {
                url = window.location.href;
            }
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }

    };


    function verifyToken() {

        return localforage.getItem(authToken)
            .then(function (token) {

                //temporary
                token = "e2beca0c-609d-4b0b-a2ba-bf42b6194f06";

                if (token) {

                    pwaTickets.token = token;

                    document.body.classList.add("authenticated");

                    return token;

                    // } else {

                    //     window.location = "login/";

                }

            });

    }

    // Menu toggle
    function initMenuToggle() {

        var toggler = _d.qs(".navbar-toggler");

        toggler.addEventListener("click", function (evt) {

            toggleMenu();

        });

    }

    function toggleMenu() {
        /* Choose 992 because that is the break point where BS hides the menu toggle button */
        if (document.body.clientWidth < 992) {

            var navbarNav = document.getElementById("navbarNav");

            navbarNav.classList.toggle("show");

        }

    }

    /* search */
    function initSearch() {

        var searchBox = _d.qs(".search-input");

        searchBox.addEventListener("keyup", function (evt) {

            evt.preventDefault();

            if (searchBox.value.length > 3 || evt.keyCode === 13) {

                //search events & tickets

            }

            return false;

        });

    }

    function renderSearchResults(results) {

        var target = _d.qs(".page-content");

        // target.innerHTML = Mustache.render(sessionCardTemplate, {
        //     sessions: results
        // });

    }

    function loadSearchTemplates() {

        pwaTicketAPI.fetchTemplate("templates/event-list")
            .then(function (template) {

                if (template) {

                    eventListTemplate = template;

                }

                return;
            });

        pwaTicketAPI.fetchTemplate("templates/ticket-list")
            .then(function (template) {

                if (template) {

                    ticketListTemplate = template;

                }

                return;
            });

    }

    function initializeApp() {

        verifyToken()
            .then(function (token) {

                if(token){

                    initSearch();
                    initMenuToggle();

                }

            });

    }

    initializeApp();

    /*
        register the service worker
    */
    if ('serviceWorker' in navigator) {

        navigator.serviceWorker.register('/sw.js').then(function (registration) {
            // Registration was successful

            console.log('ServiceWorker registration successful with scope: ', registration.scope);

        }).catch(function (err) {
            // registration failed :(

            console.log('ServiceWorker registration failed: ', err);
        });

    }

})();