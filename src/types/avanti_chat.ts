/**
 * Типы панели чат-консультанта.
 * Описывают контракт между моковой перепиской первого этапа (вёрстка)
 * и будущим ответом API: компоненты получают те же структуры через props,
 * поэтому при интеграции разметку менять не потребуется.
 */

/** Автор сообщения: консультант (входящее) или сам пользователь (исходящее). */
export type AvantiChatAuthor = 'consultant' | 'user'

/** Одно сообщение переписки. */
export interface AvantiChatMessage {
  id: string
  author: AvantiChatAuthor
  text: string
  /** Время отправки, «01:51». В макете показано не у каждого сообщения. */
  time?: string
  /** Подпись даты: плашка «29 agosto» рисуется перед этим сообщением. */
  dateLabel?: string
}

/** Собеседник в шапке панели. */
export interface AvantiChatConsultant {
  name: string
  /** Путь к изображению аватара. */
  avatar: string
  /** Консультант на связи — рисуется зелёный индикатор. */
  online: boolean
  /** Подпись статуса, «Online». */
  statusLabel: string
  /** Ориентир по времени ответа, «Risponde in ~30 sec». */
  replyTimeLabel: string
}

/** Строка списка сообщений, подготовленная к отрисовке. */
export interface AvantiChatMessageRow {
  message: AvantiChatMessage
  /** Аватар автора этого сообщения. */
  avatar: string
  /** Доступное имя автора — читается скринридером перед текстом. */
  authorLabel: string
}

/** Подписи интерфейса панели. Выносятся из компонентов целиком. */
export interface AvantiChatTexts {
  /** Заголовок страницы-обёртки (скрыт визуально). */
  pageTitle: string
  /** Доступное имя диалога. */
  dialogLabel: string
  /** Доступное имя области сообщений (role="log"). */
  logLabel: string
  /** Доступное имя кнопки закрытия. */
  closeLabel: string
  /** Доступное имя поля ввода. */
  inputLabel: string
  /** Подсказка внутри поля ввода. */
  inputPlaceholder: string
  /** Доступное имя кнопки вложения. */
  attachLabel: string
  /** Доступное имя кнопки отправки. */
  sendLabel: string
  /** Подпись кнопки, открывающей панель на странице-обёртке. */
  openLabel: string
  /** Доступные имена авторов сообщений для скринридера. */
  authorLabels: Record<AvantiChatAuthor, string>
}
