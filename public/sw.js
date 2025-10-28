const CACHE_NAME = 'ryck-dev-v1'
const STATIC_CACHE_URLS = [
  '/',
  '/blog',
  '/resume',
  '/stats',
  '/use',
  '/projects'
]

// Install event - cache static resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(async (cache) => {
        console.log('📦 Caching static resources')
        // Cache resources individually to handle failures gracefully
        const cachePromises = STATIC_CACHE_URLS.map(async (url) => {
          try {
            await cache.add(url)
            console.log('✅ Cached:', url)
          } catch (error) {
            console.warn('⚠️ Failed to cache:', url, error)
          }
        })
        await Promise.all(cachePromises)
      })
      .then(() => self.skipWaiting())
      .catch((error) => {
        console.error('Service worker install failed:', error)
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => {
              console.log('🗑️ Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            })
        )
      })
      .then(() => self.clients.claim())
  )
})

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Only handle same-origin requests
  if (url.origin !== location.origin) return

  // Images - cache first
  if (request.destination === 'image') {
    event.respondWith(cacheFirst(request))
    return
  }

  // Fonts - cache first
  if (request.url.includes('fonts') || request.destination === 'font') {
    event.respondWith(cacheFirst(request))
    return
  }

  // API routes - network first
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(request))
    return
  }

  // Pages - stale while revalidate
  if (request.mode === 'navigate') {
    event.respondWith(staleWhileRevalidate(request))
    return
  }

  // Static assets - cache first
  if (request.destination === 'script' || request.destination === 'style') {
    event.respondWith(cacheFirst(request))
    return
  }
})

// Cache first strategy
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request)
  if (cachedResponse) {
    return cachedResponse
  }

  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (error) {
    console.error('Cache first failed:', error)
    throw error
  }
}

// Network first strategy
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (error) {
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    throw error
  }
}

// Stale while revalidate strategy
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME)
  const cachedResponse = await cache.match(request)

  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  })

  return cachedResponse || fetchPromise
}