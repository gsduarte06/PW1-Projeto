<template>
  <div style="background-color: #00041f">
    <div class="d-flex flex-column align-center">
      <div style="color: #ff00ee; margin-top: 124px" class="text-h2">REGISTER</div>
      <v-form class="d-flex flex-column">
        <div>
          <v-text-field 
            v-model="username" 
            :rules="rules" 
            label="Username" 
            width="500" 
            variant="outlined" 
            class="text-white" 
            style="margin-top: 62px" 
            v-on:input="this.registerError = false"
          ></v-text-field>

          <v-text-field 
            v-model="email" 
            :rules="rules" 
            label="Email" 
            width="500" 
            variant="outlined" 
            class="text-white" 
            style="margin-top: 15px"
          ></v-text-field>

          <v-text-field 
            v-model="password" 
            :rules="rules" 
            label="Password" 
            width="500" 
            variant="outlined" 
            type="password" 
            style="margin-top: 15px" 
            class="mx-auto text-white"
          ></v-text-field>

          <v-text-field 
            v-model="confirmPassword" 
            :rules="rulesSamePassword" 
            label="Confirm Password" 
            width="500" 
            variant="outlined" 
            type="password" 
            style="margin-top: 15px" 
            class="mx-auto text-white"
          ></v-text-field>

          <p class="text-white d-inline-flex" style="margin-top: 15px"></p>
        </div>

        <div class="d-flex flex-row justify-space-between" style="margin-top: 25px">
          <v-btn 
            class="text-white text-body2" 
            style="background-color: #ff00ee; width: 40%; height: 64px" 
            @click="Register"
          >
            Create Account
          </v-btn>

          <v-btn 
            class="text-white text-body1" 
            style="background-color: #ff00ee; width: 40%; height: 64px" 
            @click="navigateToLogin"
          >
            Login
          </v-btn>
        </div>

        <v-alert 
          v-if="registerError" 
          type="error" 
          border="left" 
          class="mt-5"
        >
          Username already taken. Please choose a different one
        </v-alert>
      </v-form>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/users';

export default {
  data() {
    return {
      userStore: useUserStore(),
      username: null,
      password: null,
      confirmPassword: null,
      email: null,

      registerError: false,
      rules: [
        value => {
          if (value) return true;
          return 'Field is required';
        },
      ],
      rulesSamePassword: [
        value => {
          if (value && value == this.password) return true;
          return 'Passwords must be the same';
        },
      ],
    };
  },
  methods: {
    navigateToLogin() {
      this.$router.push('./login');
    },
    Register() {
      if (this.userStore.createAccount(this.username, this.email, this.password)) {
        console.log("Success");
        this.userStore.CheckLogUserIn(this.username, this.password);
        this.$router.push('/');
        this.registerError = false; // Reset error on successful login
      } else {
        console.log("Failure");
        this.registerError = true; // Trigger error on failure
      }
    },
  },
};
</script>

<style scoped>
/* Mobile responsiveness */
@media (max-width: 768px) {
  /* Stack the form fields vertically on mobile */
  .d-flex {
    flex-direction: column !important; /* Force vertical stacking */
    align-items: center;
  }

  /* Adjust form width for mobile */
  .v-text-field {
    width: 90% !important; /* Adjust input field width */
    margin-top: 15px;
  }

  /* Adjust buttons for mobile */
  .v-btn {
    width: 90% !important; /* Make buttons take full width */
    margin-top: 10px;
  }

  /* Stack buttons vertically on mobile */
  .d-flex.flex-row {
    flex-direction: column !important;
    align-items: center;
  }

  /* Reduce header size on mobile */
  .text-h2 {
    font-size: 1.5rem; /* Make the heading smaller on mobile */
  }
}
</style>
