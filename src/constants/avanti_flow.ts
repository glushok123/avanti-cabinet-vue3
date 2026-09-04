/**
 * Сценарий оформления кредита: порядок шагов и переходы между ними.
 *
 * Единственный источник правды о том, куда ведут кнопки «дальше» и «назад».
 * Страницы не хранят маршруты у себя: иначе порядок шагов оказался бы
 * размазан по девятнадцати файлам и разошёлся бы при первой же правке.
 *
 * Порядок повторяет макет: симуляция → анкета → проверка банка → одобрение →
 * создание аккаунта → подтверждение почты → кабинет → документы → договор →
 * подпись → IBAN для зачисления → комиссия → возврат в кабинет.
 *
 * На этапе вёрстки переходы безусловны: формы ничего не отправляют, поэтому
 * кнопка «дальше» ведёт на следующий экран сразу. Проверки и ответы API
 * добавляются на этапе интеграции — порядок шагов при этом не меняется.
 */

/** Шаг сценария: свой маршрут и соседи по порядку. */
export interface AvantiFlowStep {
  /** Маршрут экрана. */
  path: string
  /** Куда ведёт основное действие («Continua», «Firma», «Conferma»). */
  next?: string
  /** Куда ведёт возврат. Без значения — на предыдущий экран истории. */
  back?: string
}

export const AVANTI_FLOW_STEPS: readonly AvantiFlowStep[] = [
  { path: '/', next: '/personal-data' },
  { path: '/personal-data', next: '/bank-check', back: '/' },
  { path: '/bank-check', next: '/credit-approved', back: '/personal-data' },
  { path: '/credit-approved', next: '/sign-up', back: '/bank-check' },
  { path: '/sign-up', next: '/verify-email', back: '/credit-approved' },
  { path: '/sign-in', next: '/home' },
  { path: '/verify-email', next: '/home', back: '/sign-up' },
  { path: '/home', next: '/documents' },
  { path: '/documents', next: '/contract', back: '/home' },
  { path: '/contract', next: '/signature', back: '/documents' },
  { path: '/signature', next: '/iban', back: '/contract' },
  { path: '/iban', next: '/commission', back: '/signature' },
  { path: '/iban-modal', next: '/commission', back: '/home' },
  /* Комиссия — последний шаг: после оплаты пользователь возвращается в кабинет. */
  { path: '/commission', next: '/home', back: '/iban' },
]
