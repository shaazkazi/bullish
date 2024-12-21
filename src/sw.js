self.addEventListener("install", (event) => {
    event.waitUntil(
      caches.open("v1").then((cache) => {
        return cache.addAll(["/", "/index.html", "/src/main.jsx", "/src/App.jsx", "/index.css"]);
      })
    );
  });
  
  self.addEventListener("fetch", (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  
  self.addEventListener("push", (event) => {
    const options = {
      body: event.data.text(),
      icon: "/vite.svg",
      badge: "/vite.svg",
    };
    event.waitUntil(self.registration.showNotification("Bullish Alert", options));
  });
  