const CACHE_NAME = `Triathlete`

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME)

      // Assets to be cached are manually added/ updated after building with vite
      // I could have used the vite-plugin-pwa to manage and do this automatically
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
        "/assets/index-D2FDjxG8.js"
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

self.addEventListener("fetch", (event) => {
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
