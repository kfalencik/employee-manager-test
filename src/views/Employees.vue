<template>
  <div class="employees">
    <h1 class="text-h4 mb-3">Employees</h1>
    <p class="text-subtitle-1">This tool is designed for HR Managers (and their teams) to be able to find employees by their manager, as well as view useful summarised data of their employee demographics.</p>

    <v-data-table
      :headers="headers"
      :items="employees"
      :items-per-page="10"
      :loading="!employees.length"
      item-key="id"
      mobile-breakpoint="960"

    >
      <template v-slot:top>
        <h2 class="text-subtitle-2 mt-10">Filters</h2>
        <v-container fluid>
          <v-row>
            <v-col cols="pr-6">
              <v-row>
                <template v-if="!employees.length">
                  <v-skeleton-loader class="mx-auto" type="table-cell" />
                </template>

                <v-select v-else
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
              <v-row class="pl-6">
                <template v-if="!employees.length">
                  <v-skeleton-loader class="mx-auto" type="table-cell" />
                </template>

                <v-select v-else
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
        <v-skeleton-loader class="mx-auto" type="table-row@10" />
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
  </div>
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
