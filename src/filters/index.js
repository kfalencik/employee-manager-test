// Vue filters
import Vue from 'vue'
import moment from 'moment'

// Capialize first letter
Vue.filter('capitalize', (value) => {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

// Format date
Vue.filter('dateFormatter', (value) => {
  if (!value) return ''
  return moment(value).format('Do MMMM YYYY')
})
