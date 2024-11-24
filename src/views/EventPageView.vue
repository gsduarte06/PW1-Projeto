<template>
  <div class="d-flex flex-column" style="background-color: #00041f">
    <div class="d-flex flex-row justify-space-evenly mt-16">
      <div>
        <p class="text-h4 mb-5" style="color: #ff00ee">UPCOMING EVENTS</p>
        <p class="text-body1 mb-15" style="color: #ffffff">
          {{ event.BeginDate }} - {{ event.EndDate }}
        </p>
        <v-spacer></v-spacer>
        <p class="text-h2" style="color: #ffffff">{{ event.Title }}</p>

        <p class="text-body1 mb-16" style="color: #ffffff">
          <v-icon icon="mdi-map-marker" style="color: #ff00ee"></v-icon>{{ event.location }}
        </p>
        <v-btn class="rounded-xl text-white text-body1" elevation="6" style="
            background: linear-gradient(90deg, #59398e, #ac1dbe, #d50ed6, #ff00ee);
            text-transform: none;
          ">Buy your ticket</v-btn>
        <!-- timer -->
        <v-container style="color: white" class="pa-0">
          <v-row class="text-center mt-14">
            <v-col class="pa-0">
              <div>
                <div class="text-h3">{{ event.timeleft.days }}</div>
                <div class="text-body2">days</div>
              </div>
            </v-col>
            <v-col class="pa-0">
              <div>
                <div class="text-h3">{{ event.timeleft.hours }}</div>
                <div class="text-body2">hours</div>
              </div>
            </v-col>
            <v-col class="pa-0">
              <div>
                <div class="text-h3">{{ event.timeleft.minutes }}</div>
                <div class="text-body2">minutes</div>
              </div>
            </v-col>
            <v-col class="pa-0">
              <div>
                <div class="text-h3">{{ event.timeleft.seconds }}</div>
                <div class="text-body2">seconds</div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <!-- right foto with gradiant -->
      <div style="min-width: 600px; min-height: 600px" class="mt-n16">
        <div style="
            background: radial-gradient(circle, #006385, #00041f 70%);
            width: 600px;
            height: 600px;
            border-radius: 20%;
          " class="d-flex justify-center align-center">
          <img src="https://res.cloudinary.com/dvyic4oaf/image/upload/v1732313558/ctiwxyjj5kgmiabb0ump.jpg" alt=""
            style="box-shadow: 0 4px 20px rgba(0, 0, 0, 0.8); border-radius: 12px" />
        </div>
      </div>
    </div>
    <div class="d-flex flex-column align-center w-75 align-self-center">
      <p class="text-h3 mt-16 mb-3" style="color: #ff00ee">Event Details</p>
      <div>
        <p class="text-body1 text-white">{{ event.details }}</p>
      </div>
    </div>
    <div>
      <div class="d-flex flex-column w-75 align-self-center mx-auto">
        <p class="text-h3 mt-16 mb-10" style="color: #ff00ee">Speakers</p>
        <v-container>
          <v-carousel class="h-auto" show-arrows="hover" hide-delimiters>
            <v-carousel-item v-for="(page, pageIndex) in paginatedSpeakers" :key="pageIndex">
              <v-row>
                <v-col v-for="(speaker, index) in page" :key="index" sm="6" md="4"
                  class="d-flex justify-center align-center ">
                  <v-card style="background:#00041f; border: 1px solid white; width:60%" class="d-flex flex-column">
                    <div class="d-flex flex-column align-center  justify-space-evenly ">

                      <v-img class="mt-4 rounded-circle " :src="speaker.image" :alt="speaker.name" width="100"
                        aspect-ratio="1/1"></v-img>
                      <div>
                        <v-card-title class="text-center text-white">{{ speaker.name }}</v-card-title>
                        <v-card-subtitle class="text-center text-white mb-4">
                          {{ speaker.role }}
                        </v-card-subtitle>
                      </div>
                    </div>


                  </v-card>
                </v-col>
              </v-row>
            </v-carousel-item>
          </v-carousel>
        </v-container>
      </div>
    </div>

    <div>
      <v-container class="d-flex flex-column align-center" style="color: white">
        <!-- Title Section -->
        <v-row justify="center" class="text-center mb-10 mt-16">
          <v-col cols="12">
            <p class="text-h4">Choose a ticket</p>
            <p style="color: #ff007f" class="text-h3">Get your ticket here</p>
          </v-col>
        </v-row>

        <!-- Pricing Cards -->
        <v-row justify="center" class="pricing-row">
          <!-- Advanced Card -->
          <v-col cols="12" sm="4" class="d-flex">
            <v-card class="pa-6" style="background: #59398E" elevation="10 rounded-xl">
              <div class="d-flex flex-column justify-center align-center">
                <v-card-title>
                  <v-chip class=" " style="background-color: #9e61ff; color: white">Advanced</v-chip>
                </v-card-title>
                <v-card-title class="text-h3 text-center text-white mt-3">
                  150.00€
                </v-card-title>
              </div>
              <v-divider color="#fff" class="my-4"></v-divider>
              <v-list dense style="background-color: #59398E;">
                <v-list-item v-for="(feature, index) in event.princing.advancedFeatures" :key="index">
                  <v-icon class="mr-2" color="light-green">mdi-check-circle</v-icon>
                  <span class="text-white">{{ feature }}</span>
                </v-list-item>
              </v-list>
              <v-card-actions class="justify-center mt-5">
                <v-btn class="" style="
                    background: linear-gradient( #ff007f, #6e44ff);
                    color: white;
                    border-radius: 25px;
                  ">
                  Buy
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4" class="d-flex">
            <v-card class="pa-6" style="background: #FFFF" elevation="10 rounded-xl">
              <div class="d-flex flex-column justify-center align-center">
                <v-card-title>
                  <v-chip style="background-color: #FFFF; color: black">Premium</v-chip>
                </v-card-title>
                <v-card-title class="text-h3 text-center text-black mt-3">
                  200.00€
                </v-card-title>
              </div>
              <v-divider color="black" class="my-4"></v-divider>
              <v-list dense style="background-color: #FFF;">
                <v-list-item v-for="(feature, index) in event.princing.advancedFeatures" :key="index">
                  <v-icon class="mr-2" color="light-green">mdi-check-circle</v-icon>
                  <span class="text-black">{{ feature }}</span>
                </v-list-item>
              </v-list>
              <v-card-actions class="justify-center mt-5">
                <v-btn class="" style="
                    background: linear-gradient( #ff007f, #6e44ff);
                    color: white;
                    border-radius: 25px;
                  ">
                  Buy
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4" class="d-flex">
            <v-card class="pa-6" style="background: #000B52" elevation="10 rounded-xl">
              <div class="d-flex flex-column justify-center align-center">
                <v-card-title>
                  <v-chip class=" " style="background-color: #000B52; color: white">Beginner</v-chip>
                </v-card-title>
                <v-card-title class="text-h3 text-center text-white mt-3">
                  50.00€
                </v-card-title>
              </div>
              <v-divider color="#fff" class="my-4"></v-divider>
              <v-list dense style="background-color: #000B52;">
                <v-list-item v-for="(feature, index) in event.princing.advancedFeatures" :key="index">
                  <v-icon class="mr-2" color="light-green">mdi-check-circle</v-icon>
                  <span class="text-white">{{ feature }}</span>
                </v-list-item>
              </v-list>
              <v-card-actions class="justify-center mt-5">
                <v-btn class="" style="
                    background: linear-gradient( #ff007f, #6e44ff);
                    color: white;
                    border-radius: 25px;
                  ">
                  Buy
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>


        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardsPerPage: 6,
      event: {
        BeginDate: "21/05/2025",
        EndDate: "25/05/2025",
        Title: "Porto Tech Hub",
        location: "21 King Street, 1205 Dhaka BD",
        timeleft: { days: 10, hours: 20, minutes: 10, seconds: 40 },
        details:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sollicitudin, lorem eu tristique imperdiet, risus erat feugiat ex, at volutpat est odio ac ligula.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sollicitudin, lorem eu tristique imperdiet, risus erat feugiat ex.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sollicitudin, lorem eu tristique imperdiet, risus erat feugiat ex, at volutpat est odio ac ligula.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sollicitudin, lorem eu tristique imperdiet, risus erat feugiat ex.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sollicitudin, lorem eu tristique imperdiet, risus erat feugiat ex, at volutpat est odio ac ligula.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sollicitudin, lorem eu tristique imperdiet, risus erat feugiat ex.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sollicitudin, lorem eu tristique imperdiet, risus erat feugiat ex, at volutpat est odio ac ligula.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sollicitudin, lorem eu tristique imperdiet, risus erat feugiat ex.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sollicitudin, lorem eu tristique imperdiet, risus erat feugiat ex, at volutpat est odio ac ligula.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sollicitudin, lorem eu tristique imperdiet, risus erat feugiat ex.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sollicitudin, lorem eu tristique imperdiet, risus erat feugiat ex, at volutpat est odio ac ligula.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sollicitudin, lorem eu tristique imperdiet, risus erat feugiat ex.",
        princing: {
          advancedFeatures: [
            "Access to all days of the event",
            "Access to all the lectures",
            "Get a free T-shirt",
            "Free meals throughout the day",
            "Background access",
            "Meet event speakers",
            "Get a certificate",
          ],
          premiumFeatures: [
            "Access to all days of the event",
            "Access to all the lectures",
            "Get a personalized T-shirt",
            "Free meals throughout the day",
            "Background access",
            "Meet event speakers",
            "Get a certificate",
          ],
          beginnerFeatures: [
            "Access to 1 day of the event",
            "Access to all the lectures",
            "Get a free T-shirt",
            "Free meals throughout the day",
            "Background access",
            "Meet event speakers",
            "Get a certificate",
          ],
        },
        speakers: Array.from({ length: 18 }, () => ({
          name: "Jane Doe",
          role: "Executive Producer",
          image: "https://res.cloudinary.com/dvyic4oaf/image/upload/v1732401045/ezjwcc18pjwcrkygovpd.jpg", // Replace with actual image link
        })),

      },

    };
  },

  computed: {
    paginatedSpeakers() {
      const pages = [];
      for (let i = 0; i < this.event.speakers.length; i += this.cardsPerPage) {
        pages.push(this.event.speakers.slice(i, i + this.cardsPerPage));
      }
      console.log(pages);

      return pages;
    },
  },
};
</script>

<style scoped></style>
