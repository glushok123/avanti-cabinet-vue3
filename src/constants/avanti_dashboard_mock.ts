/**
 * Моковые данные страницы «Home» личного кабинета.
 *
 * ВАЖНО: это данные только первого этапа (вёрстка). На втором этапе весь
 * файл заменяется ответом API — компоненты получают те же структуры через
 * props, поэтому менять разметку не потребуется.
 */
import avatarDesktop from '@/assets/images/avanti_avatar_desktop.png'
import avatarMobile from '@/assets/images/avanti_avatar_mobile.png'
import supportAgent from '@/assets/images/avanti_support_agent.png'
import type {
  AvantiBalanceContent,
  AvantiBreadcrumb,
  AvantiChecklistContent,
  AvantiLockBannerContent,
  AvantiNavItem,
  AvantiPersonalDataContent,
  AvantiStepperContent,
  AvantiSupportBubbleContent,
  AvantiUser,
} from '@/types/avanti_dashboard'

export const AVANTI_USER: AvantiUser = {
  name: 'Marco Rossi',
  email: 'ikoei@09gmail.com',
  initials: 'MR',
  avatarDesktop,
  avatarMobile,
}

/** Пункты горизонтального меню десктопной шапки. */
export const AVANTI_HEADER_NAV_ITEMS: AvantiNavItem[] = [
  { id: 'home', label: 'Home', icon: 'home', to: '/home' },
  { id: 'documents', label: 'Documenti', icon: 'documents', to: '/documents' },
  { id: 'profile', label: 'Profilo', icon: 'profile', to: '/profile' },
]

/** Кнопка поддержки — вынесена отдельно: у неё своё оформление и счётчик. */
export const AVANTI_SUPPORT_NAV_ITEM: AvantiNavItem = {
  id: 'support',
  label: 'Assistenza',
  icon: 'chat',
  to: '/chat',
  accent: true,
  notifications: 4,
}

/** Пункты мобильной нижней навигации. */
export const AVANTI_BOTTOM_NAV_ITEMS: AvantiNavItem[] = [
  ...AVANTI_HEADER_NAV_ITEMS,
  { ...AVANTI_SUPPORT_NAV_ITEM, notifications: undefined },
]

export const AVANTI_BREADCRUMBS: AvantiBreadcrumb[] = [
  { id: 'platform', label: 'Piattaforma', current: false },
  { id: 'home', label: 'Home', current: true },
]

export const AVANTI_STEPPER: AvantiStepperContent = {
  title: 'Passo 4 di 5',
  progressLabel: '3 / 5 completati',
  steps: [
    { id: 'simulation', label: 'Simul.', status: 'completed' },
    { id: 'approval', label: 'Approv.', status: 'completed' },
    { id: 'account', label: 'Account', status: 'completed' },
    { id: 'documents', label: 'Docum.', status: 'current' },
    { id: 'signature', label: 'Firma', status: 'pending' },
  ],
}

export const AVANTI_BALANCE: AvantiBalanceContent = {
  caption: 'Il tuo saldo',
  description: 'Importo approvato dai nostri partner',
  statusLabel: 'Completa i passaggi',
  amount: '€ 12 000',
  details: 'Prestito personale • TAN 3,8%',
  note: "Fondi disponibili dopo l'approvazione dei documenti",
  actionLabel: 'Preleva i fondi',
}

export const AVANTI_LOCK_BANNER: AvantiLockBannerContent = {
  title: 'Per il prelievo dei fondi, completa tutti gli step',
  subtitle: 'Step ancora da completare',
  counterLabel: '3 / 5 Completati',
  counterShortLabel: '3 / 5',
  options: ['Documenti', 'Firma'],
}

/*
 * РАСХОЖДЕНИЕ МАКЕТА: в поле «Cognome» (фамилия) в макете стоит название
 * банка, а в «Nome» (имя) — имя и фамилия целиком. Значения оставлены
 * как в макете, чтобы вёрстка совпадала с ним пиксель в пиксель;
 * на этапе интеграции сюда придут данные пользователя из API.
 */
export const AVANTI_PERSONAL_DATA: AvantiPersonalDataContent = {
  title: 'Dati personali',
  rows: [
    { id: 'surname', label: 'Cognome', value: 'Intesa Sanpaolo S.p.A.' },
    { id: 'name', label: 'Nome', value: 'Marco Rossi' },
  ],
}

export const AVANTI_CHECKLIST: AvantiChecklistContent = {
  eyebrow: 'Completa tutti gli step',
  title: 'Per il prelievo dei fondi, completa tutti gli step',
  total: 5,
  completed: 3,
  items: [
    {
      id: 'simulation',
      title: 'Simulazione completata',
      note: 'Completato',
      status: 'completed',
      icon: 'chart',
    },
    {
      id: 'approval',
      title: 'Credito approvato',
      note: 'Completato',
      status: 'completed',
      icon: 'shield',
    },
    {
      id: 'account',
      title: 'Account creato',
      note: 'Completato',
      status: 'completed',
      icon: 'user-check',
    },
    {
      id: 'documents',
      title: 'Documenti caricati',
      note: 'Step attuale • Azione richiesta',
      status: 'current',
      icon: 'upload',
    },
    {
      id: 'signature',
      title: 'Contratto firmato',
      note: 'In attesa',
      status: 'pending',
      icon: 'signature',
    },
  ],
}

export const AVANTI_SUPPORT_BUBBLE: AvantiSupportBubbleContent = {
  src: supportAgent,
  alt: 'Consulente Avanti',
  count: 2,
}

/**
 * Служебные подписи интерфейса: доступные имена элементов без видимого текста.
 * Вынесены сюда, чтобы в компонентах не было зашитых строк локали.
 */
export const AVANTI_DASHBOARD_TEXTS = {
  /** Заголовок страницы: в макете не показан, нужен для скринридеров. */
  pageTitle: 'Area personale',
  /** Доступное имя основного меню — десктопная шапка и нижняя навигация. */
  mainMenu: 'Menu principale',
  /** Доступное имя блока хлебных крошек. */
  breadcrumbs: 'Percorso di navigazione',
  /** Начало подписи кнопки уведомлений, к нему добавляется счётчик. */
  notifications: 'Notifiche',
  /** Начало доступного имени кнопки профиля в мобильной шапке, к нему добавляется имя пользователя. */
  profile: 'Profilo',
  /** Доступное имя кнопки сворачивания чеклиста. */
  checklistToggle: 'Mostra o nascondi gli step',
  /** Доступное имя индикатора прогресса верификации. */
  checklistProgress: 'Step completati',
  /** Доступное имя кнопки-стрелки в баннере с замком. */
  lockBannerAction: 'Vai agli step da completare',
} as const
