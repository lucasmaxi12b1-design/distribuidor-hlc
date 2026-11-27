// Service worker: guarda una copia de la página pública para que abra rápido
// y se pueda ver algo aunque no haya internet.
// ⚠️ Las pantallas privadas (espacio del alumno y panel) NUNCA se guardan,
// para que nadie vea datos de otra persona en un celular compartido.
// Si cambiás este archivo, subí el número de versión para que se actualice.
const VERSION = "v2";
const CACHE = `coaching-${VERSION}`;
const PRIVADAS = ["/mi-espacio", "/panel", "/ingresar", "/registro"];

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

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;
  // Pantallas privadas: siempre van directo a internet, sin guardar nada
  if (PRIVADAS.some((ruta) => url.pathname.startsWith(ruta))) return;

  // Lo demás: primero internet (así siempre ves lo último); sin conexión, la copia guardada
  event.respondWith(
    fetch(request)
      .then((respuesta) => {
        if (respuesta.ok) {
          const copia = respuesta.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copia));
        }
        return respuesta;
      })
      .catch(() => caches.match(request).then((r) => r || caches.match("/")))
  );
});
