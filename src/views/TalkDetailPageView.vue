<template>
  <div v-if="talk" class="talk-details text-white pa-5">
    <h1 class="title text-h4">{{ talk.title }}</h1>
    <h2 class="location text-white">{{ talk.location }}</h2>
    <div class="content mt-5">
      <p><strong>Type:</strong> {{ talk.type }}</p>
      <p><strong>From:</strong> {{ talk.begin }}</p>
      <p><strong>Until:</strong> {{ talk.end }}</p>
      <p><strong>Speakers:</strong> {{ talk.speakers }}</p>
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
    };
  },
  mounted() {
    this.event = this.eventStore.getEvent
    console.log(this.user.talks.find((element) => element == this.talk.title));

  },
  computed: {
    user() {
      return this.userStore.getLoggedInUser
    }
  },
  methods: {
    removeComment(index) {
      const scheduleItem = this.event.schedule.find((item) => item.TimeOfDay === this.timeOfday);
      if (scheduleItem) {
        const talkfind = scheduleItem.content[this.indexContent][this.indexTalk];
        const comments = talkfind.comments;
        comments.splice(index, 1);
        console.log(this.event);
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
</style>
