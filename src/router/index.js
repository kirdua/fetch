import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { useAuthStore } from '@/stores/auth' // Ensure you're importing correctly

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) {
    next()
    return
  }

  const store = useAuthStore()

  // Correctly check `userIsLoggedIn` property
  if (store.userIsLoggedIn) {
    next()
  } else {
    next({ name: 'login' })
  }
})

export default router
