/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
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
    "url": "html/polyfils.html",
    "revision": "337170ad8814e7571a7b8ddb8831ae04"
  },
  {
    "url": "humans.txt",
    "revision": "cb60248dc67a1a2d02177fee9dfa4976"
  },
  {
    "url": "index.html",
    "revision": "f2a0f6a694a18818ecdc921b0fbea041"
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
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
