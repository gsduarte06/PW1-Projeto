<template>
  <div>
    <v-toolbar color="#00041F" height="80">
      <v-img :src="logo" max-height="60" max-width="133" cover @click="ToLandingPage"> </v-img>
      <v-spacer></v-spacer>
      <v-menu transition="scale-transition">
        <template v-slot:activator="{ props }">
          <v-btn class="mr-md-4 font-weight-bold" v-bind="props">
            Events
          </v-btn>
        </template>

        <v-list class="d-flex flex-column align-start" style="background-color: #000B52;">
          <v-btn block style="background-color: #000B52;justify-content: flex-start;"
            class="text-white text-body2 elevation-0" v-for="(item, i) in events" :key="i">
            {{ item.Title }}<v-icon icon="mdi-chevron-right" style="color: #fff"></v-icon>
          </v-btn>
        </v-list>
      </v-menu>
      <v-btn @click="LeaderboardPage" class="mr-md-4 font-weight-bold"> LeaderBoard </v-btn>
      <v-btn @click="MerchandisingPage" class="mr-md-4 font-weight-bold"> Merchandising </v-btn>

      <v-btn @click="LoginRegister" style="background: #ff00ee" class="rounded-pill font-weight-bold px-6"
        rounded>Login/Register</v-btn>
    </v-toolbar>
  </div>
</template>

<script>


export default {
  data() {
    return {
      logo: "./src/assets/Logo.png",
      events: [
        {
          id: 1,
          BeginDateSmall: "24 Mar",
          Title: "Vue.js Meetup",
          location: "San Francisco, CA",
          description: "Join us for a meetup to discuss the latest trends and best practices in Vue.js development.",
        },
        {
          id: 2,
          BeginDateSmall: "4 April",
          Title: "JavaScript Conference",
          location: "New York, NY",
          description: "A major conference for JavaScript developers. Workshops, keynotes, and networking opportunities.",
        },
        {
          id: 3,
          BeginDateSmall: "15 April",
          Title: "Web Development Bootcamp",
          location: "Los Angeles, CA",
          description: "A week-long bootcamp for aspiring web developers. Intensive training in HTML, CSS, and JavaScript.",
        },
      ],
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
      this.$router.push('/event/1')
    }
  },
}
</script>

<style scoped></style>
