/**
 * Типы экранов ввода и проверки IBAN.
 * Описывают контракт между текстами первого этапа (моки) и будущим API.
 */

/**
 * Шаг панели IBAN.
 * `account` — ввод номера счёта, `verify` — его проверка перед сохранением.
 */
export type AvantiIbanStep = 'account' | 'verify'

/**
 * Формат ввода поля экранов IBAN.
 * `iban` — фильтр символов и разбивка номера по группам, `plain` — обычная
 * строка (имя владельца счёта).
 */
export type AvantiIbanFieldFormat = 'iban' | 'plain'

/**
 * Вкладка переключателя панели.
 * В макете обе строки набраны отдельно: сверху номер шага или способ
 * («1», «IBAN»), снизу его название («Conto», «Bonifico bancario»).
 */
export interface AvantiIbanTab {
  id: string
  caption: string
  label: string
}

/**
 * Тексты модальной панели «IBAN per l'accredito»
 * (Figma 1:1366, 1:1521 — десктоп; 104:8482, 104:8551 — мобильная).
 */
export interface AvantiIbanPanelContent {
  title: string
  description: string
  /** Доступное имя группы вкладок — видимой подписи у неё в макете нет. */
  tabsLabel: string
  /** Ровно две вкладки: `account` и `verify`. */
  tabs: AvantiIbanTab[]
  fieldLabel: string
  placeholder: string
  /** Правило ввода: показывается, пока номер пуст или набран целиком. */
  lengthRule: string
  /** Счётчик оставшихся символов; `{count}` заменяется числом. */
  missingCharsTemplate: string
  /** Второй абзац подсказки шага ввода. */
  maskNote: string
  submitLabel: string
  /** Надпись над номером на плашке проверки. */
  verifyTitle: string
  verifyWarning: string
  editLabel: string
  saveLabel: string
}

/**
 * Тексты формы вывода средств на странице «Ввод айбана после шагов»
 * (Figma 31:6422 — десктоп, 33:6817 — мобильная).
 */
export interface AvantiIbanTransferContent {
  /** Заголовок разбит на строки так же, как в макете. */
  titleLines: string[]
  description: string
  tabsLabel: string
  /** Способы получения средств: перевод на счёт и перевод на карту. */
  tabs: AvantiIbanTab[]
  ibanLabel: string
  ibanPlaceholder: string
  ownerLabel: string
  ownerPlaceholder: string
  submitLabel: string
  closeLabel: string
}

/** Содержимое градиентной карточки суммы на странице IBAN. */
export interface AvantiIbanAmountContent {
  caption: string
  amount: string
  details: string
  actionLabel: string
}
