<template>
  <div v-if="talk" class="talk-details text-white pa-5">
    <h1 class="title text-h4">{{ talk.title }}</h1>
    <h2 class="location text-white">{{ talk.location }}</h2>
    <div class="content mt-5">
      <p><strong>Type:</strong> {{ talk.type }}</p>
      <p><strong>From:</strong> {{ talk.begin }}</p>
      <p><strong>Until:</strong> {{ talk.end }}</p>
      <p><strong>Speakers:</strong> {{ speakers }}</p>
      <p class="mt-5">{{ talk.description }}</p>
    </div>
    <div v-if="userStore.getLoggedInUser.merchandising.find((item) => item.type == 'ticket')">
      <v-btn v-if="!user.talks.find((element) => element.title == talk.title)" @click="participateTalk()" class="mt-5"
        style="
                    background: linear-gradient( #ff007f, #6e44ff);
                    color: white;
                    border-radius: 25px;
                  ">
        Participate
      </v-btn>
      <div v-else>
        <p class=" mt-5 text-body1 weight-bold text-white">You'r registred to this talk!!</p>
        <v-btn @click="Deregister()" class="mt-1" style="
                    background: linear-gradient( #ff007f, #6e44ff);
                    color: white;
                    border-radius: 25px;
                  ">
          Deregister
        </v-btn>
      </div>
    </div>
    <p v-else class=" mt-5 text-body1 weight-bold text-red-accent-4"> Buy a ticket to guarantee your place in this talk
    </p>
    <v-btn v-if="userStore.getLoggedInUser.role == 'Admin'" @click="ChangeEventData()" variant="outlined"
      class="mt-1 font-weight-bold" style="
                    
                    color: #ff007f;
                    border-radius: 25px;
                  ">
      Change Event Data
    </v-btn>

    <v-dialog v-model="editDialog" max-width="70%">
      <v-card class="edit-dialog-card" style="padding-top: 16px; padding-bottom: 16px">
        <v-card-title class="edit-dialog-title"> Edit Details </v-card-title>
        <v-card-text style="padding-top: 8px; padding-bottom: 8px">
          <v-form ref="editForm">
            <v-row align="center" style="margin-bottom: 8px">
              <v-col cols="4">
                <label class="text-white text-body1 font-weight-medium">Title:</label>
              </v-col>
              <v-col cols="8">
                <v-text-field class="text-white" v-model="editedTalk.title" variant="underlined"
                  density="comfortable"></v-text-field>
              </v-col>
            </v-row>
            <v-row align="center" style="margin-bottom: 8px">
              <v-col cols="4">
                <label class="text-white text-body1 font-weight-medium">Type:</label>
              </v-col>
              <v-col cols="8">
                <v-select class="text-white" v-model="selectedType" :items="types" item-text="name" label="Select type"
                  outlined dense></v-select>
              </v-col>
            </v-row>
            <v-row align="center" style="margin-bottom: 8px">
              <v-col cols="4">
                <label class="text-white text-body1 font-weight-medium">Description:</label>
              </v-col>
              <v-col cols="8">
                <v-textarea class="text-white" v-model="editedTalk.description" variant="underlined"
                  density="comfortable" no-resize auto-grow rows="2"></v-textarea>
              </v-col>
            </v-row>
            <v-row align="start" style="margin-bottom: 8px" class="">
              <v-col cols="4">
                <label class="text-white text-body1 font-weight-medium">Add speakers:</label>
              </v-col>
              <v-col cols="8">
                <v-select v-model="selectedSpeaker" :items="speakersNames" item-text="name" class="text-white"
                  label="Select Speaker" outlined dense></v-select>
              </v-col>
            </v-row>
            <v-row align="start" style="margin-bottom: 8px" class="">
              <v-col cols="12">
                <label class="text-white text-body1 font-weight-medium">Speakers:</label>
                <v-container>
                  <v-row v-for="(item, index) in editedTalk.speakers" :key="index"
                    class="cart-item align-center mb-3 elevation-0" style="border: none;">

                    <!-- Text Column -->
                    <v-col>
                      <div class="cart-item-title text-white font-weight-medium">{{ item }}</div>
                    </v-col>

                    <!-- Button Column -->
                    <v-col cols="auto" class="text-end">
                      <v-btn icon @click="removeFromSpreakers(index)" class="cart-remove-btn">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions style="padding-top: 8px" class="mr-4 text-white">
          <v-btn text @click="closeModal()" class="btn-cancel">
            Cancel
          </v-btn>
          <v-btn text @click="saveData" class="btn-save"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="w-100 align-self-center">
      <p class="text-h3  my-10" style="color: #ff00ee">Comment Section</p>
      <div v-if="this.talk.comments.length != 0" v-for="(comment, index) in this.talk.comments"
        :key="comment.id_comment" class="d-flex flex-column ">
        <v-divider v-if="comment.id_comment != 1" color="#fff" class="my-4"></v-divider>
        <div class="d-flex flex-row justify-space-between">
          <p class="mr-4 text-white text-body1">
            <strong>{{ comment.user }}:</strong>
            {{ comment.content }}
          </p>
          <span v-if="userStore.getLoggedInUser.role == 'Admin'" class="like-icon" @click="removeComment(index)">
            🗑️
          </span>
        </div>

      </div>
      <div v-else class="text-body2 text-grey">
        <p class=" d-flex justify-center">Conversation not started yet :(
        </p>
        <p class=" d-flex justify-center"> Be the first to do it!</p>
      </div>

      <div class="text-white mt-14 mb-3 color-white w-100">
        <v-textarea class="w-100 text-white text-body1" v-model="createCommentContent" no-resize auto-grow rows="1"
          placeholder="Write a comment"></v-textarea>
      </div>
      <div class="text-center text-white" v-if="createCommentContent">
        <v-btn class="rounded-xl text-white text-body1" elevation="6" style="
            background: linear-gradient(90deg, #59398e, #ac1dbe, #d50ed6, #ff00ee);
            text-transform: none;
          " @click="submitComment()">Submit Comment</v-btn>
      </div>
    </div>
  </div>
  <div v-else>
    <v-skeleton-loader type="heading, image@2, paragraph@4" class="mt-5"
      style="background-color: #00041f"></v-skeleton-loader>
  </div>
</template>

<script>
import { useEventStore } from '../stores/event';
import { useUserStore } from '../stores/users';
export default {
  data() {
    return {
      eventStore: useEventStore(),
      userStore: useUserStore(),
      createCommentContent: "",
      talk: JSON.parse(this.$route.query.talk),
      timeOfday: this.$route.query.TimeOfDay,
      indexContent: this.$route.query.indexContent,
      indexTalk: this.$route.query.indexTalk,
      event: {},
      editedTalk: {},
      editDialog: false,
      speakersNames: [],
      selectedType: "",
      types: ["Talk", "Workshop"],
      selectedSpeaker: ""
    };
  },
  mounted() {
    this.event = this.eventStore.getEvent
    this.editedTalk = JSON.parse(this.$route.query.talk)
    this.selectedType = this.editedTalk.type
    this.speakersNames = this.event.speakers.map((speaker) => speaker.name);
  },
  watch: {
    selectedSpeaker: function (val) {
      if (val != "") {
        if (this.editedTalk.speakers.includes(val)) {
          alert("Speaker already in the talk")
        } else {
          if (confirm("Are you sure you want to add the speaker?")) {
            this.editedTalk.speakers.push(val)
          }
        }
      }
      this.selectedSpeaker = ""
    }
  },
  computed: {
    user() {
      return this.userStore.getLoggedInUser
    },
    speakers() {
      return this.talk.speakers.join(", ")
    }
  },
  methods: {
    closeModal() {
      this.editDialog = false
      console.log(this.talk);

      this.editedTalk = this.talk
    },
    ChangeEventData() {

      this.editDialog = true
    },
    saveData() {
      const scheduleItem = this.event.schedule.find((item) => item.TimeOfDay === this.timeOfday);
      if (scheduleItem) {
        var talkfind = scheduleItem.content[this.indexContent][this.indexTalk];
        this.talk = this.editedTalk
        talkfind = this.editedTalk
        this.event.schedule.find((item) => item.TimeOfDay === this.timeOfday).content[this.indexContent][this.indexTalk] = talkfind
        this.eventStore.updateevents(this.event);
        this.eventStore.$persist()
        this.editDialog = false
      }
    },
    removeComment(index) {
      const scheduleItem = this.event.schedule.find((item) => item.TimeOfDay === this.timeOfday);
      if (scheduleItem) {
        const talkfind = scheduleItem.content[this.indexContent][this.indexTalk];
        const comments = talkfind.comments;
        comments.splice(index, 1);
        this.talk = talkfind
        this.eventStore.updateevents(this.event);
        this.eventStore.$persist()
      }
    },
    submitComment() {
      const scheduleItem = this.event.schedule.find((item) => item.TimeOfDay === this.timeOfday);
      if (scheduleItem) {
        const talkfind = scheduleItem.content[this.indexContent][this.indexTalk];
        const comments = talkfind.comments;
        const lastId = comments.length ? parseInt(comments[comments.length - 1].id_comment) : 0;
        const newComment = {
          id_comment: lastId + 1,
          user: this.userStore.getUserNameLoggedIn,
          content: this.createCommentContent,
        };
        comments.push(newComment);
        this.talk = talkfind
        this.eventStore.updateevents(this.event);
        this.eventStore.$persist()
        this.updateBadgeCriticizer()
        this.editDialog = false
      }
    },
    updateBadgeCriticizer() {
      //register badge The criticizer
      if (!this.user.badges.find((badge) => badge.id === 2).achieved) {
        this.user.badges.find((badge) => badge.id === 2).achieved = true
      }
    },
    Deregister() {
      const scheduleItem = this.event.schedule.find((item) => item.TimeOfDay === this.timeOfday);
      if (scheduleItem) {
        const talkfind = scheduleItem.content[this.indexContent][this.indexTalk];
        const talkIndex = this.user.talks.indexOf(talkfind)
        this.user.talks.splice(talkIndex, 1)
        this.user.points -= 100
      }
    },
    participateTalk() {
      const scheduleItem = this.event.schedule.find((item) => item.TimeOfDay === this.timeOfday);
      if (scheduleItem) {
        const talkfind = scheduleItem.content[this.indexContent][this.indexTalk];
        this.user.points += 100
        this.user.talks.push(talkfind)
      }
      this.updateBadgeEvent()
      this.updateBadgeWorkShop()
      this.updateBadgeWorkShops()
      this.updatteBadgeTalks()

    },
    updatteBadgeTalks(){
      if (!this.user.badges.find((badge) => badge.id === 8).achieved) {
        if (this.user.talks.filter((talk) => talk.type === "Talk").length >= 10) {          
          this.user.badges.find((badge) => badge.id === 8).achieved = true
        }
      }
    },
    updateBadgeWorkShops() {
      const AllworkshopIds = [];

      this.event.schedule.forEach((timeSlot) => {
        timeSlot.content.forEach((contentArray) => {
          contentArray.forEach((item) => {
            if (item.type === "Workshop") {
              AllworkshopIds.push(item.id);
            }
          });
        });
      });
      
      const userWorkshopIds = []
      this.user.talks.forEach((item) => {
            if (item.type === "Workshop") {
              userWorkshopIds.push(item.id);
            }
          });
          
       if (!this.user.badges.find((badge) => badge.id === 6).achieved) {
        if (AllworkshopIds.sort().join(",") === userWorkshopIds.sort().join(",")) {
          this.user.badges.find((badge) => badge.id === 6).achieved = true
        }
      } 
    },
    updateBadgeWorkShop() {
      if (!this.user.badges.find((badge) => badge.id === 4).achieved) {
        if (this.talk.type === "Workshop") {
          this.user.badges.find((badge) => badge.id === 4).achieved = true
        }
      }

    },
    updateBadgeEvent() {
      if (!this.user.badges.find((badge) => badge.id === 3).achieved) {
        let before13 = false;
        let after14 = false;

        for (const talk of this.user.talks) {
          const [hours, minutes] = talk.begin.split(":").map(Number);
          const timeInHours = hours + minutes / 60;

          if (timeInHours < 13) {
            before13 = true;
          }
          if (timeInHours > 14) {
            after14 = true;
          }
        }

        if (before13 && after14) {
          this.user.badges.find((badge) => badge.id === 3).achieved = true
        }
      }
    },
    removeFromSpreakers(index) {
      if (confirm("Are you sure you want to remove the speaker?")) {
        this.editedTalk.speakers.splice(index, 1)
      }
    }
  },
};
</script>

<style scoped>
/* Styling without a card, more direct */
.talk-details {
  background-color: #00041f;
}

.like-icon {
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.3s;
}

.like-icon:hover {
  opacity: 1;
}

.title {
  color: #ff00ee;
  font-weight: bold;
}

.location {
  font-size: 1.5rem;
  color: #ff00ee;
}

.content {
  font-size: 1rem;
  line-height: 1.6;
}

strong {
  color: #ff00ee;
}

.edit-dialog-card {
  background: linear-gradient(135deg, #1a1a2e, #262640);
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
}

.edit-dialog-title {
  color: #ff00ee;
  font-weight: 600;
  font-size: 24px;
  text-align: center;
}

.cart-remove-btn {
  color: white;
  font-size: 20px;
  background-color: red;
  border: none;
}
</style>
