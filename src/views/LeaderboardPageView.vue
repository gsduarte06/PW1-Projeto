<template>
  <div style="background-color: #00041F; min-height: 100vh; padding: 32px">
    <div class="d-flex flex-column align-center">
      <!-- Leaderboard Title and Table in Same Row -->
      <div class="d-flex flex-column  align-left" style="width: 80%; margin-top: 24px;">
        <!-- Leaderboard Title -->
        <div style="color: #FFFFFF; text-shadow: -4px 4px 6px #FF00EE; text-align: left; font-size: 2rem;"
          class="text-h3">
          LEADERBOARD
        </div>
        <p class="text-body1 text-white mt-5"> Stay on top of the leaderboard until the end od the event to win a brand
          new Playstation 5 and a opportunity to be part of the team for next year</p>
      </div>



      <!-- Leaderboard Card -->
      <v-card style="width: 80%; background-color: #00041F;">
        <v-card-text>
          <!-- Custom Top Bar -->
          <v-toolbar flat dark color="#000B52" class="px-4">
            <div style="width: 5%; color: #FFFFFF; text-align: center;" class="text-h4">#</div>
            <div style="width: 75%; color: #FFFFFF; text-align: left;" class="text-h4">Username</div>
            <div style="width: 20%; color: #FFFFFF; text-align: right;" class="text-h4">Points</div>
          </v-toolbar>

          <!-- Spacer Immediately Below the Top Bar -->
          <div style="height: 16px; width: 100%;"></div> <!-- Spacer (Adjust height as needed) -->

          <!-- Table Rows -->
          <v-data-table :items="leaderboardData" :headers="headers" class="elevation-0" dense
            style="background-color: #00041F">
            <template v-slot:body="{ items }">
              <div v-for="item in items" :key="item.rank" class="d-flex flex-column py-2 px-4"
                style="align-items: center;">
                <div class="d-flex" style="width: 100%; align-items: center;">
                  <!-- Rank -->
                  <div :class="item.rank <= 3 ? 'text-h4 top-rank' : 'text-body1'"
                    style="width: 5%; text-align: center; color: #FFFFFF;">
                    {{ item.rank }}
                  </div>
                  <!-- Username -->
                  <div :class="item.rank <= 3 ? 'text-h4' : 'text-body1'"
                    style="width: 75%; text-align: left; color: #FFFFFF;">
                    {{ item.username }}
                  </div>
                  <!-- Points -->
                  <div :class="item.rank <= 3 ? 'text-h4' : 'text-body1'"
                    style="width: 20%; text-align: right; color: #FFFFFF;">
                    {{ item.points }}
                  </div>
                </div>

                <!-- Spacer Between Players (Optional) -->
                <div style="height: 8px; width: 100%; background-color: #FFFFFF; margin: 8px 0; border-radius: 4px;">
                </div>
              </div>
            </template>
            <template v-slot:bottom>
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
      headers: [], // Headers are managed manually in the top bar.
      leaderboardData: [

      ],
    }
  },
  mounted() {
    let data = this.userStore.getUsers
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
</style>
