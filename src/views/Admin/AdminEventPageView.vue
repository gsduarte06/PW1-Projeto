<template>
  <v-row no-gutters class="fill-height" style="background-color: #00041f; color: white;">
    <v-col cols="12" class="d-flex flex-column mx-auto" style="padding: 20px; max-width: 1000px;">
      <p class="text-h4 mb-5 text-center" style="color: #ff00ee;">Admin Dashboard</p>

      <!-- Event Details Section -->
      <div class="mb-10">
        <p class="text-h5 mb-3">Edit Event Details</p>
        <v-form>
          <v-row dense>
            <v-col cols="12" md="6">
              <v-text-field v-model="event.BeginDate" label="Begin Date" outlined dense></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="event.EndDate" label="End Date" outlined dense></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="event.Title" label="Event Title" outlined dense></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea v-model="event.details" label="Event Details" outlined dense></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="event.location" label="Location" outlined dense></v-text-field>
            </v-col>
          </v-row>
          <v-btn color="primary" class="mt-3" @click="saveEventDetails">Save Event Details</v-btn>
        </v-form>
      </div>

      <v-divider color="white" class="mb-10"></v-divider>

      <!-- Speakers Section -->
      <div class="mb-10">
        <p class="text-h5 mb-3">Manage Speakers</p>
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="(speaker, index) in event.speakers" :key="index" class="mb-5">
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
            <v-col cols="12" md="4">
              <v-text-field v-model="newSpeaker.name" label="Name" outlined dense></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field v-model="newSpeaker.role" label="Role" outlined dense></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field v-model="newSpeaker.image" label="Image URL" outlined dense></v-text-field>
            </v-col>
          </v-row>
          <v-btn color="primary" class="mt-3" @click="addSpeaker">Add Speaker</v-btn>
        </v-form>
      </div>

      <v-divider color="white" class="mb-10"></v-divider>

      <!-- Ticket Pricing Section -->
      <div>
        <p class="text-h5 mb-3">Edit Ticket Pricing</p>
        <v-row dense>
          <v-col cols="12" sm="6" md="4" v-for="(features, type) in event.pricing" :key="type">
            <v-card style="background-color: #2c2f3f; color: white; border-radius: 10px;" class="py-3 px-4">
              <v-card-title class="d-flex justify-space-between">
                <span class="text-subtitle-1">{{ type }} Ticket</span>
                <v-btn icon color="red" @click="removeTicketCategory(type)">
                  <v-icon small>mdi-delete</v-icon>
                </v-btn>
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
        <v-col cols="12" sm="6" md="4">
          <v-btn color="primary" class="mt-3" @click="addTicketCategory">
            <v-icon left>mdi-plus</v-icon>Add Ticket Category
          </v-btn>
        </v-col>
        <v-btn color="primary" class="mt-5 mx-auto" style="display: block; max-width: 200px;" @click="savePricing">
          Save Pricing
        </v-btn>
        <v-dialog v-model="featureModal" max-width="600px">
          <v-card>
            <v-card-title>
              <span class="text-h6">Edit Features for {{ currentTicketType }}</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-form>
                <v-text-field v-model="newFeature" label="New Feature" outlined dense placeholder="Enter feature description"></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="addFeature(currentTicketType)">Add</v-btn>
              <v-btn text @click="featureModal = false">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-col>
  </v-row>
</template>


<script>
export default {
  data() {
    return {
      event: {
        BeginDate: "21/05/2025",
        EndDate: "25/05/2025",
        Title: "Porto Tech Hub",
        location: "21 King Street, 1205 Dhaka BD",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sollicitudin...",
        pricing: {
          advanced: ["Access to all days of the event", "Access to all lectures", "Get a free T-shirt"],
          premium: ["Access to all days", "Meet event speakers", "Get a personalized T-shirt"],
          beginner: ["Access to 1 day", "Get a free T-shirt"],
        },
        speakers: [
          { name: "Jane Doe", role: "Executive Producer", image: "https://example.com/speaker1.jpg" },
          { name: "John Smith", role: "Senior Developer", image: "https://example.com/speaker2.jpg" },
        ],
      },
      newSpeaker: { name: "", role: "", image: "" },
      featureModal: false,
      currentTicketType: "",
      newFeature: "",
    };
  },
  methods: {
    saveEventDetails() {
      alert("Event details saved!");
    },
    addSpeaker() {
      if (this.newSpeaker.name && this.newSpeaker.role && this.newSpeaker.image) {
        this.event.speakers.push({ ...this.newSpeaker });
        this.newSpeaker = { name: "", role: "", image: "" };
      } else {
        alert("Please fill in all speaker fields.");
      }
    },
    removeSpeaker(index) {
      this.event.speakers.splice(index, 1);
    },
    savePricing() {
      alert("Ticket pricing saved!");
    },
    addTicketCategory() {
      const newCategory = prompt("Enter a new ticket category name:");
      if (newCategory && !this.event.pricing[newCategory]) {
        this.event.pricing[newCategory] = [];
      } else {
        alert("Invalid or duplicate category name.");
      }
    },
    removeTicketCategory(type) {
      if (confirm(`Are you sure you want to delete the ${type} category?`)) {
        delete this.event.pricing[type];
      }
    },
    openFeatureModal(type) {
      this.currentTicketType = type;
      this.featureModal = true;
    },
    addFeature(type) {
      if (this.newFeature) {
        this.event.pricing[type].push(this.newFeature);
        this.newFeature = "";
        this.featureModal = false;
      } else {
        alert("Feature description cannot be empty.");
      }
    },
    removeFeature(type, index) {
      this.event.pricing[type].splice(index, 1);
    },
  },
};
</script>


<style scoped>
.v-row {
  margin: 0;
}
.v-card {
  transition: transform 0.2s ease-in-out;
}
.v-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(255, 255, 255, 0.2);
}
.v-chip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
}
</style>
