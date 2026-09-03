import type { Ref } from 'vue'
import { useMediaQuery } from '@/composables/use_media_query'
import { AVANTI_MOBILE_MEDIA_QUERY } from '@/constants/avanti_breakpoints'

/**
 * Признак мобильной ширины экрана (до 767px включительно).
 * Порог совпадает с миксином `mobile` в SCSS-абстракциях.
 */
export function useIsMobile(): Ref<boolean> {
  return useMediaQuery(AVANTI_MOBILE_MEDIA_QUERY)
}
