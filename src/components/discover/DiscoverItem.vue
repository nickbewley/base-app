<template lang="pug">
div test  
</template>


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