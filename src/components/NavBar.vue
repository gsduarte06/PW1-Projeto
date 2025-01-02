<template>
  <div>
    <v-toolbar color="#00041F" height="80">
      <v-img :src="logo" max-height="60" max-width="133" cover @click="LandingPage"></v-img>
      <v-spacer></v-spacer>

      <v-btn class="mr-md-4 font-weight-bold" @click="Eventpage">Event</v-btn>
      <v-btn @click="LeaderboardPage" class="mr-md-4 font-weight-bold">LeaderBoard</v-btn>
      <v-btn @click="MerchandisingPage" class="mr-md-4 font-weight-bold">Merchandising</v-btn>

      <v-btn
        v-if="userStore.getLoggedInUser == null"
        @click="LoginRegister"
        style="background: #ff00ee"
        class="rounded-pill font-weight-bold px-6"
        rounded
      >
        Login/Register
      </v-btn>

      <div v-else class="d-flex align-center">
        <v-avatar size="auto" class="mr-3">
          <v-icon color="white" size="28">mdi-bell</v-icon>
        </v-avatar>

        <!-- Shopping Cart Icon -->
        <v-btn icon @click="toggleCartModal" class="mr-3">
          <v-badge :content="cartCount" color="pink" overlap>
            <v-icon color="#e5e5e5" size="28">mdi-cart</v-icon>
          </v-badge>
        </v-btn>

        <v-avatar v-if="foto != null" :image="foto" size="x-large" @click="ProfilePage"></v-avatar>
        <v-avatar v-else size="x-large" @click="ProfilePage">
          <v-icon color="#e5e5e5" size="35">mdi-account-circle</v-icon>
        </v-avatar>
      </div>
    </v-toolbar>

    <!-- Cart Modal -->
    <v-dialog v-model="isCartModalOpen" max-width="600">
      <v-card class="cart-modal-card">
        <v-card-title class="cart-modal-title">
          <span class="text-h5">Shopping Cart</span>
          <v-btn icon @click="toggleCartModal" class="cart-close-btn">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item-group v-if="cartItems.length > 0">
              <v-list-item v-for="(item, index) in cartItems" :key="index" class="cart-item">
                <v-list-item-avatar>
                  <v-img :src="item.image" max-width="50" max-height="50" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="cart-item-title">{{ item.name }}</v-list-item-title>
                  <v-list-item-subtitle class="cart-item-subtitle">${{ item.price }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-btn icon @click="removeFromCart(index)" class="cart-remove-btn">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-list-item>
            </v-list-item-group>
            <p v-if="cartItems.length === 0" class="empty-cart-text">Your cart is empty.</p>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" @click="checkout" :disabled="cartItems.length === 0">Checkout</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>



<script>
import { useUserStore } from '@/stores/users';

export default {
  data() {
    return {
      userStore: useUserStore(),
      logo: './src/assets/Logo.png',
      isCartModalOpen: false,
    };
  },
  computed: {
    cartItems() {
      return this.userStore.getCartItems();
    },
    cartCount() {
      return this.cartItems.length;
    },
    foto() {
      const user = this.userStore.getLoggedInUser;
      return user ? user.foto : null;
    },
  },
  methods: {
    LoginRegister() {
      this.$router.push('/login');
    },
    LeaderboardPage() {
      this.$router.push('/leaderboard');
    },
    LandingPage() {
      this.$router.push('/');
    },
    MerchandisingPage() {
      this.$router.push('/merchandising');
    },
    Eventpage() {
      this.$router.push('/event');
    },
    ProfilePage() {
      this.$router.push('/profile');
    },
    toggleCartModal() {
      this.isCartModalOpen = !this.isCartModalOpen;
    },
    removeFromCart(index) {
      this.userStore.removeItemFromCart(index);
    },
    checkout() {
      alert('Checkout successful!');
      this.userStore.clearCart();
      this.toggleCartModal();
    },
  },
};
</script>

<style scoped>
.cart-modal-card {
  background: #1a1a2e; /* Background consistent with website theme */
  border-radius: 12px;
  padding: 20px;
  position: relative;
}

.cart-modal-title {
  color: #ffffff;
  font-weight: bold;
  font-size: 22px;
}

.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #444;
  background-color: #262640; /* Blended background color */
  transition: background-color 0.3s ease;
}

.cart-item:hover {
  background-color: #333544; /* Light hover effect for better readability */
}

.cart-item-title {
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cart-item-subtitle {
  color: #bbbbbb;
  font-size: 14px;
}

.cart-remove-btn {
  color: #ff00ee;
  font-size: 20px;
  background-color: transparent;
  border: none;
}

.empty-cart-text {
  color: #ff00ee; /* Matching color with website theme */
  font-size: 16px;
  text-align: center;
  margin-top: 20px;
}

.cart-close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  color: #ff00ee;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-close-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
