import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import useAuthStore from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.userInfo) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
