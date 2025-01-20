import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import useAuthStore from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (!to.meta.requiresAuth) {
    next()
    return
  }

  if (authStore.userLoggedIn) {
    next()
  } else {
    next({ name: 'login' })
  }
})

export default router
