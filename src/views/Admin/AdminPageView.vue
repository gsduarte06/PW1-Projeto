<template>
  <v-row no-gutters class="fill-height" style="background-color: #00041f; color: white;">
    <v-col cols="12" class="d-flex flex-column mx-auto" style="padding: 20px; max-width: 800px;">
      <p class="text-h4 mb-5 text-center" style="color: #ff00ee;">User Administration</p>

      <!-- Redirect to Events Section -->
      <div class="mb-10 text-center">
        <p class="text-h5 mb-3">Manage Events</p>
        <v-btn color="primary" @click="redirectToEvents" class="mb-5">
          Go to Events Management
        </v-btn>
      </div>

      <v-divider color="white" class="mb-10"></v-divider>

      <!-- User Management Section -->
      <div>
        <p class="text-h5 mb-3">Manage Users</p>
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="(user, index) in users" :key="index" class="mb-5">
            <v-card style="background-color: #59398e; color: white;">
              <v-card-title>{{ user.name }}</v-card-title>
              <v-card-subtitle>Role: {{ user.role }}</v-card-subtitle>
              <v-card-text>
                <v-select
                  v-model="user.role"
                  :items="roles"
                  label="Change Role"
                  dense
                  outlined
                  style="color: white;"
                ></v-select>
              </v-card-text>
              <v-card-actions>
                <v-btn color="red" @click="removeUser(index)">Remove User</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <!-- Add New User Section -->
        <p class="text-h6 mt-5">Add New User</p>
        <v-form>
          <v-text-field v-model="newUser.name" label="Name" outlined dense></v-text-field>
          <v-select
            v-model="newUser.role"
            :items="roles"
            label="Role"
            outlined
            dense
          ></v-select>
          <v-btn color="primary" class="mt-3" @click="addUser">Add User</v-btn>
        </v-form>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      roles: ["Admin", "Editor", "Viewer"], // Available roles
      users: [
        { name: "Alice Johnson", role: "Admin" },
        { name: "Bob Smith", role: "Editor" },
        { name: "Catherine Doe", role: "Viewer" },
      ],
      newUser: {
        name: "",
        role: "",
      },
    };
  },
  methods: {
    redirectToEvents() {
      // Navigate to /admin/1
      this.$router.push('/admin/1');
    },
    addUser() {
      if (this.newUser.name && this.newUser.role) {
        this.users.push({ ...this.newUser });
        this.newUser = { name: "", role: "" };
      } else {
        alert("Please fill in all fields.");
      }
    },
    removeUser(index) {
      this.users.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.v-row {
  margin: 0; /* Removes the space between columns */
}
.v-card {
  border: 1px solid white;
}
</style>
