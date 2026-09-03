/**
 * Типы страниц профиля и настроек аккаунта.
 * Описывают контракт между моковыми текстами первого этапа
 * и будущим ответом API на втором этапе.
 */
import type { AvantiPersonalDataRow } from '@/types/avanti_dashboard'
import type { AvantiModalFieldType } from '@/types/avanti_form'

/** Поле IBAN карточки личных данных: подпись, значение и кнопка копирования. */
export interface AvantiProfileIbanContent {
  label: string
  value: string
  /** Доступное имя кнопки копирования — видимого текста у неё нет. */
  copyLabel: string
}

/** Содержимое широкой карточки «Dati personali» левой колонки. */
export interface AvantiProfileDataCardContent {
  title: string
  /** Подпись кнопки перехода к смене имени. */
  editLabel: string
  rows: AvantiPersonalDataRow[]
  iban: AvantiProfileIbanContent
}

/** Строка карточки безопасности: описание слева, кнопка действия справа. */
export interface AvantiProfileSecurityRow {
  id: string
  description: string
  actionLabel: string
}

/** Блок подтверждения почты внутри карточки безопасности. */
export interface AvantiProfileVerificationContent {
  title: string
  /** Подпись статусного бейджа («Non verificata»). */
  statusLabel: string
  description: string
  actionLabel: string
  /** Доступное имя круглой подсказки «?» — видимого текста у неё нет. */
  hintLabel: string
}

/** Содержимое карточки «Sicurezza». */
export interface AvantiProfileSecurityContent {
  title: string
  rows: AvantiProfileSecurityRow[]
  verification: AvantiProfileVerificationContent
}

/** Одно поле формы в модальном окне настроек. */
export interface AvantiProfileFieldContent {
  /** Идентификатор поля: ключ его значения в форме. */
  id: string
  /** Надпись над полем; регистр приводится к прописным средствами CSS. */
  label: string
  /** Начальное значение поля. */
  value: string
  /** Тип ввода. По умолчанию текстовое поле. */
  type?: AvantiModalFieldType
  placeholder?: string
  autocomplete?: string
  /** Пояснение под полем со значком «i». */
  note?: string
  /**
   * Доступное имя кнопки-глаза. Задано — поле собирается как поле пароля
   * с переключателем видимости, не задано — как обычное.
   */
  toggleLabel?: string
}

/** Общая часть любого модального окна настроек: шапка и кнопки. */
export interface AvantiProfileDialogContent {
  title: string
  /** Подзаголовок разбит на строки так же, как в макете. */
  descriptionLines: string[]
  /** Доступное имя крестика закрытия. */
  closeLabel: string
  cancelLabel: string
  submitLabel: string
}

/**
 * Содержимое модального окна настроек аккаунта.
 * Три окна макета («Modifica nome e cognome», «Cambia indirizzo email»,
 * «Cambia password») отличаются только набором полей, поэтому описаны
 * одним типом.
 */
export interface AvantiProfileFormContent {
  dialog: AvantiProfileDialogContent
  fields: AvantiProfileFieldContent[]
}

/**
 * Содержимое плавающей всплывашки чат-консультанта на экране профиля.
 * На втором этапе те же поля приходят из API вместе с непрочитанными.
 */
export interface AvantiProfileConsultantContent {
  name: string
  /** Начало последнего сообщения; в макете обрезано многоточием. */
  message: string
  /** Путь к фотографии консультанта. */
  avatar: string
  /** Число непрочитанных сообщений; 0 — счётчик не показывается. */
  count: number
  /** Расшифровка счётчика для скринридеров: цифра сама по себе непонятна. */
  countLabel: string
}
