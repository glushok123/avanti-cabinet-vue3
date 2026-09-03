/**
 * Состояния прогресса главной страницы личного кабинета.
 *
 * Каждый экспорт — полный набор данных для одного кадра Figma. Разметка при
 * переключении не меняется: компоненты получают другие данные и варианты
 * оформления через props, поэтому новых блоков верстать не нужно.
 *
 * РАСХОЖДЕНИЯ МАКЕТА (десктоп и мобильная версия одного состояния расходятся,
 * значения взяты по десктопу, если не указано иное) описаны у каждого состояния.
 */
import {
  AVANTI_BALANCE,
  AVANTI_CHECKLIST,
  AVANTI_LOCK_BANNER,
  AVANTI_PERSONAL_DATA,
  AVANTI_STEPPER,
} from '@/constants/avanti_dashboard_mock'
import type {
  AvantiBalanceContent,
  AvantiChecklistContent,
  AvantiDashboardState,
  AvantiDashboardWithdrawalContent,
  AvantiUnlockContent,
} from '@/types/avanti_dashboard'

/**
 * Карточка суммы после прохождения всех шагов: бейдж меняется на
 * «Pronto al prelievo», кнопка вывода становится активной.
 */
const BALANCE_READY: AvantiBalanceContent = {
  ...AVANTI_BALANCE,
  statusLabel: 'Pronto al prelievo',
  actionState: 'ready',
}

/**
 * Чеклист в состоянии «фонды готовы к выводу»: надзаголовка нет, заголовок
 * один и крупный, индикатор закрашен целиком, кружки всех шагов залиты.
 * Начертание подписей двух последних шагов макет при этом не меняет —
 * поэтому у них расходятся `status` (текст) и `iconStatus` (кружки).
 */
const CHECKLIST_READY: AvantiChecklistContent = {
  ...AVANTI_CHECKLIST,
  eyebrow: '',
  title: 'Fondi pronti per il prelievo - procedi ora!',
  variant: 'ready',
  completed: 5,
  items: AVANTI_CHECKLIST.items.map((item) => ({ ...item, iconStatus: 'completed' as const })),
}

/**
 * Форма вывода средств правой колонки (кадр 241:25321).
 * Остаток взят из кадра: ползунок стоит в крайнем правом положении и
 * подписан «8.300 € / 8.300 €». Реквизиты в кадре не заполнены, поэтому
 * поля формы открываются пустыми.
 */
const WITHDRAWAL: AvantiDashboardWithdrawalContent = {
  availableAmount: 8300,
}

/** Карточка «SBLOCCO DEI FONDI COMPLETATO» — приходит на место баннера с замком. */
const UNLOCK: AvantiUnlockContent = {
  titleLines: ['SBLOCCO DEI', 'FONDI COMPLETATO'],
  helpLabel: 'Hai bisogno di aiuto?',
  steps: [
    {
      id: 'verification',
      icon: 'database',
      title: 'Verifica completata',
      note: 'I Suoi dati sono stati verificati con successo.',
    },
    {
      id: 'account',
      icon: 'lock-open',
      title: 'Account sbloccato',
      note: 'Il Suo account è stato sbloccato.',
    },
    {
      id: 'withdrawal',
      icon: 'wallet',
      title: 'Prelievo disponibile',
      note: 'Può effettuare il prelievo dei fondi quando desidera.',
      highlighted: true,
    },
  ],
}

/**
 * Базовое состояние — то, что сейчас показывает роут `/home`.
 * Пройдено 3 шага из 5, средства заблокированы.
 */
export const AVANTI_DASHBOARD_STATE_BASE: AvantiDashboardState = {
  id: 'base',
  figmaNodes: '1:15 (десктоп 1440×1089), 18:967 (мобильная 390×1139)',
  stepper: AVANTI_STEPPER,
  balance: AVANTI_BALANCE,
  lockBanner: AVANTI_LOCK_BANNER,
  unlock: null,
  personalData: AVANTI_PERSONAL_DATA,
  checklist: AVANTI_CHECKLIST,
  withdrawal: null,
}

/**
 * «Дом готовые этапы» — чеклист пройден целиком, средства разблокированы.
 * Баннера с замком и карточки «Dati personali» больше нет.
 *
 * Расхождение макета: на десктопе шкалы шагов нет (её место занимает форма
 * вывода средств в правой колонке), на мобильной она остаётся в базовом виде
 * «Passo 4 di 5». Оставлена мобильная трактовка как более полная: шкала шагов
 * показывается, а форма вывода средств встаёт первой в правой колонке — так
 * оба кадра сходятся в одну разметку.
 * Кроме того, десктопный кадр переиспользует старую карточку суммы
 * (бейдж «Completa i passaggi», выключенная кнопка), а мобильный уже
 * показывает разблокированную — взята мобильная.
 */
export const AVANTI_DASHBOARD_STATE_STEPS_READY: AvantiDashboardState = {
  id: 'steps-ready',
  figmaNodes: '241:25321 (десктоп 1440×1089), 107:8830 (мобильная 390×955)',
  stepper: AVANTI_STEPPER,
  balance: BALANCE_READY,
  lockBanner: null,
  unlock: null,
  personalData: null,
  checklist: CHECKLIST_READY,
  withdrawal: WITHDRAWAL,
}

/**
 * «Уровень 4» — шкалы шагов, баннера с замком и «Dati personali» нет,
 * вместо баннера стоит карточка разблокировки средств.
 *
 * Расхождение макета: мобильный кадр этого уровня чеклист не показывает,
 * десктопный показывает. Оставлен десктопный вариант.
 */
export const AVANTI_DASHBOARD_STATE_LEVEL_4: AvantiDashboardState = {
  id: 'level-4',
  figmaNodes: '258:14783 (десктоп 1440×857), 232:14524 (мобильная 390×631)',
  stepper: null,
  balance: BALANCE_READY,
  lockBanner: null,
  unlock: UNLOCK,
  personalData: null,
  checklist: CHECKLIST_READY,
  withdrawal: null,
}

/**
 * «Уровень 5» — тело страницы полностью совпадает с «Уровнем 4».
 * Единственное отличие в макете: на «Уровне 4» поверх страницы висит
 * всплывающее уведомление чат-консультанта, здесь его нет.
 */
export const AVANTI_DASHBOARD_STATE_LEVEL_5: AvantiDashboardState = {
  ...AVANTI_DASHBOARD_STATE_LEVEL_4,
  id: 'level-5',
  figmaNodes: '258:16652 (десктоп 1440×857), 232:14586 (мобильная 390×631)',
}

/**
 * «Уровень 6» — тело страницы то же, что на уровнях 4 и 5.
 * Отличие макета: поверх страницы открыто модальное окно чата с затемнением.
 */
export const AVANTI_DASHBOARD_STATE_LEVEL_6: AvantiDashboardState = {
  ...AVANTI_DASHBOARD_STATE_LEVEL_4,
  id: 'level-6',
  figmaNodes: '258:16821 (десктоп 1440×857)',
}

/** Все состояния в порядке прохождения — удобно для отладки и переключения. */
export const AVANTI_DASHBOARD_STATES: AvantiDashboardState[] = [
  AVANTI_DASHBOARD_STATE_BASE,
  AVANTI_DASHBOARD_STATE_STEPS_READY,
  AVANTI_DASHBOARD_STATE_LEVEL_4,
  AVANTI_DASHBOARD_STATE_LEVEL_5,
  AVANTI_DASHBOARD_STATE_LEVEL_6,
]
