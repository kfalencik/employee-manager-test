<template>
  <v-card class="employees">
    <v-card-title>
      Employees
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="employees"
      :items-per-page="10"
      :loading="!employees.length"
      item-key="id"
      class="pa-5"
    >
      <template v-slot:top>
        <v-container fluid>
          <v-row>
            <v-col cols="6">
              <v-row class="pa-6">
                <v-select
                  :items="managers"
                  :clearable="true"
                  filled
                  label="Manager"
                  item-text="fullName"
                  item-value="id"
                  v-model="managersFilterValue"
                ></v-select>
              </v-row>
            </v-col>

            <v-col cols="6">
              <v-row class="pa-6">
                <v-select
                  :items="offices"
                  :clearable="true"
                  filled
                  label="Site (Office/Location)"
                  v-model="officesFilterValue"
                ></v-select>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </template>

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
        { text: 'Site (Office/Location)', value: 'office', filter: this.officesFilter },
        { text: 'Manager', value: 'managerId', filter: this.managersFilter },
        { text: 'Email', value: 'email', sortable: false },
        { text: 'Date of Birth', value: 'dateOfBirth' },
        { text: 'Start Date', value: 'startDate' }
      ],
      managersFilterValue: null,
      officesFilterValue: null
    }
  },
  computed: {
    employees () {
      // Get employees data
      return this.$store.state.employees
    },
    managers () {
      // Get manager IDs
      let managers = this.employees.map(item => item.managerId)

      // Remove null values
      managers = managers.filter(item => item !== null)

      // Use sets to get unique manager IDs
      managers = new Set(...[managers])

      // Turn into objects with manager data
      managers = [...managers].map(id => {
        const manager = {
          id,
          fullName: this.managerFullName(id)
        }
        return manager
      })

      return managers
    },
    offices () {
      // Get offices data
      let offices = this.employees.map(item => item.office)

      // Remove null values
      offices = offices.filter(item => item !== null)

      // Use sets to get unique offices
      offices = new Set(...[offices])

      return [...offices]
    }
  },
  methods: {
    managerFullName (id) {
      // Find manager within employees array
      const manager = this.employees.filter(item => item.id === id)
      // Return managers full name
      return manager.length ? manager[0].fullName : '-'
    },
    managersFilter (value) {
      // If this filter has no value we just skip the entire filter.
      if (!this.managersFilterValue) {
        return true
      }
      // Check if the current loop value (The managerId value)
      // equals to the selected value at the <v-select>.
      return value === this.managersFilterValue
    },
    officesFilter (value) {
      // If this filter has no value we just skip the entire filter.
      if (!this.officesFilterValue) {
        return true
      }
      // Check if the current loop value (The office value)
      // equals to the selected value at the <v-select>.
      return value === this.officesFilterValue
    }
  }
}
</script>
