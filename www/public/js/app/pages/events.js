(function () {

    pwaTicketAPI.loadTemplate("templates/event-list.html")
        .then(function (template) {

            if (template) {

                pwaTicketAPI.getFutureEvents()
                    .then(function (events) {

                        var target = _d.qs(".content-target");

                        target.innerHTML = Mustache.render(template, {
                            events: events
                        });

                        lazyImages.lazyDisplay();

                    });

            }

        })
        .catch(function (err) {

            console.log(err);

        });

})();