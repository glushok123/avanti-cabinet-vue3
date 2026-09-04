/**
 * Переходы по сценарию оформления кредита.
 *
 * Страница не знает, какой экран следующий, — она сообщает о намерении
 * («дальше», «назад»), а порядок берётся из `AVANTI_FLOW_STEPS`. Благодаря
 * этому кнопки всех девятнадцати экранов подчиняются одному описанию,
 * и порядок шагов правится в одном месте.
 */
import { computed, type ComputedRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { AVANTI_FLOW_STEPS, type AvantiFlowStep } from '@/constants/avanti_flow'

export interface AvantiFlowNavigation {
  /** Есть ли следующий шаг у текущего экрана. */
  hasNext: ComputedRef<boolean>
  /** Есть ли заданный возврат (иначе уходим на предыдущий экран истории). */
  hasBack: ComputedRef<boolean>
  /** Перейти к следующему шагу сценария. */
  goNext: () => void
  /** Вернуться на предыдущий шаг. */
  goBack: () => void
}

export function useFlowNavigation(): AvantiFlowNavigation {
  const router = useRouter()
  const route = useRoute()

  /** Шаг сценария, соответствующий открытому маршруту. */
  const step = computed<AvantiFlowStep | undefined>(() =>
    AVANTI_FLOW_STEPS.find((item) => item.path === route.path),
  )

  const hasNext = computed<boolean>(() => Boolean(step.value?.next))
  const hasBack = computed<boolean>(() => Boolean(step.value?.back))

  function goNext(): void {
    const target = step.value?.next
    if (target) {
      void router.push(target)
    }
  }

  /**
   * Возврат по описанию сценария. Если для экрана он не задан — уходим
   * на предыдущий адрес истории: так кнопка «назад» ведёт себя ожидаемо
   * и на экранах, открытых не по порядку.
   */
  function goBack(): void {
    const target = step.value?.back
    if (target) {
      void router.push(target)
      return
    }
    router.back()
  }

  return { hasNext, hasBack, goNext, goBack }
}
