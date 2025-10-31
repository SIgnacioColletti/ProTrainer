// ============================================
// ARCHIVO: service-worker.js
// ============================================

const CACHE_NAME = "protrainer-v1.0.0";
const RUNTIME_CACHE = "protrainer-runtime";

// Archivos a cachear en la instalación
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/pages/auth.html",
  "/pages/dashboard.html",
  "/pages/routines.html",
  "/pages/progress.html",
  "/pages/profile.html",
  "/pages/calculators.html",
  "/pages/analytics.html",
  "/css/styles.css",
  "/css/auth.css",
  "/css/dashboard.css",
  "/css/routines.css",
  "/css/progress.css",
  "/css/profile.css",
  "/css/calculators.css",
  "/css/analytics.css",
  "/css/achievements.css",
  "/js/firebaseConfig.js",
  "/js/script.js",
  "/js/auth.js",
  "/js/dashboard.js",
  "/js/routines.js",
  "/js/progress.js",
  "/js/profile.js",
  "/js/calculators.js",
  "/js/analytics.js",
  "/js/achievements.js",
  "/js/achievementsData.js",
  "/js/profileAchievements.js",
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
];

// URLs externas que NO se cachean
const EXTERNAL_URLS = [
  "https://fonts.googleapis.com",
  "https://fonts.gstatic.com",
  "https://www.gstatic.com/firebasejs",
  "https://cdn.jsdelivr.net",
];

// ========================================
// INSTALACIÓN DEL SERVICE WORKER
// ========================================

self.addEventListener("install", (event) => {
  console.log("🔧 Service Worker: Instalando...");

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("📦 Service Worker: Cacheando archivos estáticos");
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log("✅ Service Worker: Instalado correctamente");
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error("❌ Service Worker: Error en instalación", error);
      })
  );
});

// ========================================
// ACTIVACIÓN DEL SERVICE WORKER
// ========================================

self.addEventListener("activate", (event) => {
  console.log("🚀 Service Worker: Activando...");

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
              console.log(
                "🗑️ Service Worker: Eliminando caché antiguo",
                cacheName
              );
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log("✅ Service Worker: Activado correctamente");
        return self.clients.claim();
      })
  );
});

// ========================================
// INTERCEPTAR REQUESTS (FETCH)
// ========================================

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // No cachear requests de Firebase o APIs externas
  if (EXTERNAL_URLS.some((extUrl) => url.href.includes(extUrl))) {
    event.respondWith(fetch(request));
    return;
  }

  // No cachear POST requests
  if (request.method !== "GET") {
    event.respondWith(fetch(request));
    return;
  }

  // Estrategia: Network First, falling back to Cache
  event.respondWith(
    caches.open(RUNTIME_CACHE).then((cache) => {
      return fetch(request)
        .then((response) => {
          // Solo cachear respuestas exitosas
          if (response && response.status === 200) {
            cache.put(request, response.clone());
          }
          return response;
        })
        .catch(() => {
          // Si falla el network, buscar en caché
          return cache.match(request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }

            // Si no está en caché runtime, buscar en caché estático
            return caches.match(request);
          });
        });
    })
  );
});

// ========================================
// MANEJO DE MENSAJES
// ========================================

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }

  if (event.data && event.data.type === "CLEAR_CACHE") {
    caches.keys().then((cacheNames) => {
      cacheNames.forEach((cacheName) => {
        caches.delete(cacheName);
      });
    });
  }
});

// ========================================
// SYNC EN BACKGROUND (OPCIONAL)
// ========================================

self.addEventListener("sync", (event) => {
  if (event.tag === "sync-workouts") {
    event.waitUntil(syncWorkouts());
  }
});

async function syncWorkouts() {
  // Aquí podrías sincronizar entrenamientos offline
  console.log("🔄 Sincronizando entrenamientos...");
}

console.log("✅ Service Worker registrado");
