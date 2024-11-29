import { defineStore } from 'pinia'
const saltRounds = 10
import bcrypt from 'bcryptjs'
export const useUserStore = defineStore('users', {
  state: () => ({
    users: JSON.parse(localStorage.getItem('usersPortoTechHub')) || [],
    userLoggedInUsername: JSON.parse(sessionStorage.getItem('LogedInuserPortoTechHub')) || null,
  }),
  getters: {
    getUsers() {
      return this.users
    },

    getLoggedInUserUse() {
      return this.users.find((user) => user.username == this.userLoggedInUsername)
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
      this.uploadData()
    },
    encodePassword(password) {
      return
    },
    createAccount(username, email, password) {
      if (!this.users.find((user) => user.username == username)) {
        this.users.push({
          foto: null,
          username: username,
          email: email,
          password: bcrypt.hashSync(password, 10),
          participating: false,
        })
        this.uploadData()
        return true
      } else {
        return false
      }
    },

    uploadData() {
      localStorage.setItem('usersPortoTechHub', JSON.stringify(this.users))
      sessionStorage.setItem('LogedInuserPortoTechHub', JSON.stringify(this.userLoggedInUsername))
    },

    getLoggedInUser() {
      return this.users.find((user) => user.username == this.userLoggedInUsername)
    },
  },
})
