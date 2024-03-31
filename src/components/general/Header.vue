<template lang="pug">
nav#nav
  span.nav-item 
    router-link(to="/")
      span home
  span.nav-item
    router-link(to="/map")
      span map
router-view(v-slot="{ Component, route }")
  template(v-if="Component")
    transition(:name="route.meta.transition" appear)
      KeepAlive
        Suspense
          component(:is="Component")
          template(#fallback='')
            div.loading-div LOADING !!
</template>

<script setup>
import { useRoute } from "vue-router";
let route = useRoute();
</script>
