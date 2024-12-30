import { defineStore } from 'pinia'
import * as api from '../api/api.js'

const API_BASE_URL = 'http://localhost:3000'

const API_ENDPOINT = 'PortoTechHub'

export const useEventStore = defineStore('eventStore', {
  state: () => ({
    event: null,
    ticketOptions: [
      'Access to all days of the event',
      'Access to all the lectures',
      'Get a free T-shirt',
      'Free meals throughout the day',
      'Background access',
      'Meet event speakers',
      'Get a certificate',
    ],
  }),

  getters: {
    getEvent() {
      return this.event
    },
  },

  actions: {
    async fetchevents() {
      try {
        this.event = (await api.get(API_BASE_URL, API_ENDPOINT))[0]
        for (let index = 0; index < this.event.schedule.length; index++) {
          const groupedByBegin = this.event.schedule[index].content.reduce((acc, item) => {
            if (!acc[item.begin]) {
              acc[item.begin] = []
            }
            acc[item.begin].push(item)
            return acc
          }, {})
          this.event.schedule[index].content = Object.values(groupedByBegin)
        }
      } catch (error) {
        throw new Error('Erro ao obter os dados do evento: ' + error)
      }
    },
  },

  persist: [
    {
      key: 'eventPortoTechHub',
      pick: ['event'],
      storage: localStorage,
    },
    {
      key: 'eventPortoTechHubTicketOptions',
      pick: ['ticketOptions'],
      storage: localStorage,
    },
  ],
})
