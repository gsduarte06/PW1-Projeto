<template>
  <div style="background-color: #00041f">
    <div class="d-flex flex-column align-center">
      <div style="color: #ff00ee; margin-top: 124px" class="text-h2">LOGIN</div>
      <v-form class="d-flex flex-column">
        <div>
          <v-text-field v-model="username" :rules="rules" label="Username" width="500" variant="outlined"
            class="text-white" style="margin-top: 62px"></v-text-field>
          <v-text-field v-model="password" :rules="rules" label="Password" width="500" variant="outlined"
            type="password" style="margin-top: 15px" class="mx-auto text-white"></v-text-field>
          <p class="text-white d-inline-flex" style="margin-top: 15px">
            If you forgot your password, click
          </p>
          <p class=" ml-1 d-inline-flex" style="color: #ff00ee">here</p>
        </div>
        <div class="d-flex flex-row justify-space-between" style="margin-top: 25px">
          <v-btn class="text-white text-body1" style="background-color: #ff00ee; width: 40%; height: 64px">Login</v-btn>
          <v-btn class="text-white text-body1"
            style="background-color: #ff00ee; width: 40%; height: 64px">Register</v-btn>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: null,
      password: null,
      rules: [
        value => {
          if (value) return true

          return 'Field is required'
        },
      ]
    };
  },
};
</script>

<style scoped></style>
