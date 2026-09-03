import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'credit-simulation',
    component: () => import('@/pages/avanti_credit_simulation_page.vue'),
    meta: { title: 'Avanti — Simulazione del credito' },
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/pages/avanti_home_page.vue'),
    meta: { title: 'Avanti — Area personale' },
  },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

router.afterEach((to) => {
  const title = to.meta.title
  if (typeof title === 'string') {
    document.title = title
  }
})
