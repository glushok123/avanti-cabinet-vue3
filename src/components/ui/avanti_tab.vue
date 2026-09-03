<!--
  Одна вкладка-шаг в полосе переключателя (кадр «Шаг 1 — IBAN», Figma 1:353).

  Внешне в макете состояний два: текущий шаг — бирюзовая заливка с белой
  подписью, остальные — серая плашка. Недоступный шаг дополнительно
  приглушается, чтобы отличаться от пройденного, на который можно вернуться.

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
    :aria-controls="panelId"
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
  }>(),
  {
    selected: false,
    state: 'available',
    tabbable: false,
    elementId: undefined,
    panelId: undefined,
  },
)

const emit = defineEmits<{ select: [] }>()

const locked = computed(() => props.state === 'locked')

/**
 * Недоступный шаг помечается `aria-disabled`, а не `disabled`: так он остаётся
 * видимым для скринридера и не выпадает из разметки вкладок.
 */
const tabIndex = computed(() => (props.tabbable && !locked.value ? 0 : -1))

const stateClasses = computed(() => ({
  'avanti-tab--current': props.selected,
  'avanti-tab--done': props.state === 'done' && !props.selected,
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
  padding: 8px 4px;
  font-size: 11px;
  font-weight: var(--avanti-font-weight-medium);
  line-height: normal;
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

  /* --- Пройденный шаг: вид как в макете, но вернуться на него можно --- */
  &--done {
    color: var(--avanti-color-text-strong);
  }

  /* --- Недоступный шаг: приглушён и не реагирует на нажатие --- */
  &--locked {
    color: var(--avanti-color-text-tertiary);
    cursor: not-allowed;

    &:hover {
      color: var(--avanti-color-text-tertiary);
    }
  }
}
</style>
