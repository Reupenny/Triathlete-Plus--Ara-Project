const CACHE_NAME = `Triathlete`

// Use the install event to pre-cache all initial resources.
// this install event will be triggered only once when the service worker is first installed
self.addEventListener("install", (event) => {
  /*
  event.waitUntil is a method that extends the lifetime of the install event until the promise 
  passed to it is resolved or rejected. This ensures that the service worker installation is not 
  considered complete until the caching operation is finished.
  */
  event.waitUntil(
    (async () => {
      // caches is a global variable that is provided by the browser. A Cache object uses a 
      // key-value store data structure, also known as a map or a dictionary. Each key is a 
      // Request object, which represents a URL or a network request, and the corresponding 
      // value is a Response object, which represents the cached response to that request.

      // caches refers to the cache storage provided by the browser.

      // caches.open(CACHE_NAME) returns a promise that resolves to the cache object specified 
      // by CACHE_NAME.
      const cache = await caches.open(CACHE_NAME)

      // cache.addAll takes an array of URLs and adds them to the cache.
      /**
       * The "/" in the cache.addAll method refers to the root URL of the website, often the index 
       * page or the homepage. By caching this URL, the service worker is storing a copy of the 
       * initial HTML page that is served when a user visits the website. This means that if the 
       * user goes offline or the network connection is lost, the service worker can still serve 
       * the cached version of the homepage, allowing the user to see some content even without 
       * a network connection. 
       * Note that this only caches the HTML page itself, not any additional resources it may link 
       * to, such as images, stylesheets, or scripts. Those would need to be cached separately, 
       * like the converter.js and converter.css files in the original code snippet.
       */
      const assets = [
        "/",
        "./assets/images/apple-touch-icon.webp",
        "./assets/images/favicon-16x16.png",
        "./assets/images/favicon-32x32.png",
        "./assets/images/favicon.ico",
        "./assets/images/icon192.png",
        "./assets/images/icon512.png",
        "./assets/Logo-D1p5Mq8D.webp",
        "./assets/Icons-B4YL_DAL.eot",
        "./assets/Icons-DCT8MgtH.svg",
        "./assets/app-0zWIKYRp.webmanifest",
        "/assets/index-DIAefYK5.css",
        "/assets/index-CF-PrvgX.js"
      ];
      for (const asset of assets) {
        try {
          await cache.add(asset);
          console.log('cached asset', asset);
        } catch (e) {
          console.error('Failed to cache asset', asset, e);
        }
      }
    })()
  )
})

/*
The fetch event is triggered when the service worker is trying to fetch a resource from the network.
When a service worker handles the "fetch" event by appling a cache-first strategy, it checks if a 
requested resource is available in the cache. If it is, the cached response is returned. If not, it 
attempts to fetch the resource from the network, caches the response, and returns it. If the network 
request fails, it does not return anything.
*/
self.addEventListener("fetch", (event) => {
  // event.respondWith is a method that allows a service worker to take control of the response to 
  // a network request. It enables the service worker to return a custom response, such as a cached 
  // response, instead of waiting for the network request to complete.
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME)

      // Get the resource from the cache.
      const cachedResponse = await cache.match(event.request)
      if (cachedResponse) {
        return cachedResponse
      } else {
        try {
          // If the resource was not in the cache, try the network.
          const fetchResponse = await fetch(event.request)

          // Save the resource in the cache and return it.
          cache.put(event.request, fetchResponse.clone())
          return fetchResponse
        } catch (e) {
          // The network failed.

        }
      }
    })()
  )
})
