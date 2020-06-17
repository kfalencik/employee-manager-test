import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    component: Home,
    name: 'Home',
    path: '/'
  },
  {
    // route level code-splitting
    // this generates a separate chunk (page-about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "page-about" */ '../views/Demographics.vue'),
    name: 'Demographics',
    path: '/demographics'
  },
  {
    component: () => import('../views/Employees.vue'),
    name: 'Employees',
    path: '/employees'
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  mode: 'history',
  routes
})

export default router
