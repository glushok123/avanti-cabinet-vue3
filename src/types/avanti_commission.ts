/**
 * Типы мастера оплаты комиссии («1. IBAN → 2. COMMISSIONE → 3. COORDINATE»).
 * Описывают контракт между моковыми текстами первого этапа и будущим API.
 */

/* --- Шаг «2. COMMISSIONE»: разбивка суммы и способ оплаты --- */

/** Строка построчной разбивки в карточке суммы («IVA 22% — 6,67 €»). */
export interface AvantiCommissionFeeLine {
  /** Ключ строки; уходит в `key` списка и в будущий ответ API. */
  id: string
  /** Название составляющей («IVA 22%», «Firma digitale»). */
  label: string
  /**
   * Готовая подпись суммы с копейками и валютой («6,67 €»).
   * Строка, а не число: `formatAmount` округляет до целых евро и на копейках
   * разбивки теряет точность, а в макете копейки показаны.
   */
  value: string
}

/** Карточка «IMPORTO DA VERSARE»: крупная сумма и её разбивка. */
export interface AvantiCommissionFeeAmount {
  /** Малая надпись над суммой. */
  label: string
  /** Сумма к оплате в евро; выводится через `formatAmount`. */
  total: number
  /** Символ валюты рядом с суммой. */
  currency: string
  /** Строки разбивки сверху вниз. */
  lines: AvantiCommissionFeeLine[]
}

/**
 * Поясняющая плашка со знаком «?».
 * Текст разбит на три части, потому что в макете середина выделена жирным.
 */
export interface AvantiCommissionNoticeText {
  /** Начало фразы до выделения. */
  lead: string
  /** Выделенный жирным фрагмент («non è detraibile»). */
  accent: string
  /** Окончание фразы после выделения. */
  tail: string
  /** Доступное имя кнопки «?», открывающей окно с пояснением. */
  actionLabel: string
}

/** Блок способа оплаты: иконка карты, заголовок и пояснение. */
export interface AvantiCommissionPaymentMethod {
  /** Заголовок блока («Pagamento servizi»). */
  title: string
  /** Пояснение под заголовком. */
  description: string
}

/** Полоса под кнопкой: защита соединения и принимаемые платёжные системы. */
export interface AvantiCommissionPaymentSystems {
  /** Подпись о защищённом соединении («Connessione SSL»). */
  securityLabel: string
  /** Названия платёжных систем («Visa», «Mastercard», «SEPA»). */
  systems: string[]
}

/** Всё содержимое шага «2. COMMISSIONE». */
export interface AvantiCommissionFeeContent {
  /** Малая бирюзовая надпись над заголовком окна. */
  eyebrow: string
  /** Заголовок окна. */
  title: string
  /** Поясняющая плашка. */
  notice: AvantiCommissionNoticeText
  /** Карточка суммы к оплате. */
  amount: AvantiCommissionFeeAmount
  /** Блок способа оплаты. */
  payment: AvantiCommissionPaymentMethod
  /** Подпись кнопки перехода к реквизитам. */
  submitLabel: string
  /** Полоса платёжных систем под кнопкой. */
  paymentSystems: AvantiCommissionPaymentSystems
}

/** События панели шага «2. COMMISSIONE». */
export interface AvantiCommissionFeePanelEmits {
  /** Нажата кнопка «Vai alle coordinate» — мастер переходит к шагу 3. */
  submit: []
  /** Нажат знак «?» — нужно показать окно с пояснением о комиссии. */
  info: []
}

/* --- Шаги «1. IBAN» и «3. COORDINATE» --- */

/** Идентификаторы шагов мастера — они же значения `v-model` полосы вкладок. */
export type AvantiCommissionStepId = 'iban' | 'commissione' | 'coordinate'

/**
 * Описание шага мастера для полосы вкладок.
 * Состояния (`done` / `available` / `locked`) здесь нет: оно зависит от
 * прогресса и вычисляется мастером, а не хранится в константах.
 */
export interface AvantiCommissionStep {
  /** Идентификатор шага — он же значение `v-model` полосы вкладок. */
  id: AvantiCommissionStepId
  /** Видимая подпись вкладки («1. IBAN»). */
  label: string
  /** `id` панели шага: из него полоса строит `id` вкладки («…-tab»). */
  panelId: string
}

/**
 * Приписка про поле «Causale» на шаге «3. COORDINATE».
 * Разбита на три части, потому что в макете середина («Transfer») набрана
 * полужирным и тёмным, а не тем же начертанием, что остальная фраза.
 */
export interface AvantiCommissionCausaleNote {
  /** Начало фразы до выделения. */
  lead: string
  /** Выделенный полужирным фрагмент. */
  accent: string
  /** Окончание фразы после выделения. */
  tail: string
}

/**
 * Содержимое шага «1. IBAN» (кадры 1:342 и 33:7103).
 * Набор блоков в кадре тот же, что и на шаге «2. COMMISSIONE», меняется только
 * их порядок: на шаге 1 карточка суммы стоит над поясняющей плашкой, на шаге 2 —
 * под ней. Поэтому тип содержимого общий, а различие живёт в панелях шагов.
 */
export type AvantiCommissionIbanContent = AvantiCommissionFeeContent

/** События панели шага «1. IBAN». */
export interface AvantiCommissionIbanPanelEmits {
  /** Нажата кнопка «Vai alle coordinate» — мастер переходит дальше. */
  submit: []
  /** Нажат знак «?» — нужно показать окно с пояснением о комиссии. */
  info: []
}

/** Один реквизит в карточке шага «3. COORDINATE». */
export interface AvantiCommissionRequisite {
  /** Ключ строки; уходит наружу в событии копирования. */
  id: string
  /** Надпись над значением («BENEFICIARIO», «IBAN»). */
  label: string
  /** Видимое значение — оно же по умолчанию попадает в буфер обмена. */
  value: string
  /**
   * Значение для буфера, если оно отличается от видимого.
   * Нужно для IBAN: на экране он разбит на группы пробелами,
   * а в банк вставляют слитную строку.
   */
  copyValue?: string
}

/** Подписи кнопки копирования и результатов операции для скринридера. */
export interface AvantiCommissionCopyLabels {
  /** Начало доступного имени кнопки, к нему добавляется название реквизита. */
  action: string
  /** Сообщение об успешном копировании. */
  success: string
  /** Сообщение о неудаче: буфер недоступен или запрещён браузером. */
  failure: string
}

/**
 * Как показана приписка про поле «Causale» на шаге «3. COORDINATE».
 * В макете два варианта одного экрана:
 * - `note-inside` (1:501) — приписка внутри карточки реквизитов, обычным текстом;
 * - `note-outside` (241:23617) — отдельная белая плашка со знаком «!» под карточкой.
 */
export type AvantiCommissionCoordinatesVariant = 'note-inside' | 'note-outside'

/** Содержимое шага «3. COORDINATE» (кадры 1:501, 241:23617, 232:18038). */
export interface AvantiCommissionCoordinatesContent {
  /** Малая бирюзовая надпись над заголовком окна. */
  eyebrow: string
  /** Заголовок окна. */
  title: string
  /** Пояснение под полосой шагов. */
  subtitle: string
  /** Подпись плашки выбора способа оплаты. */
  methodLabel: string
  /** Доступное имя знака «?» рядом со способом оплаты. */
  methodActionLabel: string
  /** Реквизиты для перевода сверху вниз. */
  requisites: AvantiCommissionRequisite[]
  /** Приписка про поле «Causale»: середина выделена полужирным. */
  causaleNote: AvantiCommissionCausaleNote
  /** Подписи кнопки копирования. */
  copyLabels: AvantiCommissionCopyLabels
  /** Строка «Invia la ricevuta al tuo consulente» над кнопкой. */
  receiptNote: string
  /** Подпись кнопки подтверждения оплаты. */
  submitLabel: string
  /** Полоса платёжных систем под кнопкой. */
  paymentSystems: AvantiCommissionPaymentSystems
}

/** События панели шага «3. COORDINATE». */
export interface AvantiCommissionCoordinatesPanelEmits {
  /** Нажата кнопка «Conferma pagamento». */
  submit: []
  /** Нажат знак «?» у способа оплаты — нужно показать пояснение о SEPA Instant. */
  info: []
  /** Реквизит скопирован в буфер обмена; наружу уходит его `id`. */
  copy: [id: string]
  /** Нажата строка «Invia la ricevuta al tuo consulente». */
  receipt: []
}
