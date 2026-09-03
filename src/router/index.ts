import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

/**
 * Маршруты повторяют порядок шагов оформления кредита: симуляция →
 * анкета → проверка банка → одобрение → кабинет → документы → договор →
 * подпись → IBAN для зачисления → комиссия.
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
    path: '/documents',
    name: 'documents',
    component: () => import('@/pages/avanti_documents_page.vue'),
    meta: { title: 'Avanti — Documenti richiesti' },
  },
  {
    path: '/contract',
    name: 'contract',
    component: () => import('@/pages/avanti_contract_page.vue'),
    meta: { title: 'Avanti — Contratto' },
  },
  {
    path: '/signature',
    name: 'signature',
    component: () => import('@/pages/avanti_signature_page.vue'),
    meta: { title: 'Avanti — Firma del contratto' },
  },
  {
    path: '/iban-modal',
    name: 'iban-modal',
    component: () => import('@/pages/avanti_iban_modal_page.vue'),
    meta: { title: 'Avanti — IBAN per l’accredito' },
  },
  {
    path: '/commission',
    name: 'commission',
    component: () => import('@/pages/avanti_commission_page.vue'),
    meta: { title: 'Avanti — Commissione' },
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
