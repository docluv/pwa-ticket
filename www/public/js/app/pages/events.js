var pwaEvents = (function () {

    var userEvents = "user-events";

    var pwaEvents = {

        getEvents: function () {

            var self = this;

            return fetch(window.pwaTickets.api + "users/8a4a30d7-2e36-43b8-9f8f-ef249fec0731/events")
                .then(function (response) {

                    if (response.ok) {

                        return response.json()
                            .then(function (events) {

                                self.campSchedule = events;

                                return events;

                            });


                    } else {

                        throw "event fetch failed";
                    }

                });

        },

        saveevent: function (id) {

            var self = this;

            return this.geteventById(id)
                .then(function (event) {

                    return self.getSavedevents()
                        .then(function (events) {

                            events = events || [];

                            //this can stack up duplicates so need to fix...but I am tired.
                            events.push(event);

                            return localforage.setItem(savesevents, events);

                        });

                });

        },

        removeevent: function (id) {

            var self = this;

            return this.getSavedevents()
                .then(function (events) {

                    if (events.length > 0) {

                        events = events.filter(function (event) {

                            return event.id != id;

                        });

                        return localforage.setItem(savesevents, events);

                    }

                });

        },

        geteventById: function (id) {

            id = parseInt(id, 10);

            return this.getEvents()
                .then(function (events) {

                    var _s = events.filter(function (event) {

                        return event.id === id;

                    });

                    if (_s && _s.length > 0) {

                        return _s[0];

                    } else {
                        return undefined;
                    }

                });

        },

        searchevents: function (term) {

            var self = this;

            term = term.toLowerCase();

            return new Promise(function (resolve, reject) {

                var results = self.campSchedule.filter(function (event) {

                    return ((event.title.toLowerCase().indexOf(term) > -1 ||
                            event.body.toLowerCase().indexOf(term) > -1 ||
                            event.speaker.toLowerCase().indexOf(term) > -1) &&
                        event.date.indexOf("2018-03-24") > -1);

                });

                resolve(results);

            });

        },

        getSavedevents: function () {

            return localforage.getItem(savesevents);

        },

        getSelectedTimes: function () {

            var self = this;

            return localforage.getItem(userEvents)
                .then(function (times) {

                    if (!times) {

                        return self.updateeventTimes(self.selectedTimes)
                            .then(function () {

                                return self.selectedTimes;

                            });

                    }

                    return times;

                });

        },

        addeventTime: function (eventTime) {

            var self = this;

            return self.getSelectedTimes()
                .then(function (times) {

                    times.push(eventTime);

                    return self.updateeventTimes(times);

                });

        },

        removeeventTime: function (eventTime) {

            var self = this;

            return self.getSelectedTimes()
                .then(function (times) {

                    times = times.filter(function (time) {

                        return time != eventTime;

                    });

                    return self.updateeventTimes(times);

                });

        },

        updateeventTimes: function (times) {

            return localforage.setItem(userEvents, times);

        },

        geteventTimes: function () {

            return localforage.getItem(userEvents);

        },

        getFacetedevents: function () {

            var self = this;

            return self.getSelectedTimes()
                .then(function (times) {

                    return self.campSchedule.filter(function (event) {

                        return times.indexOf(event.time) > -1;

                    });

                });

        }

    }

    return pwaEvents;

})();