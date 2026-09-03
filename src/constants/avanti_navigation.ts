/**
 * Пункты и тексты главного меню (итальянский).
 * Источник один для всех навигационных списков: мобильное выезжающее меню
 * берёт данные отсюда, десктопная шапка и нижняя навигация кабинета —
 * из `avanti_dashboard_mock`.
 */
import type { AvantiNavigationItem } from '@/types/avanti_navigation'

/** Тексты мобильного меню. */
export const AVANTI_MENU_TEXTS = {
  title: 'Menu',
  ariaLabel: 'Menu principale',
  closeLabel: 'Chiudi il menu',
} as const

/**
 * Пункты повторяют навигацию личного кабинета: все четыре экрана свёрстаны
 * и доступны по своим маршрутам.
 *
 * Пункт умеет быть недоступным (`disabled` + `hint`) — это понадобится
 * на втором этапе, когда состав меню начнёт зависеть от статуса заявки.
 */
export const AVANTI_MAIN_MENU_ITEMS: AvantiNavigationItem[] = [
  { id: 'home', label: 'Home', icon: 'home', to: '/home' },
  { id: 'documents', label: 'Documenti', icon: 'documents', to: '/documents' },
  { id: 'profile', label: 'Profilo', icon: 'profile', to: '/profile' },
  { id: 'support', label: 'Assistenza', icon: 'chat', to: '/chat', accent: true },
]
