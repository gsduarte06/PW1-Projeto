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
        // Step 1: Group by "begin"
        console.log(this.event.schedule)
        for (let index = 0; index < this.event.schedule.length; index++) {
          const groupedByBegin = this.event.schedule[index].content.reduce((acc, item) => {
            if (!acc[item.begin]) {
              acc[item.begin] = []
            }
            acc[item.begin].push(item)
            return acc
          }, {})

          this.event.schedule[index].content = Object.values(groupedByBegin)
          console.log(this.event.schedule[index])
        }
      } catch (error) {
        throw new Error('Erro ao obter os dados do evento: ' + error)
      }
    },
  },
})
