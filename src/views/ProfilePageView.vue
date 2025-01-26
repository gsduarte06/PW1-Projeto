<template>
  <div class="d-flex flex-column" style="background-color: #00041f">
    <div class="d-flex flex-row justify-space-evenly mt-16">
      <v-container fluid style="padding: 20px">
        <v-row justify="center">
          <v-col cols="12" md="8">
            <v-card class="mx-auto elevation-0"
              style="border-radius: 12px; background-color: #00041f; margin-top: 15px">
              <v-card-text>
                <v-row align="start">
                  <!-- Avatar -->
                  <v-col cols="12" md="4" class="d-flex justify-center align-center" style="margin-top: 90px">
                    <v-avatar size="200" class="profile-avatar">
                      <img v-if="user.foto" :src="user.foto" alt="User's Profile Picture" />
                      <v-icon v-else class="mr-md-4" color="white" size="200">
                        mdi-account-circle
                      </v-icon>
                    </v-avatar>
                  </v-col>

                  <v-col cols="12" md="7" style="margin-top: 20px; padding-left: 10px; padding-right: 10px">
                    <!-- User Info (Name, Email, etc.) -->
                    <v-row align="center" style="margin-bottom: 8px">
                      <v-col cols="4">
                        <label class="text-white custom-label">Username:</label>
                      </v-col>
                      <v-col cols="8">
                        <span class="text-white font-weight-regular" style="text-align: left; display: block">
                          {{ user.username }}
                        </span>
                      </v-col>
                    </v-row>
                    <v-row align="center" style="margin-bottom: 8px">
                      <v-col cols="4">
                        <label class="text-white custom-label">Name:</label>
                      </v-col>
                      <v-col cols="8">
                        <span class="text-white font-weight-regular" style="text-align: left; display: block">
                          {{ user.name }}
                        </span>
                      </v-col>
                    </v-row>
                    <v-row align="center" style="margin-bottom: 8px">
                      <v-col cols="4">
                        <label class="text-white custom-label">Email:</label>
                      </v-col>
                      <v-col cols="8">
                        <span class="text-white font-weight-regular" style="text-align: left; display: block">
                          {{ user.email }}
                        </span>
                      </v-col>
                    </v-row>

                    <v-row align="start" style="margin-bottom: 8px">
                      <v-col cols="4">
                        <label class="text-white custom-label">Bio:</label>
                      </v-col>
                      <v-col cols="8">
                        <span class="text-white font-weight-regular"
                          style="font-size: 18px; text-align: left; display: block">
                          {{ user.bio }}
                        </span>
                      </v-col>
                    </v-row>

                    <!-- Points info placed below Bio -->
                    <v-row align="center" style="margin-bottom: 8px">
                      <v-col cols="4">
                        <label class="text-white custom-label">Points:</label>
                      </v-col>
                      <v-col cols="8">
                        <span class="text-white font-weight-regular" style="text-align: left; display: block">
                          {{ user.points }}
                        </span>
                      </v-col>
                    </v-row>

                    <!-- Icon Badges Section -->
                    <v-row align="start" style="margin-bottom: 8px">
                      <v-col cols="4">
                        <label class="text-white custom-label">Badges:</label>
                      </v-col>
                      <v-col cols="8">
                        <div class="d-flex flex-wrap">
                          <v-tooltip v-for="badge in user.badges" :key="badge.id" top :open-on-hover="true"
                            transition="scale-transition">
                            <template v-slot:activator="{ props }">
                              <v-chip class="badge-chip" v-bind="props" :style="badge.achieved
                                ? 'background-color: #ff00ee; color: white;'
                                : 'background-color: #555; color: #aaa;'
                                " style="margin: 4px" @click="showBadgeDetails(badge)">
                                <v-icon>{{ badge.icon }}</v-icon>
                              </v-chip>
                            </template>
                            <span>{{ badge.title }}</span>
                          </v-tooltip>
                        </div>
                      </v-col>
                    </v-row>

                    <!-- Modal for Badge Details -->
                    <v-dialog v-model="badgeModal" max-width="500px">
                      <v-card class="badge-modal-card">
                        <v-card-title class="badge-modal-title">
                          {{ selectedBadge?.title || "Badge Details" }}
                        </v-card-title>
                        <v-card-text>
                          <p v-if="1 == 1" class="text-white text-body1">
                            {{ selectedBadge.description }}
                          </p>
                          <p v-else class="text-white text-body1">
                            You haven't obtained this badge yet!
                          </p>
                        </v-card-text>
                        <v-card-actions>
                          <v-btn text @click="badgeModal = false" class="btn-close">
                            Close
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <!-- Edit Button -->
            <v-row justify="center" class="mt-4 d-flex flex-row justify-space-evenly">
              <v-btn class="edit-btn" @click="logout"> Logout </v-btn>
              <v-btn class="edit-btn" @click="editDialog = true"> Edit Data </v-btn>
              <v-btn class="edit-btn" @click="() => {this.$router.push('/admin')}" outlined> Admin </v-btn>
            </v-row>
            <v-dialog v-model="editDialog" max-width="600px">
              <v-card class="edit-dialog-card" style="padding-top: 16px; padding-bottom: 16px">
                <v-card-title class="edit-dialog-title"> Edit User Details </v-card-title>
                <v-card-text style="padding-top: 8px; padding-bottom: 8px">
                  <v-form >
                    <v-row align="center" style="margin-bottom: 8px">
                      <v-col cols="4">
                        <label class="text-white text-body1 font-weight-medium">Username:</label>
                      </v-col>
                      <v-col cols="8">
                        <v-text-field class="text-white" v-model="editedUser.username" variant="underlined"
                          density="comfortable"></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row align="center" style="margin-bottom: 8px">
                      <v-col cols="4">
                        <label class="text-white text-body1 font-weight-medium">Name:</label>
                      </v-col>
                      <v-col cols="8">
                        <v-text-field class="text-white" v-model="editedUser.name" variant="underlined"
                          density="comfortable"></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row align="center" style="margin-bottom: 8px">
                      <v-col cols="4">
                        <label class="text-white text-body1 font-weight-medium">Email:</label>
                      </v-col>
                      <v-col cols="8">
                        <v-text-field class="text-white" v-model="editedUser.email" variant="underlined"
                          density="comfortable"></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row align="center" style="margin-bottom: 8px">
                      <v-col cols="4">
                        <label class="text-white text-body1 font-weight-medium">Password:</label>
                      </v-col>
                      <v-col cols="8">
                        <v-text-field class="text-white" v-model="editedUser.password" type="password"
                          variant="underlined" density="comfortable"></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row align="start" style="margin-bottom: 8px" class="">
                      <v-col cols="4">
                        <label class="text-white text-body1 font-weight-medium">Bio:</label>
                      </v-col>
                      <v-col cols="8">
                        <v-textarea class="text-white" v-model="editedUser.bio" variant="underlined"
                          density="comfortable" no-resize auto-grow rows="2"></v-textarea>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
                <v-card-actions style="padding-top: 8px" class="mr-4">
                  <v-btn text @click="editDialog = false" class="btn-cancel">
                    Cancel
                  </v-btn>
                  <v-btn text @click="saveData" class="btn-save"> Save </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <div v-if="user.talks.length != 0"class="d-flex flex-column align-self-center mt-16">
              <p class="text-h3" style="color: #ff00ee">Your Talks</p>
              <div class="d-flex flex-column">
                <!-- Cards -->
                <div v-for="talk in user.talks" :key="talk.id" class="d-flex flex-row mt-16">
                  <div class="d-flex flex-column align-center justify-center text-white text-body1 font-weight-medium"
                    style="background-color: #000b52; min-height: 180px; width: 10%">
                    <p>{{ talk.begin }}</p>
                    <p>{{ talk.end }}</p>
                  </div>
                  <div class="d-flex flex-column justify-space-between ma-2 ml-5" style="width: 90%">
                    <p class="text-white text-h4">{{ talk.title }}</p>
                    <p class="text-body1" style="color:#ff00ee">{{ talk.location }}</p>
                    <p class="text-white text-body1">{{ truncate(talk.description, 200, '...') }}</p>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/users";
export default {
  data() {
    return {
      userStore: useUserStore(),
      badgeModal: false,
      selectedBadge: null,
      editedUser: {},
      editDialog: false,
      password: "",
    };
  },

  beforeMount() {

  },

  methods: {
    truncate(text, length, suffix) {
      if (text.length > length) {
        return text.substring(0, length) + suffix;
      } else {
        return text;
      }
    },
    showBadgeDetails(badge) {
      this.selectedBadge = badge;
      this.badgeModal = true;
    },
    logout() {
      this.userStore.setLoggedInUser("");
      this.$router.push("/");
    },
    saveData() {
      if (!(this.userStore.checkpassword(this.editedUser.password)) && this.editedUser.password != "") {
        this.editedUser.password = this.userStore.encryptPassword(this.editedUser.password);
      } else {
        this.editedUser.password = this.userStore.getLoggedInUser.password;
      }
      this.userStore.updateUser(this.editedUser);
      this.editDialog = false;
    },
  },
  computed: {
    user() {
      return this.userStore.getLoggedInUser;
    },
  },
  watch: {
    editDialog(val) {
      if (val) {
        this.editedUser = { ...this.user };
        this.editedUser.password = "";
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

.date-rectangle {
  padding: 24px;
  height: 100px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.talk-details {
  padding-left: 24px;
}

.talk-title {
  font-size: 20px;
  font-weight: 600;
}

.talk-details p {
  margin-top: 8px;
  font-size: 16px;
}

.custom-label {
  font-weight: 600;
  font-size: 20px;
}

.badge-modal-card {
  background: linear-gradient(135deg, #1a1a2e, #262640);
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  padding: 20px;
}

.badge-modal-title {
  color: #ff00ee;
  font-weight: bold;
  font-size: 20px;
}

.btn-close {
  color: #ff00ee;
  font-weight: bold;
}

@media (max-width: 600px) {
  .profile-avatar img {
    width: 150px;
    /* Adjust size for smaller screens */
    height: 150px;
  }

  .v-btn {
    font-size: 14px;
    padding: 8px;
    margin: 8px;
  }

  .edit-btn {
    font-size: 14px;
    width: 160px;
    padding: 10px;
  }

  .custom-label {
    font-size: 16px;
  }

  .badge-chip {
    margin: 2px;
    padding: 8px;
  }

  .text-white {
    font-size: 14px;
  }

  .badge-modal-title {
    font-size: 18px;
  }

  .edit-dialog-title {
    font-size: 20px;
  }
}
</style>

