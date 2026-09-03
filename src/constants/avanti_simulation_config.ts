/**
 * Параметры и тексты экрана «Симуляция кредита».
 * Числа и подписи сняты из Figma-макета; страница и её подкомпоненты
 * не содержат ни одного литерала — всё берётся отсюда.
 */

/** Минимальная сумма кредита, евро. */
export const AVANTI_AMOUNT_MIN = 1000

/**
 * РАСХОЖДЕНИЕ МАКЕТА: десктопный фрейм подписывает верхнюю границу суммы
 * как 33.000 €, мобильный — как 53.000 €. Обе подписи воспроизведены
 * как в макете; какое значение верное — нужно подтверждение заказчика.
 */
export const AVANTI_AMOUNT_MAX_DESKTOP = 33000
export const AVANTI_AMOUNT_MAX_MOBILE = 53000

/** Сумма кредита по умолчанию (значение в поле ввода на макете). */
export const AVANTI_AMOUNT_DEFAULT = 12000

/** Границы и шаг срока возврата, месяцы. */
export const AVANTI_MONTHS_MIN = 1
export const AVANTI_MONTHS_MAX = 36
export const AVANTI_MONTHS_STEP = 1

/** Срок возврата по умолчанию (положение ползунка на макете). */
export const AVANTI_MONTHS_DEFAULT = 22

/** Годовая номинальная ставка (TAN) для расчёта аннуитетного платежа. */
export const AVANTI_TAN_RATE = 0.038

/** Единицы измерения, используемые в подписях и значениях. */
export const AVANTI_UNIT_CURRENCY = '€'
export const AVANTI_UNIT_PER_MONTH = '€/mese'
export const AVANTI_UNIT_MONTHS = 'mesi'

/**
 * РАСХОЖДЕНИЕ МАКЕТА: нижняя подпись срока на десктопе — «1 mesi»,
 * на мобильной — грамматически верное «1 mese». Воспроизведено как в макете,
 * требуется подтверждение заказчика.
 */
export const AVANTI_MONTHS_MIN_LABEL_DESKTOP = '1 mesi'
export const AVANTI_MONTHS_MIN_LABEL_MOBILE = '1 mese'

/** Тексты экрана (итальянский). */
export const AVANTI_SIMULATION_TEXTS = {
  menu: 'Menu',
  amountOverline: 'Importo del credito',
  amountTitle: 'Scegli l’importo che ti serve',
  amountFieldLabel: 'Importo del credito in euro',
  durationOverline: 'Scegli la durata del rimborso',
  durationTitle: 'Per quale durata?',
  durationSliderLabel: 'Durata del rimborso in mesi',
  summaryAmountDesktop: 'Importo richiesto',
  summaryAmountMobile: 'Importo richiesto',
  summaryPaymentDesktop: 'Data di restituzione',
  summaryPaymentMobile: 'Rata di restituzione',
  summaryMonthsDesktop: 'Mesi',
  summaryMonthsMobile: 'Durata rimborso',
  disclaimerSoft: 'Stima indicativa basata su un tasso preferenziale del 3,8% TAN.',
  disclaimerStrong: 'Offerta soggetta ad accettazione.',
  disclaimerBadge: 'i',
  actionBack: 'Indietro',
  actionNext: 'Continua',
} as const
