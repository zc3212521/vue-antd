import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const routes = [
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '@/views/about/About.vue'),
    meta: {
      keepAlive: true
    }
  }
]

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.afterEach((to, from) => {
  if (window.vm) {
    window.vm.$store.dispatch('updateRouterStack', {
      name: to.name,
      title: to.meta.title,
      params: to.params
    })
  }
})

export default router
