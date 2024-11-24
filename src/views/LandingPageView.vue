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
          ">See More...</v-btn>
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

    <div style="margin-top: 100px" class="d-flex flex-row justify-space-evenly  w-75 align-self-center">
      <div style="margin-top: -140px" class="">
        <div style="
            background: radial-gradient(circle, #59398E, #00041f 70%);
            width: 600px;
            height: 600px;
            border-radius: 20%;
          " class="d-flex justify-center align-center">
          <img src="https://res.cloudinary.com/dvyic4oaf/image/upload/v1732406311/ookunajkj0ml7jowqasm.jpg" alt=""
            style="box-shadow: 0 4px 20px rgba(0, 0, 0, 0.8); border-radius: 12px" height="345" width="518" />
        </div>

      </div>
      <div>
        <p class="text-h4 mb-5" style="color: #ff00ee">EVENT DETAILS</p>
        <p class="text-body1 text-white">{{ event.details }}</p>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      event: {
        BeginDate: "21/05/2025",
        EndDate: "25/05/2025",
        Title: "Porto Tech Hub",
        location: "21 King Street, 1205 Dhaka BD",
        timeleft: { days: 10, hours: 20, minutes: 10, seconds: 40 },
        details:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sollicitudin, lorem eu tristique imperdiet, risus erat feugiat ex, at volutpat est odio ac ligula.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sollicitudin, lorem eu tristique imperdiet, risus erat feugiat ex.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sollicitudin, lorem eu tristique imperdiet, risus erat feugiat ex, at volutpat est odio ac ligula.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sollicitudin, lorem eu tristique imperdiet, risus erat feugiat ex.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sollicitudin, lorem eu tristique imperdiet, risus erat feugiat ex, at volutpat est odio ac ligula.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sollicitudin, lorem eu tristique imperdiet, risus erat feugiat ex.",
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
    }
  },
}
</script>

<style scoped></style>
