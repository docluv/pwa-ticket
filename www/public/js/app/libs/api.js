var pwaTicketAPI = (function () {

    return {

        loadTemplate: function (url) {

            return fetch(url)
                .then(function (response) {
    
                    if (response.ok) {
    
                        return response.text()
                            .then(function (template) {
    
                                return template;
    
                            });
    
                    }
    
                    return;
    
                })
    
        },
    
        getUserTickets: function (userId) {

            return fetch(window.pwaTickets.api + "users/" + userId)
                .then(function (response) {

                    if (response.ok) {

                        return response.json()
                            .then(function (user) {

                                return user.tickets;

                            });

                    } else {

                        throw "user tickets fetch failed";
                    }

                });

        },

        getUserTicket: function (userId, ticketId) {

            return fetch(window.pwaTickets.api + "users/" + userId)
                .then(function (response) {

                    if (response.ok) {

                        return response.json()
                            .then(function (user) {

                                var ticket = user.tickets.filter(function(tick){

                                    return (tick.id === ticketId);

                                });

                                return ticket[0];

                            });

                    } else {

                        throw "user tickets fetch failed";
                    }

                });

        },

        getUser: function (userId) {

            return fetch(window.pwaTickets.api + "users/" + userId)
                .then(function (response) {

                    if (response.ok) {

                        return response.json();

                    } else {

                        throw "user tickets fetch failed";
                    }

                });

        },
   
        getFutureEvents: function () {

            return fetch(window.pwaTickets.api + "futureEvents/")
                .then(function (response) {

                    if (response.ok) {

                        return response.json();

                    } else {

                        throw "user tickets fetch failed";
                    }

                });

        },

        getEvent: function (id, future) {

            if(future === undefined) {

                future = true;

            }

            let timeFrame = future ? "futureEvents/" : "pastEvents/";

            return fetch(window.pwaTickets.api + timeFrame + id)
                .then(function (response) {

                    if (response.ok) {

                        return response.json();

                    } else {

                        throw "user tickets fetch failed";
                    }

                });

        },

        postContact: function(contact){



        },

        buyTicket: function(ticket, user){},

        login: function(credentials){},

        logout: function(){},

        getAuthToken: function(){}


    };

})();