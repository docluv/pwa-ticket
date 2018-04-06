(function () {

    var userId;

    function getTickets() {

        return pwaTicketAPI.getUserTickets("e2beca0c-609d-4b0b-a2ba-bf42b6194f06");

    }

    pwaTicketAPI.loadTemplate("templates/ticket-list.html")
        .then(function (template) {

            if (template) {

                getTickets()
                    .then(function (tickets) {

                        var target = _d.qs(".content-target");

                        target.innerHTML = Mustache.render(template, {
                            tickets: tickets
                        });

                    });

            }

        })
        .catch(function (err) {

            console.log(err);

        });


})();