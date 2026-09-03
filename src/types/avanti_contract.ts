/**
 * Типы страницы договора (кадр Figma 22:4780 «Договор»).
 * Описывают контракт между текстовыми константами первого этапа
 * и будущим ответом API на втором этапе.
 */

/** Шапка документа: логотип, название договора и правовая ссылка. */
export interface AvantiContractDocumentHeading {
  title: string
  subtitle: string
}

/** Строка метаданных под шапкой: город с датой и номер договора. */
export interface AvantiContractMeta {
  placeLabel: string
  placeValue: string
  numberLabel: string
  numberValue: string
}

/** Вводный блок «Tra i sottoscritti»: заголовок и абзац о сторонах. */
export interface AvantiContractParties {
  title: string
  text: string
}

/** Реквизит документа: подпись слева, значение справа. */
export interface AvantiContractField {
  id: string
  label: string
  value: string
}

/** Карточка финансового условия. `highlighted` — выделенная бирюзовая. */
export interface AvantiContractTerm {
  id: string
  label: string
  value: string
  highlighted?: boolean
}

/** Блок «Condizioni Finanziarie»: заголовок, три карточки и сноска про TAN. */
export interface AvantiContractTerms {
  title: string
  items: AvantiContractTerm[]
  note: string
}

/** Строка «Finalità del credito» под финансовыми условиями. */
export interface AvantiContractPurpose {
  label: string
  value: string
}

/** Заголовок колонки таблицы амортизации. `numeric` — выравнивание вправо. */
export interface AvantiContractScheduleColumn {
  id: string
  label: string
  numeric: boolean
}

/** Строка плана амортизации: номер платежа, дата и четыре суммы. */
export interface AvantiContractScheduleRow {
  id: string
  number: string
  date: string
  total: string
  principal: string
  interest: string
  balance: string
}

/** Таблица амортизации целиком. */
export interface AvantiContractSchedule {
  title: string
  /** Доступное имя таблицы и её области прокрутки (в макете скрыто). */
  caption: string
  columns: AvantiContractScheduleColumn[]
  rows: AvantiContractScheduleRow[]
}

/** Группа абзацев внутри раздела условий: необязательный подзаголовок и текст. */
export interface AvantiContractClauseGroup {
  id: string
  subtitle?: string
  paragraphs: string[]
}

/** Нумерованный раздел условий договора («1. OGGETTO DEL CONTRATTO»). */
export interface AvantiContractSection {
  id: string
  title: string
  groups: AvantiContractClauseGroup[]
}

/** Место для подписи стороны договора. */
export interface AvantiContractSignature {
  id: string
  label: string
}

/** Баннер «документ проверен» над карточкой подписания. */
export interface AvantiContractVerifiedBanner {
  text: string
  actionLabel: string
}

/** Карточка подписания договора с кнопками «Apri PDF» и «Firma il contratto». */
export interface AvantiContractSigningCard {
  eyebrow: string
  title: string
  pdfLabel: string
  badgeLabel: string
  actionLabel: string
}

/** Статусная плашка внизу страницы. */
export interface AvantiContractStatusBanner {
  caption: string
  title: string
  /** Доступное имя галочки статуса. */
  iconLabel: string
}
