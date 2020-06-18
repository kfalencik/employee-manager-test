import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    employees: [],
    message: null
  },
  mutations: {
    setEmployeeData (state, data) {
      state.employees = data
    },
    setMessage (state, data) {
      state.message = data
    }
  },
  actions: {
    async fetchEmployeeData (context) {
      await fetch('https://api.jsonbin.io/b/5e8f3cde8e85c84370132fbd/6').then(response => {
        if (response.ok) {
          return response.json()
        } else {
          context.commit('setMessage', { type: 'error', message: 'Error connecting to the API. Please wait a moment and try again.' })
        }
      }).then(data => {
        context.commit('setEmployeeData', data)
      }).catch(error => {
        context.commit('setMessage', { type: 'error', message: 'Error parsing API data. Please wait a moment and try again.', error })
      })
    }
  }
})
