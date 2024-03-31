<template lang="pug">
div.item(@click="setSelectedItem(item)" :class="currentSelectedItem")
  div.item-details
    span.close-icon(v-if="currentSelectedItem && (MapItemStore.selectedItem._id === item._id)" @click="closeDetail")
      img(src='@/assets/images/map/close.svg')

    div.item-image(v-else)
      div.item-index {{ index + 1 }}
      img(:src="mainImage")
    div.item-description
      div.item-title {{ item.name }}
      div.item-price ${{ item.price }}
  div(v-if="currentSelectedItem && (MapItemStore.selectedItem._id === item._id)")
    div.item-image-carousel
      img(v-for="picture, index in MapItemStore.selectedItem.pictures" :src=`'https://symplystrefactor43946026e25e41daba99fdeec0efe6f152716-dev.s3.amazonaws.com/public/' + MapItemStore.selectedItem.owner + '/' + MapItemStore.selectedItem.s3Key + '/' + MapItemStore.selectedItem.pictures[index]`)
    div {{ MapItemStore.selectedItem.owner }}
    div {{ MapItemStore.selectedItem.itemDescription }}

</template>


<style lang="stylus" scoped>
.selected-item
  height: calc(100vh - 120px)
  flex-direction: column
  .item-image-carousel 
    overflow: auto
    white-space: nowrap
    display: flex
    gap: 10px
    margin: 0px -20px
    img
      width: 280px
      height: 280px
      object-fit: cover

      &:first-child
        padding-left: 20px

// item container
.item 
  display: flex
  height: 105px
  &.unselected-item
    height: 0px
    opacity: 0
    display: none

// index, item name, item price
.item-details
  display: flex

// number
.item-index
  position: absolute
  width: 21px
  height: 21px
  margin-top: -8px
  margin-left: -8px
  background-color: activeFillColor
  border-radius: 25px
  color: white
  border: 4px solid white
  text-align: center

// main-image
.item-image
  img
    width: 85px
    height: 85px 
    object-fit: cover
    border-radius: 10px
    margin-right: 20px



</style> 