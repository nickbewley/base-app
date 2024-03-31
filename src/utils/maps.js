import variables from '@/styles/variables.styl'
import * as markerAttributes from '@/utils/markerAttributes.js'
import router from '@/router'

// note: cannot initialize store until vue is initialized, so put it inside the function it is needed. See `highlightMarker`
import { useMapItemStore } from "@/stores/MapItemStore"

let wrapperMargin = '0px 30px 20px'

export function centerControl(controlDiv2, map, location) {
  var centerControlWrapper = document.createElement('div')
  centerControlWrapper.style.backgroundColor = 'white'
  centerControlWrapper.style.borderRadius = '10px'
  centerControlWrapper.style.cursor = 'pointer'
  centerControlWrapper.style.textAlign = 'center'
  centerControlWrapper.style.width = '52px'
  centerControlWrapper.style.height = '52px'
  centerControlWrapper.style.display = 'flex'
  centerControlWrapper.style.margin = wrapperMargin

  var centerButton = document.createElement('div')
  centerButton.style.width = '28px'
  centerButton.style.height = '28px'
  centerButton.style.margin = '12px'
  centerButton.style.backgroundImage = 'url("/src/assets/images/map/center.svg")'
  centerControlWrapper.appendChild(centerButton)

  // update boxShadow to use variables.styl
  centerControlWrapper.style.boxShadow = '0px 0px 15px 0px rgba(0,0,0,.07)'
  // centerControlWrapper.style.boxShadow = variables.boxShadow

  controlDiv2.appendChild(centerControlWrapper)

  centerButton.addEventListener('click', function() {
    map.value.panTo(location)
  })
}

export function zoomControl(controlDiv, map) {
  // https://developers.google.com/maps/documentation/javascript/controls#Adding_Controls_to_the_Map

  // https://stackoverflow.com/a/25200509/1851365
  controlDiv.style.padding = wrapperMargin
  var controlWrapper = document.createElement('div')
  controlWrapper.style.backgroundColor = 'white'
  controlWrapper.style.borderRadius = '10px'
  controlWrapper.style.cursor = 'pointer'
  controlWrapper.style.textAlign = 'center'
  controlWrapper.style.width = '52px'
  controlWrapper.style.height = '102px'
  controlWrapper.style.display = 'flex'
  controlWrapper.style.flexDirection = 'column'
  controlWrapper.style.alignItems = 'center'


  // update boxShadow to use variables.styl
  controlWrapper.style.boxShadow = '0px 0px 15px 0px rgba(0,0,0,.07)'
  controlDiv.appendChild(controlWrapper)

  var zoomInButton = document.createElement('div')
  zoomInButton.style.width = '28px'
  zoomInButton.style.height = '28px'
  zoomInButton.style.margin = '12px 0px'
  zoomInButton.style.backgroundImage = 'url("/src/assets/images/map/plus.svg")'
  controlWrapper.appendChild(zoomInButton)

  var zoomOutButton = document.createElement('div')
  zoomOutButton.style.width = '28px'
  zoomOutButton.style.height = '28px'
  zoomOutButton.style.margin = '12px 0px'
  zoomOutButton.style.backgroundImage = 'url("/src/assets/images/map/minus.svg")'
  controlWrapper.appendChild(zoomOutButton)

  zoomInButton.addEventListener('click', function() {
    map.value.setZoom(map.value.getZoom() + 1)
  })
  zoomOutButton.addEventListener('click', function() {
    map.value.setZoom(map.value.getZoom() - 1)
  })

}

export function buildMarker(item, index) {
  const content = document.createElement("div");

  content.classList.add("marker")
  content.innerHTML = `
    
    <svg width="24" height="24" viewBox="${markerAttributes.markerViewBoxStart}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="${markerAttributes.markerStartColor}" d="${markerAttributes.markerStartSVG}" stroke="white" stroke-width="4">
        <animate   
          id="markerStart${index}"
          attributeName="d"
          from="${markerAttributes.markerStartSVG}"
          to="${markerAttributes.markerEndSVG}"
          dur="0.6s"
          fill="freeze"
          begin="indefinite"
          calcMode = "spline"
          keySplines = "${markerAttributes.keySplinesStart}"
          keyTimes = "0;1"
        />
        <animate  
          id="markerEnd${index}"
          attributeName="d"
          from="${markerAttributes.markerEndSVG}"
          to="${markerAttributes.markerStartSVG}" 
          dur="0.15s"
          fill="freeze"
          begin="indefinite"
          calcMode = "spline"
          keySplines = "${markerAttributes.keySplinesEnd}"
          keyTimes = "0;1"
        />
        
        <animate 
          id="markerColorStart${index}"
          attributeName="fill" 
          from="${markerAttributes.markerStartColor}"
          to="${markerAttributes.markerEndColor}" 
          dur="0.6s"
          fill="freeze"
          begin="indefinite"
          calcMode = "spline"
          keySplines = "${markerAttributes.keySplinesStart}"
          keyTimes = "0;1"
        />
        <animate 
          id="markerColorEnd${index}"
          attributeName="fill" 
          from="${markerAttributes.markerEndColor}"
          to="${markerAttributes.markerStartColor}" 
          dur="0.15s"
          fill="freeze"
          begin="indefinite"
          calcMode = "spline"
          keySplines = "${markerAttributes.keySplinesEnd}"
          keyTimes = "0;1"
        />
      </path>
      <text class="marker-text" fill="white" x="50%" y="50" dominant-baseline="middle" opacity="0" text-anchor="middle">${index + 1}
        <animate  
          id="numberFillStart${index}"
          attributeName="opacity"
          dur="0.6s"
          from="0" 
          to="1"
          fill="freeze"
          begin="indefinite"
          calcMode = "spline"
          keySplines = "${markerAttributes.keySplinesStart}"
          keyTimes = "0;1"
        />
        <animate  
          id="numberFillEnd${index}"
          attributeName="opacity"
          dur="0.05s"
          from="1" 
          to="0"
          fill="freeze"
          begin="indefinite"
          calcMode = "spline"
          keySplines = "${markerAttributes.keySplinesEnd}"
          keyTimes = "0;1"
        />
        <animate  
          id="numberPositionStart${index}"
          attributeName="y"
          dur="0.35s"
          from="50" 
          to="23"
          fill="freeze"
          begin="indefinite"
          calcMode = "spline"
          keySplines = "${markerAttributes.keySplinesStart}"
          keyTimes = "0;1"
        />
        <animate  
          id="numberPositionEnd${index}"
          attributeName="y"
          dur="0.15s"
          from="23" 
          to="50"
          fill="freeze"
          begin="indefinite"
          calcMode = "spline"
          keySplines = "${markerAttributes.keySplinesEnd}"
          keyTimes = "0;1"
        />
      </text>
      <animate   
        id="markerAttributes.markerViewBoxStart${index}"
        attributeName="viewBox"
        from="${markerAttributes.markerViewBoxStart}"
        to="${markerAttributes.markerViewBoxEnd}"
        dur="0.6s"
        fill="freeze"
        begin="indefinite"
        calcMode = "spline"
        keySplines = "${markerAttributes.keySplinesStart}"
        keyTimes = "0;1"
      />
      <animate  
        id="markerAttributes.markerViewBoxEnd${index}"
        attributeName="viewBox"
        from="${markerAttributes.markerViewBoxEnd}"
        to="${markerAttributes.markerViewBoxStart}" 
        dur="0.15s"
        fill="freeze"
        begin="indefinite"
        calcMode = "spline"
        keySplines = "${markerAttributes.keySplinesEnd}"
        keyTimes = "0;1"
      />
    </svg>
    `
  return content
}

export function highlightMarker(marker, item, index) {
  const MapItemStore = useMapItemStore() 

  if (MapItemStore.selectedItem) { 
    if (MapItemStore.selectedMarker.index === index) {
      // clicking highlighted marker
      MapItemStore.selectedMarker.content.classList.remove("highlight")
      document.getElementById("markerEnd" + MapItemStore.selectedMarker.index).beginElement()
      document.getElementById("numberFillEnd" + MapItemStore.selectedMarker.index).beginElement()
      document.getElementById("markerColorEnd" + MapItemStore.selectedMarker.index).beginElement()
      document.getElementById("numberPositionEnd" + MapItemStore.selectedMarker.index).beginElement()
      document.getElementById("markerAttributes.markerViewBoxEnd" + MapItemStore.selectedMarker.index).beginElement()
      MapItemStore.selectedItem = null
      MapItemStore.selectedMarker = null
      router.push({ name: 'Map' })
    } else {
      // clicking unhighlighted marker while another is highlighted
      // first unhighlight current marker
      MapItemStore.selectedMarker.content.classList.remove("highlight")
      document.getElementById("markerEnd" + MapItemStore.selectedMarker.index).beginElement()
      document.getElementById("numberFillEnd" + MapItemStore.selectedMarker.index).beginElement()
      document.getElementById("markerColorEnd" + MapItemStore.selectedMarker.index).beginElement()
      document.getElementById("numberPositionEnd" + MapItemStore.selectedMarker.index).beginElement()
      document.getElementById("markerAttributes.markerViewBoxEnd" + MapItemStore.selectedMarker.index).beginElement()
      // then highlight clicked marker
      marker.content.classList.add("highlight")
      document.getElementById("markerStart" + index).beginElement()
      document.getElementById("numberFillStart" + index).beginElement()
      document.getElementById("markerColorStart" + index).beginElement()
      document.getElementById("numberPositionStart" + index).beginElement()
      document.getElementById("markerAttributes.markerViewBoxStart" + index).beginElement()
      MapItemStore.selectedItem = item
      MapItemStore.selectedMarker = marker
      MapItemStore.selectedMarker.index = index
      router.push({ name: 'MapItemDetail', params: { id: item._id } })
    }
  } else {
    // no markers highlighted
    marker.content.classList.add("highlight")
    document.getElementById("markerStart" + index).beginElement()
    document.getElementById("numberFillStart" + index).beginElement()
    document.getElementById("markerColorStart" + index).beginElement()
    document.getElementById("numberPositionStart" + index).beginElement()
    document.getElementById("markerAttributes.markerViewBoxStart" + index).beginElement()
    MapItemStore.selectedItem = item
    MapItemStore.selectedMarker = marker
    MapItemStore.selectedMarker.index = index
    router.push({ name: 'MapItemDetail', params: { id: item._id } })
  }
}

export function reloadControl(controlDiv, map) {
  var reloadControlWrapper = document.createElement('div')
  reloadControlWrapper.style.backgroundColor = 'white'
  reloadControlWrapper.style.borderRadius = '10px'
  reloadControlWrapper.style.cursor = 'pointer'
  reloadControlWrapper.style.textAlign = 'center'
  reloadControlWrapper.style.width = '52px'
  reloadControlWrapper.style.height = '52px'
  reloadControlWrapper.style.height = '52px'
  reloadControlWrapper.style.display = 'flex'
  reloadControlWrapper.style.margin = wrapperMargin

  var reloadButton = document.createElement('div')
  reloadButton.style.width = '28px'
  reloadButton.style.height = '28px'
  reloadButton.style.margin = '12px'
  reloadButton.style.backgroundImage = 'url("/src/assets/images/map/reload.svg")'
  reloadControlWrapper.appendChild(reloadButton)

  // update boxShadow to use variables.styl
  reloadControlWrapper.style.boxShadow = '0px 0px 15px 0px rgba(0,0,0,.07)'
  controlDiv.appendChild(reloadControlWrapper)

}

// offsetX = (1/2 containerWidth) + rightMargin
// recenter the map based on the (1/2 width of the side panel container) + (width of margin to edge of screen)
export function mapRecenter(map, latlng, offsetx, offsety) {
  let point1 = map.getProjection().fromLatLngToPoint(
    (latlng instanceof google.maps.LatLng) ? latlng : map.getCenter()
  )
  let point2 = new google.maps.Point(
    ( (typeof(offsetx) == 'number' ? offsetx : 0) / Math.pow(2, map.getZoom()) ) || 0,
    ( (typeof(offsety) == 'number' ? offsety : 0) / Math.pow(2, map.getZoom()) ) || 0
  )  
  map.setCenter(map.getProjection().fromPointToLatLng(new google.maps.Point(
    point1.x - point2.x,
    point1.y + point2.y
  )))
}

export function coordinateToPixel(latLng, map) {
  var topRight = map.value.getProjection().fromLatLngToPoint(map.value.getBounds().getNorthEast());
  var bottomLeft = map.value.getProjection().fromLatLngToPoint(map.value.getBounds().getSouthWest());
  var scale = Math.pow(2, map.value.getZoom());
  var worldPoint = map.value.getProjection().fromLatLngToPoint(latLng);
  return new google.maps.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale);
}

export function pixelToCoordinate(position, map) {
  // // https://stackoverflow.com/a/12026134/1851365
  // var scale = Math.pow(2, map.value.getZoom());
  // var proj = map.value.getProjection();
  // var bounds = map.value.getBounds();

  // var nw = proj.fromLatLngToPoint(
  //   new google.maps.LatLng(
  //     bounds.getNorthEast().lat(),
  //     bounds.getSouthWest().lng()
  //   ));
  // var point = proj.fromLatLngToPoint(position);

  // return new google.maps.Point(
  //   Math.floor((point.x - nw.x) * scale),
  //   Math.floor((point.y - nw.y) * scale));


  return map.value.fromLatLngToContainerPixel
}