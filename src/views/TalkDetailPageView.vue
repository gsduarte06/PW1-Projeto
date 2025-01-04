<template>
  <div v-if="talk" class="talk-details">
    <h1 class="title">{{ talk.title }}</h1>
    <h2 class="location">{{ talk.location }}</h2>
    <div class="content">
      <p><strong>Description:</strong> {{ talk.description }}</p>
      <p><strong>From:</strong> {{ talk.begin }}</p>
      <p><strong>Until:</strong> {{ talk.end }}</p>
      <p><strong>Speakers:</strong> {{ talk.speakers }}</p>
      <p><strong>Type:</strong> {{ talk.type }}</p>
    </div>
  </div>
  <div v-else>
    <v-skeleton-loader type="heading, image@2, paragraph@4" class="mt-5" style="background-color: #00041f"></v-skeleton-loader>
  </div>
</template>

<script>
export default {
  data() {
    return {
      talk: {
        begin: "09:30",
        end: "09:50",
        location: "PTH Main Track",
        speakers: "Samuel Santos",
        type: "Talk",
        title: "Welcome",
        description: "Welcoming to Porto Tech Hub Conference 2024"
      }
    };
  }
};
</script>

<style scoped>
/* Styling without a card, more direct */
.talk-details {
  background-color: #00041f;
  padding: 20px;
  color: white;
  overflow: hidden; /* Prevent overflow that might cause unwanted shapes */
}

.title {
  font-size: 2rem;
  color: #ff00ee;
  font-weight: bold;
}

.location {
  font-size: 1.5rem;
  color: #ff00ee;
}

.content {
  font-size: 1rem;
  line-height: 1.6;
}

strong {
  color: #ff00ee;
}
</style>
