import { defineStore, acceptHMRUpdate } from 'pinia'
import { locationUrl1, locationUrl2 } from '@/utils/api.js'

export const useUserStore = defineStore("UserStore", {

  // SF lat: 37.7490966,
  // SF lng: -122.4530665
  state: () => ({
    location: {
      lat: Number,
      lng: Number
    },
    locationData1: [],
    locationData2: []
  }),

  getters: {
    // not used currently, is it needed?
    getLocation() {
      return this.location
    }
  },

  actions: {
    async fetchLocation() {
      this.locationData1 = []
      this.locationData2 = []
      this.location = {}

      try {
        this.locationData1 = await fetch(locationUrl1)
          .then((response) => response.json()) 
        this.location.lat = this.locationData1.latitude,
        this.location.lng = this.locationData1.longitude
      } catch (error) {
        this.error = error
        console.log(this.error)

        // query another api if first is null/error
        try {
          this.locationData2 = await fetch(locationUrl2)
            .then((response) => response.json()) 
          this.location.lat = Number(this.locationData2.latitude),
          this.location.lng = Number(this.locationData2.longitude)
        } catch (error) {
          this.error = error
          console.log(this.error)
        } finally {
          // this.loading = false 
        }
        
      } finally {
        // this.loading = false 
      }
    }
  }
})
