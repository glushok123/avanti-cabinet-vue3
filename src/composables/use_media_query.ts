import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

/**
 * Реактивно отслеживает совпадение медиавыражения.
 * Используется там, где на мобильной и десктопной ширине отличается
 * не оформление, а сама структура разметки (шапка, нижняя навигация).
 *
 * @param query — медиавыражение, например '(max-width: 767px)'.
 */
export function useMediaQuery(query: string): Ref<boolean> {
  const matches = ref(false)
  let mediaQueryList: MediaQueryList | null = null

  function handleChange(event: MediaQueryListEvent | MediaQueryList): void {
    matches.value = event.matches
  }

  onMounted(() => {
    mediaQueryList = window.matchMedia(query)
    handleChange(mediaQueryList)
    mediaQueryList.addEventListener('change', handleChange)
  })

  onBeforeUnmount(() => {
    mediaQueryList?.removeEventListener('change', handleChange)
  })

  return matches
}
