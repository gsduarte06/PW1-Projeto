<template>
  <div v-if="this.event != null">
    <v-container fluid class="main-container">
      <v-row justify="center">
        <v-col cols="12" md="10" class="pa-4">
          <v-card class="mx-auto card-container">
            <v-card-title class="text-h4 card-title">
              MERCHANDISE OF THE EVENT
            </v-card-title>
            <v-card-text>
              <!-- Merchandise Row -->
              <v-row class="d-flex justify-start">
                <v-col v-for="merchandise in event.merchandise" :key="merchandise.id" cols="12" sm="6" md="4"
                  class="d-flex justify-center mb-4">
                  <v-card class="merchandise-card">
                    <v-img :src="merchandise.image" aspect-ratio="1" class="merchandise-image"></v-img>
                    <v-card-title class="text-white text-h6 merchandise-title">
                      {{ merchandise.name }}
                    </v-card-title>
                    <v-card-subtitle class="text-white merchandise-price">
                      Price: ${{ merchandise.price }}
                    </v-card-subtitle>
                    <v-card-actions class="d-flex justify-center">
                      <v-btn class="add-to-cart-btn" @click="addToCart(merchandise)" color="pink" dark>
                        Add to Cart
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Simple Alert -->
    <div v-if="alert.visible" class="simple-alert">
      <span>{{ alert.message }}</span>
    </div>
  </div>
  <div v-else>
    <div class="d-flex flex-column justify-center align-center h-80" style="background-color: #00041f">

      <!-- Skeleton Loader -->
      <v-skeleton-loader type="heading, image@2, paragraph@4" class="mt-5"
        style="background-color: #00041f"></v-skeleton-loader>
    </div>
  </div>
</template>

<script>
import { useEventStore } from '../stores/event';
import { useUserStore } from '../stores/users';

export default {
  data() {
    return {
      alert: {
        visible: false,
        message: "",
      },
    };
  },
  async mounted() {
    await this.eventStore.fetchevents();
  },
  computed: {
    event() {
      return this.eventStore.getEvent;
    },
  },
  methods: {
    addToCart(item) {
      if (this.userStore) {
        item.type = "merch"
        this.userStore.addItemToCart(item);
        this.alert.message = `${item.name} added to cart!`;
        this.alert.visible = true;
        setTimeout(() => {
          this.alert.visible = false;
        }, 3000);
      } else {
        console.error("userStore is undefined");
      }
    },
  },
  setup() {
    const eventStore = useEventStore();
    const userStore = useUserStore();

    return { eventStore, userStore };
  },
};
</script>


<style scoped>
/* Container adjustments */
.main-container {
  padding: 20px;
  background-color: #00041f;
}

/* Card adjustments */
.card-container {
  border-radius: 12px;
  background-color: #00041f;
  padding: 24px;
}

.card-title {
  color: #ff00ee;
  text-align: center;
  margin-bottom: 20px;
}

/* Merchandise card */
.merchandise-card {
  width: 100%;
  background-color: #000b52;
  border-radius: 12px;
  padding: 16px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.merchandise-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

/* Image styling */
.merchandise-image {
  height: 250px;
  width: 100%;
  object-fit: cover;
  border-radius: 12px 12px 0 0;
  margin-bottom: 12px;
}

/* Title and price */
.merchandise-title {
  font-weight: bold;
  text-align: center;
  margin-bottom: 8px;
}

.merchandise-price {
  font-size: 16px;
  text-align: center;
  margin-bottom: 12px;
  color: #ffffff;
}

/* Button */
.add-to-cart-btn {
  width: 100%;
  text-transform: none;
  padding: 10px;
}

/* Simple alert styling (bottom-right corner) */
.simple-alert {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #ff00ee;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 9999;
}

/* Mobile adjustments */
@media (max-width: 600px) {
  .merchandise-card {
    width: 100%;
  }

  .merchandise-image {
    height: 150px;
  }
}
</style>
