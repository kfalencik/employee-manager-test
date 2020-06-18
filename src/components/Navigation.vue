<template>
  <div class="navigation">
    <v-app-bar width="100%" class="hidden-md-and-up" color="primary" dark>
        <v-icon @click.stop="drawer = !drawer" color="white">mdi-menu</v-icon>
        <img class="flex text-center ml-n5" :src="require('@/assets/logo-small.svg')" height="20" alt="Staff Circle" />
    </v-app-bar>

    <v-navigation-drawer
      :fixed="$vuetify.breakpoint.smAndDown"
      :permanent="$vuetify.breakpoint.mdAndUp"
      :mini-variant="$vuetify.breakpoint.md"
      v-model="drawer"
      color="primary"
      width="300"
      dark
      left
    >
      <router-link to="/">
        <img v-if="$vuetify.breakpoint.md" :src="require('@/assets/logo-small.svg')" height="48" class="d-block mt-5 my-2 mx-auto" alt="Staff Circle logo" />
        <img v-else :src="require('@/assets/logo.svg')" height="70" class="d-block mt-8 my-4 mx-auto" alt="Staff Circle logo" />
      </router-link>

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
        { title: 'Employees', icon: 'mdi-account-multiple', route: '/employees' },
        { title: 'Demographics', icon: 'mdi-chart-pie', route: '/demographics' }
      ]
    }
  }
}
</script>
