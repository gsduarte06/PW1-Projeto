<template>
  <div>
    <v-toolbar color="#00041F" height="80">
      <v-img :src="logo" max-height="60" max-width="133" cover @click="LandingPage"> </v-img>
      <v-spacer></v-spacer>

      <v-btn class="mr-md-4 font-weight-bold" @click="Eventpage">
        Event
      </v-btn>

      <v-btn @click="LeaderboardPage" class="mr-md-4 font-weight-bold"> LeaderBoard </v-btn>
      <v-btn @click="MerchandisingPage" class="mr-md-4 font-weight-bold"> Merchandising </v-btn>

      <v-btn v-if="this.userStore.getLoggedInUser == null" @click="LoginRegister" style="background: #ff00ee"
        class="rounded-pill font-weight-bold px-6" rounded>Login/Register</v-btn>
      <v-avatar v-else-if="foto != null" :image="foto" size="x-large" @click="ProfilePage"></v-avatar>
      <v-avatar v-else size="x-large" @click="ProfilePage"> <v-icon class="mr-md-4" color="white" size="40">
          mdi-account-circle
        </v-icon></v-avatar>
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
    },
    LeaderboardPage() {
      this.$router.push('/leaderboard')
    },
    LandingPage() {
      this.$router.push('/')
    },
    MerchandisingPage() {
      this.$router.push('/merchandising')
    },
    Eventpage() {
      this.$router.push('/event')
    },
    ProfilePage() {
      this.$router.push('/profile')
    },
  },



  computed: {
    foto() {
      const user = this.userStore.getLoggedInUser
      if (user != null) {

        return user.foto
      }
    }
  },
}
</script>

<style scoped></style>
