/**
 * Тексты экранов авторизации (итальянский).
 * Сняты из макетов «Создать аккаунт» (0:1235 / 7:1017),
 * «Войти в аккаунт» (0:1338 / 8:1017) и «Verifica email» (1:3463).
 * Компоненты и страницы не содержат ни одного литерала — всё берётся отсюда.
 */
import type { AvantiNavItem } from '@/types/avanti_dashboard'
import type {
  AvantiAuthMode,
  AvantiAuthScreenTexts,
  AvantiAuthTab,
  AvantiEmailVerificationContent,
} from '@/types/avanti_auth'
import type { AvantiProfileDataCardContent, AvantiProfileSecurityRow } from '@/types/avanti_profile'

/* ------------------------------------------------------------------ */
/* Общее для модальных окон регистрации и входа                        */
/* ------------------------------------------------------------------ */

/** Вкладки переключателя над формой: порядок задаёт сама форма. */
export const AVANTI_AUTH_TABS: Record<'signUp' | 'signIn', AvantiAuthTab> = {
  signUp: { id: 'sign-up', label: 'Crea account' },
  signIn: { id: 'sign-in', label: 'Accedi' },
}

/** Подписи, общие для обоих модальных окон. */
export const AVANTI_AUTH_SHARED_TEXTS = {
  menu: 'Menu',
  closeLabel: 'Chiudi',
  subtitle: 'Spazio personale sicuro · SSL',
  emailLabel: 'Indirizzo email',
  passwordLabel: 'Password',
  passwordConfirmLabel: 'Conferma password',
  note: 'I tuoi dati sono protetti con crittografia',
  showPassword: 'Mostra la password',
  hidePassword: 'Nascondi la password',
} as const

/**
 * Тексты обоих экранов авторизации. Разметка у них общая
 * (`avanti_auth_layout` и `avanti_auth_form`), различает их только режим.
 *
 * РАСХОЖДЕНИЕ МАКЕТА: в кадрах входа (0:1338 и 8:1017) заголовок модального
 * окна и подпись кнопки дословно повторяют экран регистрации
 * («Crea il tuo account…», «Crea account e accedi ›»). Тексты оставлены как
 * в макете; вопрос о правильных подписях для входа уходит заказчику.
 */
export const AVANTI_AUTH_SCREEN_TEXTS: Record<AvantiAuthMode, AvantiAuthScreenTexts> = {
  'sign-up': {
    pageTitle: 'Crea account',
    dialogLabel: 'Crea account',
    title: 'Crea il tuo account per gestire la tua pratica di credito.',
    submit: 'Crea account e accedi ›',
  },
  'sign-in': {
    pageTitle: 'Accedi',
    dialogLabel: 'Accedi',
    title: 'Crea il tuo account per gestire la tua pratica di credito.',
    submit: 'Crea account e accedi ›',
  },
}

/* ------------------------------------------------------------------ */
/* Экран «Verifica email»                                              */
/* ------------------------------------------------------------------ */

/** Заголовок страницы и доступные имена её служебных элементов. */
export const AVANTI_VERIFY_EMAIL_TEXTS = {
  pageTitle: 'Verifica email',
} as const

/**
 * Пункты десктопной шапки: на этом экране подсвечен раздел «Profilo»,
 * тогда как на главной активна «Home».
 */
export const AVANTI_VERIFY_NAV_ITEMS: AvantiNavItem[] = [
  { id: 'home', label: 'Home', icon: 'home', active: false },
  { id: 'documents', label: 'Documenti', icon: 'documents', active: false },
  { id: 'profile', label: 'Profilo', icon: 'profile', active: true },
]

/**
 * Карточка «Dati personali» левой колонки.
 *
 * РАСХОЖДЕНИЕ МАКЕТА: у строк 1:3528 и 1:3531 одинаковая подпись
 * «Tipo di documento», хотя по имени слоя вторая строка — номер документа.
 * Текст оставлен как в макете, вопрос уходит заказчику.
 */
export const AVANTI_VERIFY_PROFILE_DATA: AvantiProfileDataCardContent = {
  title: 'Dati personali',
  editLabel: 'Modifica nome',
  rows: [
    { id: 'surname', label: 'Cognome', value: 'Intesa Sanpaolo S.p.A.' },
    { id: 'name', label: 'Nome', value: 'Marco Rossi' },
    { id: 'email', label: 'Email', value: 'ikoei@09gmail.com' },
    { id: 'amount', label: 'Importo approvato', value: '12 000 €' },
    { id: 'document-type', label: 'Tipo di documento', value: 'Passaporto' },
    { id: 'document-number', label: 'Tipo di documento', value: 'AB1234567' },
  ],
  iban: {
    label: 'IBAN',
    value: '-',
    copyLabel: 'Copia IBAN',
  },
}

/** Заголовок карточки «Sicurezza». */
export const AVANTI_VERIFY_SECURITY_TITLE = 'Sicurezza'

/** Строки карточки «Sicurezza» над блоком подтверждения почты. */
export const AVANTI_VERIFY_SECURITY_ROWS: AvantiProfileSecurityRow[] = [
  {
    id: 'password',
    description: 'Cambia la password del tuo account.',
    actionLabel: 'Cambia password',
  },
  {
    id: 'email',
    description: 'Cambia l’indirizzo email del tuo account.',
    actionLabel: 'Cambia email',
  },
]

/** Блок подтверждения почты внутри карточки «Sicurezza». */
export const AVANTI_EMAIL_VERIFICATION: AvantiEmailVerificationContent = {
  helpBadge: '?',
  helpLabel: 'Informazioni sulla verifica email',
  title: 'Verifica email',
  statusLabel: 'Non verificata',
  description: 'Verifica il tuo indirizzo email per proteggere il tuo account.',
  prompt: 'Inserisci il codice a 6 cifre inviato alla tua email:',
  codeLabel: 'Codice di verifica a 6 cifre',
  codeLength: 6,
  confirmLabel: 'conferma',
  resendQuestion: 'Non hai ricevuto il codice?',
  resendLabel: 'Invia di nuovo',
}
