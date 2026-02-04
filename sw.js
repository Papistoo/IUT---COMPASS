const CACHE_NAME = 'iut-compass-v3-robust';

// 1. Fichiers vitaux à mettre en cache immédiatement
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/index.tsx', // Point d'entrée critique
  'https://cdn.tailwindcss.com' // CSS critique
];

// Installation
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Force l'activation immédiate
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // On ne bloque pas l'installation si un fichier non-critique échoue
      return cache.addAll(PRECACHE_ASSETS).catch(err => console.warn("Precache warning:", err));
    })
  );
});

// Activation
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim(); // Prend le contrôle de tous les clients immédiatement
});

// Interception des requêtes
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // A. EXCLUSION : Ne pas cacher les requêtes API (Firebase/Firestore) ou Auth
  // Cela évite les problèmes de données périmées ou d'authentification
  if (url.hostname.includes('googleapis.com') || 
      url.hostname.includes('firebase') || 
      url.pathname.includes('firestore')) {
    return; // Network Only par défaut
  }

  // B. NAVIGATION (HTML) : Network First -> Fallback Cache
  // Permet d'avoir toujours la dernière version de l'app si en ligne
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          // Si hors ligne, on sert index.html
          return caches.match('/index.html');
        })
    );
    return;
  }

  // C. ASSETS (JS, CSS, TSX, IMAGES, FONTS) : Stale-While-Revalidate
  // C'est ici que la magie opère pour le mode hors-ligne
  // On inclut : esm.sh (React), les fichiers locaux .tsx, Tailwind, etc.
  const isAsset = 
    url.hostname === 'esm.sh' || 
    url.hostname === 'cdn.tailwindcss.com' ||
    url.hostname === 'fonts.googleapis.com' ||
    url.hostname === 'fonts.gstatic.com' ||
    url.pathname.endsWith('.tsx') ||
    url.pathname.endsWith('.ts') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.svg');

  if (isAsset) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          // Stratégie : On sert le cache tout de suite (rapide)
          // ET on met à jour le cache en arrière-plan pour la prochaine fois
          const fetchPromise = fetch(event.request).then((networkResponse) => {
            // Vérification basique avant de cacher
            if (networkResponse && networkResponse.status === 200) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => {
            // Si échec réseau, on ne fait rien (le cache a déjà été retourné si dispo)
          });

          return cachedResponse || fetchPromise;
        });
      })
    );
  }
});