(function () {

    var userId;

    pwaTicketAPI.loadTemplate("templates/event.html")
        .then(function (template) {

            if (template) {

                pwaTicketAPI.getEvent(pwaTickets.getParameterByName("id"))
                    .then(function (event) {

                        var target = _d.qs(".content-target");

                        target.innerHTML = Mustache.render(template, event);

                    });

            }

        })
        .catch(function (err) {

            console.log(err);

        });


})();