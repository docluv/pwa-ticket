const fs = require("fs"),
    path = require("path"),
    faker = require("faker"),
    ba64 = require("ba64"),
    utils = require("./utils"),
    qr = require('qr-encode'),
    qrCodePath = path.resolve("../www/public/qrcodes/"),
    utf8 = "utf-8";

const venues = [{
            "image": {
                "img": "concert-1-800x532.jpg",
                "width": 800,
                "height": 532
            },
            "images": [{
                "img": "concert-1-800x532.jpg",
                "width": 800,
                "height": 532
            }, {
                "img": "concert-1-720x479.jpg",
                "width": 720,
                "height": 479
            }, {
                "img": "concert-1-460x306.jpg",
                "width": 460,
                "height": 306
            }, {
                "img": "concert-1-320x213.jpg",
                "width": 320,
                "height": 213
            }]
        },
        {
            "image": {
                "img": "concert-2-474x301.jpg",
                "width": 474,
                "height": 301
            },
            "images": [{
                "img": "concert-2-474x301.jpg",
                "width": 474,
                "height": 301
            }, {
                "img": "concert-2-460x293.jpg",
                "width": 460,
                "height": 293
            }, {
                "img": "concert-2-320x204.jpg",
                "width": 320,
                "height": 204
            }]
        },
        {
            "image": {
                "img": "concert-3-1360x922.jpg",
                "width": 1360,
                "height": 922
            },
            "images": [{
                "img": "concert-3-1360x922.jpg",
                "width": 1360,
                "height": 922
            }, {
                "img": "concert-3-474x322.jpg",
                "width": 474,
                "height": 322
            }, {
                "img": "concert-3-460x312.jpg",
                "width": 460,
                "height": 312
            }, {
                "img": "concert-3-320x217.jpg",
                "width": 320,
                "height": 217
            }]
        },
        {
            "image": {
                "img": "concert-4-1200x900.jpg",
                "width": 1200,
                "height": 900
            },
            "images": [{
                "img": "concert-4-1200x900.jpg",
                "width": 1200,
                "height": 900
            }, {
                "img": "concert-4-474x356.jpg",
                "width": 474,
                "height": 356
            }, {
                "img": "concert-4-460x345.jpg",
                "width": 460,
                "height": 345
            }, {
                "img": "concert-4-320x240.jpg",
                "width": 320,
                "height": 240
            }]
        },
        {
            "image": {
                "img": "stadium-1-973x648.jpg",
                "width": 973,
                "height": 648
            },
            "images": [{
                "img": "stadium-1-973x648.jpg",
                "width": 973,
                "height": 648
            }, {
                "img": "stadium-1-474x316.jpg",
                "width": 474,
                "height": 316
            }, {
                "img": "stadium-1-460x307.jpg",
                "width": 460,
                "height": 307
            }, {
                "img": "stadium-1-320x214.jpg",
                "width": 320,
                "height": 214
            }]
        },
        {
            "image": {
                "img": "stadium-2-474x263.jpg",
                "width": 474,
                "height": 263
            },
            "images": [{
                "img": "stadium-2-474x263.jpg",
                "width": 474,
                "height": 263
            }, {
                "img": "stadium-2-474x263.jpg",
                "width": 474,
                "height": 263
            }, {
                "img": "stadium-2-460x256.jpg",
                "width": 460,
                "height": 256
            }, {
                "img": "stadium-2-320x178.jpg",
                "width": 320,
                "height": 178
            }]
        },
        {
            "image": {
                "img": "stadium-3-1000x618.jpg",
                "width": 1000,
                "height": 618
            },
            "images": [{
                "img": "stadium-3-1000x618.jpg",
                "width": 1000,
                "height": 618
            }, {
                "img": "stadium-3-474x293.jpg",
                "width": 474,
                "height": 293
            }, {
                "img": "stadium-3-474x293.jpg",
                "width": 474,
                "height": 293
            }, {
                "img": "stadium-3-460x285.jpg",
                "width": 460,
                "height": 285
            }, {
                "img": "stadium-3-320x198.jpg",
                "width": 320,
                "height": 198
            }]
        },
        {
            "image": {
                "img": "stadium-4-1000x636.jpg",
                "width": 1000,
                "height": 636
            },
            "images": [{
                "img": "stadium-4-1000x636.jpg",
                "width": 1000,
                "height": 636
            }, {
                "img": "stadium-4-1000x636.jpg",
                "width": 1000,
                "height": 636
            }, {
                "img": "stadium-4-474x302.jpg",
                "width": 474,
                "height": 302
            }, {
                "img": "stadium-4-474x302.jpg",
                "width": 474,
                "height": 302
            }, {
                "img": "stadium-4-460x293.jpg",
                "width": 460,
                "height": 293
            }, {
                "img": "stadium-4-320x204.jpg",
                "width": 320,
                "height": 204
            }]
        }
    ],
    mugshots = [
        "avtar-1.jpg",
        "avtar-2.jpg",
        "avtar-3.jpg",
        "avtar-4.jpg",
        "avtar-5.jpg",
        "avtar-6.jpg",
        "avtar-7.jpg",
        "avtar-8.jpg"
    ];

//read content/article
let db = fs.readFileSync(path.resolve("../db.json"), utf8);

db = JSON.parse(db);

//fake events

db.futureEvents = [];
db.pastEvents = [];
db.tickets = [];
db.users = [];
db.contacts = [];

let count = 0;


function getClaims() {

    return {

    };

}

function generateBarCode(id) {

    let dataURI = qr(id, {
        type: 6,
        size: 6,
        level: 'Q'
    });

    //    fs.writeFileSync(qrCodePath + "/" + id + ".gif", dataURI, 'base64');

    ba64.writeImageSync(qrCodePath + "/" + id, dataURI);

    return id + ".gif";
}

function generateEvents(future) {

    let eventCount = faker.random.number(100) + 10;
    let events = [];

    future = !!future;

    for (let count = 0; count < eventCount; count++) {

        let venue = faker.random.number(8) - 1;

        if (venue < 0) {
            venue = 0;
        }

        if (venue > 7) {
            venue = 7;
        }

        let event = {
            "id": faker.random.uuid(),
            "image": venues[venue],
            "date": future ? faker.date.future().toDateString() : faker.date.past().toDateString(),
            "venue": faker.company.companyName(),
            "title": faker.commerce.productName(),
            "city": faker.address.city(),
            "state": faker.address.state(),
            "tickets": []
        }

        event["available-tickets"] = future ? getAvailableTickets(event) : [];

        events.push(event);

    }

    return events;

}

function getRandomEvent(future) {

    let event;

    if (future) {

        event = db.futureEvents[faker.random.number(db.futureEvents.length - 1)];

    } else {

        event = db.pastEvents[faker.random.number(db.pastEvents.length - 1)];

    }

    return Object.assign({}, event);

}

function getAvailableTickets(event) {

    let ticketCount = faker.random.number(20);
    let tickets = [];

    for (let count = 0; count < ticketCount; count++) {

        let ticket = Object.assign({}, getTicket(event));

        delete ticket.event;

        tickets.push(ticket);

    }

    return tickets;

}

function getTicket(event) {

    let _event = Object.assign({}, event);

    let id = faker.random.uuid();

    delete _event["available-tickets"];

    let ticket = {
        "id": id,
        "event": _event,
        "date": _event.date,
        "price": faker.commerce.price(),
        "barcode": generateBarCode(id),
        "section": Math.abs(faker.random.number(400) - 100),
        "row": Math.random().toString(36).replace(/[^a-z]+/g, '')[0].toUpperCase(),
        "seat": faker.random.number(36) + 1
    };


    return ticket;

}

function generateUserTickets(user) {

    let ticketCount = faker.random.number(20);
    let tickets = [];

    for (let count = 0; count < ticketCount; count++) {

        let future = faker.random.boolean();
        let event = getRandomEvent(future);

        let ticket = Object.assign({}, getTicket(event));

        delete ticket.event.tickets;
        delete ticket.user;

        addTicketToEvent(ticket, event, future);

        let user_ticket = Object.assign({}, ticket);

        let _user = Object.assign({}, user);

        delete _user.tickets;

        user_ticket.user = _user;

        db.tickets.push(user_ticket);

        //        delete ticket.event.tickets;

        tickets.push(ticket);

    }

    return tickets;

}

function addTicketToEvent(ticket, event, future) {

    console.log(event);
    console.log(event.tickets);

    let _ticket = Object.assign({}, ticket);

    delete _ticket.event;

    event.tickets.push(_ticket);

    if (future) {

        for (let count = 0; count < db.futureEvents.length; count++) {

            if (db.futureEvents[count].id = event.id) {

                db.futureEvents[count].tickets.push(ticket);
                count = db.futureEvents.length;

            }

        }

    } else {

        for (let count = 0; count < db.pastEvents.length; count++) {

            if (db.pastEvents[count].id = event.id) {

                db.pastEvents[count].tickets.push(ticket);
                count = db.pastEvents.length;

            }

        }

    }

}

//clean bar codes

utils.removeDirForce(qrCodePath + "/");
utils.MakeDirectory(qrCodePath);

db.pastEvents = generateEvents(false);
db.futureEvents = generateEvents(true);


//fake users
for (count = 0; count < faker.random.number(100); count++) {

    let mugshot = faker.random.number(8) - 1;

    if (mugshot < 0) {
        mugshot = 0;
    }

    if (mugshot > 7) {
        mugshot = 7;
    }

    let user = {
        "id": faker.random.uuid(),
        "firstName": faker.name.firstName(),
        "lastName": faker.name.lastName(),
        "mugshot": mugshots[mugshot],
        "userName": faker.internet.userName(),
        "password": faker.internet.password(),
        "streetAddress": faker.address.streetAddress(),
        "city": faker.address.city(),
        "state": faker.address.state(),
        "zipCode": faker.address.zipCode(),
        "email": faker.internet.email(),
        "phoneNumber": faker.phone.phoneNumber()
    }

    user.tickets = generateUserTickets(user);

    db.users.push(user);

}



fs.writeFileSync(path.resolve("../db.json"), JSON.stringify(db), utf8);