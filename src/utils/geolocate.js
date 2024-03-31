import { onUnmounted, onMounted, ref } from 'vue'

export async function useGeolocation() {
  const coords = ref({ lat: 37.7749, lng: 122.4194})
  const isSupported = 'navigator' in window && 'geolocation' in navigator
  // console.log(coords)
  // from https://stackoverflow.com/a/20253790/1851365
  // const isSupported = typeof navigator.geolocation === 'object' && typeof navigator.geolocation.watchPosition === 'function'

  let watcher = null
  onMounted(() => {
    if (isSupported) {
      const location = navigator.geolocation
      watcher = navigator.geolocation.watchPosition(
        position => (coords.value = position.coords)
      )
    }
  })
  
  onUnmounted(() => {
    if (watcher) navigator.geolocation.clearWatch(watcher)
  })

  return { coords, isSupported }
}