import { defineStore, acceptHMRUpdate } from 'pinia'
import { discoverUrl, mapUrl } from '@/utils/api.js'

export const useDiscoverItemStore = defineStore("DiscoverItemStore", {

  state: () => ({
    // consider 
    items: [],
    automobiles: [],
    loading: false,
    error: null
  }),

  getters: {
  },

  actions: {
    async fetchItems() {
      this.automobiles = []
      this.items = []
      this.loading = true
      try {
        
        this.items = await fetch(discoverUrl)
          .then((response) => response.json()) 
        
        this.automobiles = [...this.items.Cars, ...this.items.Suvs, ...this.items.Trucks, ...this.items.Vans]
        this.loading = false
      } catch (error) {
        this.error = error
        console.log(this.error)
      } finally {
        this.loading = false
      }
    },

    // consider: is this necessary?
    async fetchItem(id) {
      // if the url is loaded independently before the store is initialized
      if (this.items.length === 0) {
        try {
          await this.fetchItems()
          this.selectedItem = this.automobiles.find(item => item._id === id)
          this.loading = false
        } catch (error) {
          this.error = error
          console.log(this.error)
        } finally {
          this.loading = false
        }
      } 

      // otherwise the item is passed from the discover view
      else {
        this.selectedItem = this.automobiles.find(item => item._id === id)
      }
    }
  }
})
