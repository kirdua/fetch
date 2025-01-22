const routes = [
  {
    path: '/',
    name: 'dogsearch',
    component: () => import('@/views/dogsearch/DogSearch.vue'),
    beforeEnter(to, from, next) {
      next()
    },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'dogsearch' },
  },
]

export default routes
