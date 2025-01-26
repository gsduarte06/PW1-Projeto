<template>
  <div>
    <v-toolbar color="#00041F" height="80">
      <v-img :src="logo" max-height="60" max-width="133" cover @click="LandingPage"></v-img>
      <v-spacer></v-spacer>

      <!-- Navbar Buttons (responsive) -->
      <div class="d-none d-md-flex">
        <v-btn class="mr-md-4 font-weight-bold" @click="Eventpage">Event</v-btn>
        <v-btn @click="LeaderboardPage" class="mr-md-4 font-weight-bold">LeaderBoard</v-btn>
        <v-btn @click="MerchandisingPage" class="mr-md-4 font-weight-bold">Merchandising</v-btn>
      </div>

      <!-- Login/Register or User Profile -->
      <v-btn v-if="userStore.getLoggedInUser == null" @click="LoginRegister" style="background: #ff00ee"
        class="rounded-pill font-weight-bold px-6 d-md-none" rounded>
        Login/Register
      </v-btn>

      <!-- User Profile and Cart (responsive) -->
      <div v-else class="d-flex align-center">
        <v-avatar size="auto" class="mr-3">
          <v-icon color="white" size="28">mdi-bell</v-icon>
        </v-avatar>

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
          <div>
            <div v-if="cartItems.length > 0">
              <v-container>
                <v-row v-for="(item, index) in cartItems" :key="index" class="cart-item align-center mb-3 elevation-0"
                  style="border: none;">
                  <!-- Image Column -->
                  <v-col cols="auto">
                    <v-img v-if="item.image" :src="item.image" max-width="50" min-width="50" max-height="50"
                      class="rounded-circle" />
                    <v-avatar v-else>
                      <v-icon color="#fff" size="35">mdi-ticket</v-icon>
                    </v-avatar>
                  </v-col>

                  <!-- Text Column -->
                  <v-col>
                    <div class="cart-item-title font-weight-medium">{{ item.name }}</div>
                    <div class="cart-item-subtitle text-secondary">{{ item.price }}€</div>
                  </v-col>

                  <!-- Button Column -->
                  <v-col cols="auto" class="text-end">
                    <v-btn icon @click="removeFromCart(index)" class="cart-remove-btn">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </div>
            <p v-else class="empty-cart-text text-center">Your cart is empty.</p>
          </div>
        </v-card-text>
        <v-card-actions class="d-flex justify-space-between ma-2">
          <p class="text-white text-body2 ml-5">Total: {{ this.total }}€</p>
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
      return this.userStore.getCartItems;
    },
    cartCount() {
      return this.cartItems.length;
    },
    foto() {
      const user = this.userStore.getLoggedInUser;
      return user ? user.foto : null;
    },
    total() {
      return this.cartItems.reduce(function (acc, obj) { return acc + obj.price; }, 0).toFixed(2);
    }
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
      this.userStore.$persist()
    },
    checkout() {
      this.userStore.AddMerchandising();
      this.userStore.clearCart();
      this.toggleCartModal();
    },
  },
};
</script>

<style scoped>
.cart-modal-card {
  background: #1a1a2e;
  /* Background consistent with website theme */
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
  background: #1a1a2e;
  /* Blended background color */
  transition: background-color 0.3s ease;
}

.cart-item:hover {
  background-color: #333544;
  /* Light hover effect for better readability */
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
  color: #ff00ee;
  /* Matching color with website theme */
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

/* Mobile responsiveness */
@media (max-width: 768px) {
  .d-none.d-md-flex {
    display: none;
  }

  .d-md-none {
    display: block;
  }

  .v-toolbar {
    padding: 0 16px;
  }

  .v-btn {
    font-size: 0.8rem;
  }

  /* Ensure profile and cart icons stack nicely */
  .d-flex.align-center {
    flex-direction: row !important;
    justify-content: space-between;
  }

  .cart-close-btn {
    top: 8px;
    right: 8px;
  }

  /* Cart modal content adjustments */
  .cart-item-title {
    font-size: 14px;
  }

  .cart-item-subtitle {
    font-size: 12px;
  }

  .cart-remove-btn {
    font-size: 18px;
  }
}
</style>
