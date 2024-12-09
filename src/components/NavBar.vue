<template>
  <div>
    <v-toolbar color="#00041F" height="80">
      <v-img :src="logo" max-height="60" max-width="133" cover @click="ToLandingPage"> </v-img>
      <v-spacer></v-spacer>

      <v-btn class="mr-md-4 font-weight-bold" @click="ToEvent">
        Event
      </v-btn>

      <v-btn @click="LeaderboardPage" class="mr-md-4 font-weight-bold"> LeaderBoard </v-btn>
      <v-btn @click="MerchandisingPage" class="mr-md-4 font-weight-bold"> Merchandising </v-btn>

      <v-btn v-if="this.userStore.getLoggedInUserUse == null" @click="LoginRegister" style="background: #ff00ee"
        class="rounded-pill font-weight-bold px-6" rounded>Login/Register</v-btn>
      <v-img v-else-if="foto != null" class="mt-4 rounded-circle" size="40" :src="foto" aspect-ratio="1/1">
      </v-img>
      <v-icon v-else class="mr-md-4" color="white" size="40">
        mdi-account-circle
      </v-icon>
    </v-toolbar>
  </div>
</template>

<script>


import { useUserStore } from '@/stores/users';
export default {
  data() {
    return {
      userStore: useUserStore(),
      logo: "./src/assets/Logo.png",

    }

  },

  methods: {
    LoginRegister() {
      this.$router.push('/login')
    }, LeaderboardPage() {
      this.$router.push('/leaderboard')
    },
    ToLandingPage() {
      this.$router.push('/')
    },
    MerchandisingPage() {
      this.$router.push('/merchandising')
    },
    ToEvent() {

      this.$router.push('/event')
    }
  },


  mounted() {

  },
  computed: {
    foto() {

      return this.userStore.getLoggedInUserUse.foto
    }
  },
}
</script>

<style scoped></style>
