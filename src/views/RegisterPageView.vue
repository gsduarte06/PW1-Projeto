<template>
  <div style="background-color: #00041f">
    <div class="d-flex flex-column align-center">
      <div style="color: #ff00ee; margin-top: 124px" class="text-h2">REGISTER</div>
      <v-form class="d-flex flex-column">
        <div>
          <v-text-field v-model="username" :rules="rules" label="Username" width="500" variant="outlined"
            class="text-white" style="margin-top: 62px"></v-text-field>
          <v-text-field v-model="email" :rules="rules" label="Email" width="500" variant="outlined" class="text-white"
            style="margin-top: 15px "></v-text-field>
          <v-text-field v-model="password" :rules="rules" label="Password" width="500" variant="outlined"
            type="password" style="margin-top: 15px" class="mx-auto text-white"></v-text-field>
          <v-text-field v-model="confirmPassword" :rules="rulesSamePassword" label="Confirm Password" width="500"
            variant="outlined" type="password" style="margin-top: 15px" class="mx-auto text-white"></v-text-field>
          <p class="text-white d-inline-flex" style="margin-top: 15px">
          </p>
        </div>
        <div class="d-flex flex-row justify-space-between" style="margin-top: 25px">
          <v-btn class="text-white text-body2" style="background-color: #ff00ee; width: 40%;height: 64px">
            Create Account
          </v-btn>
          <v-btn class="text-white text-body1" style="background-color: #ff00ee; width: 40%; height: 64px"
            @click="navigateToLogin">Login</v-btn>
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
      confirmPassword: null,
      email: null,
      rules: [
        value => {
          if (value) return true

          return 'Field is required'
        },
      ],
      rulesSamePassword: [
        value => {
          if (value && value == this.password) return true

          return 'Passwords must be the same'
        },
      ]
    };
  },
  methods: {
    navigateToLogin() {
      this.$router.push('./login');
    }
  }
};
</script>

<style scoped></style>
