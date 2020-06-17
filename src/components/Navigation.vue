<template>
  <div class="navigation">
    <v-app-bar width="100%" class="hidden-md-and-up" color="primary" dark>
        <v-icon @click.stop="drawer = !drawer" color="white">mdi-hamburger</v-icon>
        <img class="flex text-center ml-n5" :src="require('@/assets/logo-small.svg')" height="20" alt="Staff Circle logo" />
    </v-app-bar>

    <v-navigation-drawer
      class="primary"
      :fixed="$vuetify.breakpoint.smAndDown"
      :permanent="$vuetify.breakpoint.mdAndUp"
      v-model="drawer"
      width="320"
      dark
      left
    >

      <router-link to="/"><img :src="require('@/assets/logo.svg')" height="70" class="d-block my-4 mx-auto" alt="Staff Circle logo" /></router-link>

      <v-list tag="nav">
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.route"
          link
          @click="drawer=false"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      items: [
        { title: 'Home', icon: 'mdi-view-dashboard', route: '/' },
        { title: 'Employees', icon: 'mdi-account-multiple', route: 'employees' },
        { title: 'Demographics', icon: 'mdi-chart-pie', route: 'demographics' }
      ]
    }
  }
}
</script>
