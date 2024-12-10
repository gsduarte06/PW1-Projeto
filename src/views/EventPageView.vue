<template>
  <div v-if="this.event != null" class="d-flex flex-column" style="background-color: #00041f">
    <div class="d-flex flex-row justify-space-evenly mt-16">
      <div>

        <v-chip variant="outlined" class="text-body1 mt-14 mb-15 text-white" style="border-color: #ff00ee">
          {{ event.BeginDate }} - {{ event.EndDate }}
        </v-chip>
        <v-spacer></v-spacer>
        <p class="text-h2" style="color: #ff00ee">{{ event.Title }}</p>

        <p class="text-body1 mb-16" style="color: #ffffff">
          <v-icon icon="mdi-map-marker" style="color: #ff00ee"></v-icon>{{ event.location }}
        </p>
        <v-btn class="rounded-xl text-white text-body1" elevation="6" style="
            background: linear-gradient(90deg, #59398e, #ac1dbe, #d50ed6, #ff00ee);
            text-transform: none;
          ">Buy your ticket</v-btn>
        <!-- timer -->
        <v-container style="color: white" class="pa-0">
          <v-row class="text-center mt-14">
            <v-col class="pa-0">
              <div>
                <div class="text-h3">{{ event.timeleft.days }}</div>
                <div class="text-body2">days</div>
              </div>
            </v-col>
            <v-col class="pa-0">
              <div>
                <div class="text-h3">{{ event.timeleft.hours }}</div>
                <div class="text-body2">hours</div>
              </div>
            </v-col>
            <v-col class="pa-0">
              <div>
                <div class="text-h3">{{ event.timeleft.minutes }}</div>
                <div class="text-body2">minutes</div>
              </div>
            </v-col>
            <v-col class="pa-0">
              <div>
                <div class="text-h3">{{ event.timeleft.seconds }}</div>
                <div class="text-body2">seconds</div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <!-- right foto with gradiant -->
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
    <!-- Event details -->
    <div class="d-flex flex-column align-center w-75 align-self-center">
      <p class="text-h3 mt-16 mb-3" style="color: #ff00ee">Event Details</p>
      <div>
        <p class="text-body1 text-white">{{ event.details }}</p>
      </div>
    </div>
    <!-- Speakers -->
    <div>

      <div class="d-flex flex-column w-75 align-self-center mx-auto mb-16">
        <p class="text-h3 mt-16 mb-10" style="color: #ff00ee">Speakers</p>
        <v-container>
          <v-carousel class="h-auto" show-arrows="hover" hide-delimiters v-model="activeSpeakerPage">
            <v-carousel-item v-for="(page, pageIndex) in paginatedSpeakers" :key="pageIndex">
              <v-row>
                <v-col v-for="(speaker, index) in page" :key="index" sm="6" md="4"
                  class="d-flex justify-center align-center">
                  <v-card style="background:#00041f; border: 1px solid white; width:65%" class="d-flex flex-column">
                    <div class="d-flex flex-column align-center justify-space-evenly">
                      <v-img class="mt-4 rounded-circle" :src="speaker.image" :alt="speaker.name" width="100"
                        aspect-ratio="1/1"></v-img>
                      <div>
                        <v-card-title class="text-center text-white">{{ speaker.name }}</v-card-title>
                        <v-card-subtitle class="text-center text-white mb-4">
                          {{ speaker.role }}
                        </v-card-subtitle>
                      </div>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </v-carousel-item>
          </v-carousel>

          <!-- Custom Pagination Markers -->
          <div class="d-flex justify-center mt-4">
            <v-btn v-for="(page, pageIndex) in paginatedSpeakers" :key="pageIndex"
              :color="pageIndex === activeSpeakerPage ? 'white' : 'indigo-darken-4'" class="mx-1" icon
              style="width: 14px; height: 14px;" @click="activeSpeakerPage = pageIndex">

            </v-btn>
          </div>
        </v-container>
      </div>
    </div>

    <!-- schedule -->
    <div class="w-75 align-self-center align-center mt-16">
      <div class="d-flex flex-column align-center mb-10">
        <p class=" text-h3 mb-5" style="color: #ff00ee">Schedule</p>
      </div>
      <v-card class="elevation-5 rounded-lg" style="background-color: #00041f;">
        <v-tabs v-model="tab" class="text-white" style="background-color: #000B52;">
          <!-- Render each tab based on the schedule -->
          <v-tab v-for="(day, index) in event.schedule" :key="index" :value="day.TimeOfDay">
            {{ day.TimeOfDay }}
          </v-tab>
        </v-tabs>

        <v-card-text style="background-color: #00041f;">
          <!-- Dynamically show content for the selected tab -->
          <div v-for="day in event.schedule" :key="day.TimeOfDay" v-show="tab === day.TimeOfDay">
            <!-- Render content for the specific day -->
            <div v-if="day.content && day.content.length">
              <div v-for="content in day.content" :key="content.id"
                class="d-flex flex-column justify-space-between text-white mt-3 mx-4" style="min-height: 200px;">
                <div>
                  <v-chip class="text-body3 align-center" small elevated style="background-color: #ff00ee;">
                    {{ content.location }}
                  </v-chip>
                </div>
                <p class="text-body1 font-weight-bold">{{ content.title }}</p>
                <p v-if="content.type != null" class="text-body2"> Type: {{ content.type }}</p>
                <div>
                  <p class="text-body2 d-flex flex-row">
                    From:
                    <span class="text-body2 font-weight-bold ml-1"> {{ content.begin }}</span>
                  </p>
                  <p class="text-body2 d-flex flex-row">
                    Until:
                    <span class="text-body2 font-weight-bold ml-1"> {{ content.end }}</span>
                  </p>
                </div>
                <p v-if="content.speakers != null" class="text-body2"> Speakers: {{ content.speakers }}</p>
                <v-divider color="#fffff" class="my-4"></v-divider>
              </div>
            </div>
            <div v-else class="text-white text-center mt-4">
              <p>No content available for this time period.</p>
            </div>
          </div>
        </v-card-text>
      </v-card>


    </div>

    <!-- Tickets  -->
    <div>
      <v-container class="d-flex flex-column align-center" style="color: white">
        <!-- Title Section -->
        <v-row justify="center" class="text-center mb-10 mt-16">
          <v-col cols="12">
            <p class="text-h4">Choose a ticket</p>
            <p style="color: #ff007f" class="text-h3">Get your ticket here</p>
          </v-col>
        </v-row>

        <!-- Pricing Cards -->
        <v-row justify="center" class="pricing-row">
          <!-- Advanced Card -->
          <v-col cols="12" sm="4" class="d-flex">
            <v-card class="pa-6" style="background: #59398E" elevation="10 rounded-xl">
              <div class="d-flex flex-column justify-center align-center">
                <v-card-title>
                  <v-chip class=" " style="background-color: #9e61ff; color: white">Advanced</v-chip>
                </v-card-title>
                <v-card-title class="text-h3 text-center text-white mt-3">
                  150.00€
                </v-card-title>
              </div>
              <v-divider color="#fff" class="my-4"></v-divider>
              <v-list dense style="background-color: #59398E;">
                <v-list-item v-for="(feature, index) in event.princing.advancedFeatures" :key="index">
                  <v-icon class="mr-2" color="light-green">mdi-check-circle</v-icon>
                  <span class="text-white">{{ feature }}</span>
                </v-list-item>
              </v-list>
              <v-card-actions class="justify-center mt-5">
                <v-btn class="" style="
                    background: linear-gradient( #ff007f, #6e44ff);
                    color: white;
                    border-radius: 25px;
                  ">
                  Buy
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4" class="d-flex">
            <v-card class="pa-6" style="background: #FFFF" elevation="10 rounded-xl">
              <div class="d-flex flex-column justify-center align-center">
                <v-card-title>
                  <v-chip style="background-color: #FFFF; color: black">Premium</v-chip>
                </v-card-title>
                <v-card-title class="text-h3 text-center text-black mt-3">
                  200.00€
                </v-card-title>
              </div>
              <v-divider color="black" class="my-4"></v-divider>
              <v-list dense style="background-color: #FFF;">
                <v-list-item v-for="(feature, index) in event.princing.advancedFeatures" :key="index">
                  <v-icon class="mr-2" color="light-green">mdi-check-circle</v-icon>
                  <span class="text-black">{{ feature }}</span>
                </v-list-item>
              </v-list>
              <v-card-actions class="justify-center mt-5">
                <v-btn class="" style="
                    background: linear-gradient( #ff007f, #6e44ff);
                    color: white;
                    border-radius: 25px;
                  ">
                  Buy
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4" class="d-flex">
            <v-card class="pa-6" style="background: #000B52" elevation="10 rounded-xl">
              <div class="d-flex flex-column justify-center align-center">
                <v-card-title>
                  <v-chip class=" " style="background-color: #000B52; color: white">Beginner</v-chip>
                </v-card-title>
                <v-card-title class="text-h3 text-center text-white mt-3">
                  50.00€
                </v-card-title>
              </div>
              <v-divider color="#fff" class="my-4"></v-divider>
              <v-list dense style="background-color: #000B52;">
                <v-list-item v-for="(feature, index) in event.princing.advancedFeatures" :key="index">
                  <v-icon class="mr-2" color="light-green">mdi-check-circle</v-icon>
                  <span class="text-white">{{ feature }}</span>
                </v-list-item>
              </v-list>
              <v-card-actions class="justify-center mt-5">
                <v-btn class="" style="
                    background: linear-gradient( #ff007f, #6e44ff);
                    color: white;
                    border-radius: 25px;
                  ">
                  Buy
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>


        </v-row>
      </v-container>
    </div>




    <!-- Comment Section -->
    <div class="mt-16 w-75 align-self-center">
      <p class="text-h3  my-16" style="color: #ff00ee">Comment Section</p>
      <div v-for="comment in comments" :key="comment.id_comment" class="d-flex flex-column ">
        <v-divider v-if="comment.id_comment != 1" color="#fff" class="my-4"></v-divider>
        <div class="d-flex flex-row justify-space-between">
          <p class="mr-4 text-white text-body1">
            <strong>{{ comment.user }}:</strong>
            {{ comment.content }}
          </p>
          <span class="like-icon" @click="">
            🗑️
          </span>
        </div>

      </div>

      <div class="text-white mt-14 mb-3 color-white w-100">
        <v-textarea class="w-100 text-white text-body1" v-model="createCommentContent" no-resize auto-grow rows="1"
          placeholder="Write a comment"></v-textarea>
      </div>
      <div class="text-center text-white" v-if="createCommentContent">
        <v-btn class="rounded-xl text-white text-body1" elevation="6" style="
            background: linear-gradient(90deg, #59398e, #ac1dbe, #d50ed6, #ff00ee);
            text-transform: none;
          ">Submit Comment</v-btn>
      </div>
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
      activeSpeakerPage: 0,
      eventStore: useEventStore(),
      tab: null,
      cardsPerPage: 6,

      comments: [{ id_comment: 1, user: "gsd", content: "loving the event" }, { id_comment: 2, user: "diogo", content: "loving the event" }],
      createCommentContent: null


    };
  },
  async mounted() {
    await this.eventStore.fetchevents()

  },
  computed: {
    paginatedSpeakers() {
      const pages = [];
      for (let i = 0; i < this.event.speakers.length; i += this.cardsPerPage) {
        pages.push(this.event.speakers.slice(i, i + this.cardsPerPage));
      }

      return pages;
    },
    event() {

      return this.eventStore.getEvent
    }
  },
};
</script>

<style scoped>
.like-icon {
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.3s;
}

.like-icon:hover {
  opacity: 1;
}

.custom-pagination .v-btn {
  transition: transform 0.2s;
}
</style>
