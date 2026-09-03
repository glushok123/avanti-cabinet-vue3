/**
 * Текстовые эквиваленты статуса шага для скринридеров.
 *
 * В макете статус шага показан только иконкой (галочка, стрелка, перо) и
 * цветом, а иконки помечены `aria-hidden`. Без этих подписей все шаги шкалы
 * и чеклиста звучали бы одинаково. На экране подписи не появляются:
 * компоненты выводят их визуально скрытой строкой.
 *
 * Формулировки взяты из уже существующих строк локали:
 * «Completato» и «In attesa» — подписи шагов чеклиста
 * (`avanti_dashboard_mock`), «In corso» — из состояний онбординга
 * (`avanti_onboarding_content`).
 */
import type { AvantiStepStatus } from '@/types/avanti_dashboard'

export const AVANTI_STEP_STATUS_LABELS: Record<AvantiStepStatus, string> = {
  completed: 'Completato',
  current: 'In corso',
  pending: 'In attesa',
}
