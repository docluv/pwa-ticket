(function () {

    function loadTicketListTemplate() {

        return fetch("templates/ticket-list.html")
            .then(function (response) {

                if (response.ok) {

                    return response.text()
                        .then(function (template) {

                            return template;

                        });

                }

                return;

            })

    }


    function getTickets() {

        return fetch(window.pwaTickets.api + "users/8a4a30d7-2e36-43b8-9f8f-ef249fec0731")
            .then(function (response) {

                if (response.ok) {

                    return response.json()
                        .then(function (user) {

                            return user.tickets;

                        });


                } else {

                    throw "event fetch failed";
                }

            });

    }

    loadTicketListTemplate()
        .then(function(template){

            getTickets()
            .then(function(tickets){
    
                var target = _d.qs(".content-target");

                target.innerHTML = Mustache.render(template, {
                    tickets: tickets
                });
    
            });
    
        })
        .catch(function(err){

            console.log(err);

        });


})();