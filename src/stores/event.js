import { defineStore } from 'pinia'
import * as api from '../api/api.js'

const API_BASE_URL = 'http://localhost:3000'

const API_ENDPOINT = 'PortoTechHub'

export const useEventStore = defineStore('eventStore', {
  state: () => ({
    event: null,
  }),

  getters: {
    getEvent() {
      console.log(this.event)

      return this.event
    },
  },

  actions: {
    async fetchevents() {
      try {
        this.event = (await api.get(API_BASE_URL, API_ENDPOINT))[0]
      } catch (error) {
        throw new Error('Erro ao obter os dados do evento: ' + error)
      }
    },
  },
})
