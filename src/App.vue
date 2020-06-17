<template>
  <v-app>
    <div class="d-flex fill-height" :class="{'flex-column': $vuetify.breakpoint.smAndDown}">
      <Navigation />

      <v-main>
        <div class="pa-4">
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
  }
}
</script>
