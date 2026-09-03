/**
 * Тексты и моковые данные экрана загрузки документов
 * (кадры Figma 1:935, 22:3657, 95:5965 «неудача», 95:6532 «удача»).
 *
 * ВАЖНО: это данные только первого этапа (вёрстка). На втором этапе файл
 * заменяется ответом API — компоненты получают те же структуры через props,
 * поэтому менять разметку не потребуется.
 */
import type {
  AvantiDocumentFile,
  AvantiDocumentOption,
  AvantiDocumentSummary,
  AvantiDocumentsActions,
  AvantiDocumentsDropzone,
  AvantiDocumentsResult,
} from '@/types/avanti_documents'

/** Общие подписи панели. */
export const AVANTI_DOCUMENTS_TEXTS = {
  /** Заголовок модального окна и его же доступное имя. */
  panelTitle: 'Documenti richiesti',
  /** Заголовок секции над панелью на мобильном экране. */
  pageTitle: 'I tuoi documenti',
  /** Надпись над списком вариантов. */
  optionsLabel: 'Scegli il tipo di documento',
  /** Сноска под кнопкой загрузки. */
  note: 'Formati accettati: JPG, PNG, WEBP · massimo 20 MB per file · I file restano nel tuo browser: partono insieme alla richiesta.',
  /** Доступное имя списка загруженных файлов. */
  filesLabel: 'File caricati',
} as const

/** Строка типа документа: состояние «ещё не загружен». */
export const AVANTI_DOCUMENTS_SUMMARY: AvantiDocumentSummary = {
  label: 'Tipo di documento',
  name: 'Documento d’identità',
  statusLabel: 'Da caricare',
  status: 'pending',
}

/** Та же строка после успешной проверки: подпись над названием в макете убрана. */
export const AVANTI_DOCUMENTS_SUMMARY_VERIFIED: AvantiDocumentSummary = {
  name: 'Documento d’identità',
  statusLabel: 'Verificato',
  status: 'verified',
}

/** Список требуемых документов — варианты из макета. */
export const AVANTI_DOCUMENTS_OPTIONS: AvantiDocumentOption[] = [
  { id: 'passport', title: 'Passaporto', hint: 'Una foto' },
  { id: 'id-card', title: 'Carta d’identità', hint: 'Una foto' },
  { id: 'driver-license', title: 'Patente di guida', hint: 'Una foto' },
]

/** Выбранный вариант в кадре «Документы неудача». */
export const AVANTI_DOCUMENTS_SELECTED_OPTION = 'passport'

/*
 * РАСХОЖДЕНИЕ МАКЕТА: в строке загруженного файла обе подписи одинаковые
 * («Foto del documento»), размер файла в Figma не показан. По заданию строка
 * выводит имя, размер и статус, поэтому размер добавлен в моковые данные.
 */
export const AVANTI_DOCUMENTS_FILES: AvantiDocumentFile[] = [
  {
    id: 'front',
    name: 'Foto del documento',
    size: '1,8 MB',
    status: 'uploaded',
    statusLabel: 'Caricato',
    actionLabel: 'Sostituisci',
  },
]

/** Тексты зоны перетаскивания. Самой зоны в Figma нет — см. отчёт. */
export const AVANTI_DOCUMENTS_DROPZONE: AvantiDocumentsDropzone = {
  title: 'Trascina qui la foto del documento',
  hint: 'JPG, PNG o WEBP · massimo 20 MB',
  linkLabel: 'Scegli un file',
  dragLabel: 'Rilascia il file per caricarlo',
  accept: 'image/jpeg,image/png,image/webp',
}

/** Кнопки действий под списком. */
export const AVANTI_DOCUMENTS_ACTIONS: AvantiDocumentsActions = {
  submitLabel: 'Carica il documento',
}

/** Плашка успешной проверки (кадр 95:6532). */
export const AVANTI_DOCUMENTS_SUCCESS: AvantiDocumentsResult = {
  tone: 'success',
  title: 'Documento verificato',
  description: 'Le foto sono leggibili e i dati corrispondono alla tua pratica.',
  hint: 'Puoi proseguire con la firma del contratto.',
  bannerText: 'Documenti verificati e accettati. Non è più possibile caricarli di nuovo.',
}

/** Текст ошибки загрузки (кадр 95:5965). */
export const AVANTI_DOCUMENTS_ERROR = 'Caricamento non riuscito. Controlla la connessione e riprova.'
