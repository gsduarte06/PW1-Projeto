<template>
    <div class="d-flex flex-column" style="background-color: #00041f">
      <!-- Speaker Header -->
      <div class="d-flex flex-row justify-space-evenly align-center mt-16">
        <div>
          <img :src="speaker.image" alt="Speaker Image" class="rounded-xl"
            style="width: 300px; height: 300px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.8); filter: drop-shadow(-4px 4px 4px #59398E);" />
        </div>
        <div>
          <p class="text-h2 mb-4" style="color: #ff00ee">{{ speaker.name }}</p>
          <p class="text-body1 text-white mb-8" style="font-style: italic">{{ speaker.role }}</p>
          <p class="text-body1 text-white">{{ truncate(speaker.bio, 500, '...') }}</p>
          <v-btn class="rounded-xl text-white text-body1 mt-8" elevation="6" style="
              background: linear-gradient(90deg, #59398e, #ac1dbe, #d50ed6, #ff00ee);
              text-transform: none;
            " @click="goToEvent()">Back to Event</v-btn>
        </div>
      </div>
  
      <!-- Speaker Details -->
      <div class="d-flex flex-column mt-16 w-75 align-self-center">
        <p class="text-h3 mb-5" style="color: #ff00ee">About the Speaker</p>
        <p class="text-body1 text-white">{{ speaker.bio }}</p>
      </div>
  
      <!-- Past Sessions at PortoTechHub -->
      <div class="d-flex flex-column mt-16 w-75 align-self-center">
        <p class="text-h3 mb-5" style="color: #ff00ee">Past Sessions at PortoTechHub</p>
        <div v-if="speaker.pastSessions && speaker.pastSessions.length > 0">
          <v-container>
            <v-row v-for="session in speaker.pastSessions" :key="session.id" class="mb-8">
              <v-col cols="12" md="4">
                <img :src="session.image" alt="Session Image" class="rounded-xl" 
                  style="width: 100%; height: auto; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);" />
              </v-col>
              <v-col cols="12" md="8">
                <p class="text-h4 mb-2" style="color: #ff00ee">{{ session.title }}</p>
                <p class="text-body1 text-white mb-4">{{ truncate(session.description, 300, '...') }}</p>
                <p class="text-body1 text-white">
                  <v-icon icon="mdi-calendar" style="color: #ff00ee"></v-icon> {{ session.date }}
                </p>
                <p class="text-body1 text-white">
                  <v-icon icon="mdi-map-marker" style="color: #ff00ee"></v-icon> {{ session.location }}
                </p>
              </v-col>
            </v-row>
          </v-container>
        </div>
        <div v-else>
          <p class="text-body1 text-white">No past sessions available at PortoTechHub.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        speaker: {
          name: "John Doe",
          role: "Chief Technology Officer, TechCorp",
          image: "https://via.placeholder.com/300",
          bio: "John Doe is a renowned expert in technology and innovation, with over 20 years of experience leading groundbreaking projects...",
          pastSessions: [
            {
              id: 1,
              title: "Innovating for Tomorrow",
              description: "How to leverage emerging technologies for real-world impact. A key session at PortoTechHub.",
              date: "September 20, 2023",
              location: "PortoTechHub Annual Conference, Porto",
              image: "https://via.placeholder.com/600",
            },
            {
              id: 2,
              title: "Scalable AI Systems",
              description: "A PortoTechHub workshop exploring scalable AI models for global enterprises.",
              date: "September 15, 2022",
              location: "PortoTechHub Annual Conference, Porto",
              image: "https://via.placeholder.com/600",
            },
          ],
        },
      };
    },
    methods: {
      truncate(text, length, suffix) {
        if (text.length > length) {
          return text.substring(0, length) + suffix;
        }
        return text;
      },
      goToEvent() {
        this.$router.push("/event");
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  