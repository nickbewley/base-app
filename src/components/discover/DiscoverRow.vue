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

<script>
import { defineComponent } from "vue";
import { useDiscoverItemStore } from "@/stores/DiscoverItemStore";

import DiscoverItem from "@/components/discover/DiscoverItem.vue";

export default defineComponent({
  async setup() {
    const DiscoverItemStore = useDiscoverItemStore();
    await DiscoverItemStore.fetchItems();
  },
});
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
