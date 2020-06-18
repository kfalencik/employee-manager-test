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

      // Fetch data from the API
      await fetch('https://api.jsonbin.io/b/5e8f3cde8e85c84370132fbd/6').then(response => {
        if (response.ok) {
          // And turn into readable data if response is ok
          return response.json()
        } else {
          // If not show an error message
          context.commit('setMessage', { type: 'error', message: 'Error connecting to the API. Please wait a moment and try again.' })
        }
      }).then(data => {
        // Set employee data in the store for later use
        context.commit('setEmployeeData', data)
      }).catch(error => {
        // If not show an error message
        context.commit('setMessage', { type: 'error', message: 'Error parsing API data. Please wait a moment and try again.', error })
      })
    }
  }
})
