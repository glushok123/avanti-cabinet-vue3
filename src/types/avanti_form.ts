/**
 * Типы примитивов формы анкеты («Dati personali»).
 * Описывают контракт между моковыми данными первого этапа
 * и будущим ответом API на втором этапе.
 */

/** Вариант выпадающего списка (`avanti_select`). */
export interface AvantiSelectOption {
  /** Значение, которое уходит наружу через v-model. */
  value: string
  /** Видимая подпись варианта. */
  label: string
  /** Вариант показан, но выбрать его нельзя. */
  disabled?: boolean
}

/** Допустимые иконки сегментированного переключателя. */
export type AvantiChoiceIcon = 'male' | 'female'

/** Вариант сегментированного переключателя (`avanti_choice_group`). */
export interface AvantiChoiceOption {
  /** Значение, которое уходит наружу через v-model. */
  value: string
  /** Видимая подпись варианта («Uomo», «Donna»). */
  label: string
  /** Символ пола слева от подписи. */
  icon?: AvantiChoiceIcon
  /** Вариант показан, но выбрать его нельзя. */
  disabled?: boolean
}
