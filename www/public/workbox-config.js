module.exports = {
  "globDirectory": "C:\\Source Code\\PWA\\pwa-ticket\\www\\public",
  "globPatterns": [
    "**/*.{html,eot,svg,ttf,woff,woff2,png,txt,jpg,json,gif,manifest}"
  ],
  "globIgnores": ["qrcodes/*.gif", "img/venues/**/*.*", "img/people/*.*", "meta/**/*.*", 
    "html/pages/*.*", "css/webfonts/*.*", "img/pwa-tickets-logo*.*", "sw/cache.manifest"],
  "swDest": "C:\\Source Code\\PWA\\pwa-ticket\\www\\public\\sw.generated.js",
  "swSrc": "C:\\Source Code\\PWA\\pwa-ticket\\www\\public\\sw.src.js"
};