<template>
  <v-app>
    <div class="d-flex fill-height" :class="{'flex-column': $vuetify.breakpoint.smAndDown}">
      <Navigation />

      <v-main :style="{'width': $vuetify.breakpoint.mdAndUp ? 'calc(100% - 300px)' : '100%'}">
        <div class="pa-4 py-md-8 px-md-7 py-lg-8 px-lg-10">
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
