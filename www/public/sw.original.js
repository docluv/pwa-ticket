'use strict';

self.importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js",
    "js/libs/2ae25530a0dd28f30ca44f5182f0de61.min.js",
    "js/app/libs/e392a867bee507b90b366637460259aa.min.js",
    "sw/sw-push-manager.js"
);


const version = "1.08",
    preCache = "PRECACHE-" + version,
    dynamicCache = "DYNAMIC-" + version,
    eventsCacheName = "events-cache-" + version,
    qrCodesCacheName = "qr-codes-cache-" + version,
    cacheList = [
        "/",
        "img/pwa-tickets-logo-320x155.png",
        "js/app/512df4f42ca96bc22908ff3a84431452.min.js",
        "js/libs/ca901f49ff220b077f4252d2f1140c68.min.js",
        "js/app/libs/e392a867bee507b90b366637460259aa.min.js",
        "js/app/libs/8fd5a965abed65cd11ef13e6a3408641.min.js",
        "js/app/pages/5b4d14af61fc40df7d6bd62f3e2a86a4.min.js",
        "js/app/pages/8684e75675485e7af7aab5ca10cc8da5.min.js",
        "js/app/pages/88ea734e66b98120a5b835a5dfdf8f6c.min.js",
        "js/app/pages/518f8db8a1fa1813bf9256c18caeb6d3.min.js",
        "js/app/pages/ebb36cf208e8a8110dc904b28c8a2bf0.min.js",
        "js/app/pages/bc8ffbb70c5786945962ce782fae415c.min.js",
        "js/app/pages/de0777d1bf65a3df5578b791ff660949.min.js",
        "js/app/pages/631d1c493937f2fc4beb02737dfcd50d.min.js",
        "js/app/pages/423f14f5fae95d3345c30c6469533243.min.js",
        "js/app/pages/92ee49a4e74c414495cd9e36269608f6.min.js",
        "js/libs/2ae25530a0dd28f30ca44f5182f0de61.min.js",
        "js/libs/aa0a8a25292f1dc72b1bee3bd358d477.min.js",
        "js/libs/470bb9da4a68c224d0034b1792dcbd77.min.js",
        "html/app-shell.html",
        "templates/cart.html",
        "templates/event-list.html",
        "templates/ticket-list.html",
        "templates/user.html",
        "templates/ticket.html",
        "templates/event.html",
        "templates/profile.html",
        "ticket/",
        "tickets/",
        "signup/",
        "profile/",
        "notfound/",
        "login/",
        "events/",
        "event/",
        "contact/",
        "config/",
        "cart/"
    ],
    apiHost = "http://localhost:15501/",
    routeRules = [{
            "route": /event\/\?/,
            "strategy": "fetchAndRenderResponseCache",
            "options": {
                pageURL: "templates/event-page.html",
                template: "templates/event.html",
                api: function (request) {
                    return pwaTicketAPI.getEvent(getParameterByName("id", request.url));
                },
                cacheName: eventsCacheName
            },
            "cacheName": eventsCacheName
        },
        {
            "route": /qrcodes/,
            "strategy": "cacheFallingBackToNetworkCache",
            "cacheName": qrCodesCacheName
        }
    ];

    
workbox.precaching.precacheAndRoute([
  {
    "url": "cart/index.html",
    "revision": "7218baca621cbd5db586140e5cbcfce8"
  },
  {
    "url": "config/index.html",
    "revision": "93f61ab83f250089e1d8d3cde9492666"
  },
  {
    "url": "contact/index.html",
    "revision": "5dfbd3a354a67b3efb8dea231355cbad"
  },
  {
    "url": "css/app/site.css",
    "revision": "0a7a717c378b7e6ede1e294290e2cfdc"
  },
  {
    "url": "css/libs/bootstrap.min.css",
    "revision": "db34cfbcfa6b3abbc8537cc92da495e6"
  },
  {
    "url": "css/libs/fontawesome-all.css",
    "revision": "6a6e2d0b0f99808e70574b373399bc6f"
  },
  {
    "url": "css/libs/fontawesome-all.min.css",
    "revision": "3e00fb24de19a111e70a8b8fe70c6782"
  },
  {
    "url": "css/libs/fontawesome.css",
    "revision": "2c1efb8180916b6ea3cb2a4968548b6b"
  },
  {
    "url": "css/libs/fontawesome.min.css",
    "revision": "5e20933911a0af6b849a62898f31674e"
  },
  {
    "url": "css/webfonts/fa-brands-400.eot",
    "revision": "4316347c4493df773d5727875a93d2ff"
  },
  {
    "url": "css/webfonts/fa-brands-400.svg",
    "revision": "ee698d1f98a60900ef37577de1967ffc"
  },
  {
    "url": "css/webfonts/fa-brands-400.ttf",
    "revision": "ed1b3bbc163e3e5c4768fffbb85b4541"
  },
  {
    "url": "css/webfonts/fa-brands-400.woff",
    "revision": "2b56bb60d858b194705a1da8b63cb02f"
  },
  {
    "url": "css/webfonts/fa-brands-400.woff2",
    "revision": "3c99e14fe8c9c0d701816bab947bd107"
  },
  {
    "url": "css/webfonts/fa-regular-400.eot",
    "revision": "12d1d8bd4988b862355b7c996587c3c7"
  },
  {
    "url": "css/webfonts/fa-regular-400.svg",
    "revision": "5df24ccfa0e1a2765724cd968b855418"
  },
  {
    "url": "css/webfonts/fa-regular-400.ttf",
    "revision": "cfa9e79ba0af8fc92f94bfd7357229ab"
  },
  {
    "url": "css/webfonts/fa-regular-400.woff",
    "revision": "daa56da321a50810d67040d6cc43e094"
  },
  {
    "url": "css/webfonts/fa-regular-400.woff2",
    "revision": "39e71ec701a6b70d40563fc0056c032f"
  },
  {
    "url": "css/webfonts/fa-solid-900.eot",
    "revision": "5330a18e13fb500fa9af0f88a7ae56e3"
  },
  {
    "url": "css/webfonts/fa-solid-900.svg",
    "revision": "0e467838f7ee7b6cb069234be57d39d3"
  },
  {
    "url": "css/webfonts/fa-solid-900.ttf",
    "revision": "870bd43409c13108dca1c5508a5a07e0"
  },
  {
    "url": "css/webfonts/fa-solid-900.woff",
    "revision": "de59f142e782c8a3b0e6f8d98d92cfed"
  },
  {
    "url": "css/webfonts/fa-solid-900.woff2",
    "revision": "e6133fe85e5feabf058ee99e9dc60cc9"
  },
  {
    "url": "error.html",
    "revision": "24d4cb67d5da47a373764712eecb7d86"
  },
  {
    "url": "event/index.html",
    "revision": "7127ba50c2b316ccbc33f2fad868c6a7"
  },
  {
    "url": "events/index.html",
    "revision": "6702e4d3b1554047e8655696875b396d"
  },
  {
    "url": "fallback/index.html",
    "revision": "d03fa5c7471ec4c84ca8bf8fefaddc2b"
  },
  {
    "url": "favicon.png",
    "revision": "ddb5795d97a209f36f3ba78b998930b7"
  },
  {
    "url": "html/app-shell.html",
    "revision": "086c0a4a8391c39baac1496963d2ef78"
  },
  {
    "url": "html/pages/cart.html",
    "revision": "7a79dc7c9d0585563409a1374bce4ad4"
  },
  {
    "url": "html/pages/config.html",
    "revision": "2da578d70b38c7343126ce4e528cf626"
  },
  {
    "url": "html/pages/contact.html",
    "revision": "05347237c00c558a8fcbee45ee843839"
  },
  {
    "url": "html/pages/event.html",
    "revision": "bbc3206ac1c4160ba980b416f322381e"
  },
  {
    "url": "html/pages/events.html",
    "revision": "bbc3206ac1c4160ba980b416f322381e"
  },
  {
    "url": "html/pages/fallback.html",
    "revision": "089b5396423dd5dfc619f5e30739011f"
  },
  {
    "url": "html/pages/home.html",
    "revision": "d47a9bbcdfc65a2f3aa89aecace95cf3"
  },
  {
    "url": "html/pages/login.html",
    "revision": "99985a6a23e36fcfdb3c07b467963673"
  },
  {
    "url": "html/pages/notfound.html",
    "revision": "0e2e8d5647ad0c1dc1e3e7d1d8c0e8aa"
  },
  {
    "url": "html/pages/profile.html",
    "revision": "bbc3206ac1c4160ba980b416f322381e"
  },
  {
    "url": "html/pages/signup.html",
    "revision": "a6188834b020ed9b2d87bdee407fc527"
  },
  {
    "url": "html/pages/ticket.html",
    "revision": "2656831a316957727a1f0277ed78c301"
  },
  {
    "url": "html/pages/tickets.html",
    "revision": "11c6e0cb67409cf544b162cd6a7ebfbf"
  },
  {
    "url": "html/polyfils.html",
    "revision": "337170ad8814e7571a7b8ddb8831ae04"
  },
  {
    "url": "humans.txt",
    "revision": "cb60248dc67a1a2d02177fee9dfa4976"
  },
  {
    "url": "img/people/avtar-1.jpg",
    "revision": "af8c1e06673738bfc3569bb65b8e13ac"
  },
  {
    "url": "img/people/avtar-2.jpg",
    "revision": "5f3a54b6bfbe46aba0d66849c4f0cbc0"
  },
  {
    "url": "img/people/avtar-3.jpg",
    "revision": "c12ab0bf5e1186321d01d21e96b406cb"
  },
  {
    "url": "img/people/avtar-4.jpg",
    "revision": "2eda0bc572083f50b2b5c2cf59725a3e"
  },
  {
    "url": "img/people/avtar-5.jpg",
    "revision": "351851a55fc40dae7bb02c028d5bcf8c"
  },
  {
    "url": "img/people/avtar-6.jpg",
    "revision": "6d43f78d72916915901be871e3409b90"
  },
  {
    "url": "img/people/avtar-7.jpg",
    "revision": "5d7993d5ab05d299246af6bf2299fa6e"
  },
  {
    "url": "img/people/avtar-8.jpg",
    "revision": "3cb8d5de94e80c2700a88fe517b4bc5b"
  },
  {
    "url": "img/pwa-tickets-logo-1158x559.png",
    "revision": "d6b9fa9d6e266ee8eda4c85dfee0f5ba"
  },
  {
    "url": "img/pwa-tickets-logo-320x155.png",
    "revision": "820ae1634973387b598a4088e6ea7e2c"
  },
  {
    "url": "img/pwa-tickets-logo-460x223.png",
    "revision": "24f7ae88b116f3da8e6f4d48da9aede6"
  },
  {
    "url": "img/pwa-tickets-logo-533x258.png",
    "revision": "43fda2008cb978dbb218e077a6328c86"
  },
  {
    "url": "img/pwa-tickets-logo-570x276.png",
    "revision": "801904d025f644db7ff3a48a38e463b2"
  },
  {
    "url": "img/pwa-tickets-logo-700x338.png",
    "revision": "e9ab299ea8b32ff82aeee35729caaf47"
  },
  {
    "url": "img/venues/concert-1.css",
    "revision": "b68c93417ee31be303f04a9b1cccd2bf"
  },
  {
    "url": "img/venues/concert-1.html",
    "revision": "aaa9cf7244371eef57445ae22001bd20"
  },
  {
    "url": "img/venues/concert-1.jpg",
    "revision": "2506490e585538c7ad9853d236fa1140"
  },
  {
    "url": "img/venues/concert-1.json",
    "revision": "b433ad7a57467fd3d62b3001a5ab4f91"
  },
  {
    "url": "img/venues/concert-2.css",
    "revision": "ce3b6364f0cefc09f4c7d05c3cbbe19b"
  },
  {
    "url": "img/venues/concert-2.html",
    "revision": "2d9d80c6bb7fa35c458d6a8b602f9b95"
  },
  {
    "url": "img/venues/concert-2.jpg",
    "revision": "88a8006a8756dbafec9544d3f0d274e1"
  },
  {
    "url": "img/venues/concert-2.json",
    "revision": "bd289e5ed5ed9bdddc0aaf859fb75590"
  },
  {
    "url": "img/venues/concert-3.css",
    "revision": "2aeab2af946ebad6872b29d8b17c9767"
  },
  {
    "url": "img/venues/concert-3.html",
    "revision": "b7c1083f9b3d5f8463a39cb1e86e5103"
  },
  {
    "url": "img/venues/concert-3.jpg",
    "revision": "554653d39b2275c6530e9ecee1178906"
  },
  {
    "url": "img/venues/concert-3.json",
    "revision": "f0a6c8beed3de9475a7fcb075ff9cfd5"
  },
  {
    "url": "img/venues/concert-4.css",
    "revision": "bdb63a9c7c984f7ee7aadc10e136b3a6"
  },
  {
    "url": "img/venues/concert-4.html",
    "revision": "5804008199a20d5fa857cd088eec6ac0"
  },
  {
    "url": "img/venues/concert-4.jpg",
    "revision": "6c657d76b709d63a1a49762c2636b3d5"
  },
  {
    "url": "img/venues/concert-4.json",
    "revision": "2b0e250edd3aeaee6293f8c3a7aec5b3"
  },
  {
    "url": "img/venues/optimized/concert-1-320x213.jpg",
    "revision": "399963e8d9684848976e7e88685f4cd8"
  },
  {
    "url": "img/venues/optimized/concert-1-460x306.jpg",
    "revision": "79eb06bc3211a9ae3ad62c9a4d51a631"
  },
  {
    "url": "img/venues/optimized/concert-1-720x479.jpg",
    "revision": "99a842b06fc53a54accb3f43b1cc9254"
  },
  {
    "url": "img/venues/optimized/concert-1-800x532.jpg",
    "revision": "9dda07f5c7a983441c955d6729441539"
  },
  {
    "url": "img/venues/optimized/concert-2-320x204.jpg",
    "revision": "a311f83def089889f3e7456dae62efa5"
  },
  {
    "url": "img/venues/optimized/concert-2-460x293.jpg",
    "revision": "6ce2a401c61e68fd6c65c1058b6b9dcc"
  },
  {
    "url": "img/venues/optimized/concert-2-474x301.jpg",
    "revision": "fbca5ebe53058434b24701879257addf"
  },
  {
    "url": "img/venues/optimized/concert-3-1360x922.jpg",
    "revision": "a607d71d170bf213524ba2884cb073b1"
  },
  {
    "url": "img/venues/optimized/concert-3-320x217.jpg",
    "revision": "e4a8a49fc746da225c6f1d7b3f0a0500"
  },
  {
    "url": "img/venues/optimized/concert-3-460x312.jpg",
    "revision": "944d216f0bd35c69d339457529d1df67"
  },
  {
    "url": "img/venues/optimized/concert-3-474x322.jpg",
    "revision": "3637347dd407252608acd0c80382f7e3"
  },
  {
    "url": "img/venues/optimized/concert-4-1200x900.jpg",
    "revision": "34fd3bc5e97963b9cbd01018e018d5d0"
  },
  {
    "url": "img/venues/optimized/concert-4-320x240.jpg",
    "revision": "c55a88149cceaaa1302d01a5661f408f"
  },
  {
    "url": "img/venues/optimized/concert-4-460x345.jpg",
    "revision": "bc0b8c9a32abf2d1f09ce7026fdf9513"
  },
  {
    "url": "img/venues/optimized/concert-4-474x356.jpg",
    "revision": "9f8741f64b19814908e2b8b7a745a44b"
  },
  {
    "url": "img/venues/optimized/stadium-1-320x214.jpg",
    "revision": "d35dfb660d542cdfc7977ceacbf9b435"
  },
  {
    "url": "img/venues/optimized/stadium-1-460x307.jpg",
    "revision": "a925cc914cc185d442670f653480c787"
  },
  {
    "url": "img/venues/optimized/stadium-1-474x316.jpg",
    "revision": "484f97ef3d22ccae9b5b9b3f3ecc4722"
  },
  {
    "url": "img/venues/optimized/stadium-1-973x648.jpg",
    "revision": "ad3446b3a0f9117591edc32d8d8192ea"
  },
  {
    "url": "img/venues/optimized/stadium-2-320x178.jpg",
    "revision": "b097c4f4808454a24306dbec4ef3e3c0"
  },
  {
    "url": "img/venues/optimized/stadium-2-460x256.jpg",
    "revision": "d0c9113d1f45b33f19fbc4b3aa919728"
  },
  {
    "url": "img/venues/optimized/stadium-2-474x263.jpg",
    "revision": "9ec4672297bbedc1e8f7be7f3fd9c2bb"
  },
  {
    "url": "img/venues/optimized/stadium-3-1000x618.jpg",
    "revision": "ba7ebadb1f98e3b95904bc5e14f79d8a"
  },
  {
    "url": "img/venues/optimized/stadium-3-320x198.jpg",
    "revision": "3e1fc37434bda02a870bca91c4e06882"
  },
  {
    "url": "img/venues/optimized/stadium-3-460x285.jpg",
    "revision": "0ace0e781bfa86fc194440a59d8266e0"
  },
  {
    "url": "img/venues/optimized/stadium-3-474x293.jpg",
    "revision": "54934f74b0a2827775f9c1ae9723f469"
  },
  {
    "url": "img/venues/optimized/stadium-4-1000x636.jpg",
    "revision": "60f66af63cad9625e951450d54788cf7"
  },
  {
    "url": "img/venues/optimized/stadium-4-320x204.jpg",
    "revision": "8eb4f02bdd6e60eeadac7ed27a223c3f"
  },
  {
    "url": "img/venues/optimized/stadium-4-460x293.jpg",
    "revision": "fe378d5fe3026e8fbed87b9d28e16456"
  },
  {
    "url": "img/venues/optimized/stadium-4-474x302.jpg",
    "revision": "c048a102d182d43d537f0babcb615cc1"
  },
  {
    "url": "img/venues/stadium-1.css",
    "revision": "ce4750848f70f183a5f19a6d86e43615"
  },
  {
    "url": "img/venues/stadium-1.html",
    "revision": "8ba665ef817f9c87ab90d53cf35bea74"
  },
  {
    "url": "img/venues/stadium-1.jpg",
    "revision": "7623ca5b334153529a48f0b03b378015"
  },
  {
    "url": "img/venues/stadium-1.json",
    "revision": "0f8b8a8a46fdfcd461714ed1b2d57e98"
  },
  {
    "url": "img/venues/stadium-2.css",
    "revision": "830317a2151e6cbb070f12c402fb1b79"
  },
  {
    "url": "img/venues/stadium-2.html",
    "revision": "01235680483bb5b03f96584706a57bc6"
  },
  {
    "url": "img/venues/stadium-2.jpg",
    "revision": "c7da35bea6978572d8e54fafc1a8cbcc"
  },
  {
    "url": "img/venues/stadium-2.json",
    "revision": "6c41c824e102e83561005911ca0ebe09"
  },
  {
    "url": "img/venues/stadium-3.css",
    "revision": "aeafcd19c24544f48db6835de0a3c1cb"
  },
  {
    "url": "img/venues/stadium-3.html",
    "revision": "3eee0640e084306be66a694a953d2cff"
  },
  {
    "url": "img/venues/stadium-3.jpg",
    "revision": "f7dd006ee0aa2b05e2f5145dd043435b"
  },
  {
    "url": "img/venues/stadium-3.json",
    "revision": "63fdb4f331fc4310170107b4927085ba"
  },
  {
    "url": "img/venues/stadium-4.css",
    "revision": "ba4f5418330f7b53cd4739951f177d6d"
  },
  {
    "url": "img/venues/stadium-4.html",
    "revision": "cb4d57e377374db84ccf2eb493a71dae"
  },
  {
    "url": "img/venues/stadium-4.jpg",
    "revision": "a1861f7be8bba95ba08fcb2512b74fb9"
  },
  {
    "url": "img/venues/stadium-4.json",
    "revision": "0c3a0ab9e3f0fa8753019155985b2248"
  },
  {
    "url": "index.html",
    "revision": "f2a0f6a694a18818ecdc921b0fbea041"
  },
  {
    "url": "js/app/512df4f42ca96bc22908ff3a84431452.min.js",
    "revision": "512df4f42ca96bc22908ff3a84431452"
  },
  {
    "url": "js/app/app.js",
    "revision": "18702fb23995c9a6b509c206160d6eb2"
  },
  {
    "url": "js/app/libs/8fd5a965abed65cd11ef13e6a3408641.min.js",
    "revision": "8fd5a965abed65cd11ef13e6a3408641"
  },
  {
    "url": "js/app/libs/api.js",
    "revision": "8ddee46d579924947923a737372b4cf2"
  },
  {
    "url": "js/app/libs/e392a867bee507b90b366637460259aa.min.js",
    "revision": "e392a867bee507b90b366637460259aa"
  },
  {
    "url": "js/app/libs/push-mgr.js",
    "revision": "fae149dd8bc746e719d672ec98ad256f"
  },
  {
    "url": "js/app/pages/423f14f5fae95d3345c30c6469533243.min.js",
    "revision": "423f14f5fae95d3345c30c6469533243"
  },
  {
    "url": "js/app/pages/518f8db8a1fa1813bf9256c18caeb6d3.min.js",
    "revision": "518f8db8a1fa1813bf9256c18caeb6d3"
  },
  {
    "url": "js/app/pages/5b4d14af61fc40df7d6bd62f3e2a86a4.min.js",
    "revision": "5b4d14af61fc40df7d6bd62f3e2a86a4"
  },
  {
    "url": "js/app/pages/631d1c493937f2fc4beb02737dfcd50d.min.js",
    "revision": "631d1c493937f2fc4beb02737dfcd50d"
  },
  {
    "url": "js/app/pages/8684e75675485e7af7aab5ca10cc8da5.min.js",
    "revision": "8684e75675485e7af7aab5ca10cc8da5"
  },
  {
    "url": "js/app/pages/88ea734e66b98120a5b835a5dfdf8f6c.min.js",
    "revision": "88ea734e66b98120a5b835a5dfdf8f6c"
  },
  {
    "url": "js/app/pages/92ee49a4e74c414495cd9e36269608f6.min.js",
    "revision": "92ee49a4e74c414495cd9e36269608f6"
  },
  {
    "url": "js/app/pages/bc8ffbb70c5786945962ce782fae415c.min.js",
    "revision": "bc8ffbb70c5786945962ce782fae415c"
  },
  {
    "url": "js/app/pages/cart.js",
    "revision": "290939b52da16637bf4428ce5b36b49f"
  },
  {
    "url": "js/app/pages/config.js",
    "revision": "3a6d0bd3bd287f971b6407b8c67bfd28"
  },
  {
    "url": "js/app/pages/contact.js",
    "revision": "de3826621ddf07200a233460b4bdb35c"
  },
  {
    "url": "js/app/pages/de0777d1bf65a3df5578b791ff660949.min.js",
    "revision": "de0777d1bf65a3df5578b791ff660949"
  },
  {
    "url": "js/app/pages/ebb36cf208e8a8110dc904b28c8a2bf0.min.js",
    "revision": "ebb36cf208e8a8110dc904b28c8a2bf0"
  },
  {
    "url": "js/app/pages/event.js",
    "revision": "1f0f4b7d8422ae52aa0bb436024d3cca"
  },
  {
    "url": "js/app/pages/events.js",
    "revision": "f67f36b4842162a2161e451afaa5dd27"
  },
  {
    "url": "js/app/pages/home.js",
    "revision": "9d734649ff5de83a7815902ffa71c43e"
  },
  {
    "url": "js/app/pages/login.js",
    "revision": "a8967451d928a242c3d9c53432041bdc"
  },
  {
    "url": "js/app/pages/profile.js",
    "revision": "e7fcd4ff408ce0a6e6f13d2b50f39855"
  },
  {
    "url": "js/app/pages/ticket.js",
    "revision": "73f4463ae410f3529cbdf13cb4482da7"
  },
  {
    "url": "js/app/pages/tickets.js",
    "revision": "bc681ffba65e965267f378a4e9345117"
  },
  {
    "url": "js/libs/2ae25530a0dd28f30ca44f5182f0de61.min.js",
    "revision": "2ae25530a0dd28f30ca44f5182f0de61"
  },
  {
    "url": "js/libs/470bb9da4a68c224d0034b1792dcbd77.min.js",
    "revision": "470bb9da4a68c224d0034b1792dcbd77"
  },
  {
    "url": "js/libs/aa0a8a25292f1dc72b1bee3bd358d477.min.js",
    "revision": "aa0a8a25292f1dc72b1bee3bd358d477"
  },
  {
    "url": "js/libs/ca901f49ff220b077f4252d2f1140c68.min.js",
    "revision": "ca901f49ff220b077f4252d2f1140c68"
  },
  {
    "url": "js/libs/lazy.images.js",
    "revision": "62b2de630217387e055c490e91c2f584"
  },
  {
    "url": "js/libs/localforage.min.js",
    "revision": "b81ba364dcfb998510b178ddeed732f1"
  },
  {
    "url": "js/libs/mustache.min.js",
    "revision": "fbc40afb6aab560e860628150a01f0bd"
  },
  {
    "url": "js/libs/polyfils/es6-promise.min.js",
    "revision": "31aeda49e61353665d69f6da5934aec1"
  },
  {
    "url": "js/libs/polyfils/fetch.js",
    "revision": "24beb9fe6e5f892b11fe1cb929f2c293"
  },
  {
    "url": "js/libs/polyfils/intersection-observer.js",
    "revision": "cad2561aa2e609c7807fbc023059a1cb"
  },
  {
    "url": "js/libs/polyfils/object.assign.js",
    "revision": "a9a0e93920184898291ee63e5d35896b"
  },
  {
    "url": "js/libs/utils.js",
    "revision": "5ea712a557c1990fc501c0ba37249e9d"
  },
  {
    "url": "login/index.html",
    "revision": "84c30f77ad1a903d501a586e91e06d4f"
  },
  {
    "url": "manifest.json",
    "revision": "5bfb88be22d2074e406645b3a5161036"
  },
  {
    "url": "meta/android/android-launchericon-144-144.png",
    "revision": "fb779620b0fe24689db35a02515952d5"
  },
  {
    "url": "meta/android/android-launchericon-192-192.png",
    "revision": "b442abc14971d7333293a5e81bb72693"
  },
  {
    "url": "meta/android/android-launchericon-48-48.png",
    "revision": "dae658f5372af93a2660bc0a748dedd8"
  },
  {
    "url": "meta/android/android-launchericon-512-512.png",
    "revision": "ef12732844d9b7e2ddc2647789473f0d"
  },
  {
    "url": "meta/android/android-launchericon-72-72.png",
    "revision": "ff28d0e779a9bf646bcb97564f82d2f2"
  },
  {
    "url": "meta/android/android-launchericon-96-96.png",
    "revision": "2560debf3bf97be4b8d57874acd96bc2"
  },
  {
    "url": "meta/chrome/chrome-extensionmanagementpage-48-48.png",
    "revision": "dae658f5372af93a2660bc0a748dedd8"
  },
  {
    "url": "meta/chrome/chrome-favicon-16-16.png",
    "revision": "4f12c0cfd4eaa28f7a6babff996737d6"
  },
  {
    "url": "meta/chrome/chrome-installprocess-128-128.png",
    "revision": "422232ee5ed7ac9b7c83a2c779611ff3"
  },
  {
    "url": "meta/firefox/firefox-general-128-128.png",
    "revision": "422232ee5ed7ac9b7c83a2c779611ff3"
  },
  {
    "url": "meta/firefox/firefox-general-16-16.png",
    "revision": "4f12c0cfd4eaa28f7a6babff996737d6"
  },
  {
    "url": "meta/firefox/firefox-general-256-256.png",
    "revision": "8e16225cdea361963a6686738507ca06"
  },
  {
    "url": "meta/firefox/firefox-general-32-32.png",
    "revision": "36302ced74df2e054096273e3a439316"
  },
  {
    "url": "meta/firefox/firefox-general-48-48.png",
    "revision": "dae658f5372af93a2660bc0a748dedd8"
  },
  {
    "url": "meta/firefox/firefox-general-64-64.png",
    "revision": "c3b2e6cbcb8d344da52e9078f8c0dfd2"
  },
  {
    "url": "meta/firefox/firefox-general-90-90.png",
    "revision": "413a5f1f1ac61df128b77e2cf118af5b"
  },
  {
    "url": "meta/firefox/firefox-marketplace-128-128.png",
    "revision": "422232ee5ed7ac9b7c83a2c779611ff3"
  },
  {
    "url": "meta/firefox/firefox-marketplace-512-512.png",
    "revision": "ef12732844d9b7e2ddc2647789473f0d"
  },
  {
    "url": "meta/icons.json",
    "revision": "172142be2f4df9510ea5bcefb86e72a5"
  },
  {
    "url": "meta/ios/ios-appicon-1024-1024.png",
    "revision": "1174e7d0701270c3e92edfc691c40c7b"
  },
  {
    "url": "meta/ios/ios-appicon-120-120.png",
    "revision": "61eb84a98c2afd55acbea5020a34d3eb"
  },
  {
    "url": "meta/ios/ios-appicon-152-152.png",
    "revision": "320046db07610f63bac2558f73465717"
  },
  {
    "url": "meta/ios/ios-appicon-180-180.png",
    "revision": "9435c0839712d785eb9699e5ecd61cb2"
  },
  {
    "url": "meta/ios/ios-appicon-76-76.png",
    "revision": "467ad7564824d1384c6514780e0ff5e9"
  },
  {
    "url": "meta/ios/ios-launchimage-1024-768.png",
    "revision": "e6f5d27a9830476db70f018831799268"
  },
  {
    "url": "meta/ios/ios-launchimage-1242-2208.png",
    "revision": "77fabb7af39d4a287156a23c66c367f7"
  },
  {
    "url": "meta/ios/ios-launchimage-1334-750.png",
    "revision": "425d32f43d9882c972d4919e958e7ea6"
  },
  {
    "url": "meta/ios/ios-launchimage-1536-2048.png",
    "revision": "b7e3ff09a1d36d8190f2a75ccda626af"
  },
  {
    "url": "meta/ios/ios-launchimage-2048-1536.png",
    "revision": "a90fb675186884d4955707d9e00cc287"
  },
  {
    "url": "meta/ios/ios-launchimage-2208-1242.png",
    "revision": "4736579d89a6fab452cdf11d3e1f7e96"
  },
  {
    "url": "meta/ios/ios-launchimage-640-1136.png",
    "revision": "f9ee1660379233f4488f47fffe03bde2"
  },
  {
    "url": "meta/ios/ios-launchimage-640-960.png",
    "revision": "58f3084c89e0680df91750d5ec30d099"
  },
  {
    "url": "meta/ios/ios-launchimage-750-1334.png",
    "revision": "c3ce365e8c333d99fe88dc2ef7b44892"
  },
  {
    "url": "meta/ios/ios-launchimage-768-1024.png",
    "revision": "dd6e56fd0a8586808b3926ed7f0b0163"
  },
  {
    "url": "meta/windows/windows-smallsquare-24-24.png",
    "revision": "55133367b2b9cd08ccdd8ca8a2e12ae0"
  },
  {
    "url": "meta/windows/windows-smallsquare-30-30.png",
    "revision": "527f98434ac947bf806401ff7aca5471"
  },
  {
    "url": "meta/windows/windows-smallsquare-42-42.png",
    "revision": "d562c5f4f3b18f888cfa2ad84e3f7370"
  },
  {
    "url": "meta/windows/windows-smallsquare-54-54.png",
    "revision": "696be1b7c89bbf3a801a35ba48ef5bf0"
  },
  {
    "url": "meta/windows/windows-splashscreen-1116-540.png",
    "revision": "b49577cfebfff976571cbf5d3193c192"
  },
  {
    "url": "meta/windows/windows-splashscreen-620-300.png",
    "revision": "b890ebeab33b62fbde2cfc437584f09e"
  },
  {
    "url": "meta/windows/windows-splashscreen-868-420.png",
    "revision": "a13c5f064232582a2fcb195b521c1840"
  },
  {
    "url": "meta/windows/windows-squarelogo-120-120.png",
    "revision": "61eb84a98c2afd55acbea5020a34d3eb"
  },
  {
    "url": "meta/windows/windows-squarelogo-150-150.png",
    "revision": "93ca8a40b0cb401aa2d7c3db863e7d52"
  },
  {
    "url": "meta/windows/windows-squarelogo-210-210.png",
    "revision": "6fad619a23dbf75cabc48acb1714dfb2"
  },
  {
    "url": "meta/windows/windows-squarelogo-270-270.png",
    "revision": "2e032fb6a62096e678a5cb37f3269132"
  },
  {
    "url": "meta/windows/windows-storelogo-50-50.png",
    "revision": "ddb5795d97a209f36f3ba78b998930b7"
  },
  {
    "url": "meta/windows/windows-storelogo-70-70.png",
    "revision": "fe9ebf8cbdd521eb9e4b94eed5d50182"
  },
  {
    "url": "meta/windows/windows-storelogo-90-90.png",
    "revision": "413a5f1f1ac61df128b77e2cf118af5b"
  },
  {
    "url": "meta/windows/windowsphone-appicon-106-106.png",
    "revision": "8a920cf567ede98a2ff64dd8ba88bd0f"
  },
  {
    "url": "meta/windows/windowsphone-appicon-44-44.png",
    "revision": "cf2caa6202603fea3f99e1602a6788d1"
  },
  {
    "url": "meta/windows/windowsphone-appicon-62-62.png",
    "revision": "21a91f69636d6bcd6a0775cb260770b1"
  },
  {
    "url": "meta/windows/windowsphone-mediumtile-150-150.png",
    "revision": "93ca8a40b0cb401aa2d7c3db863e7d52"
  },
  {
    "url": "meta/windows/windowsphone-mediumtile-210-210.png",
    "revision": "6fad619a23dbf75cabc48acb1714dfb2"
  },
  {
    "url": "meta/windows/windowsphone-mediumtile-360-360.png",
    "revision": "ed6ea00991ce4417a1c094bb04deb6a5"
  },
  {
    "url": "meta/windows/windowsphone-smalltile-170-170.png",
    "revision": "2470119071d7a4475d5aa5ba1acf41bb"
  },
  {
    "url": "meta/windows/windowsphone-smalltile-71-71.png",
    "revision": "07093618e87f2c148fdd42ad1b5e68d9"
  },
  {
    "url": "meta/windows/windowsphone-smalltile-99-99.png",
    "revision": "6ea4035d018e5101d4cffe4fe5fd5731"
  },
  {
    "url": "meta/windows/windowsphone-storelogo-120-120.png",
    "revision": "61eb84a98c2afd55acbea5020a34d3eb"
  },
  {
    "url": "meta/windows/windowsphone-storelogo-50-50.png",
    "revision": "ddb5795d97a209f36f3ba78b998930b7"
  },
  {
    "url": "meta/windows/windowsphone-storelogo-70-70.png",
    "revision": "fe9ebf8cbdd521eb9e4b94eed5d50182"
  },
  {
    "url": "meta/windows10/SplashScreen.scale-100.png",
    "revision": "b890ebeab33b62fbde2cfc437584f09e"
  },
  {
    "url": "meta/windows10/SplashScreen.scale-125.png",
    "revision": "248993eef8a5cfdcba48b9a27b308c2c"
  },
  {
    "url": "meta/windows10/SplashScreen.scale-150.png",
    "revision": "d7755fb070ac472d9acd12eede5ffb6a"
  },
  {
    "url": "meta/windows10/SplashScreen.scale-200.png",
    "revision": "439fea3e065956be858dff50a611f822"
  },
  {
    "url": "meta/windows10/SplashScreen.scale-400.png",
    "revision": "75c21a787f8f6ec7325cf42ad5f0800e"
  },
  {
    "url": "meta/windows10/Square150x150Logo.scale-100.png",
    "revision": "93ca8a40b0cb401aa2d7c3db863e7d52"
  },
  {
    "url": "meta/windows10/Square150x150Logo.scale-125.png",
    "revision": "2e49422787166dc3a04637fc7593fc71"
  },
  {
    "url": "meta/windows10/Square150x150Logo.scale-150.png",
    "revision": "0998e6a9c9b33463393ae940211e5bc6"
  },
  {
    "url": "meta/windows10/Square150x150Logo.scale-200.png",
    "revision": "9b93b615b24879083283b2de60845ed0"
  },
  {
    "url": "meta/windows10/Square150x150Logo.scale-400.png",
    "revision": "752fc1d5864dad93300e953e9fb8631c"
  },
  {
    "url": "meta/windows10/Square310x310Logo.scale-100.png",
    "revision": "53ab8f660326221e6aa3c7d071eee0d7"
  },
  {
    "url": "meta/windows10/Square310x310Logo.scale-125.png",
    "revision": "6dd6e16bff388f328e5d8c9b270ac6fc"
  },
  {
    "url": "meta/windows10/Square310x310Logo.scale-150.png",
    "revision": "d520ffcb9dc95edfca961aa5a8b11b34"
  },
  {
    "url": "meta/windows10/Square310x310Logo.scale-200.png",
    "revision": "05ada8100fd82c32d54d61583d1f3cda"
  },
  {
    "url": "meta/windows10/Square310x310Logo.scale-400.png",
    "revision": "8f97573b7d08a174a66f9b37bcf2fd19"
  },
  {
    "url": "meta/windows10/Square44x44Logo.scale-100.png",
    "revision": "cf2caa6202603fea3f99e1602a6788d1"
  },
  {
    "url": "meta/windows10/Square44x44Logo.scale-125.png",
    "revision": "512dc710f8eacd720082a5305908f47b"
  },
  {
    "url": "meta/windows10/Square44x44Logo.scale-150.png",
    "revision": "c65b44b549cfaad19cd7d1adf72c2023"
  },
  {
    "url": "meta/windows10/Square44x44Logo.scale-200.png",
    "revision": "eaacf9ef79cf909229dae4c1c380da01"
  },
  {
    "url": "meta/windows10/Square44x44Logo.scale-400.png",
    "revision": "774c83f6777f60e5e6289367a57361fd"
  },
  {
    "url": "meta/windows10/Square44x44Logo.targetsize-16_altform-unplated.png",
    "revision": "4f12c0cfd4eaa28f7a6babff996737d6"
  },
  {
    "url": "meta/windows10/Square44x44Logo.targetsize-16.png",
    "revision": "4f12c0cfd4eaa28f7a6babff996737d6"
  },
  {
    "url": "meta/windows10/Square44x44Logo.targetsize-24_altform-unplated.png",
    "revision": "55133367b2b9cd08ccdd8ca8a2e12ae0"
  },
  {
    "url": "meta/windows10/Square44x44Logo.targetsize-24.png",
    "revision": "55133367b2b9cd08ccdd8ca8a2e12ae0"
  },
  {
    "url": "meta/windows10/Square44x44Logo.targetsize-256_altform-unplated.png",
    "revision": "8e16225cdea361963a6686738507ca06"
  },
  {
    "url": "meta/windows10/Square44x44Logo.targetsize-256.png",
    "revision": "8e16225cdea361963a6686738507ca06"
  },
  {
    "url": "meta/windows10/Square44x44Logo.targetsize-48_altform-unplated.png",
    "revision": "dae658f5372af93a2660bc0a748dedd8"
  },
  {
    "url": "meta/windows10/Square44x44Logo.targetsize-48.png",
    "revision": "dae658f5372af93a2660bc0a748dedd8"
  },
  {
    "url": "meta/windows10/Square71x71Logo.scale-100.png",
    "revision": "07093618e87f2c148fdd42ad1b5e68d9"
  },
  {
    "url": "meta/windows10/Square71x71Logo.scale-125.png",
    "revision": "c63951f20cd80adf052deffc822410d7"
  },
  {
    "url": "meta/windows10/Square71x71Logo.scale-150.png",
    "revision": "33f50b8fc997776eaa814b60a76fc49b"
  },
  {
    "url": "meta/windows10/Square71x71Logo.scale-200.png",
    "revision": "c1b3a9b8514bde1ae1a4b7b604b06ca6"
  },
  {
    "url": "meta/windows10/Square71x71Logo.scale-400.png",
    "revision": "05e2cbfd0f0ca3b8d484b48eb7d55f31"
  },
  {
    "url": "meta/windows10/StoreLogo.png",
    "revision": "ddb5795d97a209f36f3ba78b998930b7"
  },
  {
    "url": "meta/windows10/StoreLogo.scale-100.png",
    "revision": "ddb5795d97a209f36f3ba78b998930b7"
  },
  {
    "url": "meta/windows10/StoreLogo.scale-125.png",
    "revision": "842e521c8d1d82f2dfff27f5e9e6500f"
  },
  {
    "url": "meta/windows10/StoreLogo.scale-150.png",
    "revision": "8aeeb2800d9af6be1cbe621eacb4263e"
  },
  {
    "url": "meta/windows10/StoreLogo.scale-200.png",
    "revision": "5e54ec17392e81b64378d8425604f738"
  },
  {
    "url": "meta/windows10/StoreLogo.scale-400.png",
    "revision": "663b28d85ae57d574e63be44475b6c49"
  },
  {
    "url": "meta/windows10/Wide310x150Logo.scale-100.png",
    "revision": "1bf60404ec5e2eeece81e99e112cfc89"
  },
  {
    "url": "meta/windows10/Wide310x150Logo.scale-125.png",
    "revision": "177eb1971e732e3512b89167d68eb543"
  },
  {
    "url": "meta/windows10/Wide310x150Logo.scale-150.png",
    "revision": "1078c099d7066062427bc21ec6677831"
  },
  {
    "url": "meta/windows10/Wide310x150Logo.scale-200.png",
    "revision": "b890ebeab33b62fbde2cfc437584f09e"
  },
  {
    "url": "meta/windows10/Wide310x150Logo.scale-400.png",
    "revision": "439fea3e065956be858dff50a611f822"
  },
  {
    "url": "notfound/index.html",
    "revision": "c6fda6f403e1cc8be14390efc08fcc28"
  },
  {
    "url": "profile/index.html",
    "revision": "d0bfa31a411a65922eaf65ec31b709a8"
  },
  {
    "url": "signup/index.html",
    "revision": "75d35f5db3f1717590c361103338cce5"
  },
  {
    "url": "sw.generated.js",
    "revision": "e9a88bcd322c4a8140fe04d3b332d396"
  },
  {
    "url": "sw.src.js",
    "revision": "fee9d0c1b0989a15414318e9ef913159"
  },
  {
    "url": "sw/cache-control-parser.js",
    "revision": "0927a7b2e3209b1ef566ce952a3cfb5c"
  },
  {
    "url": "sw/cache-manifest.js",
    "revision": "e264def474f0b2e19802939f6a400394"
  },
  {
    "url": "sw/cache.manifest",
    "revision": "2fabdc028b273484bb7dfaf3d3cdadff"
  },
  {
    "url": "sw/date-mgr.js",
    "revision": "4fbec45bb99b4c1fac920b3bdd52e878"
  },
  {
    "url": "sw/invalidation-mgr.js",
    "revision": "0d4decaaa1868956ff5232e58a79f8bb"
  },
  {
    "url": "sw/request-mgr.js",
    "revision": "0be3857aa281ae26c7f4f3c77c623ebf"
  },
  {
    "url": "sw/response-mgr.js",
    "revision": "12ce0ad85c2ddbb42c7ecb6223506359"
  },
  {
    "url": "sw/storage-mgr.js",
    "revision": "53a438e399cc90556698b122015148e5"
  },
  {
    "url": "sw/strategy-mgr.js",
    "revision": "95749a41622904e7a8f269df853befce"
  },
  {
    "url": "sw/sw-push-manager.js",
    "revision": "906103e4ef32ab74685894eae96c93b3"
  },
  {
    "url": "sw/workbox-sw.prod.v2.1.1.js",
    "revision": "f1cd0b1cbd1bab95b0699b558db84172"
  },
  {
    "url": "sw/workbox-v3.2.0/workbox-background-sync.dev.js",
    "revision": "0eda3090463b8cd36457401a8872fb48"
  },
  {
    "url": "sw/workbox-v3.2.0/workbox-background-sync.prod.js",
    "revision": "2002a84c63d5833a034982cdd16f6a93"
  },
  {
    "url": "sw/workbox-v3.2.0/workbox-broadcast-cache-update.dev.js",
    "revision": "4ca06f2d6ba378d4d027c1cc8607009e"
  },
  {
    "url": "sw/workbox-v3.2.0/workbox-broadcast-cache-update.prod.js",
    "revision": "c7474a7cde8821130994c942d6c7d0af"
  },
  {
    "url": "sw/workbox-v3.2.0/workbox-cache-expiration.dev.js",
    "revision": "e9717c44a4faba9a8626459d41aaa3fb"
  },
  {
    "url": "sw/workbox-v3.2.0/workbox-cache-expiration.prod.js",
    "revision": "d063232af6ebedfade7a752c1d7069c4"
  },
  {
    "url": "sw/workbox-v3.2.0/workbox-cacheable-response.dev.js",
    "revision": "0ef20f214db2ff13ab0856fafe7d086e"
  },
  {
    "url": "sw/workbox-v3.2.0/workbox-cacheable-response.prod.js",
    "revision": "85567843933de37dd9012e95572f601b"
  },
  {
    "url": "sw/workbox-v3.2.0/workbox-core.dev.js",
    "revision": "300366d76f9ebb1ce2901d3ed3e27963"
  },
  {
    "url": "sw/workbox-v3.2.0/workbox-core.prod.js",
    "revision": "98251a98e107d94d737cb19c1f3bcec7"
  },
  {
    "url": "sw/workbox-v3.2.0/workbox-google-analytics.dev.js",
    "revision": "5cd2df38446cd79f66f201242332e486"
  },
  {
    "url": "sw/workbox-v3.2.0/workbox-google-analytics.prod.js",
    "revision": "e3bb65a3ac584ab819b9ef71517bfbf1"
  },
  {
    "url": "sw/workbox-v3.2.0/workbox-precaching.dev.js",
    "revision": "27e10c95149800bd15fa2b6acfc8e669"
  },
  {
    "url": "sw/workbox-v3.2.0/workbox-precaching.prod.js",
    "revision": "de0f145c9f78f661021a5f9681e4efd4"
  },
  {
    "url": "sw/workbox-v3.2.0/workbox-range-requests.dev.js",
    "revision": "a5bd2b4986b2c18794436c53ae31ca24"
  },
  {
    "url": "sw/workbox-v3.2.0/workbox-range-requests.prod.js",
    "revision": "2dbb3fc265b9f5e69ef22bf6eec6d190"
  },
  {
    "url": "sw/workbox-v3.2.0/workbox-routing.dev.js",
    "revision": "516481e6cd7ada440ef487fb7190a8b3"
  },
  {
    "url": "sw/workbox-v3.2.0/workbox-routing.prod.js",
    "revision": "ff45303634e5cf943cdf2866e9397452"
  },
  {
    "url": "sw/workbox-v3.2.0/workbox-strategies.dev.js",
    "revision": "980222f516b558783f91e8871a1595fb"
  },
  {
    "url": "sw/workbox-v3.2.0/workbox-strategies.prod.js",
    "revision": "e4248e696e5647cb1ff9b01f825f002a"
  },
  {
    "url": "sw/workbox-v3.2.0/workbox-streams.dev.js",
    "revision": "db59c481c2e63f96c1279684b2890f3c"
  },
  {
    "url": "sw/workbox-v3.2.0/workbox-streams.prod.js",
    "revision": "005fd88f751522ec30f36ca7c7657e84"
  },
  {
    "url": "sw/workbox-v3.2.0/workbox-sw.js",
    "revision": "bb7d64a121c44e6670d91290df6a5406"
  },
  {
    "url": "templates/-page.html",
    "revision": "5bd3ba601f627cedcd0e57cbe83409d5"
  },
  {
    "url": "templates/cart-page.html",
    "revision": "bdb731cf7f57227d2c85ffee49fadeb9"
  },
  {
    "url": "templates/cart.html",
    "revision": "86d2e273379889ff39ac71a9b6edde70"
  },
  {
    "url": "templates/config-page.html",
    "revision": "93f61ab83f250089e1d8d3cde9492666"
  },
  {
    "url": "templates/contact-page.html",
    "revision": "5dfbd3a354a67b3efb8dea231355cbad"
  },
  {
    "url": "templates/event-list.html",
    "revision": "124f1f8b81993ad61ab3951e73e433e6"
  },
  {
    "url": "templates/event-page.html",
    "revision": "6e73cd144c72039c181bd21b5e42c9a7"
  },
  {
    "url": "templates/event.html",
    "revision": "f9aa2830a0d8ae825b0b4eea03c282db"
  },
  {
    "url": "templates/events-page.html",
    "revision": "70ebe57cfdf5b3342ef53df9ff3aed50"
  },
  {
    "url": "templates/fallback-page.html",
    "revision": "d03fa5c7471ec4c84ca8bf8fefaddc2b"
  },
  {
    "url": "templates/login-page.html",
    "revision": "84c30f77ad1a903d501a586e91e06d4f"
  },
  {
    "url": "templates/notfound-page.html",
    "revision": "c6fda6f403e1cc8be14390efc08fcc28"
  },
  {
    "url": "templates/profile-page.html",
    "revision": "3322da886d611d585068ee8fd825d0e2"
  },
  {
    "url": "templates/profile.html",
    "revision": "06430e027bc528f949b5ad5f1eda7188"
  },
  {
    "url": "templates/signup-page.html",
    "revision": "75d35f5db3f1717590c361103338cce5"
  },
  {
    "url": "templates/ticket-list.html",
    "revision": "1d600fc58287ad11eac8efe85e6b0c41"
  },
  {
    "url": "templates/ticket-page.html",
    "revision": "f351df4fc9f62d324a62313cb0171547"
  },
  {
    "url": "templates/ticket.html",
    "revision": "e09d2aa5e76f2f3a9fcf53b73735ba47"
  },
  {
    "url": "templates/tickets-page.html",
    "revision": "1a34bb27c397de18a053158dca924f5b"
  },
  {
    "url": "templates/user.html",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "ticket/index.html",
    "revision": "cffac1495cf15452628009e589240dff"
  },
  {
    "url": "tickets/index.html",
    "revision": "8a1c7cb2eca957e6b345760416c6e7dd"
  },
  {
    "url": "workbox-config.js",
    "revision": "9777f2b178532639cc5d4df5598fe3dd"
  }
]);


function getCacheName(url) {

    var cacheName = dynamicCache;

    if (/\/event\//.test(url)) {

        cacheName = eventsCacheName;

    }

    return cacheName;

}


if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);
} else {
    console.log(`Boo! Workbox didn't load 😬`);
}

