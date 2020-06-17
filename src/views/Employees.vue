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
      :headers="headers"
      :items="employees"
      :items-per-page="10"
      :search="search"
      :loading="!employees.length"
      class="elevation-1"
    >
      <template v-show="!employees.length" v-slot:progress>
        <v-skeleton-loader v-for="row in 10" :key="`table-row-${row}`" class="mx-auto" type="table-row" />
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
        { text: 'First name', value: 'name.first' },
        { text: 'Last name', value: 'name.last' },
        { text: 'Company', value: 'company' },
        { text: 'Office', value: 'office' },
        { text: 'Email', value: 'email' }
      ],
      search: ''
    }
  },
  computed: {
    employees () {
      return this.$store.state.employees
    }
  }
}
</script>
