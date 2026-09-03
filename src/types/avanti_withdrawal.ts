/**
 * Типы формы вывода средств («Scegli il metodo di ricezione»).
 * Описывают контракт между моковыми данными первого этапа
 * и будущим ответом API на втором этапе.
 */

/** Идентификатор способа получения средств. */
export type AvantiWithdrawalMethodId = 'iban' | 'card'

/** Поле реквизитов внутри выбранного способа получения. */
export interface AvantiWithdrawalField {
  /** Ключ значения в наборе реквизитов; уходит наружу вместе с submit. */
  name: string
  /** Надпись над полем; в макете набрана прописными. */
  label: string
  /** Значение-подсказка внутри пустого поля. */
  placeholder: string
  /** Поясняющая подпись под полем («Da 15 a 34 caratteri, lettere e cifre»). */
  caption?: string
  /** Значение атрибута autocomplete для браузерного автозаполнения. */
  autocomplete?: string
}

/** Способ получения средств — сегмент переключателя и его набор полей. */
export interface AvantiWithdrawalMethod {
  id: AvantiWithdrawalMethodId
  /** Подпись сегмента («IBAN», «Carta»). */
  title: string
  /** Пояснение под подписью («Bonifico bancario»). */
  subtitle: string
  /** Поля реквизитов, которые показываются при выборе способа. */
  fields: AvantiWithdrawalField[]
}

/** Значения реквизитов: ключ поля из AvantiWithdrawalField.name → введённая строка. */
export type AvantiWithdrawalDetails = Record<string, string>

/** Данные, которые форма отдаёт наружу по кнопке «Avvia il trasferimento». */
export interface AvantiWithdrawalSubmitPayload {
  /** Выбранный способ получения. */
  method: AvantiWithdrawalMethodId
  /** Сумма перевода в евро. */
  amount: number
  /** Введённые реквизиты выбранного способа. */
  details: AvantiWithdrawalDetails
}
