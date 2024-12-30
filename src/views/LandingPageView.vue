<template>
  <div v-if="this.event != null" class="d-flex flex-column" style="background-color: #00041f">
    <!-- Top Event -->
    <div class="d-flex flex-row justify-space-evenly mt-16">
      <div>
        <p class="text-h4 mb-5" style="color: #ff00ee">NEXT EVENT</p>
        <v-chip variant="outlined" class="text-body1 mb-15 text-white" style="border-color: #ff00ee">
          {{ event.BeginDate }}
        </v-chip>
        <v-spacer></v-spacer>
        <p class="text-h2" style="color: #ffffff">{{ event.Title }}</p>

        <p class="text-body1 mb-16" style="color: #ffffff">
          <v-icon icon="mdi-map-marker" style="color: #ff00ee"></v-icon>{{ event.location }}
        </p>
        <v-btn class="rounded-xl text-white text-body1" elevation="6" style="
            background: linear-gradient(90deg, #59398e, #ac1dbe, #d50ed6, #ff00ee);
            text-transform: none;
          " @click="goToEvent()">See More...</v-btn>
        <!-- timer -->
        <v-container style="color: white" class="pa-0">
          <v-row class="text-center mt-14">
            <v-col class="pa-0">
              <div>
                <div class="text-h3">{{ timeleft.days }}</div>
                <div class="text-body2">days</div>
              </div>
            </v-col>
            <v-col class="pa-0">
              <div>
                <div class="text-h3">{{ timeleft.hours }}</div>
                <div class="text-body2">hours</div>
              </div>
            </v-col>
            <v-col class="pa-0">
              <div>
                <div class="text-h3">{{ timeleft.minutes }}</div>
                <div class="text-body2">minutes</div>
              </div>
            </v-col>
            <v-col class="pa-0">
              <div>
                <div class="text-h3">{{ timeleft.seconds }}</div>
                <div class="text-body2">seconds</div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <div style="min-width: 600px; min-height: 600px" class="mt-n16">
        <div style="
            background: radial-gradient(circle, #006385, #00041f 70%);
            width: 600px;
            height: 600px;
            border-radius: 20%;
          " class="d-flex justify-center align-center">
          <img src="https://res.cloudinary.com/dvyic4oaf/image/upload/v1732313558/ctiwxyjj5kgmiabb0ump.jpg" alt=""
            style="box-shadow: 0 4px 20px rgba(0, 0, 0, 0.8); border-radius: 12px" />
        </div>
      </div>
    </div>

    <!-- Details Event -->
    <div style="margin-top: 100px" class="d-flex flex-row justify-space-evenly  w-75 align-self-center">
      <div style="margin-top: -140px" class="">
        <div style="
            background: radial-gradient(circle, #59398E, #00041f 70%);
            width: 600px;
            height: 600px;
            border-radius: 20%;
          " class="d-flex justify-center align-center">
          <img src="https://res.cloudinary.com/dvyic4oaf/image/upload/v1732406311/ookunajkj0ml7jowqasm.jpg" alt=""
            style="box-shadow: 0 4px 20px rgba(0, 0, 0, 0.8); border-radius: 12px" height="345" width="518" />
        </div>

      </div>
      <div>
        <p class="text-h3 mb-5" style="color: #ff00ee">EVENT DETAILS</p>
        <p class="text-body1 text-white">{{ truncate(event.details, 700, '...') }}</p>
      </div>

    </div>

    <!-- Keynote Speakers Event -->
    <div class="d-flex flex-column w-75 align-self-center mt-16 mb-16">
      <p class="text-h3 text-white">Keynote speakers</p>
      <div class="d-flex flex-row justify-space-between  mt-15">
        <div class="d-flex flex-column w-25"> <!-- Keynote Speaker 1 -->
          <div>
            <img :src="event.speakers[0].image" alt="" class="w-100 h-auto"
              style="filter:drop-shadow(-4px 4px 4px #59398E)">
            <p class="text-body1 bt-2" style="color:#ff00ee"> {{ event.speakers[0].name }}</p>
            <p class="text-body1 text-white bt-4"> {{ event.speakers[0].role }}</p>
          </div>
        </div>
        <div class="d-flex flex-column w-25" width="368"> <!-- Keynote Speaker 2 -->
          <div>
            <img :src="event.speakers[1].image" alt="" class="w-100 h-auto"
              style="filter:drop-shadow(-4px 4px 4px #59398E)">
            <p class="text-body1 bt-2" style="color:#ff00ee"> {{ event.speakers[1].name }}</p>
            <p class="text-body1 text-white bt-4"> {{ event.speakers[1].role }}</p>
          </div>
        </div>
        <div class="d-flex flex-column w-25" width="368"> <!-- Keynote Speaker 3 -->
          <div>
            <img :src="event.speakers[2].image" alt="" class="w-100 h-auto"
              style="filter:drop-shadow(-4px 4px 4px #59398E)">
            <p class="text-body1 bt-2" style="color:#ff00ee"> {{ event.speakers[2].name }}</p>
            <p class="text-body1 text-white bt-4"> {{ event.speakers[2].role }}</p>
          </div>
        </div>
      </div>
      <v-btn class="rounded-xl text-white text-body1 align-self-center mt-16" elevation="6" style="
            background: linear-gradient(90deg, #59398e, #ac1dbe, #d50ed6, #ff00ee);
            text-transform: none;
          " @click="goToEvent()">List of All Speakers</v-btn>
    </div>

  </div>
  <div v-else>
    <div class="d-flex flex-column justify-center align-center h-80" style="background-color: #00041f">
      <!-- Skeleton Loader -->
      <v-skeleton-loader type="heading, image@2, paragraph@4" class="mt-5"
        style="background-color: #00041f"></v-skeleton-loader>
    </div>
  </div>

</template>

<script>

import { useEventStore } from '../stores/event';
export default {
  data() {
    return {
      tab: null,
      eventStore: useEventStore(),
      intervalId: null,
      timeleft: {},
    }
  },
  async beforeMount() {
    await this.eventStore.fetchevents()
  },
  mounted() {
    this.intervalId = setInterval(() => {
      const now = new Date();
      const eventDate = new Date(this.event.timeleft);
      const timeDiff = eventDate - now;

      if (timeDiff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      this.timeleft = { days, hours, minutes, seconds }
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
  computed: {
    event() {
      return this.eventStore.getEvent
    },

  },

  methods: {
    truncate(text, length, suffix) {
      if (text.length > length) {
        return text.substring(0, length) + suffix;
      } else {
        return text;
      }
    },
    goToEvent() {
      this.$router.push('/event')
    },

  },


}
</script>

<style scoped></style>
