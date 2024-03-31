<template lang="pug">
div.item-container
  header 
    span.icon(@click="closeDetail")
      img(src='@/assets/images/map/close.svg')
    h1 {{ DiscoverItemStore.selectedItem.name }}

  section.carousel(aria-label="carousel", Tabindex="0")
    a(class="carousel__skip-link", href="#skip-link") Skip carousel
    div.slides
      div(
        v-for="image, index in DiscoverItemStore.selectedItem.pictures", :class="`slides-item slide-${index}`", :id="`slide-${index}`", :aria-label="`slide ${index + 1} of ${DiscoverItemStore.selectedItem.pictures.length}`", Tabindex="0")
        img(:src=`'https://symplystrefactor43946026e25e41daba99fdeec0efe6f152716-dev.s3.amazonaws.com/public/' + DiscoverItemStore.selectedItem.owner + '/' + DiscoverItemStore.selectedItem.s3Key + '/' + DiscoverItemStore.selectedItem.pictures[index]`)
    div.carousel__nav
      a.slider-nav(v-for="image, index in DiscoverItemStore.selectedItem.pictures", :href="`#slide-${index}`", :aria-label="`Go to slide ${index + 1}`") {{index + 1}}
    div(class="carousel__skip-message", id="skip-link" tabindex="0")

  section.item-information
    div.price {{ DiscoverItemStore.selectedItem.price }}
    div.owner {{ DiscoverItemStore.selectedItem.owner }}
    div.description {{ DiscoverItemStore.selectedItem.description }}
</template>

// for carousel, see https://levelup.gitconnected.com/how-to-make-a-fully-accessible-css-only-carousel-40e8bd62032b

<script setup>
import { useDiscoverItemStore } from '@/stores/DiscoverItemStore'
import { useRoute } from 'vue-router'
import router from '@/router'

const route = useRoute()
const id = route.params.id

const DiscoverItemStore = useDiscoverItemStore()
DiscoverItemStore.fetchItem(id)

function closeDetail () {
  router.push({ name: 'Home'})
}
</script>



<style lang="stylus" scoped>

// item information
.item-information 

.item-container
  display: block
  width: 100vw
  height: 100vh
  top: 100vh
  left: 0
  background-color: bgColor
  // transition: $organismExitAnim

  &.active 
    height: 100vh
    top: 0
    // transition: $organismEnterAnim
  

// carousel 
.carousel 
	margin: 0 auto
	overflow: hidden
	text-align: center

.slides 
	width: 100%
	display: flex
	overflow-x: scroll
	scrollbar-width: none
	scroll-snap-type: x mandatory
	scroll-behavior: smooth
	&::-webkit-scrollbar 
		display: none
	

.slides-item 
	align-items: center
	border-radius: 10px
	display: flex
	flex-shrink: 0
	font-size: 100px
	height: 600px
	justify-content: center
	margin: 0 1rem
	position: relative
	scroll-snap-align: start
	transform: scale(1)
	transform-origin: center center
	transition: transform .5s
	width: 100%

.carousel__nav 
	padding: 1.25rem .5rem

.slider-nav 
	align-items: center
	background-color: #ddd
	border-radius: 50%
	color: #000
	display: inline-flex
	height: 1.5rem
	justify-content: center
	padding: .5rem
	position: relative
	text-decoration: none
	width: 1.5rem
	&:hover 
		background-color: #000
		color: #fff
	
	&:active 
		background-color: #000
		color: #fff
	

.slide-1 
	background-color: #fdc

.slide-2 
	background-color: #bfd

.slide-3 
	background-color: #cdf

.slide-4 
	background-color: #dca

.slide-5 
	background-color: #ffc

.carousel__skip-link 
	height: 1px
	overflow: hidden
	position: absolute
	top: auto
	width: 1px
	&:focus 
		align-items: center
		background-color: #000
		color: #fff
		display: flex
		font-size: 30px
		height: 680px
		justify-content: center
		opacity: .8
		text-decoration: none
		width: 100%
		z-index: 1
	

</style>