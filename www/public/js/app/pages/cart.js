(function () {

    var userId;

    pwaTicketAPI.loadTemplate("templates/cart.html")
        .then(function (template) {

            if (template) {

                return pwaTicketAPI.verifyToken()
                    .then(function (token) {

                        pwaTicketAPI.getEventTicket(pwaTickets.getParameterByName("eventid"), 
                            pwaTickets.getParameterByName("ticketid"))
                            .then(function (ticket) {

                                var target = _d.qs(".content-target");

                                target.innerHTML = Mustache.render(template, ticket);

                            });


                    });

            }

        })
        .catch(function (err) {

            console.log(err);

        });

})();