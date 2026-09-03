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

/**
 * Размер поля модального окна (`avanti_modal_field`).
 * `sm` — кадры авторизации (поле 42px), `md` — кадры настроек аккаунта (44px).
 * На десктопе оба варианта дают 50px, отличается типографика.
 */
export type AvantiModalFieldSize = 'sm' | 'md'

/** Типы ввода, которые встречаются в полях модальных окон. */
export type AvantiModalFieldType = 'text' | 'email' | 'password'

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
