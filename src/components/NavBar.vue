<template>
  <div>
    <v-toolbar color="#00041F" height="80">
      <v-img :src="logo" max-height="60" max-width="133" cover @click="ToLandingPage"> </v-img>
      <v-spacer></v-spacer>

      <v-btn class="mr-md-4 font-weight-bold" @click="ToEvent"> Events </v-btn>
      <v-btn @click="LeaderboardPage" class="mr-md-4 font-weight-bold"> LeaderBoard </v-btn>
      <v-btn class="mr-md-4 font-weight-bold"> Merchandising </v-btn>

      <v-btn @click="LoginRegister" style="background: #ff00ee" class="rounded-pill font-weight-bold px-6"
        rounded>Login/Register</v-btn>
    </v-toolbar>
  </div>
</template>

<script>


export default {
  data() {
    return {
      logo: "./src/assets/Logo.png"
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
    ToEvent() {
      this.$router.push('/event/1')
    }
  },
}
</script>

<style scoped></style>
