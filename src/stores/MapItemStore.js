import { defineStore, acceptHMRUpdate } from 'pinia'
import { mapUrl } from '@/utils/api.js'

export const useMapItemStore = defineStore("MapItemStore", {
  state: () => ({
    mapItems: [],
    mapMarkers: [],
    selectedItem: null,
    selectedMarker: null,
    loading: false,
    error: null
  }),

  getters: { 
    // if selecting item from the list, get the marker to select it also
    // see https://stackoverflow.com/questions/70199322/how-to-use-vue-getters-to-find-a-value-inside-an-object
    getMarkerById: (state) => (id) => {
      return state.mapMarkers.find(marker => marker._id === id)
    },
  },

  actions: {
    // fetch items in map area
    async fetchMapItems(lowerLeftLat, lowerLeftLng, upperRightLat, upperRightLng) {
      const urlString = mapUrl + '?lowerLeft=' + lowerLeftLng + '&lowerLeft=' + lowerLeftLat + '&upperRight=' + upperRightLng + '&upperRight=' + upperRightLat
      this.mapItems = []
      this.loading = true
      try {
        this.mapItems = await fetch(urlString)
          .then((response) => response.json()) 
        this.loading = false
      } catch (error) {
        this.error = error
        console.log(this.error)
      } finally {
        this.loading = false
      }
    },

    // fetch the map item details when selected
    async fetchMapItemDetail() {
      if (this.selectedItem) {
        // todo load the new item in the map item list
        // loading state, skeleton, etc
        console.log(this.selectedItem)
      }
    }
  }
})
