import { defineStore } from 'pinia'
import * as api from '../api/api.js'

const API_BASE_URL = 'http://localhost:3000'

const API_ENDPOINT = 'PortoTechHub'

export const useEventStore = defineStore('eventStore', {
  state: () => ({
    event: null,
    AllticketOptions: [
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
    getTicketOptions() {
      return this.AllticketOptions
    },
  },

  actions: {
    addTicketOption(option) {
      const finder = this.AllticketOptions.find(
        (item) =>
          item.toLowerCase().replaceAll(' ', '') == option.toLowerCase().replaceAll(' ', ''),
      )
      if (!finder) {
        this.AllticketOptions.push(option)
        return true
      } else {
        return false
      }
    },

    async fetchevents() {
      if (this.event == null) {
        try {
          let eventData = await api.get(API_BASE_URL, `${API_ENDPOINT}/1`)
          this.event = eventData
        } catch (error) {
          throw new Error('Erro ao obter os dados do evento: ' + error)
        }
      }
    },
    async updateevents(event) {
      try {
        this.event = event
        const update = await api.put(API_BASE_URL, `${API_ENDPOINT}/1`, this.event)
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
      pick: ['AllticketOptions'],
      storage: localStorage,
    },
  ],
})
