/**
 * Тексты и реквизиты мастера оплаты комиссии.
 * Значения сняты с кадров Figma: шаг «1. IBAN» — 1:342 (десктоп) и 33:7103
 * (мобильная), шаг «3. COORDINATE» — 1:501 / 241:23617 (десктоп) и 232:18038
 * (мобильная). Компоненты шагов не содержат ни одного литерала — всё отсюда.
 */
import type {
  AvantiCommissionCoordinatesContent,
  AvantiCommissionFeeAmount,
  AvantiCommissionFeeContent,
  AvantiCommissionIbanContent,
  AvantiCommissionNoticeText,
  AvantiCommissionPaymentMethod,
  AvantiCommissionPaymentSystems,
  AvantiCommissionStep,
} from '@/types/avanti_commission'

/* --- Общие блоки шагов «1. IBAN» и «2. COMMISSIONE» --- */

/**
 * НЕТ В МАКЕТЕ: кадра с активным шагом «1. IBAN» в Figma нет — он не
 * спроектирован. Найденный кадр 1:342 показывает то же содержимое, что и шаг
 * «2. COMMISSIONE» (246:6992), меняется только порядок карточки суммы и
 * поясняющей плашки. Поэтому оба шага собраны из одних и тех же блоков ниже:
 * дублировать одинаковые литералы незачем, а придумывать шагу 1 собственный
 * текст нельзя — это вопрос к заказчику (см. отчёт).
 */

/** Малая бирюзовая надпись над заголовком окна на обоих шагах. */
const COMMISSION_EYEBROW = 'Commissione'

/** Заголовок окна на обоих шагах. */
const COMMISSION_TITLE = 'Commissione da versare'

/** Подпись кнопки перехода к реквизитам на обоих шагах. */
const COMMISSION_SUBMIT_LABEL = 'Vai alle coordinate'

/** Карточка «IMPORTO DA VERSARE»: сумма к оплате и её разбивка. */
const COMMISSION_AMOUNT: AvantiCommissionFeeAmount = {
  label: 'IMPORTO DA VERSARE',
  total: 37,
  currency: '€',
  lines: [
    { id: 'vat', label: 'IVA 22%', value: '6,67 €' },
    { id: 'selection', label: 'Servizi selezione', value: '18,20 €' },
    { id: 'signature', label: 'Firma digitale', value: '12,13 €' },
  ],
}

/** Поясняющая плашка со знаком «?»: середина фразы выделена жирным. */
const COMMISSION_NOTICE: AvantiCommissionNoticeText = {
  lead:
    'Il servizio gestisce la tua pratica di credito e garantisce il trasferimento ' +
    'al tasso agevolato. Il costo del servizio ',
  accent: 'non è detraibile',
  tail: ' dal credito.',
  actionLabel: 'Maggiori informazioni sulla commissione',
}

/** Блок «Pagamento servizi» под карточкой суммы. */
const COMMISSION_PAYMENT: AvantiCommissionPaymentMethod = {
  title: 'Pagamento servizi',
  description:
    'Per proseguire con la procedura di accredito del finanziamento è necessario ' +
    'effettuare il pagamento dei servizi.',
}

/** Полоса защиты соединения и платёжных систем — одна и та же на всех шагах. */
const COMMISSION_PAYMENT_SYSTEMS: AvantiCommissionPaymentSystems = {
  securityLabel: 'Connessione SSL',
  systems: ['Visa', 'Mastercard', 'SEPA'],
}

/* --- Шаг «1. IBAN»: сумма к оплате, поясняющая плашка и блок оплаты услуг --- */

/**
 * Идентификатор панели шага «1. IBAN».
 * Полоса `avanti_tabs` строит из него `id` вкладки («…-tab»), а панель шага
 * ссылается на неё через `aria-labelledby`.
 */
export const AVANTI_COMMISSION_IBAN_PANEL_ID = 'avanti-commission-iban'

/**
 * Содержимое шага «1. IBAN».
 * Кадры Figma: 1:342 (десктоп 681px) и 33:7103 (мобильная 350px).
 * Набор блоков совпадает с шагом «2. COMMISSIONE» — в кадрах различается
 * только порядок карточки суммы и поясняющей плашки, поэтому объекты собраны
 * из общих блоков, но остаются раздельными: текст одного шага можно будет
 * переопределить, не задев другой.
 */
export const AVANTI_COMMISSION_IBAN_CONTENT: AvantiCommissionIbanContent = {
  eyebrow: COMMISSION_EYEBROW,
  title: COMMISSION_TITLE,
  amount: COMMISSION_AMOUNT,
  notice: COMMISSION_NOTICE,
  payment: COMMISSION_PAYMENT,
  submitLabel: COMMISSION_SUBMIT_LABEL,
  paymentSystems: COMMISSION_PAYMENT_SYSTEMS,
}

/* --- Шаг «2. COMMISSIONE»: разбивка суммы и способы оплаты --- */

/**
 * Идентификатор панели шага «2. COMMISSIONE».
 * Полоса `avanti_tabs` строит из него `id` вкладки («…-tab»), а панель шага
 * ссылается на неё через `aria-labelledby`.
 */
export const AVANTI_COMMISSION_FEE_PANEL_ID = 'avanti-commission-fee'

/**
 * Содержимое шага «2. COMMISSIONE».
 * Кадры Figma: 246:6992 (десктоп 681px) и 232:17709 (мобильная 350px).
 */
export const AVANTI_COMMISSION_FEE_CONTENT: AvantiCommissionFeeContent = {
  eyebrow: COMMISSION_EYEBROW,
  title: COMMISSION_TITLE,
  notice: COMMISSION_NOTICE,
  amount: COMMISSION_AMOUNT,
  payment: COMMISSION_PAYMENT,
  submitLabel: COMMISSION_SUBMIT_LABEL,
  paymentSystems: COMMISSION_PAYMENT_SYSTEMS,
}

/* --- Шаг «3. COORDINATE»: реквизиты перевода --- */

/** Идентификатор панели шага «3. COORDINATE» — см. пояснение выше. */
export const AVANTI_COMMISSION_COORDINATES_PANEL_ID = 'avanti-commission-coordinates'

/**
 * Содержимое шага «3. COORDINATE».
 * Кадры Figma: 1:501 и 241:23617 (десктоп 681px), 232:18038 (мобильная 350px).
 */
export const AVANTI_COMMISSION_COORDINATES_CONTENT: AvantiCommissionCoordinatesContent = {
  eyebrow: COMMISSION_EYEBROW,
  title: 'Coordinate di pagamento',
  subtitle: 'Copia i dati, apri la tua banca e invia il bonifico.',
  methodLabel: 'Seleziona il metodo SEPA Instant',
  methodActionLabel: 'Maggiori informazioni su SEPA Instant',
  requisites: [
    { id: 'beneficiary', label: 'BENEFICIARIO', value: 'Indaco Salvatore' },
    {
      id: 'iban',
      label: 'IBAN',
      value: 'IT26 U020 0809 5000 0043 1003 095',
      /* В банк вставляют слитную строку — на экране она разбита на группы. */
      copyValue: 'IT26U0200809500000431003095',
    },
    { id: 'swift', label: 'SWIFT/BIC', value: 'UNCRITMMXXX' },
    { id: 'amount', label: 'IMPORTO', value: '37 €' },
  ],
  causaleNote: {
    lead: 'Se necessario, nel campo "Causale" indichi "',
    accent: 'Transfer',
    tail: '"',
  },
  copyLabels: {
    action: 'Copia',
    /*
     * НЕТ В МАКЕТЕ: состояние «скопировано» и сообщение об ошибке не нарисованы.
     * Формулировки подобраны по смыслу и требуют подтверждения заказчика.
     */
    success: 'Copiato negli appunti',
    failure: 'Copia non riuscita',
  },
  receiptNote: 'Invia la ricevuta al tuo consulente',
  submitLabel: 'Conferma pagamento',
  paymentSystems: COMMISSION_PAYMENT_SYSTEMS,
}

/* --- Полоса шагов и подписи оболочки окна --- */

/**
 * Шаги мастера слева направо (кадр «Шаги оплаты», Figma 1:352 / 33:7113).
 * Порядок массива задаёт и порядок вкладок, и порядок прохождения.
 */
export const AVANTI_COMMISSION_STEPS: AvantiCommissionStep[] = [
  { id: 'iban', label: '1. IBAN', panelId: AVANTI_COMMISSION_IBAN_PANEL_ID },
  { id: 'commissione', label: '2. COMMISSIONE', panelId: AVANTI_COMMISSION_FEE_PANEL_ID },
  { id: 'coordinate', label: '3. COORDINATE', panelId: AVANTI_COMMISSION_COORDINATES_PANEL_ID },
]

/**
 * Подписи оболочки окна мастера.
 *
 * НЕТ В МАКЕТЕ: кнопка «Назад» в шапке окна комиссии не подписана — у неё
 * только глиф-стрелка. Доступное имя подобрано по смыслу (та же формулировка,
 * что и у кнопки «Indietro» в мастере симуляции) и требует подтверждения.
 */
export const AVANTI_COMMISSION_WIZARD_TEXTS = {
  /** Доступное имя полосы шагов. */
  stepsLabel: 'Fasi del pagamento della commissione',
  /** Доступное имя кнопки возврата на предыдущий шаг. */
  backLabel: 'Indietro',
  /** Доступное имя кнопки закрытия окна. */
  closeLabel: 'Chiudi',
} as const
