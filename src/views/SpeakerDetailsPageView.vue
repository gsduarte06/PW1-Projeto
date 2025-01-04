<template>
    <div class="speaker-details" style="background-color: #00041f; color: white; padding: 20px;">
      <v-card style="background-color: #00041f; color: white; padding: 20px;">
        <div class="d-flex flex-row align-center">
          <!-- Speaker Image -->
          <img
            v-if="speaker?.image"
            :src="speaker.image"
            alt="Speaker Image"
            class="rounded-xl"
            style="
              width: 250px; 
              height: 250px; 
              margin-right: 30px; 
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
            "
          />
          <img
            v-else
            src="https://via.placeholder.com/250"
            alt="Placeholder Image"
            class="rounded-xl"
            style="
              width: 250px; 
              height: 250px; 
              margin-right: 30px; 
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
            "
          />
          <!-- Speaker Info -->
          <div>
            <v-card-title class="text-h4" style="color: #ff00ee;">
              {{ speaker?.name }}
            </v-card-title>
            <v-card-subtitle class="text-h5" style="color: #ff00ee;">
              {{ speaker?.role }}
            </v-card-subtitle>
            <v-card-text>
              <p class="text-h6" style="line-height: 1.8;">
                {{ speaker?.bio || "No bio available" }}
              </p>
            </v-card-text>
          </div>
        </div>
      </v-card>
    </div>
  </template>
  
  <script>
  import { useEventStore } from "../stores/event";
  
  export default {
    data() {
      return {
        speaker: null,
      };
    },
    computed: {
      speakerName() {
        return this.$route.params.name;
      },
      eventStore() {
        return useEventStore();
      },
    },
    mounted() {
      this.speaker = this.eventStore.getEvent.speakers.find(
        (speaker) => speaker.name === this.speakerName
      );
    },
  };
  </script>
  