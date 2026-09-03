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
  {
    path: '/sign-up',
    name: 'sign-up',
    component: () => import('@/pages/avanti_sign_up_page.vue'),
    meta: { title: 'Avanti - Crea account' },
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: () => import('@/pages/avanti_sign_in_page.vue'),
    meta: { title: 'Avanti - Accedi' },
  },
  {
    path: '/verify-email',
    name: 'verify-email',
    component: () => import('@/pages/avanti_verify_email_page.vue'),
    meta: { title: 'Avanti - Verifica email' },
  },
  {
    path: '/iban',
    name: 'iban',
    component: () => import('@/pages/avanti_iban_page.vue'),
    meta: { title: 'Avanti - IBAN' },
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/pages/avanti_profile_page.vue'),
    meta: { title: 'Avanti - Profilo' },
  },
  {
    path: '/profile/name',
    name: 'change-name',
    component: () => import('@/pages/avanti_change_name_page.vue'),
    meta: { title: 'Avanti - Modifica nome' },
  },
  {
    path: '/profile/email',
    name: 'change-email',
    component: () => import('@/pages/avanti_change_email_page.vue'),
    meta: { title: 'Avanti - Cambia email' },
  },
  {
    path: '/profile/password',
    name: 'change-password',
    component: () => import('@/pages/avanti_change_password_page.vue'),
    meta: { title: 'Avanti - Cambia password' },
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
