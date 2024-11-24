<template>
  <v-container fluid class="main-container">
    <v-row justify="center">
      <v-col cols="12" md="10" class="pa-4">
        <v-card class="mx-auto card-container">
          <v-card-title class="text-h4 card-title">
            MERCHANDISE FOR EVENTS
          </v-card-title>
          <v-card-text>
            <!-- Event Filter Dropdown -->
            <v-row justify="center" class="mb-4">
              <v-col cols="12" sm="6">
                <v-select
                  v-model="selectedEvent"
                  :items="eventTitles"
                  label="Filter by Event"
                  underlined
                  confortable
                  class="custom-dropdown"
                ></v-select>
              </v-col>
            </v-row>

            <!-- Merchandise Rows -->
            <v-row v-for="event in filteredEvents" :key="event.id" class="mb-6">
              <v-col cols="12" class="mb-4">
                <p class="text-h5 event-title">
                  {{ event.title }} Merchandise
                </p>
              </v-col>
              <v-col
                v-for="merchandise in event.merchandise"
                :key="merchandise.id"
                cols="12" sm="6" md="4"
                class="d-flex justify-center mb-4"
              >
                <v-card class="merchandise-card">
                  <v-img
                    :src="merchandise.image"
                    aspect-ratio="1"
                    class="merchandise-image"
                  ></v-img>
                  <v-card-title class="text-white text-h6 merchandise-title">
                    {{ merchandise.name }}
                  </v-card-title>
                  <v-card-subtitle class="text-white merchandise-price">
                    Price: ${{ merchandise.price }}
                  </v-card-subtitle>
                  <v-card-actions class="d-flex justify-center">
                    <v-btn
                      class="add-to-cart-btn"
                      @click="addToCart(merchandise)"
                      color="pink"
                      dark
                    >
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
</template>

<script>
import VueTshirt from "../assets/images/vue_shirt.png";
import VueMug from "../assets/images/vue_mug.png";
import VueHoodie from "../assets/images/vue_zip_hoodie.png";
import JSHoodie from '../assets/images/js_hoodie.png';
import JSNotebook from '../assets/images/js_notebook.png';
import JSMug from '../assets/images/js_mug.png';
import WebDevShirt from '../assets/images/webdevelop_shirt.png';
import WebDevBottle from '../assets/images/webdevelop_bottle.png';
import WebDevChain from '../assets/images/webdevelop_chain.png';

export default {
  data() {
    return {
      selectedEvent: null, // Selected event filter
      events: [
        {
          id: 1,
          title: "Vue.js Meetup",
          merchandise: [
            {
              id: 1,
              name: "Vue.js T-shirt",
              price: 25.99,
              image: VueTshirt,
            },
            {
              id: 2,
              name: "Vue.js Mug",
              price: 12.99,
              image: VueMug,
            },
            {
              id: 3,
              name: "Vue.js Zip Hoodie",
              price: 61.98,
              image: VueHoodie,
            },
          ],
        },
        {
          id: 2,
          title: "JavaScript Conference",
          merchandise: [
            {
              id: 4,
              name: "JS Conference Hoodie",
              price: 40.99,
              image: JSHoodie,
            },
            {
              id: 5,
              name: "JS Conference Notebook",
              price: 20.99,
              image: JSNotebook,
            },
            {
              id: 6,
              name: "JS Conference Mug",
              price: 15.99,
              image: JSMug,
            },
          ],
        },
        {
          id: 3,
          title: "Web Development Bootcamp",
          merchandise: [
            {
              id: 7,
              name: "Bootcamp Laptop Shirt",
              price: 30.99,
              image: WebDevShirt,
            },
            {
              id: 8,
              name: "Bootcamp Water Bottle",
              price: 9.99,
              image: WebDevBottle,
            },
            {
              id: 9,
              name: "Bootcamp Keychain",
              price: 2.99,
              image: WebDevChain,
            },
          ],
        },
      ],
    };
  },
  computed: {
    eventTitles() {
      // Add "All Events" as the first option
      return ["All Events", ...this.events.map((event) => event.title)];
    },
    filteredEvents() {
      if (this.selectedEvent === "All Events" || !this.selectedEvent) {
        // Combine all merchandise from all events
        const allMerchandise = this.events.flatMap((event) => event.merchandise);
        // Return a single "All Merchandise" event with sorted merchandise
        return [
          {
            id: "all",
            title: "All",
            merchandise: allMerchandise.sort((a, b) => a.name.localeCompare(b.name)),
          },
        ];
      }
      // Filter by the selected event
      return this.events.filter((event) => event.title === this.selectedEvent);
    },
  },
  methods: {
    addToCart(item) {
      console.log(`${item.name} added to cart`);
    },
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

/* Dropdown Styling */
.custom-dropdown {
  color: #ffffff;
  border-radius: 12px;
}

.custom-dropdown .v-input__control {
  color: #ffffff;
}

.custom-dropdown .v-list-item {
  background-color: #00041f;
  color: #ffffff;
}

.custom-dropdown .v-list-item--active {
  background-color: #ff00ee;
  color: #00041f;
  font-weight: bold;
}

.custom-dropdown .v-input:hover,
.custom-dropdown .v-input:focus-within {
  border-color: #ff00ee;
}

/* Event title */
.event-title {
  color: #ffffff;
  font-weight: 600;
  margin-bottom: 16px;
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
