/**
 * Тексты и моковые данные экранов IBAN.
 * Строки взяты из макета без изменений (итальянская локаль), чтобы в
 * компонентах не было зашитого текста.
 */
import type {
  AvantiIbanAmountContent,
  AvantiIbanPanelContent,
  AvantiIbanTransferContent,
} from '@/types/avanti_iban'

/**
 * Длина итальянского IBAN — 27 символов.
 * Это же число подставляется в правило ввода и в счётчик оставшихся символов.
 */
export const AVANTI_IBAN_LENGTH = 27

/** Размер группы при форматировании: в макете номер разбит по четыре символа. */
export const AVANTI_IBAN_GROUP_SIZE = 4

/** Плейсхолдер поля — «пустая» маска итальянского номера из макета. */
export const AVANTI_IBAN_PLACEHOLDER = 'IT00 X000 0000 0000 0000 0000 000'

/**
 * Модальная панель «IBAN per l'accredito».
 * Расхождение макета: на десктопе кнопка сохранения подписана «Salva»,
 * на мобильной — «Salva iban». Оставлена мобильная, более понятная подпись.
 */
export const AVANTI_IBAN_PANEL_CONTENT: AvantiIbanPanelContent = {
  title: 'IBAN per l’accredito',
  description:
    'Su questo conto la banca partner versa l’importo del credito. Compare nel contratto al posto della riga vuota.',
  tabsLabel: 'Fasi di inserimento dell’IBAN',
  tabs: [
    { id: 'account', caption: '1', label: 'Conto' },
    { id: 'verify', caption: '2', label: 'Verifica' },
  ],
  fieldLabel: 'IBAN',
  placeholder: AVANTI_IBAN_PLACEHOLDER,
  lengthRule: `Lettere e cifre. Il campo si ferma alla lunghezza del paese: ${AVANTI_IBAN_LENGTH} per l’Italia.`,
  missingCharsTemplate: 'Caratteri mancanti: {count}',
  maskNote: 'Del numero conserviamo solo l’inizio e la fine: il resto resta nascosto.',
  submitLabel: 'Continua',
  verifyTitle: 'Controlla il numero',
  verifyWarning: 'Un numero errato manda i fondi su un altro conto: la banca non può annullare il bonifico.',
  editLabel: 'Modifica',
  saveLabel: 'Salva iban',
}

/** Форма вывода средств внутри карточки суммы (страница «Ввод айбана»). */
export const AVANTI_IBAN_TRANSFER_CONTENT: AvantiIbanTransferContent = {
  titleLines: ['Crea il tuo account per gestire', 'la tua pratica di credito.'],
  description: 'Inserisci le coordinate per ricevere il credito',
  tabsLabel: 'Metodo di accredito',
  tabs: [
    { id: 'iban', caption: 'IBAN', label: 'Bonifico bancario' },
    { id: 'card', caption: 'Carta', label: 'Trasferimento su carta' },
  ],
  ibanLabel: 'IBAN',
  ibanPlaceholder: AVANTI_IBAN_PLACEHOLDER,
  ownerLabel: 'Intestatario',
  ownerPlaceholder: 'Marco Rossi',
  submitLabel: 'Vai alla commissione',
  closeLabel: 'Chiudi',
}

/** Градиентная карточка одобренной суммы на странице IBAN. */
export const AVANTI_IBAN_AMOUNT_CONTENT: AvantiIbanAmountContent = {
  caption: 'Importo da ricevere',
  amount: '€ 12 000',
  details: '100% del totale disponibile',
  actionLabel: 'Preleva i fondi',
}

/**
 * Моковые реквизиты: номер уже прошёл форматирование по группам,
 * поэтому его можно передавать в панель как есть.
 */
export const AVANTI_IBAN_MOCK = {
  /** Номер счёта получателя. */
  iban: 'IT60 X054 2811 1010 0000 0123 456',
  /** Владелец счёта — совпадает с профилем пользователя в кабинете. */
  owner: 'Marco Rossi',
} as const

/** Заголовок страницы «Ввод айбана после шагов» для скринридеров и вкладки. */
export const AVANTI_IBAN_PAGE_TITLE = 'IBAN per l’accredito'
