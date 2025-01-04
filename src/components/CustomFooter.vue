<template>
  <div>
    <v-layout>
      <v-footer height="682" class="text-white d-flex flex-column justify-end"
        style="background: linear-gradient(#00041f, #59398e); min-width: 100vw">
        <v-img src='./src/assets/Logo.png' max-height="400" width="400"> </v-img>

        <div class="pb-10">
          <v-btn v-for="icon in icons" :key="icon.link" :icon="icon.icon" @click="openlinkOtherpage(icon.link)"
            class="mx-4" variant="text" color="#00CC99"></v-btn>
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
      logo: "./src/assets/Logo.png",
      icons: [{ icon: 'mdi-facebook', link: "https://www.facebook.com/PortoTecHub" }, { icon: 'mdi-twitter', link: "https://twitter.com/PortoTechHub" }, { icon: 'mdi-linkedin', link: "https://pt.linkedin.com/company/portotechhub" }, { icon: 'mdi-instagram', link: "https://www.instagram.com/portotechhub" }, { icon: 'mdi-youtube', link: "https://www.youtube.com/channel/UCKYcgRWnL7K4b0tHTUH2vcw" }],
    }

  },
  methods: {
    openlinkOtherpage(link) {
      window.open(link, '_blank');
    }
  }
}
</script>

<style scoped></style>
