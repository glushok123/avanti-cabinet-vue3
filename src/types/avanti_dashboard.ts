/**
 * Типы данных личного кабинета (страница «Home»).
 * Описывают контракт между моковыми данными первого этапа
 * и будущим ответом API на втором этапе.
 */
import type { AvantiWithdrawalDetails } from '@/types/avanti_withdrawal'

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
  /** Статус текста: он задаёт начертание и цвет заголовка и подписи. */
  status: AvantiStepStatus
  icon: AvantiChecklistIcon
  /**
   * Статус кружков (левая иконка шага и правый маркер), если он расходится
   * с текстовым. В состоянии «фонды разблокированы» макет заливает все кружки
   * фирменным цветом, но начертание текста последних шагов не меняет.
   * По умолчанию повторяет `status`.
   */
  iconStatus?: AvantiStepStatus
  /**
   * Статус правого маркера отдельно от левого кружка. Нужен кадрам, где
   * все кружки шагов залиты, но у незавершённых шагов справа стоит стрелка,
   * а не галочка (31:6513, 31:6524). По умолчанию повторяет `iconStatus`.
   */
  markerStatus?: AvantiStepStatus
}

/**
 * Оформление шапки чеклиста.
 * `default` — надзаголовок 11px и заголовок 13px (базовое состояние),
 * `ready` — один крупный фирменный заголовок 15px без надзаголовка.
 */
export type AvantiChecklistVariant = 'default' | 'ready'

/** Содержимое карточки чеклиста верификации. */
export interface AvantiChecklistContent {
  /** В варианте `ready` надзаголовка в макете нет — тогда сюда идёт пустая строка. */
  eyebrow: string
  title: string
  items: AvantiChecklistItem[]
  total: number
  completed: number
  variant?: AvantiChecklistVariant
  /**
   * Подпись бейджа-счётчика в шапке («5 / 5 completati»). Есть только у
   * просторной версии карточки 464×516 из кадров пошагового флоу
   * (1:268, 31:6467): там поля 24px, а заголовок переносится на две строки.
   * На главной странице бейджа нет, карточка остаётся компактной.
   */
  counter?: string
}

/** Допустимые иконки пунктов навигации. */
export type AvantiNavIcon = 'home' | 'documents' | 'profile' | 'chat'

/** Пункт горизонтального или нижнего меню. */
export interface AvantiNavItem {
  id: string
  label: string
  icon: AvantiNavIcon
  /** Маршрут пункта. Без него пункт не ведёт никуда. */
  to?: string
  /**
   * Подсветка пункта. Выводится из текущего маршрута
   * (`useActiveNavSection`), в данных не хранится.
   */
  active?: boolean
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

/**
 * Состояние кнопки «Preleva i fondi».
 * `locked` — шаги не пройдены, кнопка заблокирована и полупрозрачная,
 * `ready` — средства разблокированы: активная кнопка с обводкой и свечением.
 */
export type AvantiWithdrawState = 'locked' | 'ready'

/** Содержимое градиентной карточки одобренной суммы. */
export interface AvantiBalanceContent {
  caption: string
  description: string
  statusLabel: string
  amount: string
  details: string
  note: string
  actionLabel: string
  /** По умолчанию `locked` — как в базовом состоянии макета. */
  actionState?: AvantiWithdrawState
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

/** Иконки шагов карточки «SBLOCCO DEI FONDI COMPLETATO». */
export type AvantiUnlockIcon = 'database' | 'lock-open' | 'wallet'

/** Шаг карточки разблокировки средств. */
export interface AvantiUnlockStep {
  id: string
  icon: AvantiUnlockIcon
  title: string
  note: string
  /** Круг шага подсвечен фирменным свечением («Prelievo disponibile»). */
  highlighted?: boolean
}

/** Содержимое карточки разблокировки средств. */
export interface AvantiUnlockContent {
  /** Заголовок разбит на строки так же, как в макете. */
  titleLines: string[]
  helpLabel: string
  steps: AvantiUnlockStep[]
}

/** Плавающий виджет чат-консультанта на мобильной главной. */
export interface AvantiSupportBubbleContent {
  src: string
  alt: string
  count: number
}

/**
 * Форма вывода средств в правой колонке кабинета (кадр 241:25321).
 * Сама форма (`avanti_withdrawal_form`) знает свои тексты и способы получения,
 * поэтому уровню прогресса достаточно доступного остатка и реквизитов.
 */
export interface AvantiDashboardWithdrawalContent {
  /** Доступный к выводу остаток, евро — верхняя граница суммы перевода. */
  availableAmount: number
  /** Предзаполненные реквизиты: ключ поля → значение. */
  details?: AvantiWithdrawalDetails
}

/**
 * Полный набор данных главной страницы для одного уровня прогресса.
 * Блоки, которых на уровне нет, равны null — страница их не выводит.
 */
export interface AvantiDashboardState {
  id: string
  /** Кадры Figma, по которым собрано состояние. */
  figmaNodes: string
  stepper: AvantiStepperContent | null
  balance: AvantiBalanceContent
  lockBanner: AvantiLockBannerContent | null
  unlock: AvantiUnlockContent | null
  personalData: AvantiPersonalDataContent | null
  checklist: AvantiChecklistContent
  /** Форма вывода средств: есть только на разблокированном уровне. */
  withdrawal: AvantiDashboardWithdrawalContent | null
}
