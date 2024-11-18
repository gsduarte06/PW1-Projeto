<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import CustomFooter from './components/CustomFooter.vue'
</script>

<template>
  <NavBar class="header-top" />

  <RouterView />

  <CustomFooter class="footer-bottom" />
</template>

<style scoped></style>
