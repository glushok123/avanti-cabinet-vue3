import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

/**
 * Маршруты повторяют порядок шагов оформления кредита: симуляция →
 * анкета → проверка банка → одобрение → кабинет → договор.
 * Экраны, которых ещё нет в вёрстке, добавляются по мере готовности.
 */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'credit-simulation',
    component: () => import('@/pages/avanti_credit_simulation_page.vue'),
    meta: { title: 'Avanti — Simulazione del credito' },
  },
  {
    path: '/personal-data',
    name: 'personal-data',
    component: () => import('@/pages/avanti_personal_data_page.vue'),
    meta: { title: 'Avanti — Dati personali' },
  },
  {
    path: '/bank-check',
    name: 'bank-check',
    component: () => import('@/pages/avanti_bank_check_page.vue'),
    meta: { title: 'Avanti — Verifica bancaria' },
  },
  {
    path: '/credit-approved',
    name: 'credit-approved',
    component: () => import('@/pages/avanti_credit_approved_page.vue'),
    meta: { title: 'Avanti — Credito approvato' },
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/pages/avanti_home_page.vue'),
    meta: { title: 'Avanti — Area personale' },
  },
  {
    path: '/contract',
    name: 'contract',
    component: () => import('@/pages/avanti_contract_page.vue'),
    meta: { title: 'Avanti — Contratto' },
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import('@/pages/avanti_chat_page.vue'),
    meta: { title: 'Avanti — Assistenza' },
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
