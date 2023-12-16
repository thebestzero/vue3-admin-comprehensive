import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const publicRoutes: RouteRecordRaw[] = [
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    name: 'home',
    path: '/',
    component: () => import('@/layout/index.vue'),
  },
]


const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes,
})

export default router
