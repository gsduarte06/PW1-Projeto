<template>
  <div style="background-color: #00041f">
    <div class="d-flex flex-column align-center">
      <div style="color: #ff00ee; margin-top: 124px" class="text-h2">LOGIN</div>
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
            v-on:input="this.loginError = false"
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
            v-on:input="this.loginError = false"
          ></v-text-field>
        </div>

        <div class="d-flex flex-row justify-space-between" style="margin-top: 25px">
          <v-btn 
            class="text-white text-body1" 
            style="background-color: #ff00ee; width: 40%; height: 64px"
            @click="Login"
          >
            Login
          </v-btn>

          <v-btn 
            class="text-white text-body1" 
            style="background-color: #ff00ee; width: 40%; height: 64px"
            @click="navigateToRegister"
          >
            Register
          </v-btn>
        </div>

        <v-alert 
          v-if="loginError" 
          type="error" 
          border="left" 
          class="mt-5"
        >
          Invalid username or password. Please try again.
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
      loginError: false,
      rules: [
        value => {
          if (value) return true;
          return 'Field is required';
        },
      ],
    };
  },
  methods: {
    navigateToRegister() {
      this.$router.push('/register');
    },
    Login() {
      try {
        if (this.userStore.CheckLogUserIn(this.username, this.password)) {
          console.log("Success");
          this.loginError = false; // Reset error on successful login
          this.$router.push('/');
        } else {
          throw new Error("Failed login in")
        }
      } catch (error) {
        console.log("Failure");
        this.loginError = true; // Trigger error on failure
      }
    }
  },
};
</script>

<style scoped>
@media (max-width: 768px) {
  .d-flex {
    flex-direction: column !important; 
    align-items: center;
  }

  .v-text-field {
    width: 90% !important; 
    margin-top: 15px;
  }

  .v-btn {
    width: 90% !important; 
    margin-top: 10px;
  }

  .d-flex.flex-row {
    flex-direction: column !important;
    align-items: center;
  }

  .text-h2 {
    font-size: 1.5rem; 
  }
}
</style>
