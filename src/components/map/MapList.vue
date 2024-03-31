<template lang="pug">
Suspense
  section.item-list(:class="itemIsSelected ? 'selected-item' : ''")
    div.map-item(v-if="MapItemStore.mapItems.items && MapItemStore.mapItems.items.length > 0")
      MapListItem(
        v-for="(item, index) in MapItemStore.mapItems.items"
        :key="item._id"
        :item="item"
        :index="index"
      )
    div.empty-container(v-else)
      MapListEmptyState
  template(#fallback='')
    div.loading-div

</template>


<script setup>
import { computed } from 'vue'
import MapListItem from '@/components/map/MapListItem.vue'
import MapListEmptyState from '@/components/map/MapListEmptyState.vue'

import { useMapItemStore } from "@/stores/MapItemStore"
const MapItemStore = useMapItemStore()
MapItemStore.fetchMapItems()

const itemIsSelected = computed(() => {
  if (MapItemStore.selectedItem) {
    return true
  } 
})
</script>


<style lang="stylus" scoped>

.empty-container 
  display: flex
  width: 100%
  height: 100%
  align-items: center
  flex-direction: column
  justify-content: center

.item-list
  position: absolute
  width: 520px
  top: 30px
  background: white
  right: 30px
  padding: 20px
  border-radius: 10px
  height: calc(100vh - 110px)
  box-shadow: boxShadow
  overflow-y: scroll
  transition: organismEnterAnim
  cursor: pointer

  &.selected-item
    width: 700px
    top: 0px
    right: 0px
    height: calc(100vh - 40px)
    border-radius: 0px
</style>