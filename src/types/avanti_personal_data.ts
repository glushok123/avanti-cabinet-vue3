/**
 * Типы анкеты «Dati personali».
 * Описывают состояние формы на этапе вёрстки: сейчас значения приходят из
 * ref-ов страницы, на этапе интеграции — из ответа API теми же полями.
 */

/** Значения полей анкеты. */
export interface AvantiPersonalDataValues {
  /** Фамилия («Cognome»). */
  lastName: string
  /** Имя («Nome»). */
  firstName: string
  /** Пол: значение выбранного сегмента переключателя. */
  gender: string
  /** Тип документа: значение выбранного пункта выпадающего списка. */
  documentType: string
  /** Номер документа («Numero del documento»). */
  documentNumber: string
}

/**
 * Тексты ошибок по полям. Валидации во вёрстке нет, поэтому все значения —
 * пустые строки; поля уже подключены к пропу errorMessage, и на этапе
 * интеграции достаточно записать сюда текст.
 */
export type AvantiPersonalDataErrors = Record<keyof AvantiPersonalDataValues, string>
