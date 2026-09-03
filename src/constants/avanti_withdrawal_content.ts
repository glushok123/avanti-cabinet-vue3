/**
 * Тексты, границы суммы и способы получения для формы вывода средств.
 * Значения сняты с кадров Figma 232:17522 (мобильная) и 241:25321 (десктоп);
 * компоненты формы не содержат ни одного литерала — всё берётся отсюда.
 */
import type { AvantiWithdrawalMethod, AvantiWithdrawalMethodId } from '@/types/avanti_withdrawal'

/** Символ валюты в подписях суммы. */
export const AVANTI_WITHDRAWAL_CURRENCY = '€'

/**
 * Нижняя граница и шаг слайдера суммы.
 *
 * НЕТ В МАКЕТЕ: нарисовано только крайнее правое положение ползунка
 * («8.300 € / 8.300 €», 100% доступного). Минимум и шаг подобраны так, чтобы
 * верхняя граница всегда была достижима; нужны значения от заказчика.
 */
export const AVANTI_WITHDRAWAL_AMOUNT_MIN = 100
export const AVANTI_WITHDRAWAL_AMOUNT_STEP = 100

/** Способ получения, выбранный при открытии формы (в макете — IBAN). */
export const AVANTI_WITHDRAWAL_METHOD_DEFAULT: AvantiWithdrawalMethodId = 'iban'

/**
 * Способы получения средств и их реквизиты.
 *
 * РАСХОЖДЕНИЕ МАКЕТА: раскрыт только способ «IBAN». Поля способа «Carta»
 * в макете не нарисованы — набор ниже собран по смыслу перевода на карту
 * и требует подтверждения заказчика.
 */
export const AVANTI_WITHDRAWAL_METHODS: AvantiWithdrawalMethod[] = [
  {
    id: 'iban',
    title: 'IBAN',
    subtitle: 'Bonifico bancario',
    fields: [
      {
        name: 'iban',
        label: 'IBAN',
        placeholder: 'IT00 0000 0000 0000 0000 0000 000',
        caption: 'Da 15 a 34 caratteri, lettere e cifre',
      },
      {
        name: 'holder',
        label: 'Intestatario',
        placeholder: 'Nome e cognome',
        autocomplete: 'name',
      },
    ],
  },
  {
    id: 'card',
    title: 'Carta',
    subtitle: 'Trasferimento su carta',
    fields: [
      {
        name: 'cardNumber',
        label: 'Numero della carta',
        placeholder: '0000 0000 0000 0000',
        caption: '16 cifre senza spazi',
        autocomplete: 'cc-number',
      },
      {
        name: 'holder',
        label: 'Intestatario',
        placeholder: 'Nome e cognome',
        autocomplete: 'cc-name',
      },
    ],
  },
]

/** Тексты формы (итальянский). */
export const AVANTI_WITHDRAWAL_TEXTS = {
  title: 'Scegli il metodo di ricezione',
  subtitle: 'Inserisci le coordinate per ricevere il credito',
  methodsLabel: 'Metodo di ricezione',
  amountLabel: 'Importo da ricevere',
  amountSliderLabel: 'Importo da ricevere in euro',
  /** Хвост подписи под суммой: «100%» + « del totale disponibile». */
  amountShareSuffix: 'del totale disponibile',
  submit: 'Avvia il trasferimento',
} as const
