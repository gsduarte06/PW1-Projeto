<template>
  <div>
    <v-layout>
      <v-footer height="682" class="text-white d-flex flex-column justify-end"
        style="background: linear-gradient(#00041f, #59398e); min-width: 100vw">
        <v-img src='./src/assets/Logo.png' max-height="400" width="400"> </v-img>

        <div class="pb-10">
          <v-btn v-for="icon in icons" :key="icon" :icon="icon" class="mx-4" variant="text" color="#00CC99"></v-btn>
        </div>

        <v-divider></v-divider>

        <div>@PortoTechHub{{ new Date().getFullYear() }} — <strong>All Rights Reserved</strong></div>
      </v-footer>
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logo: "./src/assets/Logo.png"
    }
  },
  data: () => ({
    icons: ['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram'],
  }),
}
</script>

<style scoped></style>
