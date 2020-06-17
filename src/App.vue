<template>
  <v-app>
    <div class="d-flex fill-height" :class="{'flex-column': $vuetify.breakpoint.mdAndDown}">
      <Navigation />

      <v-main>
        <div class="pa-4 py-md-8 px-md-10">
          <router-view />
        </div>
      </v-main>
    </div>
  </v-app>
</template>

<script>
import Navigation from '@/components/Navigation.vue'

export default {
  name: 'App',
  components: {
    Navigation
  },
  mounted () {
    // Get employee data once app has mounted
    this.$store.dispatch('fetchEmployeeData')
  }
}
</script>
