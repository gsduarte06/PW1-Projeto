<template>
  <v-container fluid style="background-color: #00041f; padding: 20px">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <div style="color: #ff00ee; margin-top: 100px" class="text-h2 text-center font-weight-bold">
          USER DETAILS
        </div>
        <v-card
          class="mx-auto"
          style="background-color: #1a1a2e; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5)"
        >
          <v-card-text>
            <!-- User Image using v-avatar -->
            <v-row justify="center" class="mb-5">
              <v-avatar
                size="150"
                style="border: 3px solid #ff00ee; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4)"
              >
                <img
                  src="../assets/images/profile_image.jpg"
                  alt="User's Profile Picture"
                  style="object-fit: cover; width: 100%; height: 100%; border-radius: 50%"
                />
              </v-avatar>
            </v-row>

            <!-- Details -->
            <v-row align="center" style="margin-bottom: 16px">
              <v-col cols="4">
                <label class="text-white text-body1 font-weight-medium">Name:</label>
              </v-col>
              <v-col cols="8">
                <span id="name" class="text-white font-weight-regular">{{ user.name }}</span>
              </v-col>
            </v-row>
            <v-row align="center" style="margin-bottom: 16px">
              <v-col cols="4">
                <label class="text-white text-body1 font-weight-medium">Email:</label>
              </v-col>
              <v-col cols="8">
                <span id="email" class="text-white font-weight-regular">{{ user.email }}</span>
              </v-col>
            </v-row>
            <v-row align="center" style="margin-bottom: 16px">
              <v-col cols="4">
                <label class="text-white text-body1 font-weight-medium">Password:</label>
              </v-col>
              <v-col cols="8">
                <span id="password" class="text-white font-weight-regular">
                  {{ user.password.replace(/./g, '●') }}
                </span>
              </v-col>
            </v-row>
            <v-row align="start" style="margin-bottom: 16px">
              <v-col cols="4">
                <label class="text-white text-body1 font-weight-medium">Bio:</label>
              </v-col>
              <v-col cols="8">
                <span id="bio" class="text-white font-weight-regular">{{ user.bio }}</span>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- Centered Edit Data button -->
        <v-row justify="center">
          <v-btn
            class="text-white text-body1"
            style="background-color: #ff00ee; margin-top: 24px; width: 200px; height: 50px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);"
            @click="editDialog = true"
          >
            Edit Data
          </v-btn>
        </v-row>

        <!-- Edit Dialog -->
        <v-dialog v-model="editDialog" max-width="600px">
          <v-card
            style="background-color: #1a1a2e; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5)"
          >
            <v-card-title
              style="color: #ff00ee; font-weight: bold"
              class="text-h5 text-center"
            >
              Edit User Details
            </v-card-title>
            <v-card-text>
              <v-form ref="editForm">
                <v-row align="center" style="margin-bottom: 16px">
                  <v-col cols="4">
                    <label class="text-white text-body1 font-weight-medium">Name:</label>
                  </v-col>
                  <v-col cols="8">
                    <v-text-field
                      v-model="editedUser.name"
                      outlined
                      dense
                      style="background-color: #262640; color: white"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row align="center" style="margin-bottom: 16px">
                  <v-col cols="4">
                    <label class="text-white text-body1 font-weight-medium">Email:</label>
                  </v-col>
                  <v-col cols="8">
                    <v-text-field
                      v-model="editedUser.email"
                      outlined
                      dense
                      style="background-color: #262640; color: white"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row align="center" style="margin-bottom: 16px">
                  <v-col cols="4">
                    <label class="text-white text-body1 font-weight-medium">Password:</label>
                  </v-col>
                  <v-col cols="8">
                    <v-text-field
                      v-model="editedUser.password"
                      type="password"
                      outlined
                      dense
                      style="background-color: #262640; color: white"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row align="start" style="margin-bottom: 16px">
                  <v-col cols="4">
                    <label class="text-white text-body1 font-weight-medium">Bio:</label>
                  </v-col>
                  <v-col cols="8">
                    <v-textarea
                      v-model="editedUser.bio"
                      outlined
                      dense
                      rows="3"
                      style="background-color: #262640; color: white"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                @click="editDialog = false"
                style="color: white; font-weight: bold"
              >
                Cancel
              </v-btn>
              <v-btn
                text
                style="color: #ff00ee; font-weight: bold"
                @click="saveData"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
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
