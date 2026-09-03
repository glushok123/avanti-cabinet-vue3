/**
 * Карта иконок навигации: одно сопоставление имени из данных с компонентом
 * для десктопной шапки и мобильной нижней навигации.
 */
import type { Component } from 'vue'
import AvantiIconHome from '@/components/icons/avanti_icon_home.vue'
import AvantiIconDocuments from '@/components/icons/avanti_icon_documents.vue'
import AvantiIconProfile from '@/components/icons/avanti_icon_profile.vue'
import AvantiIconChat from '@/components/icons/avanti_icon_chat.vue'
import type { AvantiNavIcon } from '@/types/avanti_dashboard'

export const AVANTI_NAV_ICONS: Record<AvantiNavIcon, Component> = {
  home: AvantiIconHome,
  documents: AvantiIconDocuments,
  profile: AvantiIconProfile,
  chat: AvantiIconChat,
}

/** Возвращает компонент иконки по имени из данных навигации. */
export function resolveNavIcon(name: AvantiNavIcon): Component {
  return AVANTI_NAV_ICONS[name]
}
