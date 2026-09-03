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
  AvantiDocumentsState,
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

/**
 * Список требуемых документов — варианты из макета.
 * Иконки взяты из кадра 1:935: у паспорта книжка, у двух других — карточка
 * (в макете она одна и та же, разными иконками отличается только паспорт).
 */
export const AVANTI_DOCUMENTS_OPTIONS: AvantiDocumentOption[] = [
  { id: 'passport', title: 'Passaporto', hint: 'Una foto', icon: 'passport' },
  { id: 'id-card', title: 'Carta d’identità', hint: 'Una foto', icon: 'card' },
  { id: 'driver-license', title: 'Patente di guida', hint: 'Una foto', icon: 'card' },
]

/** Выбранный вариант в кадре «Документы неудача». В кадре 1:935 выбора нет. */
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

/*
 * НЕТ В МАКЕТЕ: зоны перетаскивания файла нет ни в одном кадре Figma,
 * тексты ниже придуманы. Блок сделан по ошибочному заданию и по умолчанию
 * выключен (проп `showDropzone` у панели), поэтому в поставке не показывается.
 * Требует согласования с заказчиком.
 */
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
/**
 * Кадр макета, собранный из данных выше. Витрина `/documents` выбирает кадр
 * по query-параметру `state` — так свёрстанные мобильные экраны открываются
 * ссылкой, без правки кода (тот же приём, что у `/home?state=`).
 */
export interface AvantiDocumentsFrame {
  /** Состояние панели. */
  state: AvantiDocumentsState
  /** Строка типа документа над разделителем. */
  summary: AvantiDocumentSummary
  /** Отмеченный тип документа. Пустая строка — выбора нет. */
  selectedOptionId: string
  /** Загруженные файлы под списком вариантов. */
  files: AvantiDocumentFile[]
  /** Текст узкой плашки ошибки. Пустая строка — плашки нет. */
  errorText: string
  /** Кнопки действий. Не заданы — блока кнопок нет. */
  actions?: AvantiDocumentsActions
  /** Плашка результата: показывается в состоянии `verified`. */
  result?: AvantiDocumentsResult
}

/** Кадры витрины по значению query-параметра `state`. */
export const AVANTI_DOCUMENTS_FRAMES: Record<string, AvantiDocumentsFrame> = {
  /* Кадр 1:935 «Документы всплывашка»: окно только что открыто, выбора нет. */
  base: {
    state: 'upload',
    summary: AVANTI_DOCUMENTS_SUMMARY,
    selectedOptionId: '',
    files: [],
    errorText: '',
  },
  /* Кадр 22:3657: тип выбран, файл загружен, доступна кнопка отправки. */
  upload: {
    state: 'upload',
    summary: AVANTI_DOCUMENTS_SUMMARY,
    selectedOptionId: AVANTI_DOCUMENTS_SELECTED_OPTION,
    files: AVANTI_DOCUMENTS_FILES,
    errorText: '',
    actions: AVANTI_DOCUMENTS_ACTIONS,
  },
  /* Кадр 95:5965 «Документы неудача»: под списком файлов плашка ошибки. */
  error: {
    state: 'error',
    summary: AVANTI_DOCUMENTS_SUMMARY,
    selectedOptionId: AVANTI_DOCUMENTS_SELECTED_OPTION,
    files: AVANTI_DOCUMENTS_FILES,
    errorText: AVANTI_DOCUMENTS_ERROR,
    actions: AVANTI_DOCUMENTS_ACTIONS,
  },
  /* Кадр 95:6532 «Документы удача»: вместо списка и кнопок — плашка успеха. */
  verified: {
    state: 'verified',
    summary: AVANTI_DOCUMENTS_SUMMARY_VERIFIED,
    selectedOptionId: AVANTI_DOCUMENTS_SELECTED_OPTION,
    files: [],
    errorText: '',
    result: AVANTI_DOCUMENTS_SUCCESS,
  },
}
