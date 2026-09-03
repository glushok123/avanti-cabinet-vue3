/**
 * Пороги адаптива. Дублируют значения из `src/assets/styles/_variables.scss`
 * и нужны там, где на разных ширинах отличается структура разметки,
 * а не только оформление.
 */
export const AVANTI_BREAKPOINT_MOBILE_MAX = 767

export const AVANTI_MOBILE_MEDIA_QUERY = `(max-width: ${AVANTI_BREAKPOINT_MOBILE_MAX}px)`
