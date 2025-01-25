<template>
    <div v-if="updateEvent != null" class="d-flex flex-column " style="background-color: #00041f; color: white;">
      <p class="text-h4 mb-5 text-center" style="color: #ff00ee;">Admin Dashboard</p>
      <!-- Event Details Section -->
      <div class="mb-10 w-75 align-self-center">
        <p class="text-h5 mb-3">Edit Event Details</p>
        <v-form>
          <v-row dense>
            <v-col cols="12" md="6">
              <v-text-field v-model="updateEvent.BeginDate" label="Event Date" outlined dense></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="updateEvent.location" label="Location" outlined dense></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea v-model="updateEvent.details" label="Event Details" outlined dense auto-grow></v-textarea>
            </v-col>

          </v-row>
          <v-btn color="primary" class="mt-3" @click="saveEventDetails">Save Event Details</v-btn>
        </v-form>
      </div>

      <v-divider color="white" class="mb-10 w-66 align-self-center  "></v-divider>

      <!-- Speakers Section -->
      <div class="mb-10  w-75 align-self-center">
        <p class="text-h5 mb-3">Manage Speakers</p>
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="(speaker, index) in updateEvent.speakers" :key="index" class="mb-5">
            <v-card style="background-color: #59398e; color: white; border-radius: 10px;">
              <v-card-title class="d-flex justify-space-between">
                <span>{{ speaker.name }}</span>
                <v-icon color="white">mdi-account</v-icon>
              </v-card-title>
              <v-card-subtitle>{{ speaker.role }}</v-card-subtitle>
              <v-img :src="speaker.image" alt="" class="mb-3" height="150"></v-img>
              <v-card-actions>
                <v-btn color="red" @click="removeSpeaker(index)">Remove Speaker</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <p class="text-h6 mt-5">Add New Speaker</p>
        <v-form>
          <v-row dense>
            <v-col cols="12" md="6">
              <v-text-field v-model="newSpeaker.name" label="Name" outlined dense></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="newSpeaker.role" label="Role" outlined dense></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="newSpeaker.image" label="Image URL" outlined dense></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="newSpeaker.linkedIn" label="LinkedIn URL" outlined dense></v-text-field>
            </v-col>
          </v-row>
          <v-col cols="12">
            <v-textarea v-model="newSpeaker.description" label="Description" outlined dense auto-grow></v-textarea>
          </v-col>
          <v-btn color="primary" class="mt-3" @click="addSpeaker">Add Speaker</v-btn>
        </v-form>
      </div>

      <v-divider color="white" class="mb-10 w-66 align-self-center"></v-divider>

      <div  class="w-75 align-self-center align-center mt-16 ">
      <div class="d-flex flex-column align-center mb-10">
        <p class="text-h3 mb-5" style="color: #ff00ee">Schedule</p>
      </div>
      <v-card class="elevation-5 rounded-lg" style="background-color: #00041f;">
        <v-tabs v-model="tab" class="text-white" style="background-color: #000B52;">
          <v-tab v-for="(day, index) in updateEvent.schedule" :key="index" :value="day.TimeOfDay">
            {{ day.TimeOfDay }}
          </v-tab>
        </v-tabs>

        <v-card-text style="background-color: #00041f;" elevation="0">
          <div v-for="day in updateEvent.schedule" :key="day.TimeOfDay" v-show="tab === day.TimeOfDay" class="w-100">

            <div>
              <div v-for="(content, index) in day.content" :key="content.id" class="d-flex flex-column text-white ">
                <v-container elevation="0" fluid>
                  <v-row>
                    <v-col v-for="contentHour in content" :key="contentHour.id" cols="12" md="6">
                      <v-card class="elevation-0 rounded-lg" style="background-color: #00041f;">
                        <v-row>
                          <v-col cols="12" md="8"
                            @click="goToDetails(contentHour, day.TimeOfDay, index, content.indexOf(contentHour))">
                            <v-chip class="text-body3 align-center text-white mb-2" small elevated
                              style="background-color: #ff00ee;">
                              {{ contentHour.location }}
                            </v-chip>
                            <p class="text-body1 font-weight-bold text-white">{{ contentHour.title }}</p>
                            <p v-if="contentHour.type != null" class="text-body2 text-white"> Type: {{
                              contentHour.type }}
                            </p>
                            <div>
                              <p class="text-body2 d-flex flex-row text-white">
                                From:
                                <span class="text-body2 font-weight-bold ml-1"> {{ contentHour.begin }}</span>
                              </p>
                              <p class="text-body2 d-flex flex-row text-white">
                                Until:
                                <span class="text-body2 font-weight-bold ml-1"> {{ contentHour.end }}</span>
                              </p>
                            </div>
                            <p v-if="contentHour.speakers != null" class="text-body2 text-white"> Speakers: {{
                              contentHour.speakers.join(", ") }}</p>
                          </v-col>
                          <v-col cols="12" md="4">
                            <v-btn variant="outlined" class="text-body mt-14 mb-15 text-white"
                              style="border-color: #ff00ee"
                              @click="goToDetails(contentHour, day.TimeOfDay, index, content.indexOf(contentHour))">See
                              More</v-btn>
                          </v-col>
                        </v-row>
                      </v-card>

                    </v-col>
                  </v-row>
                  <v-divider color="#fffff" class="my-4"></v-divider>
                </v-container>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>

    
      <v-divider color="white" class="mb-10 w-66 align-self-center"></v-divider>
      <!-- Ticket Pricing Section -->
      <div class = " w-75 align-self-center">
        <p class="text-h5 mb-3 text-center">Edit Ticket Pricing</p>
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="(features, type) in updateEvent.pricing" :key="type">
            <v-card style="background-color: #2c2f3f; color: white; border-radius: 10px;" class="py-3 px-4">
              <v-card-title class="d-flex justify-space-between">
                <span class="text-subtitle-1">{{ type }} Ticket</span>
              </v-card-title>
              <v-divider color="white"></v-divider>
              <v-card-text>
                <v-row v-for="(feature, index) in features" :key="index" dense class="align-center mb-2">
                  <v-col>
                    <div class="d-flex align-center justify-space-between">
                      <span>{{ feature }}</span>
                      <v-btn icon small color="red" @click="removeFeature(type, index)">
                        <v-icon x-small>mdi-close</v-icon>
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-btn outlined color="white" @click="openFeatureModal(type)">
                  <v-icon left>mdi-plus</v-icon>Add Feature
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-dialog v-model="featureModal" max-width="600px">
          <v-card>
            <v-card-title>
              <span class="text-h6">Edit Features for {{ currentTicketType }}</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-form>
                <v-text-field v-if="currentTicketType == 'premiumFeatures'" v-model="newFeature" label="New Feature"
                  outlined dense placeholder="Enter feature description"></v-text-field>
                <v-select v-else :items="eventStore.getTicketOptions" v-model="newFeature"></v-select>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="addFeature()">Add</v-btn>
              <v-btn text @click="featureModal = false">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>

</template>


<script>
import { useEventStore } from '@/stores/event';
export default {
  data() {
    return {
      eventStore: useEventStore(),
      updateEvent: null,
      newSpeaker: { name: "", role: "", image: "", description: "", linkedIn: "" },
      featureModal: false,
      currentTicketType: "",
      newFeature: "",
      selectedSpeaker: "",
      speakersNames: [],
      newLecture: { title: "", time: "", description: "" },
    }
  },
  mounted() {
    this.updateEvent = this.event
    this.speakersNames.push("")
    this.speakersNames = this.event.speakers.map((speaker) => speaker.name);
    console.log(this.updateEvent.schedule );
    
  },
  computed: {
    event() {
      return this.eventStore.getEvent
    }
  },
  methods: {
    saveEventDetails() {
      if (window.confirm('Are you sure you want to update the event?')) {
        this.eventStore.updateevents(this.updateEvent)
        this.eventStore.$persist()
        alert("Event details saved!");
      }
    },
    addSpeaker() {
      if (this.newSpeaker.name && this.newSpeaker.role && this.newSpeaker.image && this.newSpeaker.description) {
        this.event.speakers.push({ ...this.newSpeaker });
        this.eventStore.updateevents(this.event)
        this.eventStore.$persist()
        this.newSpeaker = { name: "", role: "", image: "", description: "", linkedIn: "" };
      } else {
        alert("Please fill in all speaker fields.");
      }
    },
    removeSpeaker(index) {
      this.event.speakers.splice(index, 1);
      this.eventStore.updateevents(this.event)
      this.eventStore.$persist()
    },
    savePricing() {
      alert("Ticket pricing saved!");
    },
    openFeatureModal(type) {
      this.currentTicketType = type;
      this.featureModal = true;
    },

    addFeature() {
      if (this.newFeature) {
        if (this.currentTicketType == 'premiumFeatures') {
          const result = this.eventStore.addTicketOption(this.newFeature)
          if (result) {
            alert("New feature added successfully")
          } else {
            alert("Feature already exists")
            this.newFeature = "";
            this.featureModal = false;
            return
          }
        }
        this.event.pricing[this.currentTicketType].push(this.newFeature);
        this.eventStore.updateevents(this.event)
        this.newFeature = "";
        this.featureModal = false;
        this.eventStore.$persist()
      } else {
        alert("Feature description cannot be empty.");
      }
    },
    removeFeature(type, index) {
      this.event.pricing[type].splice(index, 1);
      this.eventStore.updateevents(this.event)
      this.eventStore.$persist()
    },
  },
};
</script>


<style scoped>


.v-card {
  transition: transform 0.2s ease-in-out;
}

.v-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(255, 255, 255, 0.2);
}


</style>
