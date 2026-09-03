/**
 * Тексты и данные экранов онбординга (итальянский).
 * Числа и подписи сняты из Figma-макетов «Банк прогрузка» (0:1077),
 * «Кредит апрув» (0:1177) и его мобильной версии (6:966).
 * Компоненты и страницы не содержат ни одного литерала — всё берётся отсюда.
 */
import bnpParibasLogo from '@/assets/images/banks/avanti_bank_bnp_paribas.png'
import societeGeneraleLogo from '@/assets/images/banks/avanti_bank_societe_generale.png'
import creditAgricoleLogo from '@/assets/images/banks/avanti_bank_credit_agricole.png'
import santanderLogo from '@/assets/images/banks/avanti_bank_santander.png'
import hsbcLogo from '@/assets/images/banks/avanti_bank_hsbc.png'
import revolutLogo from '@/assets/images/banks/avanti_bank_revolut.png'
import ingLogo from '@/assets/images/banks/avanti_bank_ing.png'
import bbvaLogo from '@/assets/images/banks/avanti_bank_bbva.png'
import unicreditLogo from '@/assets/images/banks/avanti_bank_unicredit.png'
import intesaSanpaoloLogo from '@/assets/images/banks/avanti_bank_intesa_sanpaolo.png'
import commerzbankLogo from '@/assets/images/banks/avanti_bank_commerzbank.png'
import barclaysLogo from '@/assets/images/banks/avanti_bank_barclays.png'
import cardMarkDark from '@/assets/images/cards/avanti_card_mark_dark.svg'
import cardContactlessDark from '@/assets/images/cards/avanti_card_contactless_dark.svg'
import cardChipDark from '@/assets/images/cards/avanti_card_chip_dark.svg'
import cardMarkPrimary from '@/assets/images/cards/avanti_card_mark_primary.svg'
import cardContactlessPrimary from '@/assets/images/cards/avanti_card_contactless_primary.svg'
import cardChipPrimary from '@/assets/images/cards/avanti_card_chip_primary.svg'
import cardMarkGlass from '@/assets/images/cards/avanti_card_mark_glass.svg'
import cardContactlessGlass from '@/assets/images/cards/avanti_card_contactless_glass.svg'
import cardChipGlass from '@/assets/images/cards/avanti_card_chip_glass.svg'
import type {
  AvantiApprovalDetail,
  AvantiBankItem,
  AvantiBankStatus,
  AvantiCheckRow,
  AvantiCreditCardArt,
} from '@/types/avanti_onboarding'

/* ------------------------------------------------------------------ */
/* Экран «Банк прогрузка» — ожидание ответа банков                     */
/* ------------------------------------------------------------------ */

/** Тексты экрана ожидания. */
export const AVANTI_BANK_CHECK_TEXTS = {
  menu: 'Menu',
  overline: 'Analisi in corso',
  title: 'Confronto con le banche partner',
  subtitle: 'Scoring invisibile: nessuna traccia nella tua storia creditizia.',
  progressHint: 'Ancora qualche secondo…',
  progressLabel: 'Avanzamento della verifica bancaria',
  banksLabel: 'Banche partner',
  actionBack: 'Indietro',
  actionNext: 'Avvia la verifica',
} as const

/** Этапы отправки заявки в блоке проверки. */
export const AVANTI_BANK_CHECK_ROWS: AvantiCheckRow[] = [
  { id: 'request', label: 'Invio della richiesta', value: 'Verificata', emphasized: true },
  { id: 'scoring', label: 'Scoring invisibile', value: 'In attesa', emphasized: false },
]

/** Подписи состояний на карточках банков. */
export const AVANTI_BANK_STATUS_LABELS: Record<AvantiBankStatus, string> = {
  verified: '✓ Verificata',
  checking: 'Verifica in corso',
  pending: 'In attesa',
}

/** Сколько банков уже ответило и сколько их всего (подпись «6/12» в макете). */
export const AVANTI_BANK_CHECK_DONE = 6
export const AVANTI_BANK_CHECK_TOTAL = 12

/** Значение в круге прогресса, проценты. */
export const AVANTI_BANK_CHECK_SCORE = 50

/**
 * Банки-партнёры в порядке макета: слева направо, сверху вниз.
 * Логотипы выгружены из Figma отдельными файлами — так сохраняется
 * кадрирование, заданное дизайнером внутри рамки 81×62.
 */
export const AVANTI_BANKS: AvantiBankItem[] = [
  { id: 'bnp-paribas', name: 'BNP Paribas', status: 'verified', logo: bnpParibasLogo },
  { id: 'societe-generale', name: 'Societe Generale', status: 'verified', logo: societeGeneraleLogo },
  { id: 'credit-agricole', name: 'Credit Agricole', status: 'verified', logo: creditAgricoleLogo },
  { id: 'santander', name: 'Santander', status: 'verified', logo: santanderLogo },
  { id: 'hsbc', name: 'HSBC', status: 'verified', logo: hsbcLogo },
  { id: 'revolut', name: 'Revolut', status: 'verified', logo: revolutLogo },
  { id: 'ing', name: 'ING', status: 'checking', logo: ingLogo },
  { id: 'bbva', name: 'BBVA', status: 'pending', logo: bbvaLogo },
  { id: 'unicredit', name: 'UniCredit', status: 'pending', logo: unicreditLogo },
  { id: 'intesa-sanpaolo', name: 'Intesa Sanpaolo', status: 'pending', logo: intesaSanpaoloLogo },
  { id: 'commerzbank', name: 'Commerzbank', status: 'pending', logo: commerzbankLogo },
  { id: 'barclays', name: 'Barclays', status: 'pending', logo: barclaysLogo },
]

/* ------------------------------------------------------------------ */
/* Экран «Кредит апрув» — одобрение                                    */
/* ------------------------------------------------------------------ */

/** Тексты экрана одобрения. */
export const AVANTI_CREDIT_APPROVED_TEXTS = {
  menu: 'Menu',
  title: 'Il tuo credito è approvato',
  subtitle: 'Le banche partner hanno confermato la disponibilità dei fondi al tasso sociale del 3,8%.',
  amountLabel: 'Importo approvato',
  amountValue: '12 000€',
  noteBadge: 'i',
  note: 'L’offerta resta riservata per 24 ore, poi il fascicolo torna in coda.',
  cta: 'Finalizza la mia richiesta',
} as const

/**
 * Условия одобренного кредита.
 *
 * РАСХОЖДЕНИЕ МАКЕТА: десктоп разбивает срок на два выделенных фрагмента
 * («62» и «mesi»), мобильная версия выделяет их одним куском («62 mesi»).
 * Реализован мобильный вариант — визуально они неразличимы.
 */
export const AVANTI_APPROVAL_DETAILS: AvantiApprovalDetail[] = [
  { id: 'payment', label: 'Rata mensile:', value: '147,65 €' },
  { id: 'duration', label: 'Durata:', value: '62 mesi' },
  { id: 'rate', label: 'Tasso fisso al', value: '3,8%' },
]

/** Декоративная стопка карт: снизу вверх, как в порядке отрисовки макета. */
export const AVANTI_APPROVAL_CARDS: AvantiCreditCardArt[] = [
  {
    id: 'dark',
    variant: 'dark',
    mark: cardMarkDark,
    contactless: cardContactlessDark,
    chip: cardChipDark,
  },
  {
    id: 'primary',
    variant: 'primary',
    mark: cardMarkPrimary,
    contactless: cardContactlessPrimary,
    chip: cardChipPrimary,
  },
  {
    id: 'glass',
    variant: 'glass',
    mark: cardMarkGlass,
    contactless: cardContactlessGlass,
    chip: cardChipGlass,
  },
]

/** Надписи на декоративной карте — часть иллюстрации, не пользовательские данные. */
export const AVANTI_CREDIT_CARD_MOCK = {
  numberLabel: 'Credit Card No.',
  number: '1602  0911  2019  2021',
  holderLabel: 'Name',
  holder: 'MARCO ROSSI',
  expiryLabel: 'Exp.',
  expiry: '09/11',
} as const
