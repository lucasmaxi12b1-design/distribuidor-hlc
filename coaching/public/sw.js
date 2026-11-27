// Service worker: guarda una copia de la página para que abra rápido
// y se pueda ver algo aunque no haya internet.
// Si cambiás este archivo, subí el número de versión para que se actualice.
const VERSION = "v1";
const CACHE = `coaching-${VERSION}`;

// Al instalarse, guarda la página principal
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.add("/")));
  self.skipWaiting();
});

// Borra copias viejas cuando hay una versión nueva
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((claves) => Promise.all(claves.filter((c) => c !== CACHE).map((c) => caches.delete(c))))
  );
  self.clients.claim();
});

// Cada pedido: primero intenta internet (así siempre ves lo último);
// si no hay conexión, usa la copia guardada.
self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) return;

  event.respondWith(
    fetch(request)
      .then((respuesta) => {
        const copia = respuesta.clone();
        caches.open(CACHE).then((cache) => cache.put(request, copia));
        return respuesta;
      })
      .catch(() => caches.match(request).then((r) => r || caches.match("/")))
  );
});
