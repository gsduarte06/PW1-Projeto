<template>
  <div style="background-color: #00041F; min-height: 100vh; padding: 32px">
    <div class="d-flex flex-column align-center">
      <!-- Leaderboard Title -->
      <div 
        style="
          color: #FFFFFF; 
          text-shadow: -4px 4px #FF00EE; 
          margin-bottom: 24px" 
        class="text-h2"
      >
        LEADERBOARD
      </div>
      <!-- Leaderboard Card -->
      <v-card style="width: 80%; background-color: #00041F; border: 1px solid #1a1a2e;">
        <v-card-text>
          <v-data-table
            :items="leaderboardData"
            :headers="headers"
            class="elevation-0"
            dense
            style="background-color: #00041F"
          >
            <!-- Top Players Bar -->
            <template v-slot:top>
              <v-toolbar flat dark color="#000B52" class="px-4">
                <div style="width: 5%; color: #FFFFFF; text-align: center;">#</div>
                <div style="width: 75%; color: #FFFFFF; text-align: left;">Username</div>
                <div style="width: 20%; color: #FFFFFF; text-align: right;">Points</div>
              </v-toolbar>
            </template>

            <!-- Table Rows -->
            <template v-slot:body="{ items }">
              <div
                v-for="item in items"
                :key="item.rank"
                :class="item.rank <= 3 ? 'text-h2' : 'text-body1'"
                class="d-flex py-2 px-4"
                style="align-items: center;"
              >
                <!-- Rank -->
                <div style="width: 5%; text-align: center; color: #FF00EE;">{{ item.rank }}</div>
                <!-- Username -->
                <div style="width: 75%; text-align: left; color: #FFFFFF;">{{ item.username }}</div>
                <!-- Points -->
                <div style="width: 20%; text-align: right; color: #00FF88;">{{ item.points }}</div>
              </div>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [], // Headers are managed manually in the top bar.
      leaderboardData: [
        { rank: 1, username: "PlayerOne", points: 1500 },
        { rank: 2, username: "BestGamer", points: 1400 },
        { rank: 3, username: "CoolUser", points: 1300 },
        { rank: 4, username: "ProPlayer", points: 1200 },
        { rank: 5, username: "EliteUser", points: 1100 },
      ],
    };
  },
};
</script>
