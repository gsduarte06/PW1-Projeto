<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import CustomFooter from './components/CustomFooter.vue'
</script>

<template>
  <NavBar class="header-top fixed-navbar" />

  <RouterView style="margin-top: 79px" />

  <CustomFooter class="footer-bottom" />
</template>

<style scoped>
.fixed-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

body {
  padding-top: 60px;
  /* Adjust according to your navbar height */
}
</style>
