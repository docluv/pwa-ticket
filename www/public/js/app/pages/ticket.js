(function () {

    var userId;

    pwaTicketAPI.loadTemplate("templates/ticket.html")
        .then(function (template) {

            if (template) {

                pwaTicketAPI.getUserTicket("e2beca0c-609d-4b0b-a2ba-bf42b6194f06",
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