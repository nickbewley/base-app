<template lang="pug">
div#main-container 
  DiscoverRow
</template>

<script setup>
import DiscoverRow from '@/components/discover/DiscoverRow.vue'
</script>

<style lang="stylus" scoped>
h1
  font-size: 35px
  text-align: left
h2
  font-size: 20px
  text-align: left
#main-container
  padding: contentSideMargin
  margin-top: 30px
  position: absolute
</style>