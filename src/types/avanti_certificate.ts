/**
 * Типы блока страхового сертификата CPI.
 *
 * Блок состоит из четырёх частей одного флоу:
 *  · карточка сертификата в левой колонке кабинета (кадр 256:11723);
 *  · полноэкранный просмотрщик документа поверх кабинета (кадр 256:12221);
 *  · карточка подтверждения просмотра поверх просмотрщика (кадр 256:12458);
 *  · модальное предупреждение живёт в `@/types/avanti_dashboard` — оно
 *    относится к кабинету, а не к сертификату.
 *
 * Описывают контракт между моковыми данными первого этапа и ответом API
 * на втором, поэтому тексты приходят данными, а не зашиты в разметку.
 */

/**
 * Состояние карточки сертификата.
 * · `issued` — сертификат выпущен, кнопка открывает просмотрщик.
 *   Это единственное состояние, которое встречается в кадрах
 *   (256:11723, 256:11922, 256:12261, 256:12481, 256:12654, 256:14450,
 *   232:14464, 232:14510, 232:16385).
 * · `pending` — выпуск ещё идёт: щит и кнопка приглушены, кнопка выключена.
 *   Тексты взяты у библиотечного компонента `certificato-cpi-progress`
 *   (Figma 220:2829), который ни в один кадр кабинета не поставлен.
 */
export type AvantiCertificateCardState = 'issued' | 'pending'

/** Содержимое карточки сертификата в левой колонке кабинета. */
export interface AvantiCertificateCardContent {
  /** Надзаголовок прописными («CERTIFICATO CPI EMESSO»). */
  overline: string
  title: string
  description: string
  /** Строка под описанием («Cod. Pratica: CPI-8492-X»). */
  metadata: string
  actionLabel: string
  /** По умолчанию `issued` — состояние из кадров. */
  state?: AvantiCertificateCardState
}

/** Содержимое просмотрщика документа. */
export interface AvantiCertificateViewerContent {
  /** Категория слева в строке статуса («CERTIFICATO CPI»). */
  category: string
  /** Подпись справа от точки-индикатора («Documento disponibile»). */
  statusLabel: string
  title: string
  /** Строка под заголовком («Intestatario · kya ky»). */
  subtitle: string
  /** Счётчик страниц («Pagina 1 di 1»). */
  pageLabel: string
  /** Подпись кнопки масштаба в обычном состоянии («Ingrandisci»). */
  zoomInLabel: string
  /** Подпись той же кнопки при увеличенном документе. В кадрах её нет. */
  zoomOutLabel: string
  /** Подпись у замка в подвале («Documento protetto»). */
  protectionLabel: string
  /** Подпись кнопки закрытия в подвале («Chiudi»). */
  closeLabel: string
  /** Путь к изображению-странице документа. */
  documentSrc: string
  /** Описание изображения для скринридеров. */
  documentAlt: string
}

/** Содержимое карточки подтверждения просмотра. */
export interface AvantiCertificateConfirmationContent {
  /** Надзаголовок прописными («CONFERMA VISIONE»). */
  label: string
  title: string
  description: string
  /** Подпись у чекбокса внутри бирюзовой плашки. */
  checkboxLabel: string
  actionLabel: string
}

/**
 * Полный набор данных блока сертификата для одного уровня кабинета.
 * Просмотрщик и карточка подтверждения — модальные окна: их содержимое
 * есть всегда (кнопка карточки должна открывать просмотрщик), а признаки
 * `viewerOpen` и `confirmationOpen` говорят, открыто ли окно сразу,
 * как в соответствующем кадре.
 */
export interface AvantiCertificateContent {
  card: AvantiCertificateCardContent
  viewer: AvantiCertificateViewerContent
  confirmation: AvantiCertificateConfirmationContent
  /** Просмотрщик открыт при загрузке уровня (кадры 256:11916, 232:16399). */
  viewerOpen?: boolean
  /** Карточка подтверждения открыта поверх просмотрщика (кадры 256:12255, 232:16446). */
  confirmationOpen?: boolean
}
