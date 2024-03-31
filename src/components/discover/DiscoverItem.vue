<template lang="pug">
div.item(@click="setSelectedItem(item)")
  div.item-image 
    img(:src="mainImage")
  div.item-title {{ item.name }}
  div.item-price ${{ item.price }}
  
</template>

<script setup>
import router from '@/router'
import { computed } from 'vue'

const props = defineProps({
  item: {
    name: String,
    price: Number,
    owner: String,
    s3Key: String,
    pictures: Array,
    _id: String
  },
  index: Number
})

const mainImage = computed(
  () => 'https://picsum.photos/id/' + (props.index+500) + '/200/300'
)

function setSelectedItem (item) {
  router.push({ name: 'ItemDetail', params: { id: item._id } })
}
</script>

<style lang="stylus" scoped>
.item
  // open state
  &.open
    width: 500px

  // default state
  .item-image 
    width: 100%
    height: 130px
    img 
      width: 100%
      height: 100%
      object-fit: cover
      overflow: hidden
      border-radius: 10px 10px 0px 0px
    
  
  width: 215px
  height: 195px
  border-radius: 10px
  background-color: #FFFFFF
  box-shadow: boxShadow
  flex-shrink: 0
  flex-grow:0
  margin-right: 15px

</style>