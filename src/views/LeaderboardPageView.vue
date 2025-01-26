<template>
  <div style="background-color: #00041F; min-height: 100vh; padding: 32px">
    <div class="d-flex flex-column align-center">
      <!-- Leaderboard Title and Table in Same Row -->
      <div class="d-flex flex-column align-left" style="width: 80%; margin-top: 24px;">
        <!-- Leaderboard Title -->
        <div style="color: #FFFFFF; text-shadow: -4px 4px 6px #FF00EE; text-align: left; font-size: 2rem;"
          class="text-h3">
          LEADERBOARD
        </div>
        <p class="text-body1 text-white mt-5" style="font-size: 1rem;"> Stay on top of the leaderboard until the end of the event to win a brand new Playstation 5 and an opportunity to be part of the team for next year</p>
      </div>

      <!-- Leaderboard Card -->
      <v-card style="width: 80%; background-color: #00041F;">
        <v-card-text>
          <!-- Custom Top Bar -->
          <v-toolbar flat dark color="#000B52" class="px-4">
            <div style="width: 5%; color: #FFFFFF; text-align: center;" class="text-h4">#</div>
            <div style="width: 70%; color: #FFFFFF; text-align: left;" class="text-h4">Username</div>
            <div style="width: 20%; color: #FFFFFF; text-align: right;" class="text-h4">Points</div>
          </v-toolbar>

          <!-- Spacer Immediately Below the Top Bar -->
          <div style="height: 16px; width: 100%;"></div>

          <!-- Table Rows -->
          <v-data-table :items="leaderboardData" :headers="headers" class="elevation-0" dense
            style="background-color: #00041F">
            <template v-slot:body="{ items }">
              <div v-for="item in items" :key="item.rank" class="d-flex flex-row py-1 px-3"
                style="align-items: center; width: 100%; flex-wrap: wrap;">
                <!-- Rank -->
                <div :class="item.rank <= 3 ? 'text-h4 top-rank' : 'text-body1'"
                  style="width: 5%; text-align: center; color: #FFFFFF; font-size: 0.9rem; padding-right: 8px;">
                  {{ item.rank }}
                </div>
                <!-- Username -->
                <div :class="item.rank <= 3 ? 'text-h4' : 'text-body1'"
                  style="width: 70%; text-align: left; color: #FFFFFF; font-size: 0.9rem; padding-right: 8px;">
                  {{ item.username }}
                </div>
                <!-- Points -->
                <div :class="item.rank <= 3 ? 'text-h4' : 'text-body1'"
                  style="width: 20%; text-align: right; color: #FFFFFF; font-size: 0.9rem;">
                  {{ item.points }}
                </div>
              </div>

              <!-- Spacer Between Players -->
              <div style="height: 8px; width: 100%; background-color: #FFFFFF; margin: 8px 0; border-radius: 4px;">
              </div>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/users';
export default {
  data() {
    return {
      userStore: useUserStore(),
      headers: [],
      leaderboardData: [],
    }
  },
  mounted() {
    let data = this.userStore.getUsers;
    console.log(data.sort((a, b) => b.points - a.points));
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      this.leaderboardData.push({ rank: index + 1, username: element.username, points: element.points })
    }
  },
};
</script>

<style scoped>
/* Highlight for top ranks */
.top-rank {
  color: #FFFFFF !important;
  text-shadow: 4px 4px 6px #FF00EE !important;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .d-flex.flex-column {
    width: 100% !important;
    margin-top: 16px; /* Smaller gap at the top */
  }

  /* Leaderboard title and description adjustments */
  .text-h3 {
    font-size: 1.5rem !important;
    margin-bottom: 10px; /* Reduced gap */
  }

  .text-body1 {
    font-size: 0.9rem !important; /* Smaller font size for description */
  }

  /* Adjust the width of the card for mobile */
  .v-card {
    width: 95% !important;
  }

  /* Stack the leaderboard content vertically */
  .v-toolbar {
    display: block;
    padding: 0 !important;
  }

  /* Adjust the table rows to be stacked vertically on mobile */
  .v-data-table .d-flex {
    flex-direction: column !important;
    width: 100% !important;
    padding-left: 0 !important;
  }

  /* Keep columns aligned on mobile */
  .v-data-table .d-flex .text-h4,
  .v-data-table .d-flex .text-body1 {
    font-size: 0.9rem !important; /* Smaller font size */
    width: 100% !important;
    text-align: left !important;
  }

  .v-data-table .d-flex .text-body1 {
    text-align: right !important;
  }

  /* Adjust the spacing between rows */
  .v-data-table .py-2 {
    padding-top: 8px !important;
    padding-bottom: 8px !important;
  }

  /* Adjust the padding in the header */
  .v-toolbar .text-h4 {
    font-size: 0.9rem !important;
  }

  /* Add a little more margin between rows */
  .v-data-table .elevation-0 {
    margin-top: 16px !important;
  }
}
</style>
