/**
 * Типы экрана загрузки документов (кадры Figma 1:935 «Документы всплывашка»,
 * 22:3657 / 95:5965 «Документы неудача», 95:6532 «Документы удача»).
 * Описывают контракт между текстовыми константами первого этапа
 * и будущим ответом API на втором этапе.
 */

/** Статус документа или файла: подписи берутся из констант. */
export type AvantiDocumentStatus =
  /** Документ ещё не загружен («Da caricare»). */
  | 'pending'
  /** Файл выбран и отправлен, ждёт проверки. */
  | 'uploaded'
  /** Проверка пройдена («Verificato»). */
  | 'verified'
  /** Загрузка или проверка не удалась. */
  | 'failed'

/** Состояние панели: определяет, что показывается в теле. */
export type AvantiDocumentsState =
  /** Выбор типа документа и загрузка файла. */
  | 'upload'
  /** То же, но с плашкой ошибки под списком файлов. */
  | 'error'
  /** Документ проверен: вместо списка — плашка успеха. */
  | 'verified'

/** Тон плашки результата. */
export type AvantiDocumentsResultTone = 'success' | 'error'

/** Строка типа документа в начале тела панели. */
export interface AvantiDocumentSummary {
  /** Надпись «Tipo di documento». В состоянии успеха в макете скрыта. */
  label?: string
  /** Название документа: «Documento d’identità». */
  name: string
  /** Текст бейджа: «Da caricare» / «Verificato». */
  statusLabel: string
  status: AvantiDocumentStatus
}

/** Вариант требуемого документа в списке «Scegli il tipo di documento». */
export interface AvantiDocumentOption {
  id: string
  /** Название: «Passaporto». */
  title: string
  /** Пояснение под названием: «Una foto». */
  hint: string
}

/** Загруженный файл: имя, размер и статус проверки. */
export interface AvantiDocumentFile {
  id: string
  /** Имя файла из проводника. */
  name: string
  /** Человекочитаемый размер: «1,8 MB». */
  size: string
  status: AvantiDocumentStatus
  /** Подпись статуса рядом с размером. */
  statusLabel: string
  /** Подпись кнопки замены: «Sostituisci». */
  actionLabel: string
}

/** Тексты зоны перетаскивания файлов. */
export interface AvantiDocumentsDropzone {
  /** Заголовок зоны. */
  title: string
  /** Пояснение под заголовком. */
  hint: string
  /** Подпись-ссылка внутри зоны: «Scegli un file». */
  linkLabel: string
  /** Текст, который появляется, пока файл тащат над зоной. */
  dragLabel: string
  /** Значение атрибута accept у поля выбора файла. */
  accept: string
}

/** Плашка результата: успех проверки или ошибка загрузки. */
export interface AvantiDocumentsResult {
  tone: AvantiDocumentsResultTone
  /** Заголовок: «Documento verificato». */
  title: string
  /** Первый абзац пояснения. */
  description: string
  /** Второй абзац пояснения — в макете успеха отдельной строкой. */
  hint?: string
  /** Текст выделенной плашки под пояснением. */
  bannerText?: string
}

/** Подписи кнопок действий под списком. */
export interface AvantiDocumentsActions {
  /** Основная кнопка: «Carica il documento». */
  submitLabel: string
  /** Вторичная кнопка, если она нужна экрану. */
  secondaryLabel?: string
}
