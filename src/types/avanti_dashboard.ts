/**
 * Типы данных личного кабинета (страница «Home»).
 * Описывают контракт между моковыми данными первого этапа
 * и будущим ответом API на втором этапе.
 */

/** Состояние шага: завершён, выполняется сейчас, ожидает очереди. */
export type AvantiStepStatus = 'completed' | 'current' | 'pending'

/** Шаг горизонтальной шкалы «Passo 4 di 5». */
export interface AvantiStepperStep {
  id: string
  label: string
  status: AvantiStepStatus
}

/** Содержимое карточки со шкалой шагов. */
export interface AvantiStepperContent {
  title: string
  progressLabel: string
  steps: AvantiStepperStep[]
}

/** Допустимые иконки строк чеклиста верификации. */
export type AvantiChecklistIcon = 'chart' | 'shield' | 'user-check' | 'upload' | 'signature'

/** Строка чеклиста верификации. */
export interface AvantiChecklistItem {
  id: string
  title: string
  note: string
  status: AvantiStepStatus
  icon: AvantiChecklistIcon
}

/** Содержимое карточки чеклиста верификации. */
export interface AvantiChecklistContent {
  eyebrow: string
  title: string
  items: AvantiChecklistItem[]
  total: number
  completed: number
}

/** Допустимые иконки пунктов навигации. */
export type AvantiNavIcon = 'home' | 'documents' | 'profile' | 'chat'

/** Пункт горизонтального или нижнего меню. */
export interface AvantiNavItem {
  id: string
  label: string
  icon: AvantiNavIcon
  active: boolean
  /** Пункт с фирменной заливкой («Assistenza»). */
  accent?: boolean
  /** Счётчик непрочитанных уведомлений. */
  notifications?: number
}

/** Элемент хлебных крошек. */
export interface AvantiBreadcrumb {
  id: string
  label: string
  current: boolean
}

/** Профиль авторизованного пользователя. */
export interface AvantiUser {
  name: string
  email: string
  initials: string
  avatarDesktop: string
  avatarMobile: string
}

/** Строка карточки личных данных. */
export interface AvantiPersonalDataRow {
  id: string
  label: string
  value: string
}

/** Содержимое карточки личных данных. */
export interface AvantiPersonalDataContent {
  title: string
  rows: AvantiPersonalDataRow[]
}

/** Содержимое градиентной карточки одобренной суммы. */
export interface AvantiBalanceContent {
  caption: string
  description: string
  statusLabel: string
  amount: string
  details: string
  note: string
  actionLabel: string
}

/** Содержимое баннера с замком. */
export interface AvantiLockBannerContent {
  title: string
  subtitle: string
  /** Полная подпись счётчика — десктоп. */
  counterLabel: string
  /** Короткая подпись счётчика — мобильная. */
  counterShortLabel: string
  options: string[]
}

/** Плавающий виджет чат-консультанта на мобильной главной. */
export interface AvantiSupportBubbleContent {
  src: string
  alt: string
  count: number
}
