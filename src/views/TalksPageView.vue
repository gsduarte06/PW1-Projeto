<template>
  <div class="d-flex flex-column" style="background-color: #00041f; padding: 20px;">
    <div class="d-flex flex-row justify-space-evenly mt-16">
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="12" md="8">
            <v-card class="mx-auto elevation-0"
              style="border-radius: 12px; background-color: #00041f; margin-top: 15px">
              <v-card-text>
                <p class="text-h2 mb-5" style="color: #ff00ee">Morning Talks</p>
                <div v-if="morningTalks.length > 0">
                  <div v-for="talk in morningTalks" :key="talk.id" class="talk-item">
                    <h3 class="text-white">{{ talk.title }}</h3>
                    <p class="text-white">{{ talk.speakers }} - {{ talk.begin }} - {{ talk.location }}</p>
                    <p class="text-white">{{ truncate(talk.description, 100, '...') }}</p>

                    <!-- Display full description when clicked -->
                    <div v-if="talk.showFullText">
                      <p class="text-white">{{ talk.description }}</p>
                    </div>

                    <!-- See More button below the description -->
                    <v-btn class="rounded-xl text-white text-body1 mt-2" elevation="6"
                      style="background: linear-gradient(90deg, #59398e, #ac1dbe, #d50ed6, #ff00ee); text-transform: none;"
                      @click="toggleFullText(talk)">
                      {{ talk.showFullText ? 'See Less' : 'See More' }}
                    </v-btn>
                  </div>
                </div>
                <div v-else>
                  <p class="text-white">No morning talks available.</p>
                </div>

                <p class="text-h2 mb-5" style="color: #ff00ee">Afternoon Talks</p>
                <div v-if="afternoonTalks.length > 0">
                  <div v-for="talk in afternoonTalks" :key="talk.id" class="talk-item">
                    <h3 class="text-white">{{ talk.title }}</h3>
                    <p class="text-white">{{ talk.speakers }} - {{ talk.begin }} - {{ talk.location }}</p>
                    <p class="text-white">{{ truncate(talk.description, 100, '...') }}</p>

                    <!-- Display full description when clicked -->
                    <div v-if="talk.showFullText">
                      <p class="text-white">{{ talk.description }}</p>
                    </div>

                    <!-- See More button below the description -->
                    <v-btn class="rounded-xl text-white text-body1 mt-2" elevation="6"
                      style="background: linear-gradient(90deg, #59398e, #ac1dbe, #d50ed6, #ff00ee); text-transform: none;"
                      @click="toggleFullText(talk)">
                      {{ talk.showFullText ? 'See Less' : 'See More' }}
                    </v-btn>
                  </div>
                </div>
                <div v-else>
                  <p class="text-white">No afternoon talks available.</p>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      morningTalks: [],
      afternoonTalks: [],
    };
  },
  async mounted() {
    try {
      const response = await axios.get('src/api/db.json'); // Ensure the path is correct
      if (response.data.PortoTechHub && Array.isArray(response.data.PortoTechHub)) {
        const allTalks = [];

        response.data.PortoTechHub.forEach(event => {
          if (event.schedule) {
            event.schedule.forEach(session => {
              if (session.content) {
                session.content.forEach(talkArray => {
                  allTalks.push(...talkArray);
                });
              }
            });
          }
        });

        // Split talks into morning and afternoon based on the 'begin' time
        this.morningTalks = allTalks
          .filter(talk => talk.begin && talk.begin < "12:00")
          .map(talk => ({
            ...talk,
            showFullText: false
          }));
        this.afternoonTalks = allTalks
          .filter(talk => talk.begin && talk.begin >= "12:00")
          .map(talk => ({
            ...talk,
            showFullText: false
          }));

        // Remove duplicates if any
        this.morningTalks = this.removeDuplicates(this.morningTalks);
        this.afternoonTalks = this.removeDuplicates(this.afternoonTalks);

      } else {
        console.error('No talks found in the schedule.');
      }
    } catch (error) {
      console.error('Error fetching talks:', error);
    }
  },

  methods: {
    truncate(text, length, suffix) {
      return text.length > length ? text.substring(0, length) + suffix : text;
    },
    toggleFullText(talk) {
      talk.showFullText = !talk.showFullText;
    },
    removeDuplicates(talks) {
      const uniqueTalks = [];
      const seenIds = new Set();
      talks.forEach(talk => {
        if (!seenIds.has(talk.id)) {
          seenIds.add(talk.id);
          uniqueTalks.push(talk);
        }
      });
      return uniqueTalks;
    },
  },
};
</script>

<style scoped>
.talk-item {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ac1dbe;
  border-radius: 8px;
  background-color: #1a1a2e;
}
</style>