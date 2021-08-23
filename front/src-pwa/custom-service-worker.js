/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */

const staticCacheName = 'site-static-v2'
const dynamicCacheName = 'site-dynamic-v1'
const assets = [
  '/',
  'index.html',
  'statics',
  'statics/icons',
  '../pages/Error404.vue'
]

// self.addEventListener('install', evt => {
//   evt.waitUntil(
//     caches.open(staticCacheName).then(cache => {
//       cache.addAll(assets)
//     })
//   )
// })

// // Active event
// self.addEventListener('activate', evt => {
//   // eyðir út gamla cache-inu svo það nýja sé bara geymt.
//   evt.waitUntil(
//     caches.keys().then(keys => {
//       return Promise.all(
//         keys
//           .filter(key => key !== staticCacheName && key !== dynamicCacheName)
//           .map(key => caches.delete(key))
//       )
//     })
//   )
// })

// // fetch event
// self.addEventListener('fetch', evt => {
//   evt.respondWith(
//     caches.match(evt.request).then(cacheRes => {
//       return (
//         cacheRes ||
//         fetch(evt.request).then(fetchRes => {
//           return caches.open(dynamicCacheName).then(cache => {
//             cache.put(evt.request.url, fetchRes.clone())
//             //   limitCacheSize(dynamicChaceName, 50)
//             return fetchRes
//           })
//         })
//       )
//     })
//     //   .catch(() => {
//     //     if (evt.request.url.indexOf(".vue") > -1) {
//     //       return caches.match("../pages/Error404.vue");
//     //     }
//     //   })
//   )
// })

// let myPrompt = ''
// // const btnPWA = document.querySelector('#btnInstallAplication')
// self.addEventListener('beforeinstallprompt', e => {
//   e.preventDefault()
//   myPrompt = e
//   // btnPWA.style.display = 'block'
// })

// btnPWA.addEventListener('click', () => {
//   btnPWA.style.display = 'none'
//   myPrompt.prompt()
// })
