<template>
  <v-app>
    <div app class="d-flex fill-height" :class="{'flex-column': $vuetify.breakpoint.smAndDown}">
      <Navigation app />

      <v-main :style="{'width': $vuetify.breakpoint.mdAndUp ? 'calc(100% - 300px)' : '100%'}">
        <div class="pa-4 py-md-8 px-md-7 py-lg-8 px-lg-10">
          <template v-if="message">
            <Message :message="message.message" :type="message.type" />
          </template>

          <router-view />
        </div>
      </v-main>
    </div>
  </v-app>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import Message from '@/components/Message.vue'

export default {
  name: 'App',
  components: {
    Navigation,
    Message
  },
  computed: {
    message () {
      return this.$store.state.message
    }
  },
  mounted () {
    // Get employee data once app has mounted
    this.$store.dispatch('fetchEmployeeData')
  }
}
</script>
