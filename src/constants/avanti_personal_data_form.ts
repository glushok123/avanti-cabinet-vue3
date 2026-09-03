/**
 * Тексты и варианты анкеты «Dati personali» (итальянский).
 * Сняты из Figma-фреймов 0:977 (десктоп), 4:963 (мобильная) и разворотов
 * 0:1021 / 263:7568 / 246:5258. Страница и её блоки не содержат ни одного
 * литерала — всё берётся отсюда.
 */
import type { AvantiChoiceOption, AvantiSelectOption } from '@/types/avanti_form'

/** Подписи и служебные тексты экрана. */
export const AVANTI_PERSONAL_DATA_TEXTS = {
  menu: 'Menu',
  overline: 'Dati personali',
  title: 'Dicci chi sei',
  lastNameLabel: 'Cognome',
  lastNamePlaceholder: 'Inserisci il tuo cognome',
  firstNameLabel: 'Nome',
  firstNamePlaceholder: 'Inserisci il tuo nome',
  genderLabel: 'Sesso',
  genderHint: 'Serve per personalizzare l’animazione del prelievo.',
  documentTypeLabel: 'Tipo di documento',
  documentTypePlaceholder: 'Seleziona il tipo',
  documentNumberLabel: 'Numero del documento',
  /* Подпись-пример из макета набрана без пробела после точки — воспроизведена дословно. */
  documentNumberPlaceholder: 'Es.AB1232232',
  consentBadge: 'i',
  consentText: 'Acconsento al trattamento dei miei dati personali per la verifica della richiesta.',
  actionBack: 'Indietro',
  actionNext: 'Continua',
} as const

/** Сегменты переключателя пола. */
export const AVANTI_GENDER_OPTIONS: AvantiChoiceOption[] = [
  { value: 'male', label: 'Uomo', icon: 'male' },
  { value: 'female', label: 'Donna', icon: 'female' },
]

/** Пол по умолчанию: на всех фреймах сегмент «Uomo» залит фирменным цветом. */
export const AVANTI_GENDER_DEFAULT = 'male'

/** Пункты выпадающего списка «Tipo di documento» — пять вариантов из разворота. */
export const AVANTI_DOCUMENT_TYPE_OPTIONS: AvantiSelectOption[] = [
  { value: 'passport', label: 'Passaporto' },
  { value: 'identity-card', label: 'Carta d’identità nazionale' },
  { value: 'driving-licence', label: 'Patente di guida' },
  { value: 'residence-permit', label: 'Permesso di soggiorno' },
  { value: 'other', label: 'Altro documento ufficiale' },
]
