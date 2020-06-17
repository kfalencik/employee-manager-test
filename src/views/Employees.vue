<template>
  <v-card class="employees">
    <v-card-title>
      Employees
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <v-data-table
      class="pa-5"
      :headers="headers"
      :items="employees"
      :items-per-page="10"
      :search="search"
      :loading="!employees.length"
    >
      <template v-show="!employees.length" v-slot:progress>
        <v-skeleton-loader v-for="row in 10" :key="`table-row-${row}`" class="mx-auto" type="table-row" />
      </template>

      <template v-slot:item.dateOfBirth="{ item }">
        {{ item.dateOfBirth | dateFormatter }}
      </template>

      <template v-slot:item.startDate="{ item }">
        {{ item.startDate | dateFormatter }}
      </template>

      <template v-slot:item.managerId="{ item }">
        {{ managerFullName(item.managerId) }}
      </template>

      <template v-slot:item.avatarUrl="{ item }">
        <v-img height="48" width="48" :src="item.avatarUrl" />
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: 'Employees',
  data () {
    return {
      headers: [
        { text: '', value: 'avatarUrl', sortable: false },
        { text: 'Full Name', value: 'fullName' },
        { text: 'Company', value: 'company', sortable: false },
        { text: 'Site (Office/Location)', value: 'office' },
        { text: 'Email', value: 'email', sortable: false },
        { text: 'Date of Birth', value: 'dateOfBirth' },
        { text: 'Start Date', value: 'startDate' },
        { text: 'Manager', value: 'managerId' }
      ],
      search: ''
    }
  },
  computed: {
    employees () {
      // Get employees data
      return this.$store.state.employees
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
