(function () {

    var userId;

    pwaTicketAPI.loadTemplate("templates/ticket.html")
        .then(function (template) {

            if (template) {

                pwaTicketAPI.getUserTicket(pwaTicket.token,
                pwaTickets.getParameterByName("id"))
                    .then(function (ticket) {

                        var target = _d.qs(".content-target");

                        target.innerHTML = Mustache.render(template, ticket);

                    });

            }

        })
        .catch(function (err) {

            console.log(err);

        });


})();