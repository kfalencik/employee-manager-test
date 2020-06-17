<template>
  <div class="demographics">
    <h1 class="text-h4 mb-3">Demographics</h1>
    <p class="text-subtitle-1">Diagram showing employee demographics.</p>

    <Pie :data="demographics" v-if="demographics.length" />
  </div>
</template>

<script>
import Pie from '@/components/Pie.vue'
import moment from 'moment'

export default {
  name: 'Demographics',
  computed: {
    employees () {
      return this.$store.state.employees
    },
    demographics () {
      // Initial values
      let totalRotation = 0
      const statistics = []

      // 1. Employees who started less than a year ago
      const lessThanAYear = this.employees.filter(employee => {
        return this.getTimeDifference(employee.startDate) < 1
      })

      // Add statistic to array
      statistics.push({
        title: 'Less than a year',
        rotate: 0,
        percentage: this.percantage(lessThanAYear.length),
        value: lessThanAYear.length,
        color: '#0c1b4d'
      })

      // Calculate rotation degree for the next value
      totalRotation += this.degrees(lessThanAYear.length)

      // 2. Employees who started between 1 and 2 years ago
      const oneToTwoYears = this.employees.filter(employee => {
        return this.getTimeDifference(employee.startDate) >= 1 && this.getTimeDifference(employee.startDate) < 2
      })

      // Add statistic to array
      statistics.push({
        title: '1 to 2 years',
        rotate: totalRotation,
        percentage: this.percantage(oneToTwoYears.length),
        value: oneToTwoYears.length,
        color: '#bc226b'
      })

      // Calculate rotation degree for the next value
      totalRotation += this.degrees(oneToTwoYears.length)

      // 3. Employees who started between 2 and 5 years ago
      const twoToFiveYears = this.employees.filter(employee => {
        return this.getTimeDifference(employee.startDate) >= 2 && this.getTimeDifference(employee.startDate) < 5
      })

      // Add statistic to array
      statistics.push({
        title: '2 to 5 years',
        rotate: totalRotation,
        percentage: this.percantage(twoToFiveYears.length),
        value: twoToFiveYears.length,
        color: '#fbbf00'
      })

      // Calculate rotation degree for the next value
      totalRotation += this.degrees(twoToFiveYears.length)

      // 4. Employees who started more than 5 years ago
      const moreThanFiveYears = this.employees.filter(employee => {
        return this.getTimeDifference(employee.startDate) >= 5
      })

      // Add statistic to array
      statistics.push({
        title: 'More than 5 years',
        rotate: totalRotation,
        percentage: this.percantage(moreThanFiveYears.length),
        value: moreThanFiveYears.length,
        color: '#4bc1ec'
      })

      return statistics
    }
  },
  components: {
    Pie
  },
  methods: {
    percantage (value) {
      return (value / this.employees.length) * 100
    },
    degrees (value) {
      return (value / this.employees.length) * 360
    },
    getTimeDifference (date) {
      return moment().diff(moment(date), 'years')
    }
  }
}
</script>
