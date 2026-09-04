/**
 * Тексты блока страхового сертификата CPI.
 *
 * Все строки сняты из Figma через MCP по кадрам, указанным у каждой
 * константы. Единственная строка, которой в макете нет, — `zoomOutLabel`:
 * в кадрах кнопка масштаба показана только в исходном состоянии, а обратная
 * подпись нужна вёрстке, чтобы кнопка работала как переключатель.
 */
import certificateDocument from '@/assets/images/avanti_certificate_document.jpg'
import type {
  AvantiCertificateCardContent,
  AvantiCertificateConfirmationContent,
  AvantiCertificateContent,
  AvantiCertificateViewerContent,
} from '@/types/avanti_certificate'

/** Карточка сертификата, состояние «выпущен» (кадр 256:11723). */
export const AVANTI_CERTIFICATE_CARD: AvantiCertificateCardContent = {
  overline: 'Certificato CPI Emesso',
  title: 'Fondi disponibili per il prelievo',
  description:
    'La polizza assicurativa è stata emessa. I fondi sono sbloccati e disponibili per il prelievo immediato.',
  metadata: 'Cod. Pratica: CPI-8492-X',
  actionLabel: 'Mostra il certificato',
  state: 'issued',
}

/**
 * Та же карточка, состояние «выпуск идёт».
 * Кадра кабинета с этим состоянием нет: тексты взяты у библиотечного
 * компонента `certificato-cpi-progress` (Figma 220:2829, 358×565), который
 * ни в один кадр не поставлен. Подпись кнопки в нём тоже отсутствует —
 * оставлена та же, что и в состоянии «выпущен», кнопка выключена.
 */
export const AVANTI_CERTIFICATE_CARD_PENDING: AvantiCertificateCardContent = {
  overline: 'Certificato CPI',
  title: 'Ottenimento del certificato CPI',
  description: 'Il certificato CPI verrà emesso automaticamente. Ti avviseremo quando sarà pronto.',
  metadata: 'Cod. Pratica: CPI-8492-X',
  actionLabel: 'Mostra il certificato',
  state: 'pending',
}

/** Просмотрщик документа (кадры 256:12221 — десктоп, 232:16413 — мобильная). */
export const AVANTI_CERTIFICATE_VIEWER: AvantiCertificateViewerContent = {
  category: 'Certificato CPI',
  statusLabel: 'Documento disponibile',
  title: 'Certificato generato',
  subtitle: 'Intestatario · kya ky',
  pageLabel: 'Pagina 1 di 1',
  zoomInLabel: 'Ingrandisci',
  zoomOutLabel: 'Riduci',
  protectionLabel: 'Documento protetto',
  closeLabel: 'Chiudi',
  documentSrc: certificateDocument,
  documentAlt: 'Certificato CPI — requisiti assicurativi per l’approvazione del credito',
}

/** Карточка подтверждения просмотра (кадры 256:12458, 232:16494). */
export const AVANTI_CERTIFICATE_CONFIRMATION: AvantiCertificateConfirmationContent = {
  label: 'Conferma Visione',
  title: 'Conferma di aver visto il certificato',
  description: 'Hai consultato il certificato CPI. Spunta la casella per confermare e sbloccare il prelievo.',
  checkboxLabel: 'Conferma di aver visto e consultato il certificato CPI',
  actionLabel: 'Conferma',
}

/** Блок сертификата целиком: карточка плюс оба модальных окна. */
export const AVANTI_CERTIFICATE: AvantiCertificateContent = {
  card: AVANTI_CERTIFICATE_CARD,
  viewer: AVANTI_CERTIFICATE_VIEWER,
  confirmation: AVANTI_CERTIFICATE_CONFIRMATION,
}
