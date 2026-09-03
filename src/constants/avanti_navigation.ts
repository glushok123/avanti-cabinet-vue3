/**
 * Пункты и тексты главного меню (итальянский).
 * Источник один для всех навигационных списков: мобильное выезжающее меню
 * берёт данные отсюда, следующие экраны подключатся к тем же константам.
 */
import type { AvantiNavigationItem } from '@/types/avanti_navigation'

/** Тексты мобильного меню. */
export const AVANTI_MENU_TEXTS = {
  title: 'Menu',
  ariaLabel: 'Menu principale',
  closeLabel: 'Chiudi il menu',
  comingSoon: 'Presto disponibile',
} as const

/**
 * Пункты повторяют навигацию личного кабинета.
 *
 * РАСХОЖДЕНИЕ ЭТАПА: сверстаны только два экрана, поэтому ссылки ведут
 * на существующие маршруты — «Home» на личный кабинет, «Assistenza»
 * временно на стартовый экран симуляции; «Documenti» и «Profilo»
 * помечены как недоступные до появления своих страниц.
 */
export const AVANTI_MAIN_MENU_ITEMS: AvantiNavigationItem[] = [
  { id: 'home', label: 'Home', icon: 'home', to: '/home' },
  {
    id: 'documents',
    label: 'Documenti',
    icon: 'documents',
    disabled: true,
    hint: AVANTI_MENU_TEXTS.comingSoon,
  },
  {
    id: 'profile',
    label: 'Profilo',
    icon: 'profile',
    disabled: true,
    hint: AVANTI_MENU_TEXTS.comingSoon,
  },
  { id: 'support', label: 'Assistenza', icon: 'chat', to: '/', accent: true },
]
