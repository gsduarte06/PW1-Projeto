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
    getCartItems() {
      const loggedInUser = this.getLoggedInUser
      return loggedInUser ? loggedInUser.cart : []
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
              description: 'Awarded for purchasing the most items.',
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
              description: 'For participating in a workshop',
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
              id: 8,
              icon: 'mdi-hand-heart',
              title: 'Event Ally',
              description:
                'For attending 10 talks.',
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
              id: 14,
              icon: 'mdi-shield-check',
              title: 'Cybersecurity Advocate',
              description:
                'Get top 1 in the leaderboard by the end of the evemt.',
              achieved: true,
            },
          ],
          merchandising: [],
          cart: [],
          talks: [],
        })
        return true
      } else {
        return false
      }
    },

    addItemToCart(item) {
      const loggedInUser = this.getLoggedInUser
      if (loggedInUser) {
        loggedInUser.cart.push(item)
      } else {
        console.error('No user is logged in to add items to the cart.')
      }
    },
    removeItemFromCart(index) {
      const loggedInUser = this.getLoggedInUser
      if (loggedInUser) {
        loggedInUser.cart.splice(index, 1)
      }
    },
    AddMerchandising() {
      const loggedInUser = this.getLoggedInUser
      for (let index = 0; index < loggedInUser.cart.length; index++) {
        const element = loggedInUser.cart[index]
        loggedInUser.merchandising.push({ type: element.type, name: element.name })
        if (element.type == 'merch') {
          loggedInUser.points += 100
        } else {
          loggedInUser.points += 1000
        }
      }
    },
    clearCart() {
      const loggedInUser = this.getLoggedInUser
      if (loggedInUser) {
        loggedInUser.cart = []
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
