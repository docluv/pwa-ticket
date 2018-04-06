const fs = require("fs"),
    path = require("path"),
    faker = require("faker"),
    utf8 = "utf-8";


//read content/article
let db = fs.readFileSync(path.resolve("../db.json"), utf8);

db = JSON.parse(db);

//fake events

db.futureEvents = [];
db.pastEvents = [];
db.tickets = [];
db.users = [];

let count = 0;


function getClaims() {

    return {

    };

}

function generateEvents(future) {

    let eventCount = faker.random.number(100) + 10;
    let events = [];

    future = !!future;

    for (count = 0; count < eventCount; count++) {

        events.push({
            "id": faker.random.uuid(),
            "image": faker.image.image(),
            "date": future ? faker.date.future() : faker.date.past(),
            "venue": faker.company.companyName(),
            "title": faker.commerce.productName(),
            "city": faker.address.city(),
            "state": faker.address.state(),
            "tickets": []
        });

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

function generateUserTickets(user) {

    let ticketCount = faker.random.number(20);
    let tickets = [];

    for (let count = 0; count < ticketCount; count++) {

        let future = faker.random.boolean();
        let event = getRandomEvent(future);

        let ticket = {
            "id": faker.random.uuid(),
            "event": event,
            "date": event.date,
            "price": faker.commerce.price(),
            "section": Math.abs(faker.random.number(400) - 100),
            "row": Math.random().toString(36).replace(/[^a-z]+/g, '')[0].toUpperCase(),
            "seat": faker.random.number(36) + 1
        };

        addTicketToEvent(ticket, event, future);

        let user_ticket = Object.assign({}, ticket);

        let _user = Object.assign({}, user);

        delete _user.tickets;

        user_ticket.user = _user;

        db.tickets.push(user_ticket);

        delete ticket.event.tickets;

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

        for (let count = 0; count < db.futureEvents.length; count++){

            if(db.futureEvents[count].id = event.id){

                db.futureEvents[count].tickets.push(ticket); 
                count = db.futureEvents.length;

            }

        }

    } else {

        for (let count = 0; count < db.pastEvents.length; count++){

            if(db.pastEvents[count].id = event.id){

                db.pastEvents[count].tickets.push(ticket); 
                count = db.pastEvents.length;

            }

        }

    }

}

db.pastEvents = generateEvents(false);
db.futureEvents = generateEvents(true);


//fake users
for (count = 0; count < faker.random.number(100); count++) {

    let user = {
        "id": faker.random.uuid(),
        "firstName": faker.name.firstName(),
        "lastName": faker.name.lastName(),
        "mugshot": faker.image.people(),
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