<!--
  Одна вкладка-шаг в полосе переключателя (кадр «Шаг 1 — IBAN», Figma 1:353).

  Внешне в макете состояний два: текущий шаг — бирюзовая заливка с белой
  подписью, остальные — серая плашка одного цвета. Пройденный и недоступный
  шаги различаются только курсором и `aria-disabled`: в кадре 246:7002 они
  нарисованы одинаково.

  Скруглены только внешние углы полосы, поэтому радиус вешается на первую
  и последнюю вкладку — они всегда прямые потомки контейнера с role="tablist".
-->
<template>
  <button
    :id="elementId"
    class="avanti-tab"
    :class="stateClasses"
    type="button"
    role="tab"
    :aria-controls="controlledPanelId"
    :aria-selected="selected"
    :aria-disabled="locked"
    :tabindex="tabIndex"
    @click="handleClick"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { AvantiTabState } from '@/types/avanti_tabs'

const props = withDefaults(
  defineProps<{
    /** Видимая подпись шага. */
    label: string
    /** Шаг открыт сейчас. */
    selected?: boolean
    /** Прогресс и доступность шага. */
    state?: AvantiTabState
    /** Шаг участвует в обходе по Tab (roving tabindex полосы). */
    tabbable?: boolean
    /** `id` самого элемента вкладки — на него ссылается панель содержимого. */
    elementId?: string
    /** `id` панели с содержимым шага. */
    panelId?: string
    /**
     * Панель шага сейчас есть в DOM. Мастер, который рендерит только открытый
     * шаг, должен передать `false` остальным вкладкам: `aria-controls` на
     * несуществующий `id` скринридер считает ошибкой разметки.
     * По умолчанию `true` — вкладки с постоянными панелями ведут себя как прежде.
     */
    panelRendered?: boolean
  }>(),
  {
    selected: false,
    state: 'available',
    tabbable: false,
    elementId: undefined,
    panelId: undefined,
    panelRendered: true,
  },
)

const emit = defineEmits<{ select: [] }>()

const locked = computed(() => props.state === 'locked')

/** Ссылка на панель ставится, только когда панель действительно отрисована. */
const controlledPanelId = computed<string | undefined>(() =>
  props.panelRendered ? props.panelId : undefined,
)

/**
 * Недоступный шаг помечается `aria-disabled`, а не `disabled`: так он остаётся
 * видимым для скринридера и не выпадает из разметки вкладок.
 */
const tabIndex = computed(() => (props.tabbable && !locked.value ? 0 : -1))

const stateClasses = computed(() => ({
  'avanti-tab--current': props.selected,
  'avanti-tab--locked': locked.value,
}))

function handleClick(): void {
  if (locked.value || props.selected) {
    return
  }
  emit('select')
}
</script>

<style lang="scss" scoped>
.avanti-tab {
  @include button-reset;
  @include focus-ring(-2px);

  flex: 1 1 0;
  min-width: 0;

  /* Полоса шагов в макете 37px: поля 12px и строка ровно 13px (246:7003).
     При `normal` строка выходила 13.31 → 14, а вся полоса 30px, и всё
     содержимое окна поднималось на 7px выше кадра. */
  padding: 12px 4px;
  font-size: 11px;
  font-weight: var(--avanti-font-weight-medium);
  line-height: 13px;
  color: var(--avanti-color-text-secondary);
  text-align: center;
  overflow-wrap: break-word;
  background-color: var(--avanti-color-surface-neutral);
  transition:
    color var(--avanti-transition-fast),
    background-color var(--avanti-transition-fast);

  /* Скругление внешних углов полосы: внутренние стыки остаются прямыми. */
  &:first-child {
    border-top-left-radius: var(--avanti-radius-sm);
    border-bottom-left-radius: var(--avanti-radius-sm);
  }

  &:last-child {
    border-top-right-radius: var(--avanti-radius-sm);
    border-bottom-right-radius: var(--avanti-radius-sm);
  }

  &:hover {
    color: var(--avanti-color-primary);
  }

  /* --- Текущий шаг: бирюзовая заливка --- */
  &--current {
    font-weight: var(--avanti-font-weight-semibold);
    color: var(--avanti-color-text-on-primary);
    cursor: default;
    background-color: var(--avanti-color-primary);

    &:hover {
      color: var(--avanti-color-text-on-primary);
    }
  }

  /*
   * --- Пройденный и недоступный шаги ---
   * В макете (246:7003 и 246:7007) обе неактивные вкладки нарисованы одним
   * серым цветом: пройденный шаг не темнее, недоступный не бледнее. Поэтому
   * состояния отличаются только курсором и `aria-disabled`, а не окраской.
   */
  &--locked {
    cursor: not-allowed;

    &:hover {
      color: var(--avanti-color-text-secondary);
    }
  }
}
</style>
