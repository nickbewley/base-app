<template lang="pug">
section.discover-row
  div.discover-row-carousel
    DiscoverItem(
      v-for="(item, index) in DiscoverItemStore.automobiles"
      :key="item._id" 
      :item="item"
      :index="index"
    )
</template>

<script setup>
import DiscoverItem from '@/components/discover/DiscoverItem.vue'

import { useDiscoverItemStore } from "@/stores/DiscoverItemStore"
const DiscoverItemStore = useDiscoverItemStore()
DiscoverItemStore.fetchItems()
</script>

<style lang="stylus" scoped>

.discover-row 
  width: calc(100vw - 100px)
  height: 100%

.discover-row-carousel
  display: flex
  height: 225px
  overflow-x: auto
</style>