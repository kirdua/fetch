export const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/login/Login.vue'),
  },
  {
    path: '/dogsearch',
    name: 'dogsearch',
    component: () => import('@/views/dogsearch/DogSearch.vue'),
    beforeEnter(to, from, next) {
      next()
    },
    meta: { requiresAuth: true },
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'login' },
  },
]
