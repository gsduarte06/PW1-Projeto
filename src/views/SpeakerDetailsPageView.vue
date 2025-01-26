<template>
  <div class="speaker-details" style="background-color: #00041f; color: white; padding: 20px;">
    <v-card style="background-color: #00041f; color: white; padding: 20px;">
      <div class="d-flex align-center speaker-info-container">
        <!-- Speaker Image -->
        <img
          v-if="speaker?.image"
          :src="speaker.image"
          alt="Speaker Image"
          class="rounded-xl speaker-image"
        />
        <img
          v-else
          src="https://via.placeholder.com/250"
          alt="Placeholder Image"
          class="rounded-xl speaker-image"
        />
        <!-- Speaker Info -->
        <div class="speaker-text-container">
          <v-card-title class="text-h4 speaker-title">
            {{ speaker?.name }}
          </v-card-title>
          <v-card-subtitle class="text-h5 speaker-subtitle">
            {{ speaker?.role }}
          </v-card-subtitle>
        </div>
      </div>
    </v-card>
    <p class="text-body2 speaker-description">
      {{ speaker?.description || "No bio available" }}
    </p>
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

<style scoped>
.speaker-image {
  width: 250px;
  height: 250px;
  margin-right: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
}

.speaker-title {
  color: #ff00ee;
}

.speaker-subtitle {
  color: #ff00ee;
}

.speaker-description {
  line-height: 1.8;
}

.speaker-info-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.speaker-text-container {
  margin-left: 30px;
}

@media (max-width: 600px) {
  .speaker-details {
    padding: 10px;
  }

  .speaker-image {
    width: 150px;
    height: 150px;
    margin-right: 0;
    margin-bottom: 15px;  /* Adds spacing between the image and the text */
  }

  .speaker-title {
    font-size: 16px;  /* Smaller font size for name */
  }

  .speaker-subtitle {
    font-size: 14px;  /* Smaller font size for role */
  }

  .speaker-description {
    font-size: 14px;
    text-align: justify;
  }

  .d-flex {
    flex-direction: column;
    align-items: center;
  }

  .speaker-info-container {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .speaker-text-container {
    text-align: center;
    margin-left: 0;  /* Remove left margin */
  }
}
</style>
