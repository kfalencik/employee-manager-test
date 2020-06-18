<template>
  <div class="demographics">
    <h1 class="text-h4 mb-3">Demographics</h1>
    <p class="text-subtitle-1">Diagrams showing employee demographics.</p>

    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col sm="6" lg="4" xl="3" cols="12">
          <v-fab-transition >
            <Pie :data="yearsOfService" title="Years of service" :size="260" v-if="yearsOfService.length && animation" />
            <v-skeleton-loader v-else class="mx-auto" type="card" />
          </v-fab-transition>
        </v-col>

        <v-col :key="2" sm="6" lg="4" xl="3" cols="12">
          <v-fab-transition >
            <Pie :data="ageGroups" title="Age groups" :size="260" v-if="ageGroups.length  && animation" />
            <v-skeleton-loader v-else class="mx-auto" type="card" />
          </v-fab-transition >
        </v-col>

        <v-col :key="3" sm="6" lg="4" xl="3" cols="12">
          <v-fab-transition >
            <Pie :data="howLongDidItTakeMe" title="How long did this take me" :size="260" v-if="animation" />
            <v-skeleton-loader v-else class="mx-auto" type="card" />
          </v-fab-transition >
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Pie from '@/components/Pie.vue'
import moment from 'moment'

export default {
  name: 'Demographics',
  data () {
    return {
      animation: false,
      howLongDidItTakeMe: [
        {
          title: 'Seting up / Reading spec',
          rotate: 0,
          percentage: 10,
          value: 1,
          color: '#0c1b4d'
        },
        {
          title: 'Employee table',
          rotate: 0.1 * 360,
          percentage: 35,
          value: 3.5,
          color: '#bc226b'
        },
        {
          title: 'Demographics diagrams',
          rotate: 0.45 * 360,
          percentage: 25,
          value: 2.5,
          color: '#fbbf00'
        },
        {
          title: 'Polishing and other',
          rotate: 0.7 * 360,
          percentage: 30,
          value: 3,
          color: '#4bc1ec'
        }
      ]
    }
  },
  computed: {
    employees () {
      return this.$store.state.employees
    },
    yearsOfService () {
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
    },
    ageGroups () {
      // Initial values
      let totalRotation = 0
      const statistics = []

      // 1. 18-25
      const ageGroup1 = this.employees.filter(employee => {
        return this.getTimeDifference(employee.dateOfBirth) < 25
      })

      // Add statistic to array
      statistics.push({
        title: '18 - 25',
        rotate: 0,
        percentage: this.percantage(ageGroup1.length),
        value: ageGroup1.length,
        color: '#0c1b4d'
      })

      // Calculate rotation degree for the next value
      totalRotation += this.degrees(ageGroup1.length)

      // 2. 25-35
      const ageGroup2 = this.employees.filter(employee => {
        return this.getTimeDifference(employee.dateOfBirth) >= 25 && this.getTimeDifference(employee.dateOfBirth) < 35
      })

      // Add statistic to array
      statistics.push({
        title: '25 - 35',
        rotate: totalRotation,
        percentage: this.percantage(ageGroup2.length),
        value: ageGroup2.length,
        color: '#bc226b'
      })

      // Calculate rotation degree for the next value
      totalRotation += this.degrees(ageGroup2.length)

      // 3. 35-50
      const ageGroup3 = this.employees.filter(employee => {
        return this.getTimeDifference(employee.dateOfBirth) >= 35 && this.getTimeDifference(employee.dateOfBirth) < 50
      })

      // Add statistic to array
      statistics.push({
        title: '35 - 50',
        rotate: totalRotation,
        percentage: this.percantage(ageGroup3.length),
        value: ageGroup3.length,
        color: '#fbbf00'
      })

      // Calculate rotation degree for the next value
      totalRotation += this.degrees(ageGroup3.length)

      // 3. 50+
      const ageGroup4 = this.employees.filter(employee => {
        return this.getTimeDifference(employee.dateOfBirth) >= 50
      })

      // Add statistic to array
      statistics.push({
        title: '50+',
        rotate: totalRotation,
        percentage: this.percantage(ageGroup4.length),
        value: ageGroup4.length,
        color: '#4bc1ec'
      })

      return statistics
    }
  },
  mounted () {
    const self = this

    setTimeout(() => {
      // Animate diagrams
      self.animation = true
    }, 500)
  },
  components: {
    Pie
  },
  methods: {
    percantage (value) {
      // Calculate percentage of all employees
      return (value / this.employees.length) * 100
    },
    degrees (value) {
      // Calculate rotation degree
      return (value / this.employees.length) * 360
    },
    getTimeDifference (date) {
      // Calculate time difference between two dates in years
      return moment().diff(moment(date), 'years')
    }
  }
}
</script>

<style lang="scss" scoped>
  .col-12 {
    max-width: 400px;
  }
</style>
