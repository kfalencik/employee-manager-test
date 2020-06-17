import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    employees: []
  },
  mutations: {
    setEmployeeData (state, employeeData) {
      state.employees = employeeData
    }
  },
  actions: {
    async fetchEmployeeData (context) {
      await setTimeout(() => {
        fetch('https://api.jsonbin.io/b/5e8f3cde8e85c84370132fbd/6').then(response => {
          return response.json()
        }).then(data => {
          context.commit('setEmployeeData', data)
        }).catch(error => {
          console.log(error)
        })
      }, 3000)
    }
  }
})
