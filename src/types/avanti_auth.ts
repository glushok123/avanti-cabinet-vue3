/**
 * Типы экранов авторизации: регистрация, вход, подтверждение email.
 * Описывают контракт между текстовыми константами вёрстки
 * и будущим ответом API.
 */
import type { AvantiPersonalDataRow } from '@/types/avanti_dashboard'

/** Идентификатор вкладки переключателя «Crea account / Accedi». */
export type AvantiAuthTabId = 'sign-up' | 'sign-in'

/** Вкладка переключателя над формой. */
export interface AvantiAuthTab {
  id: AvantiAuthTabId
  label: string
}

/** Значения полей формы регистрации. */
export interface AvantiSignUpFormValues {
  email: string
  password: string
  passwordConfirm: string
}

/** Значения полей формы входа. */
export interface AvantiSignInFormValues {
  email: string
  password: string
}

/** Строка карточки «Sicurezza»: описание слева, кнопка действия справа. */
export interface AvantiSecurityRow {
  id: string
  description: string
  actionLabel: string
}

/** Содержимое карточки «Dati personali» с кнопкой правки и полем IBAN. */
export interface AvantiProfileDataContent {
  title: string
  editLabel: string
  rows: AvantiPersonalDataRow[]
  ibanLabel: string
  ibanValue: string
  /** Доступное имя кнопки копирования IBAN. */
  ibanCopyLabel: string
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
