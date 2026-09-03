/**
 * Типы экранов онбординга: «Банк прогрузка» (ожидание ответа банков)
 * и «Кредит апрув» (экран одобрения).
 * Описывают контракт между моковыми данными первого этапа
 * и будущим ответом API на втором этапе.
 */

/** Состояние проверки в конкретном банке. */
export type AvantiBankStatus = 'verified' | 'checking' | 'pending'

/** Карточка банка-партнёра в сетке проверки. */
export interface AvantiBankItem {
  id: string
  /** Название банка (в макете выводится капслоком). */
  name: string
  status: AvantiBankStatus
  /** Готовый URL логотипа: изображение импортируется в константах. */
  logo: string
}

/** Строка «этап — состояние» в блоке проверки. */
export interface AvantiCheckRow {
  id: string
  label: string
  value: string
  /**
   * Завершённый этап выделен более крупным и тёмным начертанием подписи —
   * в макете это единственное отличие первой строки от второй.
   */
  emphasized: boolean
}

/** Оформление декоративной карты в стопке на экране одобрения. */
export type AvantiCreditCardVariant = 'dark' | 'primary' | 'glass'

/**
 * Декоративная банковская карта.
 * Логотип платёжной системы, значок бесконтактной оплаты и чип
 * экспортированы из Figma отдельными файлами под каждое оформление,
 * поэтому пути к ним приходят вместе с вариантом.
 */
export interface AvantiCreditCardArt {
  id: string
  variant: AvantiCreditCardVariant
  mark: string
  contactless: string
  chip: string
}

/** Строка условий на карточке одобренной суммы: подпись и значение. */
export interface AvantiApprovalDetail {
  id: string
  label: string
  value: string
}
