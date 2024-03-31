<template lang="pug">
div
  div.map(ref="mapDiv")
  MapList
</template>


<script setup>
import { onMounted, ref, toRaw } from 'vue'
import { Loader } from '@googlemaps/js-api-loader'
import { useMapItemStore } from '@/stores/MapItemStore'
import { useUserStore } from '@/stores/UserStore'
import { zoomControl, centerControl, buildMarker, highlightMarker, reloadControl, mapRecenter } from '@/utils/maps'
import MapList from '@/components/map/MapList.vue'

// Do we need a template for MapItemDetail? Maybe not
// import MapItemDetail from '@/components/map/MapItemDetail.vue'

const MapItemStore = useMapItemStore()
const UserStore = useUserStore()

// do i need a computed property here? Prob not since I'm fetching from a url
// const location = computed(() => {
//   UserStore.getLocation
// })
// specific location - used for testing
// const location = {
//   lat: 37.7490966, 
//   lng: -122.4530665 
// }
const MAPS_API_KEY = 'AIzaSyA_wE6j_Kvx4a_Jae9w5lF892G6i5wowgM'

const loader = new Loader({ 
  apiKey: MAPS_API_KEY, 
  libraries: ["marker"],
  version: "beta"
})

const mapDiv = ref(null)
const map = ref(null)

onMounted(async () => {
  await loader.load()
  await UserStore.fetchLocation()

  map.value = new google.maps.Map(mapDiv.value, {
    center: UserStore.location,
    zoom: 14, // default: 13, zoomed-out: 1, zoomed-in: 18
    disableDefaultUI: true,
    mapId: '7e812242460cb89c'
  })

  let zoomControlDiv = document.createElement('div')
  let zoom = new zoomControl(zoomControlDiv, map)

  let centerControlDiv = document.createElement('div')
  let center = new centerControl(centerControlDiv, map, UserStore.location)

  let reloadControlDiv = document.createElement('div')
  let reload = new reloadControl(reloadControlDiv, map)
  // get the icon inside the reloadcontrol for animation later
  let reloadControlIcon = reloadControlDiv.children[0].children[0]
  
  // zoomControlDiv.index = 1
  map.value.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(zoomControlDiv)
  map.value.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(centerControlDiv)
  map.value.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(reloadControlDiv)

  reloadControlDiv.style.opacity = 0

  // load map and markers. watch for map events
  // need to add a listener for when the map loads, otherwise .getBounds() returns undefined
  // --
  // consider using "tilesloaded" event (fired after idle) when implementing the initial marker animation
  google.maps.event.addListenerOnce(map.value, 'idle', function() {
    
    // get screen edges to calculate markers within
    let lowerLeftLat = map.value.getBounds().getSouthWest().lat()
    let lowerLeftLng = map.value.getBounds().getSouthWest().lng()
    let upperRightLat = map.value.getBounds().getNorthEast().lat()
    let upperRightLng = map.value.getBounds().getNorthEast().lng()

    // this will get the pixel inset of the current location
    // from https://stackoverflow.com/questions/3410600/convert-lat-lon-to-pixels-and-back
    // 
    // var latLng = UserStore.location // or location
    // var projection = map.value.getProjection()
    // var bounds = map.value.getBounds()
    // var topRight = projection.fromLatLngToPoint(bounds.getNorthEast())
    // var bottomLeft = projection.fromLatLngToPoint(bounds.getSouthWest())
    // var scale = Math.pow(2, map.value.getZoom())
    // var worldPoint = projection.fromLatLngToPoint(latLng)
    // let returnVal = [Math.floor((worldPoint.x - bottomLeft.x) * scale), Math.floor((worldPoint.y - topRight.y) * scale)]
    // console.log(returnVal)

    // initialize variables to update them later
    let newLowerLeftLat = null
    let newLowerLeftLng = null
    let newUpperRightLat = null
    let newUpperRightLng = null
    
    // when the user drags the map
    map.value.addListener('dragend', function() {
      // update the screen coordinates when drag ends
      newLowerLeftLat = map.value.getBounds().getSouthWest().lat()
      newLowerLeftLng = map.value.getBounds().getSouthWest().lng()
      newUpperRightLat = map.value.getBounds().getNorthEast().lat()
      newUpperRightLng = map.value.getBounds().getNorthEast().lng()  

      console.log(
        "newLowerLeftLat: " + newLowerLeftLat, 
        "newLowerLeftLng: " + newLowerLeftLng, 
        "newUpperRightLat: " + newUpperRightLat, 
        "newUpperRightLng: " + newUpperRightLng, 
      )

      // check if the new screen coords match the initial screen coords    
      if (lowerLeftLat != newLowerLeftLat) {
        reloadControlDiv.style.opacity = 1
      }
    })

    // when the user zooms the map
    map.value.addListener('zoom_changed', function() {
      // update the screen coordinates when drag ends
      newLowerLeftLat = map.value.getBounds().getSouthWest().lat()
      newLowerLeftLng = map.value.getBounds().getSouthWest().lng()
      newUpperRightLat = map.value.getBounds().getNorthEast().lat()
      newUpperRightLng = map.value.getBounds().getNorthEast().lng()  
      // check if the new screen coords match the initial screen coords    
      if (lowerLeftLat != newLowerLeftLat) {
        reloadControlDiv.style.opacity = 1
      }
    })    

    // set new markers if the user clicks reload
    reloadControlDiv.addEventListener('click', function() { 
     
      // remove markers from map
      MapItemStore.mapMarkers.forEach(
        (marker) => (marker.map = null)
      )

      // remove items from store
      MapItemStore.mapMarkers = []
      MapItemStore.mapItems = []

      // find items in new map area
      setMarkers(newLowerLeftLat, newLowerLeftLng, newUpperRightLat, newUpperRightLng)

      // animate the reload control
      reloadControlIcon.classList.add("reload")
    })

    // remove the reload control after the reload icon animation stops spinning
    function removeReloadControl() {
      reloadControlIcon.classList.remove("reload")
      reloadControlDiv.style.opacity = 0
    }
    reloadControlIcon.addEventListener("webkitTransitionEnd", removeReloadControl, false)
    reloadControlIcon.addEventListener("transitionend", removeReloadControl, false)
    reloadControlIcon.addEventListener("msTransitionEnd", removeReloadControl, false)
    reloadControlIcon.addEventListener("oTransitionEnd", removeReloadControl, false)

    // offsetX = (1/2 containerWidth) + rightMargin
    mapRecenter(map.value, {lat: upperRightLat, lng: upperRightLng}, -280, 0)
    setMarkers(lowerLeftLat, lowerLeftLng, upperRightLat, upperRightLng) 
  })
})

// TODO: Pagination
// sample url
// https://symplyst-staging.herokuapp.com/mapitems?limit=2&lowerLeft%5B%5D=-86.86167798936368&lowerLeft%5B%5D=21.10904517545597&skip=0&upperRight%5B%5D=-86.82751737535&upperRight%5B%5D=21.18077158323343

async function setMarkers(lowerLeftLat, lowerLeftLng, upperRightLat, upperRightLng) {

  await MapItemStore.fetchMapItems(lowerLeftLat, lowerLeftLng, upperRightLat, upperRightLng)
  MapItemStore.mapItems.items.forEach((item, index) => {
    let marker = new google.maps.marker.AdvancedMarkerView({
      map: toRaw(map.value),
      position: {lat: item.location[1], lng: item.location[0]},
      content: buildMarker(item, index),
    })

    marker.addListener("click", (event) => {
      highlightMarker(marker, item, index)
    })
    marker._id = item._id

    MapItemStore.mapMarkers.push(marker)
  })
}
</script>


// NOTE: 
// cannot scope the style, markers get put in a different part of dom

<style lang="stylus">
.map 
  height: 100vh
  width: 100vw

.marker
  &.highlight
    svg
      width: 46px
      height: 62px
  
  svg
    width: 24px
    height: 24px
  
.marker-text
  fontMarker()

.reload 
  transition: organismEnterAnim
  rotate: 360deg
</style>