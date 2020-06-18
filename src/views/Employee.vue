<template>
  <div class="employee" v-if="employee.id">
    <h1 class="text-h4 mb-3">{{employee.fullName}} <img :src="employee.avatarUrl" height="48" :alt="employee.fullName" /></h1>
    <p class="text-subtitle-1"><strong>{{employee.role}}</strong> at {{employee.office}}</p>

    <v-card>
      <v-card-title>
        Employee details
      </v-card-title>

      <v-list-item v-for="(item, index) in employeeDetails" :key="`employee-details-${index}`">
        <v-list-item-content>
          <v-list-item-title>{{item.title}}</v-list-item-title>
          <v-list-item-subtitle>{{item.value}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

    </v-card>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Employee',
  computed: {
    employeeId () {
      return this.$route.params.id
    },
    employees () {
      // Get employee data based on the id
      return this.$store.state.employees
    },
    employee () {
      // Get employee data based on the id
      const employees = this.employees
      employees.filter(item => item.id === this.employeeId)
      return employees[0]
    },
    employeeDetails () {
      return [
        {
          title: 'ID',
          value: this.employee.id
        },
        {
          title: 'First Name',
          value: this.employee.name.first
        },
        {
          title: 'Last Name',
          value: this.employee.name.first
        },
        {
          title: 'Email Address',
          value: this.employee.email
        },
        {
          title: 'Company',
          value: this.employee.company
        },
        {
          title: 'Role',
          value: this.employee.role
        },
        {
          title: 'Office',
          value: this.employee.office
        },
        {
          title: 'Date of Birth',
          value: moment(this.employee.dateOfBirth).format('Do MMMM YYYY')
        },
        {
          title: 'Start Date',
          value: moment(this.employee.startDate).format('Do MMMM YYYY')
        },
        {
          title: 'Manager',
          value: this.managerFullName(this.employee.managerId)
        }
      ]
    }
  },
  methods: {
    managerFullName (id) {
      // Find manager within employees array
      const manager = this.employees.filter(item => item.id === id)
      // Return managers full name
      return manager.length ? manager[0].fullName : '-'
    }
  }
}
</script>

<style lang="scss" scoped>
  .employee {
    &__avatar {
      width: 50px;
      height: 50px;
    }
  }
</style>
