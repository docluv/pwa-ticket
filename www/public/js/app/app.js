"use strict"; //https://love2dev.com/blog/javascript-strict-mode/

(function () {

    var eventListTemplate,
        ticketListTemplate,
        authToken = "auth-token";

    window.pwaTickets = {

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

    function initLogout() {

        var logoutBtn = _d.qs(".logout-btn");

        logoutBtn.addEventListener("click", function (evt) {

            evt.preventDefault();

            pwaTicketAPI.logout();

            return false;

        });

    }

    var eventListTemplate = "";

    /* search */
    function initSearch() {

        pwaTicketAPI.loadTemplate("templates/event-list.html")
            .then(function (template) {

                if (template) {

                    eventListTemplate = template;

                    var searchBox = _d.qs(".search-input");

                    searchBox.addEventListener("keyup", function (evt) {

                        evt.preventDefault();

                        if (searchBox.value.length > 3 || evt.keyCode === 13) {

                            //search events & tickets
                            pwaTicketAPI.searchFutureEvents(searchBox.value)
                                .then(function (events) {

                                    var target = _d.qs(".content-target");

                                    target.innerHTML = Mustache.render(eventListTemplate, {
                                        events: events
                                    });

                                });

                        }

                        return false;

                    });

                }

            })
            .catch(function (err) {

                console.log(err);

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

        if (window.location.href.indexOf("login") === -1) {

            pwaTicketAPI.verifyToken()
                .then(function (token) {

                    if (token) {

                        document.body.classList.add("authenticated");

                        initSearch();
                        initMenuToggle();
                        initLogout();

                    } else {

                        window.location.href = "login";
                    }

                });

        }

    }

    initializeApp();


    var deferredPrompt;

    window.addEventListener('beforeinstallprompt', function (e) {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
  
      showAddToHomeScreen();
  
    });
  
  function showAddToHomeScreen() {
  
    var a2hsBtn = document.querySelector(".ad2hs-prompt");
  
    a2hsBtn.style.display = "flex";
  
    a2hsBtn.addEventListener("click", addToHomeScreen);
  
  }
  
    function addToHomeScreen() {
  
      var a2hsBtn = document.querySelector(".ad2hs-prompt");
  
      // hide our user interface that shows our A2HS button
      a2hsBtn.style.display = 'none';
  
      if (deferredPrompt) {
        // Show the prompt
        deferredPrompt.prompt();
  
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice
          .then(function (choiceResult) {
  
            if (choiceResult.outcome === 'accepted') {
              console.log('User accepted the A2HS prompt');
            } else {
              console.log('User dismissed the A2HS prompt');
            }
  
            deferredPrompt = null;
  
          });
  
      }
  
    }
  
//    showAddToHomeScreen();
  
    window.addEventListener('appinstalled', function (evt) {
      console.log('a2hs', 'installed');
    });


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