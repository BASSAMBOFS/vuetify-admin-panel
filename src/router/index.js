import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('./../views/Dashboard')
  },
  {
    path: '/campagne-promotool',
    name: 'Campagne Promotool',
    component: () => import('./../views/CampagnePromotool')
  },
  {
    path: '/programation-promotool',
    name: 'Programation Promotool',
    component: () => import('./../views/ProgramationPromotool')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
