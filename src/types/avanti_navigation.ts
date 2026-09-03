/**
 * Типы навигации приложения.
 * Вынесены отдельно от типов личного кабинета, чтобы меню можно было
 * переиспользовать на любом экране — в том числе до авторизации.
 */

/** Иконки, доступные пунктам навигации. */
export type AvantiNavigationIcon = 'home' | 'documents' | 'profile' | 'chat'

/** Пункт главного меню. */
export interface AvantiNavigationItem {
  id: string
  label: string
  icon: AvantiNavigationIcon
  /** Маршрут пункта. Пусто у экранов, которых пока нет. */
  to?: string
  /** Экран ещё не реализован: пункт виден, но не кликается. */
  disabled?: boolean
  /** Пояснение к недоступному пункту. */
  hint?: string
  /** Пункт с фирменной заливкой («Assistenza»). */
  accent?: boolean
}
