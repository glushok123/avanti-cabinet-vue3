/**
 * Текст договора и данные страницы «Договор» (кадр Figma 22:4780).
 *
 * ВАЖНО: это данные только первого этапа (вёрстка). На втором этапе файл
 * заменяется ответом API — компоненты получают те же структуры через props,
 * поэтому менять разметку не потребуется.
 */
import { AVANTI_CHECKLIST, AVANTI_STEPPER } from '@/constants/avanti_dashboard_mock'
import type {
  AvantiChecklistContent,
  AvantiStepStatus,
  AvantiStepperContent,
  AvantiStepperStep,
} from '@/types/avanti_dashboard'
import type {
  AvantiContractDocumentHeading,
  AvantiContractField,
  AvantiContractMeta,
  AvantiContractParties,
  AvantiContractPurpose,
  AvantiContractSchedule,
  AvantiContractScheduleRow,
  AvantiContractSection,
  AvantiContractSignature,
  AvantiContractSigningCard,
  AvantiContractStatusBanner,
  AvantiContractTerms,
  AvantiContractVerifiedBanner,
} from '@/types/avanti_contract'

export const AVANTI_CONTRACT_HEADING: AvantiContractDocumentHeading = {
  title: 'CONTRATTO DI CREDITO AL CONSUMO',
  subtitle: 'ai sensi del D.Lgs. 141/2010 – Credito ai Consumatori',
}

export const AVANTI_CONTRACT_META: AvantiContractMeta = {
  placeLabel: 'Milano, il',
  placeValue: '24/08/2026',
  numberLabel: 'N. Contratto:',
  numberValue: 'VLR-2026-00847',
}

export const AVANTI_CONTRACT_PARTIES: AvantiContractParties = {
  title: 'Tra i sottoscritti',
  text: 'Intesa Sanpaolo S.p.A., con sede in Milano (Italia), di seguito «il Prestatore», e la persona fisica di seguito indicata, di seguito «il Prenditore», convengono e si stipula quanto segue.',
}

/*
 * РАСХОЖДЕНИЕ МАКЕТА: имя заявителя в шапке договора («ERDF RFDC») не совпадает
 * с именем в карточке личных данных («Marco Rossi»). Значения оставлены как в
 * Figma, чтобы вёрстка совпадала с макетом; на интеграции сюда придут данные API.
 */
export const AVANTI_CONTRACT_FIELDS: AvantiContractField[] = [
  { id: 'name', label: 'Nome e cognome del Prenditore', value: 'ERDF RFDC' },
  { id: 'email', label: 'Indirizzo email', value: 'ikoei@09gmail.com' },
  { id: 'document-type', label: 'Tipo di documento d’identità', value: 'Passaporto' },
  { id: 'document-number', label: 'Numero del documento', value: 'AB1234567' },
  { id: 'iban', label: 'IBAN per accredito', value: 'IT00 •••• •••• •••• ••0 000' },
]

export const AVANTI_CONTRACT_TERMS: AvantiContractTerms = {
  title: 'Condizioni Finanziarie',
  items: [
    { id: 'amount', label: 'Importo Erogato', value: '12 000,00 €' },
    { id: 'payment', label: 'Rata Mensile', value: '147,65 €', highlighted: true },
    { id: 'duration', label: 'Durata', value: '22 mesi' },
  ],
  note: 'TAN: 3,8% — Tasso Annuo Nominale fisso per tutta la durata',
}

export const AVANTI_CONTRACT_PURPOSE: AvantiContractPurpose = {
  label: 'Finalità del credito:',
  value: 'Prestito personale',
}

/** Компактная строка плана: № | дата | рата | капитал | проценты | остаток. */
type AvantiScheduleTuple = readonly [string, string, string, string, string, string]

const AVANTI_SCHEDULE_TUPLES: readonly AvantiScheduleTuple[] = [
  ['1', '24/09/2026', '213,48 €', '175,48 €', '38,00 €', '11824,52 €'],
  ['2', '24/10/2026', '213,48 €', '176,03 €', '37,44 €', '11648,49 €'],
  ['3', '24/11/2026', '213,48 €', '176,59 €', '36,89 €', '11471,91 €'],
  ['4', '24/12/2026', '213,48 €', '177,15 €', '36,33 €', '11294,76 €'],
  ['5', '24/01/2027', '213,48 €', '177,71 €', '35,77 €', '11117,05 €'],
  ['6', '24/02/2027', '213,48 €', '178,27 €', '35,20 €', '10938,78 €'],
  ['7', '24/03/2027', '213,48 €', '178,84 €', '34,64 €', '10759,94 €'],
  ['8', '24/04/2027', '213,48 €', '179,40 €', '34,07 €', '10580,54 €'],
  ['9', '24/05/2027', '213,48 €', '179,97 €', '33,51 €', '10400,57 €'],
  ['10', '24/06/2027', '213,48 €', '180,54 €', '32,94 €', '10220,03 €'],
  ['11', '24/07/2027', '213,48 €', '181,11 €', '32,36 €', '10038,92 €'],
  ['12', '24/08/2027', '213,48 €', '181,69 €', '31,79 €', '9857,24 €'],
  ['13', '24/09/2027', '213,48 €', '182,26 €', '31,21 €', '9674,98 €'],
  ['14', '24/10/2027', '213,48 €', '182,84 €', '30,64 €', '9492,14 €'],
  ['15', '24/11/2027', '213,48 €', '183,42 €', '30,06 €', '9308,72 €'],
  ['16', '24/12/2027', '213,48 €', '184,00 €', '29,48 €', '9124,72 €'],
  ['17', '24/01/2028', '213,48 €', '184,58 €', '28,89 €', '8940,14 €'],
  ['18', '24/02/2028', '213,48 €', '185,16 €', '28,31 €', '8754,98 €'],
  ['19', '24/03/2028', '213,48 €', '185,75 €', '27,72 €', '8569,23 €'],
  ['20', '24/04/2028', '213,48 €', '186,34 €', '27,14 €', '8382,89 €'],
  ['21', '24/05/2028', '213,48 €', '186,93 €', '26,55 €', '8195,96 €'],
  ['22', '24/06/2028', '213,48 €', '187,52 €', '25,95 €', '8008,44 €'],
]

/** Разворачивает компактный кортеж в именованную строку таблицы. */
function toScheduleRow(cells: AvantiScheduleTuple): AvantiContractScheduleRow {
  const [number, date, total, principal, interest, balance] = cells
  return { id: number, number, date, total, principal, interest, balance }
}

export const AVANTI_CONTRACT_SCHEDULE: AvantiContractSchedule = {
  title: 'Piano di Ammortamento',
  caption: 'Piano di ammortamento: 22 rate mensili',
  columns: [
    { id: 'number', label: 'N.', numeric: false },
    { id: 'date', label: 'Data', numeric: false },
    { id: 'total', label: 'Rata Totale', numeric: true },
    { id: 'principal', label: 'Quota Capitale', numeric: true },
    { id: 'interest', label: 'Quota Interessi', numeric: true },
    { id: 'balance', label: 'Saldo Residuo', numeric: true },
  ],
  rows: AVANTI_SCHEDULE_TUPLES.map(toScheduleRow),
}

export const AVANTI_CONTRACT_SECTIONS: AvantiContractSection[] = [
  {
    id: 'subject',
    title: '1. OGGETTO DEL CONTRATTO',
    groups: [
      {
        id: 'subject-main',
        paragraphs: [
          '1.1. Il presente contratto è stipulato con l’obiettivo di fornire sostegno sociale ai cittadini e di concedere un credito sulla base delle leggi e dei regolamenti vigenti del Governo italiano che disciplinano il credito agevolato.',
        ],
      },
    ],
  },
  {
    id: 'rights',
    title: '2. DIRITTI E OBBLIGHI DELLE PARTI',
    groups: [
      {
        id: 'borrower',
        subtitle: 'Obblighi del Mutuatario:',
        paragraphs: [
          '2.1. Garantire l’utilizzo dei fondi del credito per lo scopo previsto, in conformità ai termini del presente contratto.',
          '2.2. Pagare puntualmente e integralmente il capitale e gli interessi, secondo il piano di rimborso.',
          '2.3. Fornire alla Banca informazioni veritiere sulla propria situazione finanziaria e sulle fonti di reddito.',
          '2.4. Accettare le sanzioni e le multe applicate dalla Banca in caso di ritardo nel pagamento del debito.',
          '2.5. Presentare mensilmente le ricevute di pagamento e i rendiconti finanziari.',
          '2.6. Il Prenditore si impegna a rimborsare il capitale erogato unitamente agli interessi calcolati al TAN fisso del 3,8% annuo, mediante rate mensili costanti nella misura sopra indicata.',
        ],
      },
      {
        id: 'bank',
        subtitle: 'Obblighi della Banca:',
        paragraphs: [
          '2.7. Concedere il credito nella forma stabilita nel contratto.',
          '2.8. Aprire un conto o utilizzare un conto esistente per la registrazione del prestito a nome del Mutuatario.',
          '2.9. Fornire al Mutuatario informazioni relative al credito.',
          '2.10. Notificare al Mutuatario l’ammortamento anticipato del debito.',
          '2.11. Informare circa le modifiche nei documenti normativi che incidono sulle condizioni del credito.',
          '2.12. Il Prestatore si impegna a erogare il capitale approvato entro 24 ore dall’avvenuta firma elettronica del presente contratto e dalla verifica positiva dei documenti.',
        ],
      },
    ],
  },
  {
    id: 'procedure',
    title: '3. PROCEDURA DI CONCESSIONE E AMMORTAMENTO DEL CREDITO',
    groups: [
      {
        id: 'procedure-main',
        paragraphs: [
          '3.1. La data di concessione del credito è considerata la data di accredito dei fondi sul conto bancario del Mutuatario.',
          '3.2. L’ammortamento del capitale e il pagamento degli interessi sono effettuati mensilmente dal Mutuatario, secondo il piano di rimborso allegato al presente contratto.',
          '3.3. Se la data indicata nel piano non è un giorno lavorativo bancario, il pagamento viene rinviato al giorno lavorativo successivo.',
          '3.4. In caso di ritardo nel rimborso del debito, il saldo dovuto viene trasferito sul conto delle posizioni scadute della Banca e maturano interessi al tasso stabilito.',
        ],
      },
    ],
  },
  {
    id: 'clauses',
    title: '4. CLAUSOLE PRINCIPALI',
    groups: [
      {
        id: 'clauses-main',
        paragraphs: [
          '4.4. L’accredito dei fondi del credito viene effettuato in conformità con le regole, gli standard e i regolamenti del sistema di pagamento internazionale SEPA.',
          '4.5. Il presente contratto è garantito dalla polizza assicurativa CPI fornita dal Servizio Centrale Tutela Credito.',
        ],
      },
    ],
  },
]

export const AVANTI_CONTRACT_SIGNATURES: AvantiContractSignature[] = [
  { id: 'lender', label: 'Firma del Prestatore' },
  { id: 'borrower', label: 'Firma del Prenditore' },
]

export const AVANTI_CONTRACT_VERIFIED_BANNER: AvantiContractVerifiedBanner = {
  text: 'Documento d’identità verificato: la sezione è nel tuo profilo.',
  actionLabel: 'Apri il profilo',
}

export const AVANTI_CONTRACT_SIGNING_CARD: AvantiContractSigningCard = {
  eyebrow: 'Firma dei documenti',
  title: 'Contratto di credito',
  pdfLabel: 'Apri PDF',
  badgeLabel: 'IBAN inserito',
  actionLabel: 'Firma il contratto',
}

export const AVANTI_CONTRACT_STATUS_BANNER: AvantiContractStatusBanner = {
  caption: 'Documento caricato',
  title: 'Documento d’identità',
  iconLabel: 'Verificato',
}

/** Шаг шкалы на странице договора: подписание ещё впереди, остальное пройдено. */
function toContractStep(step: AvantiStepperStep): AvantiStepperStep {
  const status: AvantiStepStatus = step.id === 'signature' ? 'pending' : 'completed'
  return { ...step, status }
}

/** Шкала шагов страницы договора: загрузка документов уже завершена. */
export const AVANTI_CONTRACT_STEPPER: AvantiStepperContent = {
  title: 'Passo 5 di 5',
  progressLabel: '4 / 5 completati',
  steps: AVANTI_STEPPER.steps.map(toContractStep),
}

/** Чеклист верификации на странице договора: четыре шага из пяти пройдены. */
export const AVANTI_CONTRACT_CHECKLIST: AvantiChecklistContent = {
  ...AVANTI_CHECKLIST,
  completed: 4,
}

/** Служебные подписи: доступные имена элементов без видимого текста. */
export const AVANTI_CONTRACT_TEXTS = {
  /** Заголовок страницы: в макете не показан, нужен для скринридеров. */
  pageTitle: 'Contratto di credito',
  /** Видимый заголовок секции документов. */
  documentsTitle: 'I tuoi documenti',
  /** Доступное имя самого документа договора. */
  documentLabel: 'Testo del contratto di credito',
} as const
