/**
 * Типы экранов авторизации: регистрация, вход, подтверждение email.
 * Описывают контракт между текстовыми константами вёрстки
 * и будущим ответом API.
 */

/** Идентификатор вкладки переключателя «Crea account / Accedi». */
export type AvantiAuthTabId = 'sign-up' | 'sign-in'

/**
 * Режим экрана авторизации. Совпадает с идентификатором активной вкладки:
 * одна и та же строка задаёт и подсветку переключателя, и набор полей формы.
 */
export type AvantiAuthMode = AvantiAuthTabId

/** Вкладка переключателя над формой. */
export interface AvantiAuthTab {
  id: AvantiAuthTabId
  label: string
}

/** Тексты одного экрана авторизации: всё, чем вход отличается от регистрации. */
export interface AvantiAuthScreenTexts {
  /** Заголовок вкладки браузера и скрытый h1 страницы. */
  pageTitle: string
  /** Доступное имя модального окна. */
  dialogLabel: string
  title: string
  submit: string
}

/**
 * Значения полей формы авторизации.
 * Подтверждение пароля есть только на экране регистрации.
 */
export interface AvantiAuthFormValues {
  email: string
  password: string
  passwordConfirm?: string
}

/** Содержимое блока подтверждения email внутри карточки «Sicurezza». */
export interface AvantiEmailVerificationContent {
  /** Символ внутри белого кружка-подсказки (в макете — «?»). */
  helpBadge: string
  /** Доступное имя того же кружка. */
  helpLabel: string
  title: string
  statusLabel: string
  description: string
  prompt: string
  /** Доступное имя группы ячеек кода. */
  codeLabel: string
  /** Количество ячеек кода. */
  codeLength: number
  confirmLabel: string
  resendQuestion: string
  resendLabel: string
}
