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

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "fachwortbuzzer/assets/fachwort.mp3",
    "revision": "12b122e1c770c196faa937d88aa60fc2"
  },
  {
    "url": "fachwortbuzzer/index.css",
    "revision": "45fe818f37abee13993bf181e7c30b0f"
  },
  {
    "url": "fachwortbuzzer/index.html",
    "revision": "be2ac5bfef67f82a2fe33c656ef4eab7"
  },
  {
    "url": "googleAnalytics.js",
    "revision": "0320da551a27534ce164a9673ade3d3a"
  },
  {
    "url": "index.css",
    "revision": "1dcfcf88df5d7a7c9745894c6588e049"
  },
  {
    "url": "index.html",
    "revision": "65c6d495aeb0f3e5041a46695a1c87fb"
  },
  {
    "url": "kalibrierung/assets/ding.mp3",
    "revision": "40ebd5347a75958e85c919d5608d4e2f"
  },
  {
    "url": "kalibrierung/assets/fachwort.mp4",
    "revision": "8ce2626a8da878fb0ea68de9b51a4f16"
  },
  {
    "url": "kalibrierung/assets/favicon.ico",
    "revision": "1f6630980a01c9bb0a636b2fc3d83ae3"
  },
  {
    "url": "kalibrierung/assets/marker_green.png",
    "revision": "3ca913f85c8be6c11f1df88e71c3a8aa"
  },
  {
    "url": "kalibrierung/assets/marker_red.png",
    "revision": "1ced1d79717472e0d8f9463a9ef1c199"
  },
  {
    "url": "kalibrierung/assets/pling.mp3",
    "revision": "568c452268d8a1df3b09d449f6b59232"
  },
  {
    "url": "kalibrierung/index-jQuery.js",
    "revision": "890ada2380afd0eb55b5e7a8a19d3d22"
  },
  {
    "url": "kalibrierung/index.css",
    "revision": "0da9e04a7034e8652e562bfdecbef26c"
  },
  {
    "url": "kalibrierung/index.html",
    "revision": "6783fa53f8d7e29b002d7f79699becd4"
  },
  {
    "url": "kalibrierung/index.js",
    "revision": "2089a2a4d9cb40ea2c440f554bc8fd7b"
  },
  {
    "url": "kalibrierung/submitGame.php",
    "revision": "cecab69ca0dc47599401830ee0bab43c"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
