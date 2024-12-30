import { defineStore } from 'pinia'
const saltRounds = 10
import bcrypt from 'bcryptjs'
export const useUserStore = defineStore('users', {
  state: () => ({
    users: [],
    userLoggedInUsername: null,
  }),
  getters: {
    getUsers() {
      return this.users
    },
    getUserNameLoggedIn() {
      return this.userLoggedInUsername
    },
    getLoggedInUser() {
      return this.users.find((user) => user.username == this.userLoggedInUsername) || null
    },
  },
  actions: {
    CheckLogUserIn(username, password) {
      const FoundUser = this.users.find((user) => user.username === username)
      console.log(FoundUser.password)

      const match = bcrypt.compareSync(password, FoundUser.password)

      if (match) {
        this.setLoggedInUser(username)
        return true
      }
      return false
    },
    setLoggedInUser(user) {
      this.userLoggedInUsername = user
    },
    createAccount(username, email, password) {
      if (!this.users.find((user) => user.username == username)) {
        this.users.push({
          foto: null,
          username: username,
          email: email,
          password: bcrypt.hashSync(password, 10),
          role: 'admin',
          bio: '',
          name: '',
          points: 0,
          participating: false,
          badges: [
            {
              id: 1,
              icon: 'mdi-cart',
              title: 'Biggest Buyer',
              description: 'Awarded for purchasing the most items in a single month.',
              achieved: false,
            },
            {
              id: 2,
              icon: 'mdi-account-group',
              title: 'The criticizer',
              description: 'Comment on atleast one talk.',
              achieved: false,
            },
            {
              id: 3,
              icon: 'mdi-calendar-star',
              title: 'Event Star',
              description: 'Go to altleast a talk per time of day.',
              achieved: false,
            },
            {
              id: 4,
              icon: 'mdi-code-tags',
              title: 'Tech Enthusiast',
              description: 'For contributing code to open-source projects.',
              achieved: false,
            },
            {
              id: 5,
              icon: 'mdi-earth',
              title: 'Global Networker',
              description: 'Granted for connecting with members from five countries.',
              achieved: false,
            },
            {
              id: 6,
              icon: 'mdi-star',
              title: 'Rising Star',
              description: 'Given to a participant who showed up in all workshops.',
              achieved: false,
            },
            {
              id: 7,
              icon: 'mdi-trophy',
              title: 'Innovator of the Year',
              description:
                "Awarded to the participant who proposed the most groundbreaking idea during the event's innovation challenge.",
              achieved: false,
            },
            {
              id: 8,
              icon: 'mdi-hand-heart',
              title: 'Event Ally',
              description:
                'For assisting the most attendees during the event by sharing knowledge or providing guidance.',
              achieved: false,
            },
            {
              id: 9,
              icon: 'mdi-code-braces',
              title: 'Hackathon Master',
              description: 'Recognized for leading a winning team in the event’s hackathon.',
              achieved: false,
            },
            {
              id: 10,
              icon: 'mdi-microphone',
              title: 'Inspirational Speaker',
              description:
                'Given to keynote speakers who delivered compelling and impactful sessions.',
              achieved: false,
            },
            {
              id: 11,
              icon: 'mdi-leaf',
              title: 'Eco-Tech Advocate',
              description: 'Awarded for presenting sustainable tech solutions during the event.',
              achieved: false,
            },
            {
              id: 12,
              icon: 'mdi-account-multiple',
              title: 'Most Connected',
              description:
                'Granted to attendees who completed the challenge presented in the begining of the conference',
              achieved: true,
            },
            {
              id: 13,
              icon: 'mdi-rocket',
              title: 'Tech Trailblazer',
              description:
                'For showcasing a product or prototype that adopts emerging technologies.',
              achieved: false,
            },
            {
              id: 14,
              icon: 'mdi-shield-check',
              title: 'Cybersecurity Advocate',
              description:
                'Given to participants who presented significant contributions to securing digital ecosystems.',
              achieved: true,
            },
          ],
          merchandising: [],
        })
        return true
      } else {
        return false
      }
    },
  },
  persist: [
    {
      key: 'usersPortoTechHub',
      pick: ['users'],
      storage: localStorage,
    },
    {
      key: 'LogedInuserPortoTechHub',
      pick: ['userLoggedInUsername'],
      storage: sessionStorage,
    },
  ],
})
