<template>
  <div class="d-flex flex-column" style="background-color: #00041f">
    <div class="d-flex flex-row justify-space-evenly mt-16">
      <v-container fluid style="padding: 20px">
        <v-row justify="center">
          <v-col cols="12" md="8">
            <v-card class="mx-auto" style="border-radius: 12px; background-color: #00041f; margin-top: 15px;">
              <v-card-text>
                <v-row align="center">
                  <v-col cols="4" class="d-flex justify-center align-center">
                    <v-avatar size="200" class="profile-avatar">
                      <img src="../assets/images/profile_image.jpg" alt="User's Profile Picture" />
                    </v-avatar>
                  </v-col>
                  <v-col cols="1" class="divider"></v-col>
                  <v-col cols="7" style="margin-top: 50px;">
                    <v-row align="center" style="margin-bottom: 16px">
                      <v-col cols="4">
                        <label class="text-white text-body1 font-weight-medium">Name:</label>
                      </v-col>
                      <v-col cols="8">
                        <span class="text-white font-weight-regular" style="text-align: left; display: block;">
                          {{ user.name }}
                        </span>
                      </v-col>
                    </v-row>
                    <v-row align="center" style="margin-bottom: 16px">
                      <v-col cols="4">
                        <label class="text-white text-body1 font-weight-medium">Email:</label>
                      </v-col>
                      <v-col cols="8">
                        <span class="text-white font-weight-regular" style="text-align: left; display: block;">
                          {{ user.email }}
                        </span>
                      </v-col>
                    </v-row>
                    <v-row align="center" style="margin-bottom: 16px">
                      <v-col cols="4">
                        <label class="text-white text-body1 font-weight-medium">Password:</label>
                      </v-col>
                      <v-col cols="8">
                        <span class="text-white font-weight-regular" style="text-align: left; display: block;">
                          {{ user.password.replace(/./g, '●') }}
                        </span>
                      </v-col>
                    </v-row>
                    <v-row align="start" style="margin-bottom: 16px">
                      <v-col cols="4">
                        <label class="text-white text-body1 font-weight-medium">Bio:</label>
                      </v-col>
                      <v-col cols="8">
                        <span class="text-white font-weight-regular" style="font-size: 18px; text-align: left; display: block;">
                          {{ user.bio }}
                        </span>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <v-row justify="center" class="mt-4">
              <v-btn class="edit-btn" @click="editDialog = true">
                Edit Data
              </v-btn>
            </v-row>

            <v-dialog v-model="editDialog" max-width="600px">
              <v-card class="edit-dialog-card">
                <v-card-title class="edit-dialog-title">
                  Edit User Details
                </v-card-title>
                <v-card-text>
                  <v-form ref="editForm">
                    <v-row align="center" style="margin-bottom: 16px">
                      <v-col cols="4">
                        <label class="text-white text-body1 font-weight-medium">Name:</label>
                      </v-col>
                      <v-col cols="8">
                        <v-text-field v-model="editedUser.name" outlined dense class="input-field"></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row align="center" style="margin-bottom: 16px">
                      <v-col cols="4">
                        <label class="text-white text-body1 font-weight-medium">Email:</label>
                      </v-col>
                      <v-col cols="8">
                        <v-text-field v-model="editedUser.email" outlined dense class="input-field"></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row align="center" style="margin-bottom: 16px">
                      <v-col cols="4">
                        <label class="text-white text-body1 font-weight-medium">Password:</label>
                      </v-col>
                      <v-col cols="8">
                        <v-text-field v-model="editedUser.password" type="password" outlined dense class="input-field"></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row align="start" style="margin-bottom: 16px">
                      <v-col cols="4">
                        <label class="text-white text-body1 font-weight-medium">Bio:</label>
                      </v-col>
                      <v-col cols="8">
                        <v-textarea v-model="editedUser.bio" outlined dense rows="3" class="input-field"></v-textarea>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn text @click="editDialog = false" class="btn-cancel">
                    Cancel
                  </v-btn>
                  <v-btn text @click="saveData" class="btn-save">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            
            <v-card class="mt-6 event-card" style="border-radius: 12px; background-color: #00041f; padding-top: 70px;">
              <p class="text-h4 mt-16 mb-10" style="color: #ff00ee">UPCOMING EVENTS</p>
              <v-card-text>
                <v-row v-for="event in events" :key="event.id" class="event-row" align="center" style="margin-bottom: 16px;">
                  <v-col cols="3" class="date-rectangle d-flex justify-center align-center" style="background-color: #000B52; border-radius: 8px;">
                    <span class="text-white" style="font-size: 18px; font-weight: bold;">
                      {{ event.date }}
                    </span>
                  </v-col>
                  <v-col cols="9">
                    <div class="event-details">
                      <h3 class="text-white" style="font-size: 18px; font-weight: 600;">{{ event.title }}</h3>
                      <p class="text-white">{{ event.location }}</p>
                      <p class="text-white">{{ event.description }}</p>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "Jessica Fletcher",
        email: "jessica@example.com",
        password: "mysecurepassword",
        bio: "Fusce nisi leo, porta nec diam vitae, dictum fermentum odio. Fusce venenatis, tortor in imperdiet semper, ante arcu accumsan orci.",
      },
      editedUser: {},
      editDialog: false,
      events: [
        {
          id: 1,
          date: "24 Mar",
          title: "Vue.js Meetup",
          location: "San Francisco, CA",
          description: "Join us for a meetup to discuss the latest trends and best practices in Vue.js development.",
        },
        {
          id: 2,
          date: "4 April",
          title: "JavaScript Conference",
          location: "New York, NY",
          description: "A major conference for JavaScript developers. Workshops, keynotes, and networking opportunities.",
        },
        {
          id: 3,
          date: "15 April",
          title: "Web Development Bootcamp",
          location: "Los Angeles, CA",
          description: "A week-long bootcamp for aspiring web developers. Intensive training in HTML, CSS, and JavaScript.",
        },
      ],
    };
  },
  methods: {
    saveData() {
      Object.assign(this.user, this.editedUser);
      this.editDialog = false;
    },
  },
  watch: {
    editDialog(val) {
      if (val) {
        this.editedUser = { ...this.user };
      }
    },
  },
};
</script>

<style scoped>
.profile-avatar img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.divider {
  border-left: 2px solid #ff00ee;
  height: 300px;
}

.v-btn {
  text-transform: none;
}

.edit-dialog-card {
  background: linear-gradient(135deg, #1a1a2e, #262640);
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
}

.edit-dialog-title {
  color: #ff00ee;
  font-weight: 600;
  font-size: 24px;
  text-align: center;
}

.input-field {
  background-color: #262640;
  color: white;
  border-radius: 12px;
}

.input-field .v-input__control {
  border-radius: 12px;
}

.input-field .v-input__slot {
  border-radius: 12px;
}

.edit-btn {
  background-color: #ff00ee;
  color: white;
  width: 200px;
  height: 50px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
}

.edit-btn:hover {
  background-color: #ff33cc;
}

.btn-cancel {
  color: #ff00ee;
  font-weight: bold;
}

.btn-save {
  color: #ffffff;
  background-color: #ff00ee;
  font-weight: bold;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  border-radius: 8px;
}

.btn-save:hover {
  background-color: #ff33cc;
}

.event-row {
  margin-bottom: 30px;
}

.date-rectangle {
  padding: 24px;
  height: 100px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.event-details {
  padding-left: 24px;
}

.event-title {
  font-size: 20px;
  font-weight: 600;
}

.event-details p {
  margin-top: 8px;
  font-size: 16px;
}
</style>
