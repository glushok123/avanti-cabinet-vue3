/**
 * Тексты страниц профиля и настроек аккаунта.
 *
 * ВАЖНО: это данные только первого этапа (вёрстка). На втором этапе файл
 * заменяется ответом API — компоненты получают те же структуры через props,
 * поэтому менять разметку не потребуется.
 *
 * Кадры Figma: десктоп 1:2583 / 1:2773 / 1:2997 / 1:3226,
 * мобильные 19:1228, 17:2626, 22:2953, 22:3181.
 */
import { AVANTI_HEADER_NAV_ITEMS, AVANTI_SUPPORT_NAV_ITEM } from '@/constants/avanti_dashboard_mock'
import type { AvantiBreadcrumb, AvantiNavItem } from '@/types/avanti_dashboard'
import type {
  AvantiProfileDataCardContent,
  AvantiProfileFormContent,
  AvantiProfileSecurityContent,
} from '@/types/avanti_profile'

/** Идентификатор активного пункта меню на всех четырёх экранах профиля. */
const ACTIVE_NAV_ID = 'profile'

/** Пункты меню с подсветкой «Profilo» — общий список кабинета не меняется. */
export const AVANTI_PROFILE_NAV_ITEMS: AvantiNavItem[] = AVANTI_HEADER_NAV_ITEMS.map((item) => ({
  ...item,
  active: item.id === ACTIVE_NAV_ID,
}))

/** Пункты мобильной нижней навигации с той же подсветкой. */
export const AVANTI_PROFILE_BOTTOM_NAV_ITEMS: AvantiNavItem[] = [
  ...AVANTI_PROFILE_NAV_ITEMS,
  { ...AVANTI_SUPPORT_NAV_ITEM, notifications: undefined },
]

/*
 * РАСХОЖДЕНИЕ МАКЕТА: в кадре 1:2583 хлебные крошки остались от главной
 * страницы («Piattaforma / Home»), хотя подсвечен пункт «Profilo».
 * Это следы копирования кадра, поэтому текущим шагом указан «Profilo» —
 * иначе крошки противоречили бы навигации на том же экране.
 */
export const AVANTI_PROFILE_BREADCRUMBS: AvantiBreadcrumb[] = [
  { id: 'platform', label: 'Piattaforma', current: false },
  { id: 'profile', label: 'Profilo', current: true },
]

/*
 * РАСХОЖДЕНИЕ МАКЕТА: в поле «Cognome» стоит название банка, в «Nome» —
 * имя целиком, а подпись «Tipo di documento» повторена дважды (вторая строка
 * по смыслу — номер документа). Значения оставлены как в макете, чтобы
 * вёрстка совпадала с ним пиксель в пиксель; на этапе интеграции сюда
 * придут данные пользователя из API.
 */
export const AVANTI_PROFILE_DATA_CARD: AvantiProfileDataCardContent = {
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
    copyLabel: "Copia l'IBAN",
  },
}

export const AVANTI_PROFILE_SECURITY: AvantiProfileSecurityContent = {
  title: 'Sicurezza',
  rows: [
    {
      id: 'password',
      description: 'Cambia la password del tuo account.',
      actionLabel: 'Cambia password',
    },
    {
      id: 'email',
      description: "Cambia l'indirizzo email del tuo account.",
      actionLabel: 'Cambia email',
    },
  ],
  verification: {
    title: 'Verifica email',
    statusLabel: 'Non verificata',
    description: 'Verifica il tuo indirizzo email per proteggere il tuo account.',
    actionLabel: 'Invia codice',
    hintLabel: 'Informazioni sulla verifica email',
  },
}

export const AVANTI_PROFILE_NAME_FORM: AvantiProfileFormContent = {
  dialog: {
    title: 'Modifica nome e cognome',
    descriptionLines: ['Questi dati compaiono nella scheda cliente', 'e nel contratto'],
    closeLabel: 'Chiudi',
    cancelLabel: 'Annulla',
    submitLabel: 'Salva',
  },
  /* Значения полей — заглушки из макета (кадр 1:2773). */
  fields: [
    { id: 'surname', label: 'Cognome', value: 'RFDC', autocomplete: 'family-name' },
    { id: 'name', label: 'Nome', value: 'ERDF', autocomplete: 'given-name' },
  ],
}

/*
 * РАСХОЖДЕНИЕ МАКЕТА: справа в поле стоит кнопка-глаз, скопированная из окна
 * смены пароля. Для поля почты она не имеет смысла (скрывать нечего),
 * поэтому доступное имя кнопки здесь не задано и кнопка не выводится.
 */
export const AVANTI_PROFILE_EMAIL_FORM: AvantiProfileFormContent = {
  dialog: {
    title: 'Cambia indirizzo email',
    descriptionLines: [
      'Ti invieremo un codice di conferma al nuovo indirizzo.',
      'L’email può essere cambiata una sola volta.',
    ],
    closeLabel: 'Chiudi',
    cancelLabel: 'Annulla',
    submitLabel: 'Salva',
  },
  fields: [
    {
      id: 'email',
      label: 'Email',
      value: 'ikoei@09gmail.com',
      type: 'email',
      autocomplete: 'email',
      note: 'Useremo questa email per le comunicazioni sul credito.',
    },
  ],
}

/*
 * РАСХОЖДЕНИЕ МАКЕТА: в мобильном кадре 22:3181 надпись второго поля
 * повторяет «Password attuale». Взят вариант десктопного кадра 1:3226,
 * где второе поле подписано «Nuova password».
 */
const PASSWORD_TOGGLE_LABEL = 'Mostra o nascondi la password'

export const AVANTI_PROFILE_PASSWORD_FORM: AvantiProfileFormContent = {
  dialog: {
    title: 'Cambia password',
    descriptionLines: ['Scegli una password sicura', 'di almeno 8 caratteri'],
    closeLabel: 'Chiudi',
    cancelLabel: 'Annulla',
    submitLabel: 'Salva',
  },
  /* В макете поля пустые: пароль не подставляется. */
  fields: [
    {
      id: 'current',
      label: 'Password attuale',
      value: '',
      type: 'password',
      autocomplete: 'current-password',
      toggleLabel: PASSWORD_TOGGLE_LABEL,
    },
    {
      id: 'next',
      label: 'Nuova password',
      value: '',
      type: 'password',
      autocomplete: 'new-password',
      note: 'Minimo 8 caratteri.',
      toggleLabel: PASSWORD_TOGGLE_LABEL,
    },
    {
      id: 'confirm',
      label: 'Conferma nuova password',
      value: '',
      type: 'password',
      autocomplete: 'new-password',
      toggleLabel: PASSWORD_TOGGLE_LABEL,
    },
  ],
}

/**
 * Служебные подписи страниц профиля: доступные имена элементов
 * без видимого текста в макете.
 */
export const AVANTI_PROFILE_TEXTS = {
  /** Заголовок страницы: в макете не показан, нужен для скринридеров. */
  pageTitle: 'Profilo',
  /** Доступное имя формы в модальном окне. */
  formLabel: 'Modulo impostazioni account',
} as const
